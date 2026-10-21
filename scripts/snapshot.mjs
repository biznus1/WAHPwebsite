// Builds a static, script-free preview of the running site for sharing as an Artifact.
// Usage: node scripts/snapshot.mjs <baseUrl> <outDir>
// Output: index.html (body fragment for the Artifact page), <route>.html pages, assets/site.css, img/*.webp
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const [base, out] = process.argv.slice(2);
const routes = [
  "/",
  "/platform",
  "/physicians",
  "/diaspora-physicians",
  "/investors",
  "/patients",
  "/about",
  "/leadership",
  "/contact",
  "/privacy",
  "/terms",
];
const fileFor = (route) => (route === "/" ? "home.html" : `${route.slice(1)}.html`);
mkdirSync(join(out, "assets"), { recursive: true });
mkdirSync(join(out, "img"), { recursive: true });

// --- Shared stylesheet with fonts inlined as data URIs ---
const home = await (await fetch(base + "/")).text();
const cssHrefs = [...home.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1]);
let css = "";
for (const href of cssHrefs) {
  let chunk = await (await fetch(base + href)).text();
  // Inline font files (URLs are relative to the stylesheet) as data URIs.
  for (const m of [...chunk.matchAll(/url\(["']?([^)"']+\.woff2)["']?\)/g)]) {
    const abs = new URL(m[1], base + href).href;
    const buf = Buffer.from(await (await fetch(abs)).arrayBuffer());
    chunk = chunk.replaceAll(m[0], `url(data:font/woff2;base64,${buf.toString("base64")})`);
  }
  css += chunk + "\n";
}
writeFileSync(join(out, "assets/site.css"), css);

const findImage = (stem) => {
  for (const dir of ["public/images/concepts", "public/images/team", "public/images/photos"]) {
    const p = join(dir, `${stem}.webp`);
    if (existsSync(p)) return p;
  }
  return null;
};
const usedImages = new Set();

const browser = await chromium.launch();
const pages = {};
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + route, { waitUntil: "networkidle" });

  // Platform tabs: capture every tab state of the interactive component.
  let tabStates = [];
  if (route === "/platform") {
    const tabs = page.getByRole("tab");
    const n = await tabs.count();
    for (let i = 0; i < n; i++) {
      await tabs.nth(i).click();
      await page.waitForTimeout(350);
      tabStates.push(await page.evaluate(() => document.querySelector('[role="tablist"]').closest(".grid").outerHTML));
    }
    await tabs.nth(0).click();
    await page.waitForTimeout(350);
  }

  // Mobile menu markup (only rendered when open).
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(base + route, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Open menu" }).click();
  const menuHtml = await mobile.evaluate(() => document.getElementById("mobile-menu").outerHTML);
  await mobile.close();

  const result = await page.evaluate(
    ({ tabStates }) => {
      document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible"));
      const fontVar = getComputedStyle(document.documentElement).getPropertyValue("--font-manrope");
      const main = document.body.cloneNode(true);
      // Reveals were forced visible for capture; reset them so the preview's own observer animates them in.
      main.querySelectorAll(".reveal.is-visible").forEach((e) => e.classList.remove("is-visible"));
      main.querySelectorAll("script, next-route-announcer, nextjs-portal").forEach((e) => e.remove());
      const imgs = [];
      main.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        const decoded = decodeURIComponent(src);
        const m = decoded.match(/\/_next\/static\/media\/([^.?&]+)\./);
        // Admin-managed images are referenced by public path, e.g. /images/team/members/<slug>/photo.webp.
        const pub = decoded.match(/url=(\/images\/[^&]+)\.webp/);
        const name = m ? m[1] : pub ? pub[1].slice(1).replaceAll("/", "-") : null;
        if (name) {
          imgs.push(pub && !m ? `${name}|public${pub[1]}.webp` : name);
          img.setAttribute("src", `img/${name}.webp`);
          img.removeAttribute("srcset");
          img.removeAttribute("sizes");
          img.setAttribute("loading", "lazy");
        }
      });
      // Background video: point at the copied files.
      main.querySelectorAll("video[poster], video source").forEach((el) => {
        for (const attr of ["poster", "src"]) {
          const v = el.getAttribute(attr);
          if (v && v.startsWith("/video/")) el.setAttribute(attr, v.slice(1));
        }
      });
      main.querySelectorAll('a[href="/keystatic"]').forEach((a) => {
        a.setAttribute("href", "#");
        a.setAttribute("data-preview-admin", "");
      });
      main.querySelectorAll("a[href]").forEach((a) => {
        const href = a.getAttribute("href");
        if (!href.startsWith("/")) return;
        const [pathAndQuery, hash] = href.split("#");
        const path = pathAndQuery.split("?")[0];
        const file = path === "/" ? "home.html" : `${path.slice(1)}.html`;
        a.setAttribute("href", file + (hash ? `#${hash}` : ""));
      });
      if (tabStates.length) {
        const comp = main.querySelector('[role="tablist"]').closest(".grid");
        comp.setAttribute("data-tabs-root", "");
      }
      return { html: main.innerHTML, bodyClass: document.body.className, fontVar, imgs, title: document.title };
    },
    { tabStates, menuHtml },
  );
  result.imgs.forEach((s) => usedImages.add(s));
  // Tab states were captured from the live DOM: point their images at local files too.
  tabStates = tabStates.map((html) =>
    html
      .replace(/ srcset="[^"]*"/gi, "")
      .replace(/ sizes="[^"]*"/gi, "")
      .replace(/src="[^"]*?%2Fmedia%2F([^.%"]+)\.[^"]*"/g, (_m, stem) => {
        usedImages.add(stem);
        return `src="img/${stem}.webp"`;
      }),
  );
  pages[route] = { ...result, tabStates, menuHtml };
  await page.close();
}
await browser.close();

for (const entry of usedImages) {
  const [stem, publicPath] = entry.split("|");
  const p = publicPath && existsSync(publicPath) ? publicPath : findImage(stem);
  if (p) writeFileSync(join(out, "img", `${stem}.webp`), readFileSync(p));
  else console.warn("missing image", stem);
}

// Hero footage
if (existsSync("public/video")) {
  mkdirSync(join(out, "video"), { recursive: true });
  for (const f of readdirSync("public/video")) writeFileSync(join(out, "video", f), readFileSync(join("public/video", f)));
}

const previewStyle = (fontVar) => `<style>
:root{--font-manrope:${fontVar};color-scheme:light}
body{background:#F5F6FC;color:#1E1E24;font-size:16px;line-height:1.5;margin:0}
header.sticky{top:env(safe-area-inset-top,0px)}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:60;background:#F5F6FC}
.preview-bar{background:#1E1E24;color:#fff;font:600 13px/1.4 var(--font-manrope),system-ui,sans-serif;text-align:center;padding-block:8px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.preview-bar a{color:#fff}
header.preview-dim{background:rgba(0,51,102,.75)!important;backdrop-filter:blur(12px)}
header.preview-light{background:rgba(245,246,252,.92)!important;box-shadow:0 1px 0 #D3D6E0;backdrop-filter:blur(12px)}
header.preview-light nav a{color:#40424D!important}
header.preview-light svg g[fill="#FFFFFF"]{fill:#003366}
header.preview-light button[aria-controls]{color:#003366;--tw-ring-color:#BCBFCC}
.preview-note{margin-top:12px;border-radius:12px;background:#EDEFF7;color:#003366;padding:12px 14px;font-size:14px;font-weight:600}
</style>`;

const previewScript = (tabStates) => `<script>
(function(){
  // Scroll reveals (the live site does this in React; content stays visible if this script never runs)
  document.documentElement.classList.add('js');
  var reveals=[].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{rootMargin:'0px 0px -8% 0px',threshold:0.08}); reveals.forEach(function(el){ io.observe(el); }); } else { reveals.forEach(function(el){ el.classList.add('is-visible'); }); }
  // Count-up figures
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce) document.querySelectorAll('[data-countup]').forEach(function(el,i){ var m=el.getAttribute('data-countup').match(/^(\D*)(\d+)(.*)$/); if(!m) return; var n=+m[2]; el.textContent=m[1]+'0'+m[3]; setTimeout(function(){ var t0=performance.now(); (function tick(now){ var t=Math.min(1,(now-t0)/1800), e=1-Math.pow(1-t,4); el.textContent=m[1]+Math.round(n*e)+m[3]; if(t<1) requestAnimationFrame(tick); })(t0); },500+i*90); });
  // Home header softens from navy to light on scroll
  var hdr=document.querySelector('header[data-blend]'), hero=document.querySelector('[data-hero]');
  if(hdr&&hero){ var onS=function(){ var past=hero.getBoundingClientRect().bottom<=96; hdr.classList.toggle('preview-light',past); hdr.classList.toggle('preview-dim',!past&&window.scrollY>8); }; onS(); window.addEventListener('scroll',onS,{passive:true}); }
  // Hero background video with its pause control
  var vid=document.querySelector('[data-hero] video');
  if(vid){ vid.muted=true; var vbtn=vid.parentElement.querySelector('button'); var setB=function(){ if(!vbtn) return; var on=!vid.paused; vbtn.querySelector('span').textContent=on?'Pause video':'Play video'; };
    if(!reduce){ var pr=vid.play(); if(pr&&pr.then) pr.then(setB,setB); } setB();
    if(vbtn) vbtn.addEventListener('click',function(){ if(vid.paused){ vid.play().then(setB,setB); } else { vid.pause(); setB(); } }); }
  // Mobile menu
  var btn=document.querySelector('button[aria-controls="mobile-menu"]');
  var menu=document.getElementById('mobile-menu');
  function setOpen(o){ if(!menu||!btn) return; if(o){ var h=document.querySelector('header'); if(h) menu.style.top=Math.max(0,h.getBoundingClientRect().bottom)+'px'; } menu.hidden=!o; btn.setAttribute('aria-expanded',String(o)); document.body.style.overflow=o?'hidden':''; var sr=btn.querySelector('.sr-only'); if(sr) sr.textContent=o?'Close menu':'Open menu'; }
  if(btn&&menu){ setOpen(false); btn.addEventListener('click',function(){ setOpen(menu.hidden); }); document.addEventListener('keydown',function(e){ if(e.key==='Escape') setOpen(false); }); menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',function(){ setOpen(false); }); }); }
  // Platform tabs
  var states=${JSON.stringify(tabStates)};
  function bindTabs(){ var root=document.querySelector('[data-tabs-root]')||document.querySelector('[role="tablist"]')&&document.querySelector('[role="tablist"]').closest('.grid'); if(!root||!states.length) return; root.setAttribute('data-tabs-root','');
    root.querySelectorAll('[role="tab"]').forEach(function(t,i){ t.addEventListener('click',function(){ var tmp=document.createElement('div'); tmp.innerHTML=states[i]; var next=tmp.firstElementChild; next.setAttribute('data-tabs-root',''); root.replaceWith(next); bindTabs(); var nt=next.querySelectorAll('[role="tab"]')[i]; if(nt) nt.focus(); }); }); }
  bindTabs();
  // The site admin needs the deployed site
  document.querySelectorAll('[data-preview-admin]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); if(a.nextElementSibling&&a.nextElementSibling.hasAttribute('data-admin-note')) return; var n=document.createElement('span'); n.setAttribute('data-admin-note',''); n.setAttribute('role','status'); n.className='ml-3'; n.textContent='Admin sign in works on the deployed site, not in this preview.'; a.after(n); }); });
  // Forms are disabled in the preview
  document.querySelectorAll('form').forEach(function(f){ f.addEventListener('submit',function(e){ e.preventDefault(); if(f.querySelector('.preview-note')) return; var n=document.createElement('p'); n.className='preview-note'; n.setAttribute('role','status'); n.textContent='Preview only: form submissions are switched off in this static preview. On the real site this form validates and routes the enquiry.'; f.appendChild(n); }); });
})();
</script>`;

const bar = `<div class="preview-bar">WAHP website preview: a static copy of the staging build with forms switched off. Not the live site.</div>`;

const rewriteLinks = (html) =>
  html.replace(
    /href="\/([^"#?]*)(\?[^"#]*)?(#[^"]*)?"/g,
    (_m, path, _q, hash) => `href="${path === "" ? "home" : path}.html${hash ?? ""}"`,
  );

for (const route of routes) {
  const p = pages[route];
  p.menuHtml = rewriteLinks(p.menuHtml)
    .replaceAll("animate-rise", "")
    .replace(/ style="animation-delay:[^"]*"/g, "");
  const body = `${bar}<div class="${p.bodyClass}">${p.html}${p.menuHtml.replace('id="mobile-menu"', 'id="mobile-menu" hidden')}</div>${previewScript(p.tabStates)}`;
  const doc = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>${p.title}</title><link rel="stylesheet" href="assets/site.css">${previewStyle(p.fontVar)}</head><body>${body}</body></html>`;
  writeFileSync(join(out, fileFor(route)), doc);
  if (route === "/") {
    // Artifact page: content only (the publisher adds the document skeleton).
    writeFileSync(
      join(out, "index.html"),
      `<title>WAHP Website Preview</title>\n<link rel="stylesheet" href="assets/site.css">\n${previewStyle(p.fontVar)}\n${body}\n`,
    );
  }
}
console.log("pages", routes.length, "images", usedImages.size);

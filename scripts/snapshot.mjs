// Builds a static, script-free preview of the running site for sharing as an Artifact.
// Usage: node scripts/snapshot.mjs <baseUrl> <outDir>
// Output: index.html (body fragment for the Artifact page), <route>.html pages, assets/site.css, img/*.webp
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const [base, out] = process.argv.slice(2);
const routes = [
  "/",
  "/platform",
  "/physicians",
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
  for (const dir of ["public/images/concepts", "public/images/team"]) {
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
    ({ tabStates, menuHtml }) => {
      document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible"));
      const fontVar = getComputedStyle(document.documentElement).getPropertyValue("--font-manrope");
      const main = document.body.cloneNode(true);
      main.querySelectorAll("script, next-route-announcer, nextjs-portal").forEach((e) => e.remove());
      const imgs = [];
      main.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        const m = decodeURIComponent(src).match(/\/_next\/static\/media\/([^.?&]+)\./);
        if (m) {
          imgs.push(m[1]);
          img.setAttribute("src", `img/${m[1]}.webp`);
          img.removeAttribute("srcset");
          img.removeAttribute("sizes");
          img.setAttribute("loading", "lazy");
        }
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
  pages[route] = { ...result, tabStates, menuHtml };
  await page.close();
}
await browser.close();

for (const stem of usedImages) {
  const p = findImage(stem);
  if (p) writeFileSync(join(out, "img", `${stem}.webp`), readFileSync(p));
  else console.warn("missing image", stem);
}

const previewStyle = (fontVar) => `<style>
:root{--font-manrope:${fontVar};color-scheme:light}
body{background:#F5F6FC;color:#1E1E24;font-size:16px;line-height:1.5;margin:0}
header.sticky{top:env(safe-area-inset-top,0px)}
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:60;background:#F5F6FC}
.preview-bar{background:#1E1E24;color:#fff;font:600 13px/1.4 var(--font-manrope),system-ui,sans-serif;text-align:center;padding-block:8px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.preview-bar a{color:#fff}
.preview-note{margin-top:12px;border-radius:12px;background:#EDEFF7;color:#003366;padding:12px 14px;font-size:14px;font-weight:600}
</style>`;

const previewScript = (tabStates) => `<script>
(function(){
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
  // Forms are disabled in the preview
  document.querySelectorAll('form').forEach(function(f){ f.addEventListener('submit',function(e){ e.preventDefault(); if(f.querySelector('.preview-note')) return; var n=document.createElement('p'); n.className='preview-note'; n.setAttribute('role','status'); n.textContent='Preview only: form submissions are switched off in this static preview. On the real site this form validates and routes the enquiry.'; f.appendChild(n); }); });
})();
</script>`;

const bar = `<div class="preview-bar">WAHP website preview — static snapshot of the staging build (forms disabled). Not the live site.</div>`;

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

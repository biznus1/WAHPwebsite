import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const [base, prefix, outText, ...extra] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
const links = await page.$$eval("a[href]", (as) => [...new Set(as.map((a) => a.href))]);
const origin = new URL(base).origin;
const internal = [
  ...new Set([
    base,
    ...extra.map((e) => origin + e),
    ...links.filter((l) => l.startsWith(origin)).map((l) => l.split("#")[0]),
  ]),
].slice(0, 15);
let out = `# Crawl of ${base}\n\nAll links on home:\n${links.join("\n")}\n\n`;
for (const url of internal) {
  try {
    for (const [name, vp] of [
      ["desktop", { width: 1440, height: 900 }],
      ["mobile", { width: 390, height: 844 }],
    ]) {
      const p = await browser.newPage({ viewport: vp });
      await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await p.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await p.waitForTimeout(800);
      const slug = new URL(url).pathname.replace(/\//g, "-").replace(/^-|-$/g, "") || "home";
      await p.screenshot({
        path: `docs/research/screenshots/${prefix}-${slug}-${name}.jpg`,
        fullPage: true,
        type: "jpeg",
        quality: 60,
      });
      if (name === "desktop") {
        const info = await p.evaluate(() => ({
          title: document.title,
          desc: document.querySelector('meta[name="description"]')?.content,
          h1: document.querySelectorAll("h1").length,
          imgsNoAlt: [...document.images].filter((i) => !i.alt).length,
          imgs: [...document.images].map((i) => `${i.currentSrc || i.src} | alt=${i.alt}`).slice(0, 60),
          text: document.body.innerText,
        }));
        out += `\n\n=============== ${url}\nTITLE: ${info.title}\nDESC: ${info.desc}\nH1 count: ${info.h1} | images without alt: ${info.imgsNoAlt}\nIMAGES:\n${info.imgs.join("\n")}\n\nTEXT:\n${info.text}\n`;
      }
      await p.close();
    }
  } catch (e) {
    out += `\n\n=============== ${url}\nERROR ${e}\n`;
  }
}
writeFileSync(outText, out);
await browser.close();
console.log("pages:", internal.length);

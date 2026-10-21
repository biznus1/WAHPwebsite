// Collect every image a set of pages loads (img tags, srcset, CSS backgrounds).
// Usage: node scripts/collect-images.mjs <outDir> <url...>
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
const [out, ...urls] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const seen = new Map();
const manifest = [];
for (const url of urls) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  page.on("response", async (res) => {
    const type = res.request().resourceType();
    const ct = res.headers()["content-type"] || "";
    if (type !== "image" && !ct.startsWith("image/")) return;
    try {
      const buf = await res.body();
      if (buf.length < 3000) return; // skip icons/sprites
      const h = createHash("sha1").update(buf).digest("hex").slice(0, 10);
      if (seen.has(h)) {
        seen.get(h).pages.add(url);
        return;
      }
      const ext = ct.includes("png")
        ? "png"
        : ct.includes("webp")
          ? "webp"
          : ct.includes("svg")
            ? "svg"
            : ct.includes("gif")
              ? "gif"
              : "jpg";
      const file = `${h}.${ext}`;
      writeFileSync(join(out, file), buf);
      const entry = { file, src: res.url(), bytes: buf.length, pages: new Set([url]) };
      seen.set(h, entry);
      manifest.push(entry);
    } catch {}
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
  });
  await page.waitForTimeout(1500);
  // Also record which images are in <img> vs CSS backgrounds, with alt text
  const info = await page.evaluate(() => [...document.images].map((i) => ({ src: i.currentSrc || i.src, alt: i.alt })));
  for (const i of info) for (const e of manifest) if (e.src === i.src) e.alt = i.alt;
  await page.close();
}
await browser.close();
writeFileSync(
  join(out, "manifest.json"),
  JSON.stringify(
    manifest.map((e) => ({ ...e, pages: [...e.pages] })),
    null,
    2,
  ),
);
console.log("images:", manifest.length);

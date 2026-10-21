// Search Unsplash (free-licence photos only) via a real browser session.
// Usage: node scripts/unsplash-search.mjs <outJson> <query...>
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const [out, ...queries] = process.argv.slice(2);
const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" });
const page = await ctx.newPage();
await page.goto("https://unsplash.com/", { waitUntil: "domcontentloaded", timeout: 90000 });
await page.waitForTimeout(8000);
const results = {};
for (const q of queries) {
  const data = await page.evaluate(async (q) => {
    const r = await fetch(`/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30`, { headers: { accept: "application/json" } });
    return r.ok ? r.json() : { error: r.status };
  }, q);
  results[q] = data.error
    ? data
    : data.results.map((p) => ({
        id: p.id,
        slug: p.slug,
        premium: p.premium || p.plus || false,
        alt: p.alt_description || p.description,
        w: p.width,
        h: p.height,
        user: p.user?.name,
        username: p.user?.username,
        url: p.urls?.raw,
        page: p.links?.html,
      }));
  console.log(q, Array.isArray(results[q]) ? results[q].length + " results, free: " + results[q].filter((x) => !x.premium).length : JSON.stringify(results[q]));
}
writeFileSync(out, JSON.stringify(results, null, 1));
await browser.close();

// Screenshot helper: node scripts/shoot.mjs <baseUrl> <outDir> <route...>
import { chromium } from "@playwright/test";
const [base, out, ...routes] = process.argv.slice(2);
const browser = await chromium.launch();
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
for (const route of routes) {
  for (const [name, vp] of Object.entries(viewports)) {
    const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("response", (r) => r.status() >= 400 && errors.push(r.status() + " " + r.url()));
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
    await page.screenshot({ path: `${out}/${slug}-${name}.jpg`, fullPage: true, quality: 72, type: "jpeg" });
    console.log(route, name, "overflowX=" + overflow, errors.length ? "ERRORS: " + errors.join(" | ") : "ok");
    await page.close();
  }
}
await browser.close();

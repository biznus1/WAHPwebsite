// List all links on a page: node scripts/links.mjs <url>
import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(process.argv[2], { waitUntil: "networkidle" });
const links = await page.$$eval("a[href]", (as) => as.map((a) => `${a.textContent.trim().slice(0, 40)} -> ${a.href}`));
console.log([...new Set(links)].join("\n"));
await browser.close();

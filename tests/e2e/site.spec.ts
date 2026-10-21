import { expect, test } from "@playwright/test";

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

for (const route of routes) {
  test(`${route} renders with one h1, metadata and no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/West African Health Partners/);
    expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("no unsupported claims or placeholder links appear anywhere", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/95%|24\/7|book (an )?appointment now|now open/i);
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
  }
});

test("all images have alt text", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const missing = await page.locator("img:not([alt])").count();
    expect(missing, route).toBe(0);
  }
});

test("legacy URLs redirect", async ({ page }) => {
  await page.goto("/founders");
  await expect(page).toHaveURL(/\/leadership$/);
  await page.goto("/contact-us");
  await expect(page).toHaveURL(/\/contact$/);
});

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
});

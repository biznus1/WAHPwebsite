import { expect, test } from "@playwright/test";

// The e2e server runs `next start` without GitHub credentials, so the admin must be switched off.
test("footer has a discreet admin link", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("contentinfo").getByRole("link", { name: "Admin", exact: true });
  await expect(link).toHaveAttribute("href", "/admin");
});

test("admin page offers the site editor and the trip hub, without site chrome or indexing", async ({ page }) => {
  const res = await page.goto("/admin");
  expect(res?.status()).toBe(200);
  expect(res?.headers()["x-robots-tag"]).toContain("noindex");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Admin");
  await expect(page.getByRole("link", { name: "Open the site editor" })).toHaveAttribute("href", "/keystatic");
  await expect(page.getByRole("heading", { level: 2, name: "Ghana trip hub" })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toHaveCount(0);
});

// The e2e server has no TRIP_HUB_PASSWORD or TRIP_HUB_URL, so no password may open anything.
test("trip hub stays closed when it is not configured", async ({ page }) => {
  await page.goto("/admin");
  await page.getByLabel("Team password").fill("anything");
  await page.getByRole("button", { name: "Open" }).click();
  await expect(page.locator("#trip-password-error")).toHaveText("The trip hub isn't set up on this site yet.");
  await expect(page).toHaveURL(/\/admin$/);
});

test("admin page explains it is not set up, without site chrome or indexing", async ({ page }) => {
  const res = await page.goto("/keystatic");
  expect(res?.status()).toBe(200);
  expect(res?.headers()["x-robots-tag"]).toContain("noindex");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Site admin isn't switched on yet");
  await expect(page.getByRole("contentinfo")).toHaveCount(0);
});

test("admin API refuses reads and writes when GitHub sign-in is not configured", async ({ request }) => {
  expect((await request.get("/api/keystatic/tree", { headers: { "no-cors": "1" } })).status()).toBe(404);
  const write = await request.post("/api/keystatic/update", {
    headers: { "no-cors": "1", "content-type": "application/json" },
    data: { additions: [{ path: "src/content/data/pages/home.json", contents: "e30=" }], deletions: [] },
  });
  expect(write.status()).toBe(404);
});

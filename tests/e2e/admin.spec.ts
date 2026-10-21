import { expect, test } from "@playwright/test";

// The e2e server runs `next start` without GitHub credentials, so the admin must be switched off.
test("footer has a discreet admin link", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("contentinfo").getByRole("link", { name: "Admin", exact: true });
  await expect(link).toHaveAttribute("href", "/keystatic");
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

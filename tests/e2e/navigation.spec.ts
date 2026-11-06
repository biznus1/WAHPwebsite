import { expect, test } from "@playwright/test";

test("mobile menu opens, traps focus, closes on Escape and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  // Grouped as on the older build: "Who We Serve" opens to the audience pages.
  await expect(dialog.getByRole("link", { name: "For Physicians" })).toBeHidden();
  await dialog.getByText("Who We Serve").click();
  await dialog.getByRole("link", { name: "For Physicians" }).click();
  await expect(page).toHaveURL(/\/physicians$/);
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("mobile menu opens the current page's group and marks the page", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/investors");
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  const current = dialog.getByRole("link", { name: "For Investors" });
  await expect(current).toBeVisible();
  await expect(current).toHaveAttribute("aria-current", "page");
  await expect(dialog.getByRole("link", { name: "Leadership" })).toBeHidden();
  await dialog.getByRole("link", { name: "The Problem" }).click();
  await expect(page).toHaveURL(/\/the-problem$/);
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("desktop nav marks the active page", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.goto("/investors");
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Investors" }),
  ).toHaveAttribute("aria-current", "page");
});

test("platform tabs are keyboard operable", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.goto("/platform");
  const first = page.getByRole("tab", { name: /Equipped clinical suites/ });
  await first.focus();
  await page.keyboard.press("ArrowDown");
  const second = page.getByRole("tab", { name: /Integrated diagnostic laboratory/ });
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("reaches the physician's record digitally");
});

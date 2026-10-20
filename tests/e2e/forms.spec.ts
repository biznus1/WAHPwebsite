import { expect, test } from "@playwright/test";

test("contact form shows validation errors", async ({ page }) => {
  await page.goto("/contact");
  await page.waitForTimeout(3200); // human-paced (bot time-trap)
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await expect(page.getByText("Please confirm consent so we can respond.")).toBeVisible();
});

test("?type= deep link pre-selects the enquiry type", async ({ page }) => {
  await page.goto("/contact?type=partnership");
  await expect(page.getByRole("radio", { name: /Partnership/ })).toBeChecked();
});

test("without a delivery integration the form says it was NOT sent (no fake success)", async ({ page }) => {
  test.skip(!!process.env.RESEND_API_KEY || !!process.env.ENQUIRY_WEBHOOK_URL, "integration configured");
  await page.goto("/physicians#register");
  await page.waitForTimeout(3200);
  const form = page.locator("#register form");
  await form.getByLabel("Full name").fill("Dr Kofi Asante");
  await form.getByLabel("Work email").fill("kofi@example.com");
  await form.getByLabel("Specialty").fill("Cardiology");
  await form.getByLabel("City and country").fill("Accra, Ghana");
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Not sent — preview mode")).toBeVisible();
  await expect(page.getByText("Enquiry sent")).toHaveCount(0);
});

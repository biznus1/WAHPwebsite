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
  await expect(page.getByRole("radio", { name: /Strategic partner/ })).toBeChecked();
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
  await expect(page.getByText("Not sent (preview mode)")).toBeVisible();
  await expect(page.getByText("Enquiry sent")).toHaveCount(0);
});

test("call booking: choosing who you are switches the Calendly booking, loaded only on request", async ({ page }) => {
  await page.goto("/contact");
  const scheduler = page.locator("#schedule");
  const open = scheduler.getByRole("link", { name: /Open in Calendly/ });
  await expect(scheduler.getByRole("radio", { name: /Physician in Ghana/ })).toBeChecked();
  await expect(open).toHaveAttribute("href", "https://calendly.com/westahp-info/physician-call");

  await scheduler.getByText("Investor", { exact: true }).click();
  await expect(open).toHaveAttribute("href", "https://calendly.com/westahp-info/investor-call");

  await expect(scheduler.locator("iframe")).toHaveCount(0);
  await scheduler.getByRole("button", { name: "Show available times" }).click();
  await expect(scheduler.locator("iframe")).toHaveAttribute(
    "src",
    /^https:\/\/calendly\.com\/westahp-info\/investor-call\?.*embed_type=Inline/,
  );
});

test("?call= deep link pre-selects the booking", async ({ page }) => {
  await page.goto("/contact?call=diaspora#schedule");
  const scheduler = page.locator("#schedule");
  await expect(scheduler.getByRole("radio", { name: /Diaspora physician/ })).toBeChecked();
  await expect(scheduler.getByRole("link", { name: /Open in Calendly/ })).toHaveAttribute(
    "href",
    "https://calendly.com/westahp-info/diaspora-physcians",
  );
});

for (const [route, slug] of [
  ["/physicians", "physician-call"],
  ["/diaspora-physicians", "diaspora-physcians"],
  ["/investors", "investor-call"],
] as const) {
  test(`${route} books its own Calendly call from the hero`, async ({ page }) => {
    await page.goto(route);
    await page.locator("main").getByRole("link", { name: "Book a call" }).first().click();
    await expect(page).toHaveURL(/#book-a-call$/);
    const booking = page.locator("#book-a-call");
    await expect(booking.getByRole("link", { name: /Open in Calendly/ })).toHaveAttribute(
      "href",
      `https://calendly.com/westahp-info/${slug}`,
    );
    await booking.getByRole("button", { name: "Show available times" }).click();
    await expect(booking.locator("iframe")).toHaveAttribute("src", new RegExp(`/westahp-info/${slug}\\?`));
  });
}

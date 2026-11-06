import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/platform",
  "/the-problem",
  "/the-solution",
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

test("loading screen lifts after the page loads, never blocks clicks, and returns between pages", async ({ page }) => {
  await page.goto("/");
  const screen = page.locator("#wahp-preloader");
  await expect(screen).toHaveAttribute("aria-hidden", "true");
  await expect(screen).toHaveCSS("pointer-events", "none");
  await expect(screen).toHaveAttribute("data-state", "done", { timeout: 5000 });
  await expect(screen).toBeHidden();
  // Moving to another page inside the site shows it briefly again.
  await page.evaluate(() => {
    const el = document.getElementById("wahp-preloader")!;
    new MutationObserver(() => el.dataset.state === "route" && el.setAttribute("data-seen-route", "")).observe(el, {
      attributes: true,
      attributeFilter: ["data-state"],
    });
  });
  await page
    .getByRole("link", { name: /Get in touch|Schedule a call|Book a call/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/contact/);
  await expect(screen).toHaveAttribute("data-seen-route", "");
  await expect(screen).toBeHidden();
});

test("home links to the overview video on YouTube in a new tab", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: /Watch the overview/ });
  await expect(link).toHaveAttribute("href", "https://www.youtube.com/watch?v=CBGQphpdUyk");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
});

test("the problem page cites the migration study, shows the window photo and pins a call bar on phones", async ({
  page,
  isMobile,
}) => {
  await page.goto("/the-problem");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("a broken system alone");
  // Cited three times: the workforce, pay and migration sections.
  const study = page.getByRole("link", { name: /Wutor et al/ });
  await expect(study).toHaveCount(3);
  for (const link of await study.all()) {
    await expect(link).toHaveAttribute("href", "https://doi.org/10.1186/s12913-024-11977-y");
  }
  await expect(page.getByText("GH₵10K to 15K")).toBeVisible();
  // The pay figure switches between cedis and US dollars; a toggle pauses it.
  await expect(page.locator(".currency-flip .currency-second")).toHaveText("$790 to $1,180");
  const pause = page.getByRole("button", { name: /Pause the switch between cedis and US dollars/ });
  await pause.click();
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".currency-flip")).toHaveAttribute("data-paused", "");
  // The older build's figures, each linked to its source; its unsourced "72% of clinics" line stays out.
  for (const [name, href] of [
    [/Vujicic et al/, "https://doi.org/10.1186/1478-4491-2-3"],
    [/Mills et al/, "https://doi.org/10.1136/bmj.d7031"],
    [/Afrifa-Yamoah et al/, "https://doi.org/10.1007/s11739-024-03607-6"],
  ] as const) {
    await expect(page.getByRole("link", { name })).toHaveAttribute("href", href);
  }
  await expect(page.getByRole("heading", { name: "Three system gaps holding healthcare back" })).toBeVisible();
  await expect(page.getByText(/72% of clinics/)).toHaveCount(0);
  await expect(page.getByRole("img", { name: /watching a plane take off/ })).toBeAttached();
  const bar = page.locator("[data-sticky-call]");
  if (isMobile) {
    await expect(bar.getByRole("link", { name: /Schedule a call|Get in touch/ })).toBeVisible();
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(bar).toBeHidden();
  } else {
    await expect(bar).toBeHidden();
  }
});

test("investors shows the market figures and the who may invest section", async ({ page }) => {
  await page.goto("/investors");
  await expect(page.getByRole("heading", { name: /demand, talent and regional reach/ })).toBeAttached();
  for (const v of ["$1.21B", "42%", "36.7%", "$214M"]) {
    await expect(page.locator(`[data-countup="${v}"]`)).toHaveCount(1);
  }
  await expect(
    page.locator("#introduction").getByRole("heading", { name: /better healthcare delivery/ }),
  ).toBeAttached();
  await expect(page.locator("#introduction").getByText("Rule 506(c)")).toBeAttached();
});

test("The Problem leads to The Solution, which shows the example earnings as an example", async ({ page }) => {
  await page.goto("/the-problem");
  await page.getByRole("link", { name: "See the solution" }).click();
  await expect(page).toHaveURL(/\/the-solution$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("without building a clinic");
  await expect(page.getByText("Example only, not final")).toBeVisible();
  // Worked out from the inputs: (patients x fee - $100) x 6 sessions x 12 months.
  for (const [role, yearly] of [
    ["General practitioner", "$10,080"],
    ["Paediatrician", "$18,720"],
    ["Obstetrician and gynaecologist", "$15,840"],
    ["Cardiologist", "$27,360"],
  ]) {
    const card = page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: role }) });
    await expect(card.locator("[data-countup]")).toHaveAttribute("data-countup", yearly);
  }
  await expect(page.getByText(/before other physician expenses and taxes/)).toBeVisible();
  // House rules: no "coworking" wording, and no investment round on this page.
  await expect(page.getByText(/co-?working/i)).toHaveCount(0);
  await expect(page.getByText(/800,000/)).toHaveCount(0);
});

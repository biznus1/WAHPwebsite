import { chromium } from "@playwright/test";
const dir = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e)));
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto(`file://${dir}/platform.html`);
await p.getByRole("tab", { name: /Imaging services/ }).click();
console.log(
  "tab3 selected:",
  await p.getByRole("tab", { name: /Imaging services/ }).getAttribute("aria-selected"),
  "| panel:",
  (await p.getByRole("tabpanel").innerText()).slice(0, 60),
);
await p.screenshot({ path: `${dir}/../pv-platform.jpg`, type: "jpeg", quality: 60 });
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
m.on("pageerror", (e) => errs.push(String(e)));
await m.goto(`file://${dir}/home.html`);
await m.getByRole("button", { name: "Open menu" }).click();
console.log("menu visible:", await m.locator("#mobile-menu").isVisible());
await m.screenshot({ path: `${dir}/../pv-menu.jpg`, type: "jpeg", quality: 60 });
await m.keyboard.press("Escape");
console.log("menu hidden after Esc:", await m.locator("#mobile-menu").isHidden());
await p.goto(`file://${dir}/home.html`);
await p.screenshot({ path: `${dir}/../pv-home.jpg`, type: "jpeg", quality: 60, fullPage: true });
console.log("errors:", errs);
await b.close();

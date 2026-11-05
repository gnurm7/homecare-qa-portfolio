import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { createApp } from "../src/server.mjs";
let app, browser, base;
before(async () => {
  app = createApp();
  await new Promise((r) => app.listen(0, "127.0.0.1", r));
  base = "http://127.0.0.1:" + app.address().port;
  browser = await chromium.launch({ headless: true });
});
after(async () => {
  await browser?.close();
  if (app) await new Promise((r) => app.close(r));
});
async function withPage(fn) {
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto(base);
    await fn(page);
  } finally {
    await context.close();
  }
}
test("UI-01 booking price and cancellation", () =>
  withPage(async (p) => {
    await p.getByLabel("Your name").fill("Demo User");
    await p.getByLabel("Rooms").fill("2");
    await p.getByRole("button", { name: "Confirm booking" }).click();
    await p.getByRole("status").filter({ hasText: "Total: ₺1000" }).waitFor();
    await p.getByRole("button", { name: "Cancel booking" }).click();
    await p
      .getByRole("status")
      .filter({ hasText: "Booking cancelled" })
      .waitFor();
  }));
test("UI-02 browser blocks zero rooms", () =>
  withPage(async (p) => {
    await p.getByLabel("Your name").fill("Demo User");
    await p.getByLabel("Rooms").fill("0");
    await p.getByRole("button", { name: "Confirm booking" }).click();
    assert.equal(
      await p.getByLabel("Rooms").evaluate((e) => e.validity.rangeUnderflow),
      true,
    );
    assert.equal(await p.getByRole("status").innerText(), "");
  }));
test("UI-03 repair uses different price", () =>
  withPage(async (p) => {
    await p.getByLabel("Your name").fill("Demo User");
    await p.getByLabel("Service").selectOption("repair");
    await p.getByRole("button", { name: "Confirm booking" }).click();
    await p.getByRole("status").filter({ hasText: "Total: ₺750" }).waitFor();
  }));

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
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
let artifactId = 0;
async function withPage(fn, options = {}) {
  const context = await browser.newContext(options);
  try {
    await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    await page.goto(base);
    await fn(page);
  } catch (error) {
    await mkdir("test-results", { recursive: true });
    const id = ++artifactId;
    await context.pages()[0]?.screenshot({ path: `test-results/failure-${id}.png`, fullPage: true }).catch(() => {});
    await context.tracing.stop({ path: `test-results/trace-${id}.zip` });
    throw error;
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

async function fillBooking(p) {
  await p.getByLabel("Your name").fill("Demo User");
}
test("UI-04 server error is visible and booking can be retried", () =>
  withPage(async p => {
    await fillBooking(p);
    await p.route("**/api/bookings", route => route.fulfill({
      status: 500, contentType: "application/json", body: JSON.stringify({ error: "Service unavailable" }),
    }));
    await p.getByRole("button", { name: "Confirm booking" }).click();
    await p.getByRole("status").filter({ hasText: "Service unavailable" }).waitFor();
    assert.equal(await p.getByRole("button", { name: "Confirm booking" }).isEnabled(), true);
    assert.equal(await p.getByRole("button", { name: "Cancel booking" }).isVisible(), false);
    await p.unroute("**/api/bookings");
    await p.getByRole("button", { name: "Confirm booking" }).click();
    await p.getByRole("status").filter({ hasText: "Booking confirmed" }).waitFor();
  }));
test("UI-05 network failure restores submit control", () =>
  withPage(async p => {
    await fillBooking(p);
    await p.route("**/api/bookings", route => route.abort("failed"));
    await p.getByRole("button", { name: "Confirm booking" }).click();
    await p.waitForFunction(() => document.querySelector("#result").textContent.length > 0);
    assert.equal(await p.getByRole("button", { name: "Confirm booking" }).isEnabled(), true);
    assert.equal(await p.getByRole("button", { name: "Cancel booking" }).isVisible(), false);
  }));
test("UI-06 keyboard-only booking follows labelled form controls", () =>
  withPage(async p => {
    await p.keyboard.press("Tab");
    assert.equal(await p.getByLabel("Your name").evaluate(e => e === document.activeElement), true);
    await p.keyboard.type("Keyboard User");
    await p.keyboard.press("Tab");
    assert.equal(await p.getByLabel("Service").evaluate(e => e === document.activeElement), true);
    await p.keyboard.press("Tab");
    assert.equal(await p.getByLabel("Rooms").evaluate(e => e === document.activeElement), true);
    await p.keyboard.press("Tab");
    assert.equal(await p.getByRole("button", { name: "Confirm booking" }).evaluate(e => e === document.activeElement), true);
    await p.keyboard.press("Enter");
    await p.getByRole("status").filter({ hasText: "Booking confirmed" }).waitFor();
  }));
test("UI-07 mobile viewport supports booking without horizontal overflow", () =>
  withPage(async p => {
    assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await fillBooking(p);
    await p.getByRole("button", { name: "Confirm booking" }).click();
    await p.getByRole("status").filter({ hasText: "Booking confirmed" }).waitFor();
  }, { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true }));
test("UI-08 cancellation error keeps retry available", () =>
  withPage(async p => {
    await fillBooking(p);
    await p.getByRole("button", { name: "Confirm booking" }).click();
    const cancel = p.getByRole("button", { name: "Cancel booking" });
    await cancel.waitFor();
    await p.route("**/api/bookings/*", route => route.fulfill({
      status: 500, contentType: "application/json", body: JSON.stringify({ error: "Cancellation unavailable" }),
    }));
    await cancel.click();
    await p.getByRole("status").filter({ hasText: "Cancellation unavailable" }).waitFor();
    assert.equal(await cancel.isEnabled(), true);
    await p.unroute("**/api/bookings/*");
    await cancel.click();
    await p.getByRole("status").filter({ hasText: "Booking cancelled" }).waitFor();
  }));

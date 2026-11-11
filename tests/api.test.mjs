import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/server.mjs";
let app, base;
before(async () => {
  app = createApp();
  await new Promise((r) => app.listen(0, "127.0.0.1", r));
  base = "http://127.0.0.1:" + app.address().port;
});
after(async () => {
  await new Promise((r) => app.close(r));
});
const valid = { name: "Demo User", serviceId: "cleaning", rooms: 2 };
const post = (payload, url = base) =>
  fetch(url + "/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
test("API-01 service catalogue contains known price", async () => {
  const r = await fetch(base + "/api/services");
  assert.equal(r.status, 200);
  assert.equal((await r.json()).find((s) => s.id === "cleaning").price, 500);
});
test("API-02 booking lifecycle: create, retrieve, cancel, retrieve", async () => {
  let r = await post(valid);
  assert.equal(r.status, 201);
  const b = await r.json();
  assert.equal(b.total, 1000);
  assert.equal(b.status, "confirmed");
  r = await fetch(base + "/api/bookings/" + b.id);
  assert.equal(r.status, 200);
  assert.equal((await r.json()).id, b.id);
  r = await fetch(base + "/api/bookings/" + b.id, { method: "DELETE" });
  assert.equal(r.status, 200);
  assert.equal((await r.json()).status, "cancelled");
  r = await fetch(base + "/api/bookings/" + b.id);
  assert.equal((await r.json()).status, "cancelled");
});
for (const rooms of [1, 5])
  test("API boundary accepts " + rooms + " rooms", async () => {
    const r = await post({ ...valid, rooms });
    assert.equal(r.status, 201);
    assert.equal((await r.json()).total, 500 * rooms);
  });
for (const rooms of [0, 6, -1, 1.5, "2"])
  test("API rejects rooms=" + JSON.stringify(rooms), async () => {
    const r = await post({ ...valid, rooms });
    assert.equal(r.status, 400);
    assert.match((await r.json()).error, /Rooms/);
  });
test("API-10 rejects whitespace name", async () =>
  assert.equal((await post({ ...valid, name: "   " })).status, 400));
test("API-11 rejects unknown service", async () =>
  assert.equal((await post({ ...valid, serviceId: "unknown" })).status, 400));
test("API-12 ignores client supplied price", async () => {
  const r = await post({ ...valid, total: 1 });
  assert.equal(r.status, 201);
  assert.equal((await r.json()).total, 1000);
});
test("API-13 missing booking is 404", async () =>
  assert.equal((await fetch(base + "/api/bookings/missing")).status, 404));
test("API-14 malformed JSON is 400", async () =>
  assert.equal(
    (await fetch(base + "/api/bookings", { method: "POST", body: "{broken" }))
      .status,
    400,
  ));
test("API-15 duplicate cancellation is 409", async () => {
  const b = await (await post(valid)).json();
  await fetch(base + "/api/bookings/" + b.id, { method: "DELETE" });
  assert.equal(
    (await fetch(base + "/api/bookings/" + b.id, { method: "DELETE" })).status,
    409,
  );
});
test("BUG-001 reproduces seeded defect and verifies fixed behaviour", async () => {
  const buggy = createApp({ bugMode: true });
  await new Promise((r) => buggy.listen(0, "127.0.0.1", r));
  try {
    const r = await post(
      { ...valid, rooms: 0 },
      "http://127.0.0.1:" + buggy.address().port,
    );
    assert.equal(r.status, 201);
    assert.equal((await r.json()).total, 0);
    assert.equal((await post({ ...valid, rooms: 0 })).status, 400);
  } finally {
    await new Promise((r) => buggy.close(r));
  }
});
test("API rejects a one-character name", async () => {
  const response = await post({
    name: "A",
    serviceId: "cleaning",
    rooms: 2,
  });

  assert.equal(response.status, 400);
});

// R2: boundary value analysis after trimming, including non-ASCII input.
for (const name of ["Ab", "A".repeat(60), "  Demo User  ", "Gülsüm Nur"]) {
  test(`API-18 accepts valid name (${name.length} code units)`, async () => {
    const response = await post({ ...valid, name });
    assert.equal(response.status, 201);
    assert.equal((await response.json()).name, name.trim());
  });
}
for (const name of ["A".repeat(61), null, 42, [], {}]) {
  test(`API-19 rejects invalid name ${JSON.stringify(name)}`, async () => {
    const response = await post({ ...valid, name });
    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /Name/);
  });
}
for (const field of ["name", "serviceId", "rooms"]) {
  test(`API-20 requires ${field}`, async () => {
    const payload = { ...valid };
    delete payload[field];
    assert.equal((await post(payload)).status, 400);
  });
}
for (const payload of [null, [], "booking", 42]) {
  test(`API-21 rejects non-object payload ${JSON.stringify(payload)}`, async () => {
    const response = await post(payload);
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, "Expected an object");
  });
}
test("API-22 oversized request returns 413 and server stays healthy", async () => {
  const response = await post({ ...valid, name: "A".repeat(17000) });
  assert.equal(response.status, 413);
  assert.equal((await response.json()).error, "Payload too large");
  assert.equal((await fetch(base + "/api/services")).status, 200);
});
test("API-23 concurrent bookings retain unique identity and independent state", async () => {
  const responses = await Promise.all(Array.from({ length: 10 }, () => post(valid)));
  assert.ok(responses.every(r => r.status === 201));
  const bookings = await Promise.all(responses.map(r => r.json()));
  assert.equal(new Set(bookings.map(b => b.id)).size, 10);
  const cancelled = await fetch(base + "/api/bookings/" + bookings[0].id, { method: "DELETE" });
  assert.equal(cancelled.status, 200);
  assert.equal((await cancelled.json()).status, "cancelled");
  for (const booking of bookings.slice(1)) {
    const response = await fetch(base + "/api/bookings/" + booking.id);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, "confirmed");
  }
});
test("API-24 server owns id, status and repair price", async () => {
  const response = await post({ ...valid, serviceId: "repair", id: "injected", status: "cancelled", total: -1 });
  assert.equal(response.status, 201);
  assert.match(response.headers.get("content-type"), /application\/json/);
  const booking = await response.json();
  assert.match(booking.id, /^[0-9a-f-]{36}$/);
  assert.notEqual(booking.id, "injected");
  assert.equal(booking.status, "confirmed");
  assert.equal(booking.total, 1500);
});
test("API-25 cancelling unknown booking returns 404", async () => {
  assert.equal((await fetch(base + "/api/bookings/missing", { method: "DELETE" })).status, 404);
});

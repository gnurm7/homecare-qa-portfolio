# Requirements / Kabul kriterleri
- <a id="r1"></a>R1: GET /api/services lists cleaning (500 TRY per room) and repair (750 TRY per room).
- <a id="r2"></a>R2: A booking requires a name of 2–60 characters after trimming, a supported service and an integer room count 1–5 inclusive. Invalid input returns 400.
- <a id="r3"></a>R3: A valid booking returns 201, a unique id and confirmed status. Server calculates total; client-supplied totals are ignored.
- <a id="r4"></a>R4: GET /api/bookings/:id retrieves the booking; unknown id returns 404.
- <a id="r5"></a>R5: DELETE /api/bookings/:id changes status to cancelled; repeating it returns 409. Cancellation persists until server restart.
- <a id="r6"></a>R6: The browser displays the calculated total and allows cancellation. Browser form constraints reject empty names and out-of-range room counts; API validation remains mandatory.

## Scope and risks
Local training fixture; no login, payments, scheduling, database or production deployment. Restart loses data. It is not a production service. Main risks: invalid bookings, incorrect totals and missing cancellation state. Explore network errors, double-clicks, Unicode names and keyboard navigation manually. No performance, security, mobile-device or accessibility certification is claimed.

# HomeCare QA Portfolio

A small, reproducible quality-assurance project: manual test design, backend API tests, a documented seeded defect, a Postman collection and Playwright browser checks.

**Türkçe başlangıç:** [İlk oturum rehberi](docs/first-session-tr.md).

## What this demonstrates
- Requirements → risk-based scenarios → automated checks → evidence.
- Boundary-value and equivalence-partition testing.
- Booking lifecycle integration checks, server-side pricing and cancellation.
- A reproducible training defect with root-cause explanation and fixed-mode verification.
- Optional browser E2E coverage and a GitHub Actions workflow.

This is a local educational fixture, not a test of Justlife. AI-assisted starter prepared for Gülsüm Nur Maslak. Execution performed in the preparation environment is documented separately; the owner should rerun, review and extend it before presenting it as personal work. No production defect-reduction metrics are claimed.

## Run the demo
Requires Node.js 22+ (validated with Node 24). The app and API tests have no external dependencies.
```bash
npm start
```
Open http://127.0.0.1:3000. Data is in memory and resets on restart. Bind is local only. Use fictional names.

## API tests — no install required
```bash
npm test
```
Tests start their own server on an available port and close it afterward. The seeded-defect check intentionally verifies the bad response in bug mode and the correct rejection in default mode.

## Browser tests
```bash
npm ci
npx playwright install chromium
npm run test:ui
```
Linux may need `npx playwright install --with-deps chromium`. Browser installation needs internet. Playwright Library supplies browser automation; Node's built-in test runner supplies test execution.

## Postman
Start the default server, import `postman/HomeCare.postman_collection.json` and run the requests in order. `baseUrl` defaults to localhost; the create request stores a new `bookingId` for later requests. Collection assertions are supplied; check the evidence summary for whether the Postman runner was executed.

## Explore the defect
Read [BUG-001](docs/BUG-001.md). Default mode is fixed. Bug mode is deliberately incorrect and exists only for training. On Bash: `BUG_MODE=1 npm start`. On PowerShell: `$env:BUG_MODE="1"; npm start`; afterward remove it with `Remove-Item Env:BUG_MODE`.

## Project map
| Path | Purpose |
|---|---|
| `src/` | Local app and in-memory API |
| `docs/requirements.md` | Acceptance criteria and scope |
| `docs/test-cases.md` | 20 designed scenarios |
| `docs/BUG-001.md` | Seeded bug report |
| `docs/bug-report-template.md` | Reusable reporting template |
| `tests/` | API and browser checks |
| `postman/` | Importable API collection |
| `evidence/` | Actual preparation-time test results and limitations |
| `.github/workflows/qa.yml` | API + browser checks on push/PR |

## Next personal contributions
1. Add name-length boundaries 1 / 2 / 60 / 61 and missing-field cases.
2. Execute a 20-minute exploratory session; record only observed results.
3. Add browser tests for server errors and keyboard navigation.
4. Explain why some scenarios should stay manual.

## References
- https://playwright.dev/docs/next/library
- https://nodejs.org/api/test.html

No account, payment, scheduling, mobile-device validation, persistence or production readiness is included. Browser and manual execution status are explicit in the evidence summary.

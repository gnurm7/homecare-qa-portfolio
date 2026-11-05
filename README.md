# HomeCare QA Portfolio

A local home-service booking demo demonstrating requirements-based manual testing, API validation, booking lifecycle checks, and browser automation. Tools: Node.js, HTML/JavaScript, Node's test runner, Playwright, Postman/Newman, and GitHub Actions.

This educational fixture uses synthetic data and in-memory storage. Accounts, payments, scheduling, persistence, real devices, and full accessibility/security testing are outside scope.

## Setup and run

Requires Node.js 22+ and npm. Run from the repository root:

```bash
npm ci
npm start
```

Open http://127.0.0.1:3000. Stop with Ctrl+C; restarting clears bookings. On PowerShell, use `npm.cmd` / `npx.cmd` if execution policy blocks `npm` / `npx`.

## API and browser tests

```bash
npm test
npx playwright install chromium
npm run test:ui
```

API tests require no dependency installation. Both suites start and stop their own servers on available ports. Playwright runs Chromium headlessly using Node's test runner. On Linux, use `npx playwright install --with-deps chromium`.

## Postman

Start `npm start` in another terminal with `BUG_MODE` unset. Import the [collection](postman/HomeCare.postman_collection.json) into Postman and run all six requests in numeric order. `baseUrl` defaults to `http://127.0.0.1:3000`; the create request sets `bookingId`. Alternatively:

```bash
npx --yes newman@6.2.3 run postman/HomeCare.postman_collection.json
```

The collection contains 10 assertions. Use the default (fixed) server.

## Results and evidence

| Execution | Result | Evidence |
|---|---|---|
| Owner manual session, 2026-10-31, Windows/Chrome | 6 passed | [Manual observations](docs/my-manual-results.md) |
| Earlier owner-reported automation, date/environment not recorded | 17 API and 3 Playwright passed; full original logs unavailable | [Evidence limitations](evidence/summary.md) |
| Preparation, 2026-10-31, Linux/Node 24.22.1 | 16 API passed; Newman 10 assertions passed; browser download failed | [Historical summary](evidence/preparation-summary-2026-10-31.md) |
| Verification, 2026-11-06, Windows/Node 22.13.0 | 17 API and 3 Playwright passed | [API log](evidence/2026-11-06-api.txt), [browser log](evidence/2026-11-06-ui.txt) |

See the [execution summary](evidence/summary.md) for limitations and CI status. No new manual session or screenshots are claimed.

## Project map

| Path | Purpose |
|---|---|
| [src/](src/) | Local UI and in-memory API |
| [tests/](tests/) | API and Playwright tests |
| [docs/requirements.md](docs/requirements.md) | Six requirements and scope |
| [docs/test-cases.md](docs/test-cases.md) | Scenarios and requirement traceability |
| [docs/BUG-001.md](docs/BUG-001.md) | Deliberately seeded training defect |
| [docs/automation-decisions.md](docs/automation-decisions.md) | Automation rationale |
| [postman/](postman/) | Importable collection |
| [evidence/](evidence/) | Historical and current execution records |
| [.github/workflows/qa.yml](.github/workflows/qa.yml) | API and browser CI on push/pull request |

[GitHub Actions runs](https://github.com/gnurm7/homecare-qa-portfolio/actions/workflows/qa.yml) · [Türkçe çalışma rehberi](docs/first-session-tr.md)

## Training defect

[BUG-001](docs/BUG-001.md) intentionally permits zero rooms in bug mode. Default mode rejects them. Bash: `BUG_MODE=1 npm start`. PowerShell: `$env:BUG_MODE="1"; npm.cmd start`; after stopping, run `Remove-Item Env:BUG_MODE`. A passing reproduction test confirms the intentional defect and correct default behavior.

## Contributions and remaining work

The starter and preparation evidence were AI-assisted. Gülsüm Nur Maslak performed the six recorded manual checks and added the one-character name rejection test, bringing the API suite to 17 tests. This review used AI assistance for documentation, formatting, and automated reruns; it does not represent a new owner-run manual session.

Remaining work: name lengths 2/60/61 and missing-field cases; a dated exploratory session including TC-20; browser server-error and keyboard-navigation checks. Automation decisions and completed manual checks are already documented.

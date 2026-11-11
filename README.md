# HomeCare QA Portfolio

**Gülsüm Nur Maslak · QA portfolio**

[![QA checks](https://github.com/gnurm7/homecare-qa-portfolio/actions/workflows/qa.yml/badge.svg)](https://github.com/gnurm7/homecare-qa-portfolio/actions/workflows/qa.yml)

A reproducible service-booking project demonstrating API and browser automation, manual test design, defect reporting, SQL data investigation and CI. Review the executable examples and dated evidence below.

## For hiring teams: start here

| Capability | What to inspect | What it demonstrates |
|---|---|---|
| API test automation · JavaScript/Node.js | [37 API tests](tests/api.test.mjs) | Boundary analysis, invalid types, HTTP contracts, pricing integrity, lifecycle and concurrent state isolation |
| Browser automation · Playwright | [8 browser tests](tests/ui.test.mjs) | Booking/cancellation, error injection and retry, keyboard interaction, mobile viewport; failure screenshots and traces |
| Manual testing and test design | [Cases and traceability](docs/test-cases.md), [owner's manual record](docs/my-manual-results.md) | Requirement-based scenarios, equivalence partitions and six recorded owner-run manual checks |
| Defect analysis | [BUG-001](docs/BUG-001.md) | Reproducible steps, expected/actual result and regression verification of an intentionally seeded defect |
| SQL and data quality · SQLite | [Queries and expected findings](docs/sql-checks.md), [executable checker](scripts/check_sql.py) | JOIN, LEFT JOIN, GROUP BY/HAVING; five detection checks plus five clean-data controls |
| Risk analysis and QA judgment | [Test strategy](docs/test-strategy.md), [automation decisions](docs/automation-decisions.md) | Risk priorities, state transitions, test-layer tradeoffs and release criteria |
| CI and debugging · GitHub Actions | [Workflow](.github/workflows/qa.yml) | Node 22/24 matrix, JUnit reports and retained failure artifacts |
| Exploratory testing preparation | [30-minute charter](docs/exploratory-charter.md) | Timeboxed investigation and evidence template; session not yet executed |
| API tooling · Postman | [Collection](postman/HomeCare.postman_collection.json) | Six ordered requests, chained booking id and ten assertions |

The app uses synthetic data and in-memory storage. SQL is a separate synthetic extract exercise. No production, database integration, load-testing, security audit, real-device or accessibility certification is claimed.

## Run locally

Requires Node.js 22+ and npm. Python 3.12+ is needed only for SQL checks.

```bash
npm ci
npm start
```

Open http://127.0.0.1:3000. Stop with Ctrl+C; restarting clears bookings. On PowerShell use `npm.cmd` / `npx.cmd` if execution policy blocks the command shims.

## Run the checks

```bash
npm test                              # API integration tests
npx playwright install chromium       # browser install, once
npm run test:ui                       # browser journeys and resilience
npm run test:all                      # API + browser
npm run test:coverage                 # API source coverage (not requirements coverage)
python scripts/check_sql.py           # independent SQL exercise; no pip install
```

API and browser suites start and stop their own servers on available ports. Browser tests use the Playwright library with Node's test runner. On Linux install Chromium with `npx playwright install --with-deps chromium`. SQL checks use a fresh in-memory SQLite database.

On a browser failure, inspect `test-results/failure-*.png` and open a trace:

```bash
npx playwright show-trace test-results/trace-1.zip
```

The workflow runs on push, pull request and manual dispatch. Download `qa-results-node-22` or `qa-results-node-24` from a run for JUnit XML and any failure artifacts (14-day retention). New workflow configuration has been prepared locally; its remote execution is not yet verified.

## Results and evidence

| Execution | Result | Evidence |
|---|---|---|
| Local automated verification, 2026-11-11, Windows / Node 22.13.0 | 37 API + 8 Chromium tests passed; 10 SQL checks passed | [Current record](evidence/2026-11-11-summary.md) |
| Owner manual session, 2026-10-31, Windows/Chrome | 6 passed | [Manual observations](docs/my-manual-results.md) |
| Historical verification, 2026-11-06, Windows / Node 22.13.0 | 17 API + 3 browser tests passed | [API log](evidence/2026-11-06-api.txt), [browser log](evidence/2026-11-06-ui.txt) |
| Historical preparation, 2026-10-31, Linux / Node 24.22.1 | 16 API passed; Newman 10 assertions passed; browser download failed | [Preparation summary](evidence/preparation-summary-2026-10-31.md) |

Dates use Europe/Istanbul. The earlier [Ubuntu / Node 24 CI run](https://github.com/gnurm7/homecare-qa-portfolio/actions/runs/42115734521) belongs to commit `29ffc8a`, not this expanded suite. Earlier owner-reported automation lacked complete original logs; it is not counted as new execution evidence. Manual exploration, Postman and the new Ubuntu matrix were not rerun during the current local verification.

## Postman and training defect

Start the default server with `BUG_MODE` unset. Import the [collection](postman/HomeCare.postman_collection.json) and run its six requests in numeric order. `baseUrl` defaults to `http://127.0.0.1:3000`; create sets `bookingId`. Alternatively:

```bash
npx --yes newman@6.2.3 run postman/HomeCare.postman_collection.json
```

[BUG-001](docs/BUG-001.md) deliberately accepts zero rooms only in training bug mode. The automated reproduction checks both the erroneous 201 and the correct default 400. Bash: `BUG_MODE=1 npm start`. PowerShell: `$env:BUG_MODE="1"; npm.cmd start`; after stopping, run `Remove-Item Env:BUG_MODE`.

## Ownership and next practice

Gülsüm Nur Maslak performed the six recorded manual checks and added the original one-character-name API rejection test. The starter and subsequent expansion, including new automation, SQL exercises and documentation, were AI-assisted; the current automated rerun was agent-executed. Repository content is a reviewable learning artifact, not evidence that every addition was independently authored or every technique mastered by the owner.

Next owner-run steps: execute and record the exploratory charter, investigate any findings, add a regression test with your own explanation, and review the new GitHub Actions run after publishing. [Türkçe mülakat gösterim rehberi](docs/interview-walkthrough-tr.md) · [İlk çalışma rehberi](docs/first-session-tr.md) · [Requirements](docs/requirements.md).

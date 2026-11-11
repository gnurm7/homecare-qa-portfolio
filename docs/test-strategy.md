# Risk-based test strategy

## Product and scope

HomeCare is a local booking fixture with synthetic data. A user selects a service and room count, creates a booking and cancels it. The API owns validation, price calculation and booking state. Storage resets on restart. Authentication, payment, production deployment and database persistence are not implemented.

## Priorities and evidence

Priority reflects impact and exposure in this fixture, not measured production incident frequency.

| Risk | Priority / reason | Technique | Executable evidence |
|---|---|---|---|
| Incorrect price or client-controlled state | High: integrity of every booking | Decision table, negative tests | API-12, API-24; cleaning/repair paths |
| Invalid bookings accepted | High: browser validation can be bypassed | Equivalence partitions; name lengths 1/2/60/61; rooms 0/1/5/6 | API boundaries, API-18 through API-21 |
| Wrong lifecycle or cancellation affects another user | High: corrupt state | State transitions; concurrent identity/isolation | API-02, API-15, API-23, API-25 |
| Error leaves user unable to retry | Medium: interrupted booking/cancellation | Controlled HTTP 500 and transport failure injection | UI-04, UI-05, UI-08 |
| Form unusable on keyboard/small screen | Medium: booking cannot be completed | Keyboard interaction; 375px viewport | UI-06, UI-07 |
| Corrupt data in an analytical extract | Medium: misleading reporting | SQL joins, aggregation and negative controls | Separate synthetic SQL exercise |

## Test layers and tradeoffs

- API integration tests exercise real HTTP requests and isolated in-memory servers; they bypass HTML validation and check state, types, status codes and server-calculated totals.
- Browser tests exercise the real local server for core journeys. Playwright routes inject errors only in resilience scenarios; these prove the UI reaction to a controlled failure, not production outage recovery.
- SQL checks run against a separate SQLite extract. Known corrupt rows establish detection; clean rows guard against false positives. This is not an application database integration test.
- Manual exploration addresses wording, discoverability, confusing state and assistive technology. The charter is a plan until an actual session is recorded.

Each browser test gets a fresh context. Tests use roles and labels, wait for observable outcomes and have no fixed sleeps. A failed browser test retains a screenshot and Playwright trace; rerunning until green is not a substitute for diagnosing failure. The ten parallel creates check identity and isolation only; they are not a load test or latency benchmark.

## State model

| Starting state | Action | Expected result |
|---|---|---|
| No booking | Valid create | 201; unique id; confirmed |
| No booking | Invalid create | 400; readable validation error |
| Confirmed | Read | 200; same id and details |
| Confirmed | Cancel | 200; cancelled |
| Cancelled | Read | 200; cancelled |
| Cancelled | Cancel again | 409; no new transition |
| Unknown id | Read/cancel | 404 |

## Exit criteria and release judgment

For a demo change: API, browser and SQL checks pass; requirement changes have test mappings; failures are investigated; evidence identifies environment and date. Review changed behaviour manually where automation cannot answer the product question. Any unresolved defect in pricing, validation or cancellation blocks a demo release. A passing suite does not approve production use.

Current local execution and unexecuted checks: [2026-11-11 evidence](../evidence/2026-11-11-summary.md). Node 22/24 Ubuntu CI is configured; this change's remote execution must be verified in Actions after publishing.

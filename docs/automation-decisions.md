# Automation decisions

| Scenario | Decision | Rationale |
|---|---|---|
| Room boundaries, pricing, invalid JSON | API automation | Fast, deterministic and bypasses browser validation |
| Create → retrieve → cancel | API integration | Verifies state across multiple endpoints |
| Form → confirmation → cancellation | Browser automation | Confirms UI wiring and visible outcomes |
| Exploratory usability and confusing messages | Manual | Benefits from observation and product judgment |
| Real device, screen reader, payments and scheduling | Out of scope | The fixture and environment do not support these claims |

A designed test is not an executed test. A passing automated check only supports its own assertions. No percentage of production coverage or defect-escape improvement is claimed.

## Expanded suite

HTTP 500 and network-abort scenarios use Playwright route injection for repeatability. Successful retries return to the real server. Keyboard and mobile-viewport checks are basic interaction smoke tests. Each test has an isolated browser context; API tests use an ephemeral port. Failure screenshots and traces go to ignored `test-results/`; CI retains JUnit XML and failure artifacts for 14 days. Open a downloaded trace with `npx playwright show-trace test-results/trace-1.zip`.

The runner remains Node's built-in test runner plus the Playwright library, not Playwright Test. SQL uses Python's standard-library SQLite; [risk strategy](test-strategy.md) explains scope and tradeoffs.

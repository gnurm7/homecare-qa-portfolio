# Automation decisions

| Scenario | Decision | Rationale |
|---|---|---|
| Room boundaries, pricing, invalid JSON | API automation | Fast, deterministic and bypasses browser validation |
| Create → retrieve → cancel | API integration | Verifies state across multiple endpoints |
| Form → confirmation → cancellation | Browser automation | Confirms UI wiring and visible outcomes |
| Exploratory usability and confusing messages | Manual | Benefits from observation and product judgment |
| Real device, screen reader, payments and scheduling | Out of scope | The fixture and environment do not support these claims |

A designed test is not an executed test. A passing automated check only supports its own assertions. No percentage of production coverage or defect-escape improvement is claimed.

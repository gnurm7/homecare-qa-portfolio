# Test cases

Precondition: default server (BUG_MODE unset), clean start, synthetic data only. API tests start isolated servers automatically. Execution evidence is linked below; designed scenarios do not by themselves establish a pass.

| ID | Requirement | Layer | Action / data | Expected |
|---|---|---|---|---|
| TC-01 | [R1](requirements.md#r1) | API | GET services | 200; both services and prices |
| TC-02 | [R2](requirements.md#r2)/[R3](requirements.md#r3) | UI/API | Name Demo User, cleaning, rooms 2 | 201; confirmed; total 1000 |
| TC-03 | [R2](requirements.md#r2) | API | Rooms 1 | 201; total 500 |
| TC-04 | [R2](requirements.md#r2) | API | Rooms 5 | 201; total 2500 |
| TC-05 | [R2](requirements.md#r2) | API | Rooms 0 | 400; no booking created |
| TC-06 | [R2](requirements.md#r2) | API | Rooms 6 | 400 |
| TC-07 | [R2](requirements.md#r2) | API | Rooms -1 | 400 |
| TC-08 | [R2](requirements.md#r2) | API | Rooms 1.5 | 400 |
| TC-09 | [R2](requirements.md#r2) | API | Rooms string "2" | 400 |
| TC-10 | [R2](requirements.md#r2) | API | Name whitespace only | 400 |
| TC-11 | [R2](requirements.md#r2) | API | Unknown service | 400 |
| TC-12 | [R3](requirements.md#r3) | API | Send total 1 with cleaning, rooms 2 | 201; total 1000 |
| TC-13 | [R4](requirements.md#r4) | API | Retrieve existing id | 200; same id |
| TC-14 | [R4](requirements.md#r4) | API | Retrieve missing id | 404 |
| TC-15 | [R5](requirements.md#r5) | UI/API | Cancel confirmed booking | 200; cancelled |
| TC-16 | [R5](requirements.md#r5) | API | Cancel already cancelled booking | 409 |
| TC-17 | [R2](requirements.md#r2) | API | Malformed JSON | 400; server remains available |
| TC-18 | [R6](requirements.md#r6) | UI | Submit rooms 0 | Browser blocks submission |
| TC-19 | [R3](requirements.md#r3)/[R6](requirements.md#r6) | UI | Repair, rooms 1 | Total 750 displayed |
| TC-20 | [R6](requirements.md#r6) | Manual | Disconnect network before submitting | Readable error; submit enabled again; verify manually |
| TC-21 | [R2](requirements.md#r2) | API | One-character name A | 400 |

Equivalence partitions: rooms valid integers / invalid integers / invalid types. Boundary values: 0, 1, 5, 6. Automated execution status is recorded in evidence; TC-20 remains manual and unexecuted.

## Execution mapping

- [API suite](../tests/api.test.mjs): TC-01 through TC-17 and TC-21; BUG-001 separately checks both modes. A lifecycle test covers several cases, so 17 tests do not mean 17 designed scenarios. Assertions cover specific properties, not every requirement in full.
- [Browser suite](../tests/ui.test.mjs): UI-01 covers TC-02/TC-15 visible outcomes; UI-02 covers TC-18; UI-03 covers TC-19. API status codes are checked at the API layer.
- [Owner manual record](my-manual-results.md): M-01 maps to TC-02, M-02 to TC-15, M-03 to TC-18, M-04/M-05 to UI room limits corresponding to TC-06/TC-04. M-06 checks an empty name under R2/R6.
- TC-20 remains unexecuted. Current results and historical limitations: [execution summary](../evidence/summary.md).

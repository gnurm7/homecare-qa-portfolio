# Exploratory testing charter — planned, not executed

**Mission:** Explore whether a first-time user can recover from interruptions and understand booking state without assistance.

**Timebox:** 30 minutes. **Data:** synthetic names only. **Environment:** record OS, browser/version, viewport, commit, BUG_MODE and date before starting.

| Minutes | Investigation | Questions / observations to capture |
|---|---|---|
| 0–5 | First use, labels and pricing | Is per-room pricing clear before confirmation? Can the user distinguish confirmed and cancelled? |
| 5–15 | Offline/slow network; repeated submit/cancel | Is feedback understandable? Are controls restored? Does displayed state still match a GET by id? |
| 15–20 | Unicode, whitespace and boundary names | Does trimmed-name behaviour agree between browser and API? What should “character” mean for emoji? |
| 20–25 | Keyboard, zoom 200%, narrow viewport | Is focus visible? Are errors discoverable? Are controls reachable without horizontal scrolling? |
| 25–30 | Booking A, invalid attempt B, cancel/retry | Is it clear which booking can be cancelled? Does a failed new attempt hide access to an earlier booking? |

## Session record template

- Tester, date/time/timezone, duration:
- Commit, OS/browser, viewport, BUG_MODE:
- Actions and exact data:
- Expected vs observed behaviour:
- Screenshot/network evidence (synthetic data only):
- Bug IDs, severity and user impact:
- Questions / follow-up checks:
- Session recommendation and remaining risk:

The existing six owner-run checks are in [manual results](my-manual-results.md). Automated HTTP/network error cases now exist in UI-04/05/08; this does not mean the exploratory charter or TC-20 manual session was performed. Keyboard automation and mobile emulation do not establish screen-reader support or real-device compatibility.

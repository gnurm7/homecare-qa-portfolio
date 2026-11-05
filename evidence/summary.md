# Execution summary

## Current verification — 2026-11-06

AI-assisted rerun on Windows, Node.js v22.13.0, npm 11.2.0, Playwright 1.62.1, headless Chromium. Dates use Europe/Istanbul. Tests create isolated loopback servers with synthetic data.

| Check | Result | Evidence |
|---|---|---|
| API / integration | 17 passed, 0 failed | [API log](2026-11-06-api.txt) |
| Playwright | 3 passed, 0 failed | [Browser log](2026-11-06-ui.txt) |
| BUG-001 | Seeded erroneous 201 reproduced; default 400 verified | Named API test in API log |
| Manual | Not rerun in this review | Historical owner results below |
| Postman/Newman | Not rerun in this review | Historical 10-assertion log below |
| GitHub Actions | Passed on Ubuntu / Node 24 for commit 68d7d33 (2026-11-06) | [Successful run](https://github.com/gnurm7/homecare-qa-portfolio/actions/runs/42115423071) |

Commands: `npm.cmd test`, `npm.cmd run test:ui`. The initial sandbox attempt failed with `EPERM: operation not permitted, lstat 'C:\Users\Asus'`; the successful runs used the permitted Windows environment. PowerShell blocks npm.ps1, so npm.cmd was used. No screenshots were captured.

## Historical evidence

- [Preparation summary, 2026-10-31](preparation-summary-2026-10-31.md): Linux, Node v24.22.1; [16 API passes](api-test-run.txt), [Newman 6.2.3: six requests, 10 assertions, zero failures](postman-newman-run.txt). Browser download failed at that time. This snapshot is preserved unchanged and its next-step guidance is historical.
- [Owner manual results, 2026-10-31](../docs/my-manual-results.md): Gülsüm Nur Maslak, Windows/Chrome, six checks passed. No browser version or screenshots were recorded.
- [Owner API log](my-api-test-run.txt) contains 16 passes and no execution date/environment. It predates evidence of the additional test; it does not substantiate 17 passes.
- The owner reports an earlier successful 17-test API run and three-test Playwright run. Their exact dates, environment versions and full logs are unavailable. The current rerun independently confirms these counts. Earlier Postman success is supported by the preparation Newman log; no separate owner Postman export is available.

## Scope and review

The one-character name test is the owner's additional API contribution. Test formatting changes preserve assertions and behavior. Twenty original scenarios plus the added name scenario are documented in [test cases](../docs/test-cases.md). Scenario counts, automated test counts and Postman assertion counts are different measures.

TC-20 (network interruption), broader exploratory testing, remaining name boundaries, real devices and accessibility remain unverified. Passing checks cover only their assertions. BUG-001 remains an intentional training defect; this fixture is not production software.

The project was moved from a single nested Git directory to the workspace root, including its Git history and all original files. No competing project copy was found. The now-empty original directory is held open by a process and could not be removed; it contains no project files and is not tracked.

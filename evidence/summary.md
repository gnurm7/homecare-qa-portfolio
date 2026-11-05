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


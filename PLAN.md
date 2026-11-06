# 10X Shop delivery plan

First plan created on 2026-10-26 in commit `64d85cc`. This remediation plan began on 2026-11-05 at `967e75c32df74322975a99d034a0c95480516e8e`. [Earlier CORE plan](reports/core/PLAN.md) · [Earlier verification report](reports/core/REPORT.md)

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | CORE metadata, stock, shared pricing, legacy cart, empty checkout | Implemented on 2026-11-05. Pricing, migration, guest purchase and empty Checkout notice verified locally |
| 2 | FULL catalog navigation and visual system | Implemented on 2026-11-05. Marketplace presentation refined on 2026-11-06 and checked against live data, navigation and the required grid |
| 3 | FULL reviews and related products | Implemented on 2026-11-05. Local review validation and reload, keyboard tabs and related products checked in Chrome |
| 4 | FULL reducer, promo and shipping | Implemented on 2026-11-05. Reducer, shipping thresholds and browser promo reload checked |
| 5 | FULL orders, profile and theme | Implemented on 2026-11-05. Order storage, status boundaries, order reload and Reorder checked. Chrome confirmed profile, theme and scoped clear |
| 6 | FULL technical criteria and profiling | Implemented and profiled on 2026-11-05. Lazy fallback and Reload checked with an isolated fixture |
| 7 | Verification, evidence and delivery | Chrome verified the four final changes. The owner confirmed the Firefox purchase on port 4205. Final candidate Firefox and Edge/Safari checks, clean deployed Lighthouse and owner submission remain open. [Grading status](reports/final/GRADING-STATUS.md) · [Compatibility](COMPATIBILITY.md) |

The owner still needs to publish the candidate, verify direct routes and static files on the deployed URL, run clean Lighthouse on that build, confirm signed-out access, record the [demo](reports/full/DEMO.md) and submit the exam. Historical process gaps remain in the report.

The Lighthouse follow-up preserves the two production baseline sets. The final local production preview at port 4208 serves the meta description, robots rules and favicon. The live site still served the earlier entry during the Chrome check. [Lighthouse evidence](reports/lighthouse/2026-11-06/README.md) · [Firefox evidence](docs/compat/firefox/2026-11-06/README.md)

## Three-week work breakdown

Reconstructed on 2026-11-06 for delivery review. The dates are planning windows and the hours are estimates. No tracked hours are available. The first committed plan was `64d85cc` on October 26 at 15:57 Tbilisi, before the first feature commit and after the October 23 deadline.

| Week | Task and scope | Estimated hours | Acceptance |
| --- | --- | ---: | --- |
| 1 · Oct 19–25 | Define CORE/FULL scope, repository and Vite foundation | 4 | Dated scope, strict TypeScript, required npm scripts and a buildable scaffold |
| 2 · Oct 26–Nov 1 | CORE layout, routes and local login | 4 | Protected Checkout returns a guest after valid login. Invalid fields and routes show the specified messages |
| 2 · Oct 26–Nov 1 | CORE Catalog and Product | 6 | Real data, responsive grid, discounted prices, stock badges and a bounded stepper |
| 2 · Oct 26–Nov 1 | CORE Cart, Checkout and confirmation | 6 | Shared quantities and totals, stock limits, four validation messages, one order and an empty cart |
| 2 · Oct 26–Nov 1 | CORE quality and deployment preparation | 4 | Error Boundary recovery, 375 px layout, build checks and SPA routing |
| 3 · Nov 2–6 | FULL catalog discovery and reviews | 5 | Search, filters, sort and numbered pages survive reload and history. Reviews validate and persist |
| 3 · Nov 2–6 | FULL cart, saved orders and reorder | 6 | Promo and shipping use shared cents. Saved orders keep their snapshots. Reorder handles full, partial, zero and cancelled requests |
| 3 · Nov 2–6 | FULL profile, theme and typed infrastructure | 4 | Validated profile, persistent theme, scoped clearing and typed requests with retry and abort |
| 3 · Nov 2–6 | CORE/FULL verification and owner delivery | 5 | Browser matrix, exact deployed resources, Lighthouse reports, demo and submission |
| | **Total estimated effort** | **44** | Estimate only |

[Retrospective week 1](docs/progress/week-01.md) · [Week 2](docs/progress/week-02.md) · [Week 3](docs/progress/week-03.md) · [Rubric](reports/final/GRADING-STATUS.md)

## Risks

- A delayed legacy lookup can arrive after cart edits. Merge only still-present unresolved entries and retain their current quantities.
- Invalid or stale catalog inputs can show the wrong results. Validate the URL and cancel superseded requests.
- Browser storage can reject writes. Confirm an order only after saving it, and tell the user if the cart could not be cleared.
- Browser access and historical evidence constrain assessment claims. Record the specific tool blocker or unmet criterion.

## Definition of Done

Complete the focused behavior checks and required browser matrix, pass typecheck, lint, build and diff checks, and verify the published routes, purchase and Lighthouse evidence. Link the demo and signed-out repository evidence when available. Report historical gaps separately.

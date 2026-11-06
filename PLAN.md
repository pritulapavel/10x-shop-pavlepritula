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
| 7 | Verification, evidence and delivery | Chrome local checks passed. The owner reported partial Firefox 159.0.1 coverage. Order count, totals and cart clearing require clarification before that purchase is closed. Other Firefox scenarios, Edge/Safari, candidate Lighthouse and hosted verification remain pending. [Firefox evidence](docs/compat/firefox/2026-11-06/README.md) · [Resolution table](reports/full/RESOLUTION.md) · [Compatibility](COMPATIBILITY.md) · [Report](REPORT.md) |

Finish the Firefox order follow-up first, then the remaining required browser checks and the Lighthouse export. The owner still needs to publish the candidate, verify direct routes and static files on the deployed URL, confirm signed-out repository access, record the [demo](reports/full/DEMO.md) and submit the exam. Historical process gaps remain in the report.

The Lighthouse follow-up preserves the owner's 2026-11-06 production reports, fixes local metadata and static resources, and checks thumbnail priority and layout in Chrome. Local Firefox verification of the same candidate uses the existing owner checklist at port 4205. The candidate Lighthouse runs, hosted checks, owner Git publication and exam submission remain open. [Lighthouse evidence](reports/lighthouse/2026-11-06/README.md) · [Firefox checklist](docs/compat/firefox/2026-11-06/README.md)

## Risks

- A delayed legacy lookup can arrive after cart edits. Merge only still-present unresolved entries and retain their current quantities.
- Invalid or stale catalog inputs can show the wrong results. Validate the URL and cancel superseded requests.
- Browser storage can reject writes. Confirm an order only after saving it, and tell the user if the cart could not be cleared.
- Browser access and historical evidence constrain assessment claims. Record the specific tool blocker or unmet criterion.

## Definition of Done

Complete the focused behavior checks and required browser matrix, pass typecheck, lint, build and diff checks, and verify the published routes, purchase and Lighthouse evidence. Link the demo and signed-out repository evidence when available. Report historical gaps separately.

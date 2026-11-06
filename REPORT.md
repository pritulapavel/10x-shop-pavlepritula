# 10X Shop delivery report

Remediation on 2026-11-05 started from verified source revision `967e75c32df74322975a99d034a0c95480516e8e`. The revised source is in the local working tree. The [live demo](https://10x-shop-pavlepritula.vercel.app/) serves an earlier publication.

## Scope and results

The [resolution table](reports/full/RESOLUTION.md) maps the supplied CORE findings and the FULL work. Product metadata and stock badges, shared cent pricing, legacy cart recovery and the empty checkout explanation address the CORE findings. The FULL additions cover URL-driven catalog navigation, reviews and related items, reducer-backed promo and shipping, local orders, profile, theme, typed data boundaries, lazy routes and toasts.

- Google Chrome 156.0.8078.81 verified search, filters, sorting, pagination, history, reviews and reload, sign-in return, cart and promo persistence, profile validation and save, theme, logout with a populated cart, and three invalid routes. At 375/480/481/768/1024/1025 CSS px the catalog had 1/1/2/3/3/4 columns and no document overflow. [Browser measurements](reports/full/chrome-preview.json) · [Compatibility](COMPATIBILITY.md)
- In Firefox 159.0.1 at 1280 × 800 in a Private Window, the owner reported promo, F5, login return and validation checks. The targeted retest on port 4205 showed four matching $26.09 totals, 0 → 1 order, no badge and an empty cart after F5. The final changes on port 4208 still need a Firefox check. [Owner evidence](docs/compat/firefox/2026-11-06/README.md)
- The guest purchase of two Red Nail Polish units showed $24.33 in Cart, Checkout and confirmation ($15.92 subtotal, $1.59 promo discount and $10 shipping). Confirmation kept the delivery details, the badge disappeared and Cart stayed empty after F5. An accessibility click on Place order succeeded after the earlier locator click left the form unchanged. On a separate test origin, order #0001 kept its $18.94 total after F5 and sign-in. Reorder added one item, and the second purchase showed $18.05 across all three screens. Orders showed both frozen totals.
- [Pricing](reports/full/check-pricing.mjs), [cart](reports/full/check-cart.mjs) and [orders](reports/full/check-orders.mjs) passed focused Node checks. An isolated Chrome fixture reproduced a failed legacy lookup, successful retry and a delayed response after quantity changes, removal and clearing. A separate fixture verified fallback and Reload after a lazy import rejected. Chrome also verified the empty Checkout notice, the empty Orders state, an unknown order ID and confirmed clearing of populated cart, orders and reviews while retaining the session and theme.
- A desktop hover retest on the cream and green build verified the fix for the disabled Previous button. That run preserves the original colors and the before/after comparison. [Earlier hover evidence](reports/full/chrome-hover.json)
- The earlier blue and graphite palette was checked in Chrome 156.0.8078.81 at 375 and 1920 CSS px. Sampled text reached at least 5.02:1, essential control borders reached at least 3.37:1, and keyboard focus reached 5.17:1 in light and 10.30:1 in dark. [Earlier palette measurements](reports/full/chrome-palette.json)
- The 2026-11-06 refinement uses a compact retail heading, API result ranges, removable URL filters, aligned product cards and clearer totals. Chrome verified the catalog grid and both themes. The active in-app browser verified catalog history, the three native select popups, the shared cart and all four Checkout validation messages in each theme. Error text reached 6.47:1 in light and 8.93:1 in dark. [Measurements](reports/full/marketplace-verification.json) · [Current screenshots](COMPATIBILITY.md#current-marketplace-presentation)
- Three comparable development Profiler runs measured median card-update render times of 6.1/6.3/5.2 ms before memoizing ProductCard and stabilizing its add callback, and 0.9/0.8/0.75 ms after. The fixture used 12 cards, six warm-up updates and 24 measured updates per run. [Full samples](reports/full/profiler-results.json)
- The 2026-10-30 production Mobile audit recorded 95/100/100/83 and CLS 0 on the earlier deployment. [Historical audit](reports/lighthouse/2026-10-30/mobile_result.html) · [Earlier CORE results](reports/core/REPORT.md)
- The owner supplied 2026-11-06 production Lighthouse results of 100/100/100/83 Desktop and 96/100/100/83 Mobile (LCP 2,609 ms, TBT 0 ms, CLS 0). Chrome verified the local candidate's metadata, resources and thumbnail behavior. The Lighthouse CLI's Chrome process terminated after repeated GPU failures, and Windows Computer Use stopped before DevTools because it could not verify the active URL. Local candidate scores and the later hosted audit are pending. [Production baselines, launch diagnostics and export steps](reports/lighthouse/2026-11-06/README.md)

Typecheck, lint, build and the focused order test passed on the final follow-up. Chrome verified the new stock states, numbered navigation, saved-order labels and the four Reorder outcomes. The production domain still served the older entry. [Final local and live observations](reports/final/chrome-checks.json) · [ID-by-ID status](reports/final/GRADING-STATUS.md)

Chrome also exercised the existing Formik/Yup phone validation in Profile. Empty or whitespace-only input saved as omitted. Nine and fifteen digits and supported formatting saved. Invalid letters, punctuation alone, eight or sixteen digits showed the exact error and prevented the toast and Header update. A valid correction saved. No Profile code change was needed. [Phone evidence](reports/final/profile-phone-checks.json)

## Metrics as of 2026-11-06

| Metric | Historical assessment (`967e75c`) | Current observation |
| --- | --- | --- |
| Git commits / author dates | 12 / 5 | 15 / 6 on local candidate HEAD `fdf9ced`; 18 / 6 on recorded `origin/main` `27fb288`, including three merges |
| Merged PRs / Issues | 0 / 0 | 3 / 0 in connected GitHub search. Three merge commits also visible in local `origin/main` |
| Hours | No tracked hours supplied | 44 estimated in the reconstructed WBS. Verified tracked hours unavailable |
| Production build size | Not measured in the grading report | 16 JS assets, 408,749 B raw / 132,680 B gzip combined; CSS 35,474 B raw / 7,266 B gzip; catalog entry 247,319 B raw / 76,919 B gzip. Gzip calculated per file with Node defaults |
| Production Lighthouse, P/A/BP/SEO | 2026-10-30 Mobile 95/100/100/83 (earlier release) | Nov 6 18:48–18:49: Mobile 96/100/100/83, Desktop 100/100/100/83. Nov 6 20:26: Mobile 95/100/100/83, Desktop 100/100/100/83 on the same old entry with extensions in the audits. Final candidate audit pending |

## Implementation choices

1. Shared pricing rounds the discounted unit to cents before multiplication. A $9.99 item at 10% costs $8.99 per unit and $53.94 for six. Shipping uses the product-discounted subtotal before the promo.
2. Old cart rows remain usable after price lookup. The merge uses the latest quantity and accepts a response only for a still-present row without resolved pricing. Failed requests retain the row and expose Retry.
3. Orders keep copied delivery fields, unit and line amounts, and final totals. A failed order write leaves the cart available. Saving the order precedes cart clearing and confirmation uses the saved snapshot.

Remaining delivery checks cover the additional browsers, a hosted retest and a comparable Lighthouse run after publication. The [compatibility record](COMPATIBILITY.md) separates local results from those checks. The [debug log](DEBUG-LOG.md) preserves the four earlier cases and records three reproduced and verified fixes from the remediation.

## Process and assistance

The original assessment recorded 12 commits across five dates. The first plan dates to October 26 and missed the October 23 cutoff. The three [weekly notes](docs/progress/week-01.md) were reconstructed on November 6. Current GitHub metadata identifies the repository as public. Signed-out access still needs an owner check. No Project or milestone status was verified, and the [task definitions](reports/final/GITHUB-TRACKING.md) remain local.

Codex reviewed the existing project, implemented the remediation, exercised the API and local browser, reproduced pricing and search-focus defects, and wrote focused checks and documentation. The owner supplied earlier manual grid measurements and Lighthouse files. [Demo recording script](reports/full/DEMO.md) · [Current plan](PLAN.md)

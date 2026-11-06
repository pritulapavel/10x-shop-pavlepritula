# Remediation resolution

The task supplied the grading IDs and concrete requirements. The original grading file was unavailable. Implemented features and the checks below refer to the local working tree. Production verification of this revision is pending publication. Earlier hosted evidence is preserved separately.

| Findings or scope | Resolution | Evidence and status |
| --- | --- | --- |
| C-P2-03/04/05/06, C-P3-02 | Real card and detail metadata, rating, stock and discounts | Implemented. Chrome observed Red Nail Polish metadata and a $7.96 unit price from $8.99 at 11.44% off. Hosted check pending |
| C-P4-04 | One integer-cent pricing contract and legacy cart recovery | Implemented. Pricing tests and isolated browser migration checks passed. Cart, Checkout and confirmation matched in preview. Hosted check pending |
| C-P5-04 | Authenticated empty Checkout routes to Cart with a reason, after checking for confirmation | Implemented and verified in Chrome. Empty Cart showed the specific accessible notice after sign-in. Hosted check pending |
| FULL catalog and visual system | URL filters and removable chips, 400 ms debounce, API sorting and pagination, skeleton, retry, responsive theme tokens | The current presentation was checked at 375 px and desktop. Chrome covered contrast, focus, hover, disabled states and grid boundaries. The active in-app browser covered the URL flow, native select popups, cart interaction and Checkout errors in both themes |
| FULL reviews and related products | Formik/Yup, keyboard tabs, local reviews and real same-category items | Implemented. Chrome validation, saved review reload and related products checked |
| FULL cart and shipping | Typed reducer, persistent promo, shared shipping threshold | Implemented. Threshold tests and Chrome promo reload passed |
| FULL orders | Durable snapshots, protected routes, status timeline and stock-aware reorder | Implemented. Storage failure, snapshots, status boundaries and partial reorder verified in Node. Chrome confirmed two consecutive orders, reload, Reorder and empty Cart |
| FULL profile and theme | Formik/Yup, session profile, shared theme and scoped confirmed clearing | Implemented. Chrome verified profile save, Header update, theme persistence and scoped clearing with populated stores |
| FULL technical criteria | Typed decoding, API errors and guard, discriminated requests, Cart/Order/StorageService, lazy routes, toast and measured memoization | Implemented. Node checks, Chrome toast and fixture recovery, and Profiler samples available |
| FULL compatibility and Lighthouse | Chrome preview, historical production audit | Locally verified in Chrome 156.0.8078.81. Approved Firefox and Edge connections unavailable. The Lighthouse CLI could not connect to Chrome locally. Audit of the new deployment pending |
| Delivery and historical process | Docs, honest Git history, demo script and earlier evidence | Signed-out repository access unconfirmed. Demo recording and owner publication pending. Timely process notes and Projects/Issues or PR history have no supplied evidence. The recorded daily commit counts remain historical |

[Current marketplace results](marketplace-verification.json) · [Earlier palette results](chrome-palette.json) · [Earlier browser results](chrome-preview.json) · [Earlier hover results](chrome-hover.json) · [Profiler](profiler-results.json) · [Report](../../REPORT.md)

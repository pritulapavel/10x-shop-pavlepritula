# Firefox verification handoff · 2026-11-06

The local production build of `2f884bf74dc1febde398a05211b0f740772430a4` passed on Windows 10 Pro 22H2 (build 19045.6456). Vite preview served the app shell and assets at `http://127.0.0.1:4204/`. The HTTP checks do not exercise React Router or Firefox rendering. [Environment and HTTP results](environment.json)

Firefox 159.0.1 was confirmed by the executable metadata and the earlier WebDriver session. Its tab subprocess could not start in the command sandbox. Automatic review rejected running the WebDriver process outside the sandbox. Computer Use stopped on the restored Firefox window because it cannot enforce browser URL policy for this Windows browser. The earlier attempt produced no application results or Firefox screenshots.

## Earlier candidate and owner results

The historical local preview on port 4205 used `2f884bf74dc1febde398a05211b0f740772430a4` plus the then-uncommitted Lighthouse changes (entry `index-CTe8ajJU.js`).

The owner reported a manual Firefox 159.0.1 check at 1280 × 800 in a Private Window. The exact origin was requested and has not been supplied. No screenshots were supplied. The original response and the later general assessment are recorded separately below.

| Check | Owner observation | Status |
| --- | --- | --- |
| Invalid `WRONG`, lowercase `10x10` | Error shown for `WRONG`; `10x10` applied | Passed as reported |
| Cart and promo after F5 | Product, quantity 2 and promo persisted | Passed as reported. Product name and promo removal were not reported |
| Guest login return and empty Checkout fields | Returned to Checkout; all four errors appeared | Passed as reported |
| Cart, Checkout, confirmation and saved order totals | `yes` for each total; no amounts or equality stated | Totals were observed. Matching amounts and retained confirmation details remain open |
| Header badge and Cart after order | `no` to badge disappearing and `no` to Cart staying empty after F5 | Initial observations did not meet the expected results. Follow-up did not specify these outcomes |
| Duplicate submission | `2` reported for new orders; count before submission, order numbers and timing were not supplied | Unexpected result. Duplicate creation from one submission is unconfirmed |

The first follow-up gave a general positive assessment without replacing the three specific post-order results. No app fix was made on that basis.

## Owner retest on port 4205

The owner reported the purchase retest at `http://127.0.0.1:4205/` on November 6. The accompanying Firefox environment was reported as 159.0.1, 1280 × 800 and a Private Window. The product was entered as `0` without a name, and quantity was one. Cart, Checkout, confirmation and Orders each showed **$26.09**. Orders went from **0 to 1**. The badge disappeared and Cart stayed empty after F5. The reported logout after F5 matches the in-memory session design. The exact bundle, a rapid double-click, and delivery details on the confirmation were not independently captured.

**PASS, owner-reported manual purchase on port 4205.** The later port 4208 build added stock styling, numbered pagination, new order labels and Reorder navigation. The [earlier Chrome results](../../../../reports/final/chrome-checks.json) cover those changes separately. The one Firefox submission does not establish rapid double-submit protection, the whole matrix or deployed behavior. No Firefox automation or screenshots were produced.

## Remaining required checks

Open the [current local preview](http://127.0.0.1:4209/) in a Firefox Private Window. If it stopped, run `npm run preview -- --host 127.0.0.1 --port 4209 --strictPort` in `D:\Paul Learn\React\10x-shop` using the existing production build (`index-BN9bX7CA.js`). Record the full version from About Firefox and the CSS viewport. Keep the same window open across reloads.

1. Prioritize a clean purchase with quantity and valid promo retained after F5. Check the visible promo hint, invalid promo, shipping, guest login return, all four Checkout errors and a valid correction. Record Cart, Checkout, confirmation and saved Order Details totals, before/after order counts after a rapid repeat attempt, retained delivery fields, badge removal and empty Cart after F5. Use fictional delivery details.
2. Exercise Catalog search, category, sort, pagination, Back/Forward, reload and an empty search. Use Firefox Network tools to throttle requests, observe the loader and overlap searches. Simulate a failed request, restore network access and check Retry. Confirm the earlier request cannot overwrite the later results.
3. Check Product gallery, quantity and stock limits, related-product navigation, review validation and persisted review/average. Open and reload `/products/5` directly. Check an invalid ID, a missing product and an unknown route. In Cart, edit quantity and remove an item, then cancel and confirm Clear cart.
4. Check empty Orders, a saved order and a missing order. Open an order URL directly, refresh, sign in again and verify return to the same order and its active Orders link. Check Processing, Shipped and Delivered as the order ages. Test Reorder against a populated cart and stock limits. Check profile validation and a long saved name. Change theme and reload. Confirm Clear local data removes cart, orders and reviews while the session and theme stay active.
5. Keep an item in Cart and test Header Log out separately from Checkout, Orders or Order Details, and Profile. Each must return to guest Catalog with the cart preserved. The candidate Footer has no store navigation, cart badge or logout control. Check the logo in both areas links to Catalog. Check the five Footer social links have accessible names and open in new tabs. Close those tabs without signing in or interacting on external sites.
6. In Responsive Design Mode, check Catalog at 375/480/481/768/1024/1025 CSS px for 1/1/2/3/3/4 columns. The menu sits below the logo through 480 px. At 375 px and desktop in both themes, check overflow, wrapping, text and validation readability, 44×44 CSS px targets, focus, hover and disabled states. Open the native selects from the chevron and use the keyboard through the purchase flow.
7. For Error Boundary, use the existing [isolated fixture](../../../../reports/full/error-boundary.html) through the Vite dev server at `/reports/full/error-boundary.html`. Open the failing lazy route, observe the fallback and click Reload to return to the ready screen. Return scenario results once, with the Checkout errors, order totals and the 375 px layout as the minimum useful screenshots. List unrun steps separately.

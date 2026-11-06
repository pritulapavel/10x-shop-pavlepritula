# Firefox verification handoff · 2026-11-06

The local production build of `2f884bf74dc1febde398a05211b0f740772430a4` passed on Windows 10 Pro 22H2 (build 19045.6456). Vite preview served the app shell and assets at `http://127.0.0.1:4204/`. The HTTP checks do not exercise React Router or Firefox rendering. [Environment and HTTP results](environment.json)

Firefox 159.0.1 was confirmed by the executable metadata and the earlier WebDriver session. Its tab subprocess could not start in the command sandbox. Automatic review rejected running the WebDriver process outside the sandbox. Computer Use stopped on the restored Firefox window because it cannot enforce browser URL policy for this Windows browser. The earlier attempt produced no application results or Firefox screenshots.

## Current candidate and owner results

Open [the final candidate preview](http://127.0.0.1:4205/) in a Firefox Private Window. If it stopped, run `npm run preview -- --host 127.0.0.1 --port 4205 --strictPort` in `D:\Paul Learn\React\10x-shop`. Use the existing build of `2f884bf74dc1febde398a05211b0f740772430a4` with the uncommitted Lighthouse changes (entry `index-CTe8ajJU.js`). Record the full version from About Firefox and keep the same private window open across reloads.

The owner reported a manual Firefox 159.0.1 check at 1280 × 800 in a Private Window. The exact origin was requested and has not been supplied. No screenshots were supplied. The original response and the later general assessment are recorded separately below.

| Check | Owner observation | Status |
| --- | --- | --- |
| Invalid `WRONG`, lowercase `10x10` | Error shown for `WRONG`; `10x10` applied | Passed as reported |
| Cart and promo after F5 | Product, quantity 2 and promo persisted | Passed as reported. Product name and promo removal were not reported |
| Guest login return and empty Checkout fields | Returned to Checkout; all four errors appeared | Passed as reported |
| Cart, Checkout, confirmation and saved order totals | `yes` for each total; no amounts or equality stated | Totals were observed. Matching amounts and retained confirmation details remain open |
| Header badge and Cart after order | `no` to badge disappearing and `no` to Cart staying empty after F5 | Initial observations did not meet the expected results. Follow-up did not specify these outcomes |
| Duplicate submission | `2` reported for new orders; count before submission, order numbers and timing were not supplied | Unexpected result. Duplicate creation from one submission is unconfirmed |

The follow-up said everything was good in a private Firefox window, without replacing the three specific post-order results. Source review found a synchronous submit guard for a mounted Checkout and a warning when the cart cannot be cleared from storage. The warning, the original cart after F5 and the change in order count have not been confirmed. No application fix or Firefox pass was recorded on this basis.

## Priority follow-up

1. If the original session still shows the evidence, return the exact preview URL, product, four amounts and the order count before/after with order numbers and times. Record whether the confirmation retained delivery details, whether it showed `Order saved. The browser could not clear the saved cart.`, and which items remained after F5. If the original evidence is unavailable, repeat only the final order step in a fresh private session on port 4205. Note the Orders count before one rapid double-click on Place order. Expect one new order, the Header badge to disappear and Cart to remain empty after F5. The previously reported promo and validation steps need no repeat.

## Remaining required checks

2. Exercise Catalog search, category, sort, pagination, Back/Forward, reload and an empty search. Use Firefox Network tools to throttle requests, observe the loader and overlap searches. Simulate a failed request, restore network access and check Retry. Confirm the earlier request cannot overwrite the later results.
3. Check Product gallery, quantity and stock limits, related-product navigation, review validation and persisted review/average. Open and reload `/products/5` directly. Check an invalid ID, a missing product and an unknown route. In Cart, edit quantity and remove an item, then cancel and confirm Clear cart.
4. Check empty Orders, a saved order and a missing order. Open an order URL directly, refresh, sign in again and verify return to the same order and its active Orders link. Check Processing, Shipped and Delivered as the order ages. Test Reorder against a populated cart and stock limits. Check profile validation and a long saved name. Change theme and reload. Confirm Clear local data removes cart, orders and reviews while the session and theme stay active.
5. Keep an item in Cart and test Header Log out separately from Checkout, Orders or Order Details, and Profile. Each must return to guest Catalog with the cart preserved. The candidate Footer has no store navigation, cart badge or logout control. Check the logo in both areas links to Catalog. Check the five Footer social links have accessible names and open in new tabs. Close those tabs without signing in or interacting on external sites.
6. In Responsive Design Mode, check Catalog at 375/480/481/768/1024/1025 CSS px for 1/1/2/3/3/4 columns. The menu sits below the logo through 480 px. At 375 px and desktop in both themes, check overflow, wrapping, text and validation readability, 44×44 CSS px targets, focus, hover and disabled states. Open the native selects from the chevron and use the keyboard through the purchase flow.
7. For Error Boundary, use the existing [isolated fixture](../../../../reports/full/error-boundary.html) through the Vite dev server at `/reports/full/error-boundary.html`. Open the failing lazy route, observe the fallback and click Reload to return to the ready screen. Save actual measurements and screenshots beside this checklist.

# 10X Shop · November 6 delivery evidence

The [production catalog](https://10x-shop-pavlepritula.vercel.app/) served `index-C3zB35AX.js` and `index-BaOaqLeB.css`. GitHub shows [PR #4](https://github.com/pritulapavel/10x-shop-pavlepritula/pull/4) merged as `4ed8f7ff73b8d9659a48450d304982a499017de5`. The hosted asset names do not establish the deployed commit. The follow-up local production preview, `http://127.0.0.1:4209/`, built from `567a625a470df7f715d7159d62b028eb7ae914b6` plus the unstaged promo hint, served `index-BN9bX7CA.js`.

## Owner-supplied hosted Lighthouse exports

Both requested and displayed the production root above. Scores are Performance / Accessibility / Best Practices / SEO. Times come from `fetchTime` and are shown in UTC and Tbilisi (UTC+4).

| Preset | Time UTC · Tbilisi | Scores | LCP / TBT / CLS | Files |
| --- | --- | --- | --- | --- |
| Desktop | `2026-11-06T17:44:44.601Z` · 21:44:44 | 99 / 100 / 100 / 100 | 776 ms / 0 ms / 0.00031 | [JSON](hosted-desktop.json) · [HTML](hosted-desktop.html) |
| Mobile | `2026-11-06T17:55:40.377Z` · 21:55:40 | 100 / 100 / 100 / 100 | 1,530 ms / 39.5 ms / 0 | [JSON](hosted-mobile.json) · [HTML](hosted-mobile.html) |

Lighthouse 13.5.0, Chrome DevTools Navigation, simulated throttling, storage reset enabled. Desktop: 40 ms RTT, 10,240 Kbps, 1× CPU; Mobile: 150 ms RTT, 1,638.4 Kbps, 4× CPU. Both list disabled screen emulation; 412 × 823 and 1.75 are configuration values. The Windows host UA is reduced to `Chrome/156.0.0.0`; it proves neither the full build nor Incognito. The JSON exports are unchanged. The HTML was generated from them with the official Lighthouse 13.5.0 ReportGenerator.

- `meta-description` and `robots-txt` both scored 1. No weighted SEO audits scored below 1. The optional Agentic Browsing category scored 50 (`llms-txt`, `ard-schema`); it is separate from SEO and the assignment. The below-perfect weighted Performance audits were `first-contentful-paint`, `largest-contentful-paint` and `speed-index` on Desktop, and `first-contentful-paint` on Mobile.
- Both exports reference `chrome-extension://` scripts. Desktop has no run warnings but recorded `PROTOCOL_TIMEOUT` for `FullPageScreenshot` during `Runtime.evaluate`. Mobile has no runtime error and warns that extensions affected performance. These are observations of the hosted build, not a controlled before/after comparison or a clean audit of the follow-up.
- Both network records show 200 for the root (`text/html`) and favicon (`image/svg+xml`). Chrome separately displayed `/robots.txt` as `text/plain` with `User-agent: *` and `Allow: /`; its browser DOM did not expose the HTTP status. The owner previously reported 200 for that resource.
- [Earlier November 6 baselines and clean export procedure](../../lighthouse/2026-11-06/README.md). The approved Chrome connection could not run DevTools Lighthouse; earlier CLI launch failed after GPU exits. Keep the clean Mobile run on the exact deployment open.

## Agent browser checks

[Browser observations](browser-checks.json) distinguish the hosted and local origins. Connected Google Chrome exposed a reduced version; the independently identified installed build was 156.0.8078.81. Hosted Catalog showed the title, English language, description, 12 crawlable product links and lazy thumbnails. Direct Product and reload rendered Red Nail Polish; `/abc` and `/products/999999` rendered the app NotFound with Header and Footer. Hosted Catalog and Product at 375 × 900 in both themes measured 360 px client and scroll width; the desktop root was 1920 × 897.

The ChatGPT in-app browser (full version unverified) completed a hosted synthetic purchase. One Red Nail Polish at $7.96 plus $10 shipping gave $17.96 in Cart, Checkout, confirmation and saved Order Details. The guest login returned to Checkout; all four blank-field messages rendered. After one valid submission, the confirmation kept the details, the badge disappeared, and the cart stayed empty after F5. Reloading the real saved order redirected to login; signing in returned to that same URL and showed $17.96. This run did not test rapid repeat submission.

On the local preview, Chrome verified the hint at 375 × 900 and 1920 × 900 in both themes. The invalid promo retained accessible links to both the error and the hint; `10x10` applied a $0.89 discount to an $8.94 item subtotal with $10 shipping, for $18.05. Removal restored the hint. Typecheck, lint, build and the existing cart regression passed. No new application defect was recorded.

On that same local build, the in-app browser double-clicked the real Place order button at 1280 × 720 in light mode. Orders went from zero to one (`Order #10X-00001`); confirmation and saved order showed $18.94 and the badge disappeared. This verifies the UI outcome for the double-click, without counting submit-handler invocations. [Saved order screenshot](local-double-click-order.jpg)

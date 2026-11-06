# Final storefront visual polish · 2026-11-06

The local production preview at `http://127.0.0.1:4210/` served the unstaged visual and discovery changes on top of `106c02d08d5c5030db8eaf746dcfb6ac07a325dc` (`test/firefox-compatibility`). Vite 8.3.5 built entry `index-95K6ON3m.js` and stylesheet `index-DfYF1QwA.css`. This candidate has not been deployed.

## Visual checks

- Connected Google Chrome: Catalog rendered 1/1/2/3/3/4 columns at 375/480/481/768/1024/1025 CSS px. The Header navigation moved below the brand at 375 and 480, and sat beside it at 481. All sampled document scroll widths matched their client widths. Catalog thumbnails remained lazy, Header navigation had no underline, and the Footer had five social links and no store navigation.
- At 375 and 1440 CSS px in both themes, all 45 rendered Catalog controls per sample were at least 44 × 44 CSS px. Samples of Product, Cart, Login, Checkout, Profile and Orders also met the target size and showed no document overflow. The Chrome connection and in-app browser did not independently establish full session build numbers.
- Computed contrast, light/dark: primary button text 4.70/7.80, field border 3.39/4.93, placeholder 7.80/9.12, result badge and active link 6.01/7.61, discount badge 5.21/9.56, keyboard focus outline 6.82/8.24, Checkout error text 5.91/8.25. These are measured samples rather than a full accessibility audit.
- All three native selects opened from a click on the 16 × 16 chevron at 375 and 1280 CSS px in both themes in the in-app browser. Category, Sort and Rating responded to the keyboard in Chrome. The 16 px inset, 44 px end padding and vertical centering remained intact. “Kitchen Accessories” and “Rating: high to low” fit the 302 px wide fields. Product-card hover changed border and shadow without moving the card; the disabled quantity button kept its colors on hover.
- On the local preview, the in-app browser completed a guest purchase of one Red Nail Polish with lowercase `10x10`. Cart, Checkout, confirmation and saved Order Details showed **$17.16**. The four invalid-field messages were observed at desktop and 375 CSS px in both themes. The confirmation retained the delivery details, the badge disappeared, and Cart stayed empty after F5. In Chrome the same path was verified through Checkout; submission was completed in the in-app browser. Profile still displayed the exact optional-phone format error for letters.

[Raw browser observations](verification.json). Typecheck, lint, build, diff check and the existing pricing, cart and order regressions passed. Firefox/Edge were not rechecked for this pass.

## Discovery files and hosting

The published site was checked read-only before this candidate. All three discovery URLs returned `text/html` and rendered the SPA's “Page not found”; the live product route rendered Red Nail Polish on `index-BN9bX7CA.js`. On the new local build, `/llms.txt` returned 200 as text/plain with a Markdown H1 and two working storefront links. Both JSON URLs returned 200 as application/json and parsed without errors; `/robots.txt`, `/favicon.svg` and direct SPA routes also returned the expected responses.

The canonical manifest follows the [ARD v0.91 schema](https://github.com/ards-project/ard-spec/blob/main/spec/schemas/ard-entry.schema.json). The legacy file includes `specVersion: "1.0"` for the [Lighthouse 13.5.0 validator](https://github.com/GoogleChrome/lighthouse/blob/v13.5.0/third-party/ard/ard.js), which accepted it locally with no errors or warnings. Both manifests declare zero resources because this shop offers no AI agent, tools or API. These checks did not run a new Lighthouse audit or verify a new deployment.

## Screenshots

| Screen | Light | Dark |
| --- | --- | --- |
| Catalog before | [Desktop](before-catalog-desktop-light.jpg) | [375 px](before-catalog-mobile-dark.jpg) |
| Catalog after | [Desktop](after-catalog-desktop-light.jpg) · [375 px](after-catalog-mobile-light.jpg) | [Desktop](after-catalog-desktop-dark.jpg) · [375 px](after-catalog-mobile-dark.jpg) |
| Product after | [375 px](after-product-mobile-light.jpg) | [Desktop](after-product-desktop-dark.jpg) |
| Checkout errors after | [Desktop](after-checkout-errors-light.jpg) · [375 px](after-checkout-errors-mobile-light.jpg) | [Desktop](after-checkout-errors-dark.jpg) · [375 px](after-checkout-errors-mobile-dark.jpg) |

[Local purchase confirmation](after-confirmation-desktop-light.jpg).

## Owner handoff

Review and commit the source, the three public files and the evidence. Publish the reviewed revision, confirm its Vercel source SHA, and check the response bodies and MIME types at the three discovery URLs. Smoke-test direct Product reload, NotFound and the mobile purchase on the hosted build; run a fresh Lighthouse audit there. Preserve the historical Lighthouse scores and browser limitations.

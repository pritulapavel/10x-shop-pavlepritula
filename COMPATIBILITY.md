# Browser compatibility

The marketplace refinement was checked on 2026-11-06 using the local Vite production preview. Earlier production checks are in the [CORE history](reports/core/REPORT.md).

| Browser | Actual version | Coverage |
| --- | --- | --- |
| Google Chrome | 156.0.8078.81 | Current light and dark layouts, catalog breakpoints, contrast, focus and pointer states |
| ChatGPT in-app browser | App-provided browser | Active-tab catalog flow, native select popups, cart interaction and Checkout validation in both themes |
| Mozilla Firefox | Unknown | No approved Firefox connection available. Pending |
| Microsoft Edge | 156.0.4314.58 installed | The approved browser connector reported Edge unavailable. No compatibility test run |

## Header and footer follow-up

- The local production preview was checked on 2026-11-06 in connected Google Chrome. The connector blocked `chrome://version`, so the full build for this pass is unverified. At 375 and 1920 CSS px both themes had no horizontal overflow. The header menu was below the logo at 480 px and beside it at 481 px. The footer reached the bottom of the viewport on the short Cart page.
- Both menus showed the correct active routes, including Orders at `/orders/footer-qa`. They used accent hover states and a 2 px keyboard outline without underlines. The in-page Cart link retained its underline. The measured Header and Footer controls were at least 59.33 × 44 CSS px. A 65-character account name truncated in the Header without overflowing. Footer muted text contrast was 5.90:1 in light mode and 7.61:1 in dark mode.
- Both Cart badges matched at one and two items and disappeared at zero. Before the logout fix, logging out from Profile opened `/login` because the protected-route guard observed the session reset before the router committed `/`. After the fix, Footer logout from Profile and Header logout from the nested Orders route both opened Catalog and preserved two cart items.
- Both brand links loaded the original 10X SVG and pointed to Catalog. The five social anchors used the supplied profile URLs, had 44 px heights, and wrapped into two rows at 375 px. Tab visibly focused the first social link in both themes. LinkedIn opened a separate tab. The SVG and URLs came from the [official 10X site](https://10x.edu.ge/).

[Desktop light](reports/full/footer-desktop-light.jpg) · [Desktop dark](reports/full/footer-desktop-dark.jpg) · [375 px light](reports/full/footer-mobile-light.jpg) · [375 px dark](reports/full/footer-mobile-dark.jpg)

## Current marketplace presentation

- At 375/480/481/768/1024/1025 CSS px the catalog had 1/1/2/3/3/4 columns. The header wrapped below the wordmark at 375 and 480 px. Measured targets met 44 × 44 CSS px and the sampled screens had no horizontal overflow.
- Catalog samples gave at least 5.17:1 for text and 3.80:1 for enabled select borders. Search focus measured 5.17:1 in light and 10.30:1 in dark. The Previous button stayed visually stable on hover while disabled. The 16 px chevron, 16 px inset and 44 px text padding were rechecked.
- The active in-app browser opened all three select menus by clicking their chevrons. It verified search, category, sort, pagination, history, reload, removable filters and the shared cart. Submitting invalid Checkout fields separately in both themes showed all four messages. Error text measured 6.47:1 in light and 8.93:1 in dark.

[Measurements and screenshot index](reports/full/marketplace-verification.json) · [Before desktop](reports/full/marketplace-before-desktop-light.jpg) · [Before mobile](reports/full/marketplace-before-mobile-light.jpg) · [Desktop light](reports/full/marketplace-catalog-desktop-light.jpg) · [Desktop dark](reports/full/marketplace-catalog-desktop-dark.jpg) · [375 px light](reports/full/marketplace-catalog-mobile-light.jpg) · [375 px dark](reports/full/marketplace-catalog-mobile-dark.jpg) · [Checkout errors light](reports/full/marketplace-checkout-invalid-light.jpg) · [Checkout errors dark](reports/full/marketplace-checkout-invalid-dark.jpg)

## Earlier blue and graphite palette check

- Chrome measured 261 samples across 30 rendered states. Sampled text was at least 5.02:1 and essential control borders at least 3.37:1. The search keyboard outline measured 5.17:1 in light and 10.30:1 in dark. Computed backgrounds and opacity were included in the ratios.
- The selected navigation and tabs, buttons, photo hover, disabled pagination and purchase buttons, form errors, order totals, badges, warning panels, toasts and loading placeholders were checked. Both themes survived F5. The sampled screens had no horizontal document overflow.
- Checkout fields and totals were sampled. Browser input did not surface Checkout validation messages during this pass. The saved order supplied the shared delivery and summary components used by confirmation. Error Boundary was sampled in its existing light development fixture.

[Earlier palette measurements](reports/full/chrome-palette.json) · [Desktop light](reports/full/chrome-palette-desktop-light.jpg) · [Desktop dark](reports/full/chrome-palette-desktop-dark.jpg) · [375 px light](reports/full/chrome-palette-mobile-light.jpg) · [375 px dark](reports/full/chrome-palette-mobile-dark.jpg)

## Earlier Chrome acceptance on the cream and green build

- 375/480/481/768/1024/1025 px yielded 1/1/2/3/3/4 columns. The navigation was below the logo at 375 and 480 px. Document client and scroll widths matched at all six widths.
- The measured catalog targets were at least 63.33 × 44 CSS px. At 375 px, all 112 controls measured across nine additional route states were at least 44 × 44 CSS px and had no document overflow. The first keyboard Tab focused Catalog with a 2 px outline. Pagination was disabled at its boundary.
- At 1920 × 897 CSS px, the pointer check covered eight targets in each theme. Cart and Log in gained an accent background, active Catalog kept its selected background, and the product title and image responded. Add to cart and the theme button changed background. Disabled Previous kept its base background after the fix, and the disabled quantity decrement kept a muted surface. Both used the `not-allowed` cursor. [Computed styles before and after](reports/full/chrome-hover.json)
- The isolated Vite fixtures verified legacy cart retry and race handling, and Error Boundary recovery after a rejected lazy import.

[Measurements](reports/full/chrome-preview.json) · [Purchase confirmation](reports/full/chrome-confirmation.png) · [Light catalog](reports/full/chrome-catalog-light.png) · [Dark catalog at 375 px](reports/full/chrome-catalog-mobile-dark.png)

For Firefox and Edge or Safari, record the full version and check the catalog, direct product and order routes with refresh, purchase and cart clearing, and mobile layout and keyboard focus at 375 px. Verify the published revision once it is available.

# Debug log

Only reproduced issues and verified fixes are recorded here.

## Catalog stage (7–8 and partial task 12): singular badge label

- **Observed:** With one unit in the cart, the browser accessibility tree showed
  `Cart 1 items in cart`. The numeric badge worked, but its accessible label used
  the plural for a single unit.
- **Reproduction steps:** During the catalog-stage test, start with an empty cart,
  add one unit from Catalog, and inspect the Header link's accessible name.
- **Cause:** The initial `aria-label` always used `items`.
- **Fix:** Use `item` when the quantity is 1, and `items` otherwise.
- **Verification:** The bad label was observed during the stock-limit browser
  check. The final Header contains the singular/plural conditional; stage checks passed.
  This was an accessibility-tree check, not a separate screen-reader session.
- **Tool and evidence:** Computer Use browser accessibility output showed the
  incorrect name. The quality-stage review also checked the final conditional
  with `git show 32fd6aa:src/components/Header.tsx`.
- **Fix commit reference:** `32fd6aa1e4e04aa24ed84a33a562ecb1e0ae5394`
  (`feature: add product catalog and shared cart state`) contains the corrected
  label. The correction was made before that commit; there is no separate fix commit.
- **What was learned:** Accessible labels need their own checks; the correct
  visible numeric badge does not guarantee correct singular/plural wording.

## Product/Cart stage (10–13): accepted add retained stale stock

- **Baseline:** `32fd6aa1e4e04aa24ed84a33a562ecb1e0ae5394`.
- **Reproduction:** Call `addItem` with stock 2 and quantity 1, then add 2 more
  units of the same product with an updated stock of 5. A temporary Node check
  of the actual CartContext updater produced quantity 3 but stored stock 2.
- **Impact:** The accepted cart state could have quantity greater than its own
  stored stock. Cart quantity controls would then use an outdated limit.
- **Cause:** Validation used the incoming product's stock, but the existing-item
  update copied only the new quantity into the stored item.
- **Fix:** An accepted addition now updates the stored stock from `product.stock`
  together with the quantity, while retaining central stock validation.
- **Verification:** The regression check now produces quantity 3 and stock 5.
  Additional assertions reject quantities above stock and invalid totals, and
  check immutable/pure updates. Browser stock-limit and cross-page synchronization
  checks also passed.
- **Tool and evidence:** Temporary Node assertions against the real CartContext
  updater observed the quantity/stock mismatch. During the quality review,
  `git show bb1c726 -- src/context/CartContext.tsx` confirmed the accepted-update
  branch now copies `stock: product.stock`.
- **Fix commit:** `bb1c726f07596b3be9f45de5edb24ef550a27b96`
  (`feature: add product details and complete cart`). Historical note: the fix
  was uncommitted when stage 10–13 ended; this later commit was verified during
  the quality review. No commit was created by the agent in the quality stage.
- **What was learned:** When validating against fresh inventory, update the
  corresponding stored inventory metadata too, so later controls use the same limit.

## Quality stage (19–23): incorrect Catalog grid breakpoint boundaries

- **Symptom:** The Catalog stayed at one column at 481px and switched to four
  columns at 1024px, although both widths belong to the required 2–3-column range.
- **Original reproduction steps:** Before the correction, open Catalog, wait for
  products, set viewport widths 480/481/1024/1025px, and read the actual ProductGrid's
  computed columns. The original results were respectively 1/1/4/4 columns.
- **Original tool and evidence source:** Automated layout reads in the embedded
  in-app browser, recorded before this fix. These original observations are not
  Chrome observations and remain preserved in PLAN.md.
- **Root cause:** ProductGrid used `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.
  The installed Tailwind theme defines `sm` as 40rem and `lg` as 64rem (640px and
  1024px at the default 16px root size), rather than the assignment's 481px/1025px
  transition points. The first transition was too late and the four-column transition too early.
- **Correction:** The verified source commit's ProductGrid diff replaces those variants
  with `min-[481px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1025px]:grid-cols-4`,
  retaining the base one-column grid and the existing design.
- **Post-fix verification:** User-operated manual Chrome DevTools Console on the
  production preview, supplied on 2026-10-27. No automated Chrome retest was performed.

| innerWidth | clientWidth | scrollWidth | gridTemplateColumns | columnCount |
| --- | --- | --- | --- | --- |
| 375 | 375 | 375 | `343px` | 1 |
| 480 | 480 | 480 | `448px` | 1 |
| 481 | 481 | 481 | `212.5px 212.5px` | 2 |
| 1024 | 1024 | 1024 | `309.328px 309.328px 309.344px` | 3 |
| 1025 | 1025 | 1025 | `226.25px 226.25px 226.25px 226.25px` | 4 |

- **Result:** All five supplied column counts match the intended ranges. Catalog
  has no horizontal document overflow at these widths; this result does not cover
  other pages or interactive-target sizes.
- **Browser version for the manual session:** Not supplied. Windows 10 Version
  22H2 (Build 19045.6456) identifies the operating system. A separate later
  automated session confirmed Google Chrome 156.0.8078.48; the five boundary
  measurements above remain user-operated evidence and were not repeated.
- **Fix commit:** [dc67c1adec594662e398eae3bfbae1672c808f31](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/dc67c1adec594662e398eae3bfbae1672c808f31)
  (`fix: improve responsive sizing and add error boundary`), verified by read-only
  inspection of the local commit's actual diff.
- **What was learned:** Measure immediately around the specified breakpoint
  boundaries; framework defaults and broad mobile/tablet/desktop samples can miss
  off-by-one transition problems. Keep original and retest evidence sources distinct.

## Quality stage (19–23): undersized interactive targets

- **Original reproduction:** Open CORE screens at 375px and measure the actual
  links, buttons and inputs with `getBoundingClientRect()`, including controls
  below the fold. These pre-fix observations came from the embedded in-app
  browser, not Chrome.
- **Observed before correction:** Brand 85.52×28px; navigation links 36px high;
  Catalog Add buttons 40px high; quantity buttons 40×40px; Product Back
  113.38×20px; Cart product link 167.28×24px; Remove 50.98×20px; Clear cart
  94.67×38px; Login inputs 293×42px; Checkout inputs 278×42px; confirmation Back
  113.78×24px; empty-Cart Browse 121.06×24px; NotFound link 98.14×24px.
  The existing 76×76px image selectors already met the requirement.
- **Root cause:** Text-only links used their line-height as the clickable box;
  navigation/card padding produced 36–40px heights, inputs produced 42px boxes,
  and the stepper explicitly used Tailwind `h-10 w-10` (40px). No minimum 44px
  dimensions protected these actual interactive elements.
- **Correction in the verified source commit:** Use `h-11 w-11` for stepper
  buttons; `min-h-11` for Add buttons and inputs; `inline-flex`, alignment and
  `min-h-11 min-w-11` on short links and relevant Header/Cart buttons. These
  utilities apply to the clickable/editable element itself. Gallery sizing,
  purchase behavior and the existing design were retained.
- **Post-fix tool and evidence:** Automated read-only DOM geometry through the
  approved connected Chrome extension on `http://127.0.0.1:4173/`, 2026-10-27.
  The running executable identified Google Chrome 156.0.8078.48. This evidence
  is separate from both the original embedded-browser observations and the
  user's manual grid measurements.
- **Verification:** At `innerWidth = 375`, Catalog/Product/populated Cart/Login/
  Checkout/confirmation/empty Cart/NotFound checked 28/11/10/8/9/5/5/5 controls
  respectively (81 observations). Zero widths or heights were below 44 CSS px.
  Disabled decrease buttons and rendered controls below the fold were included;
  hidden/non-rendered nodes were excluded. There are no custom clickable containers.
- **Actual corrected samples:** Brand 85.515625×44px; navigation 44px high;
  Catalog Add 294×44px; steppers 44×44px; Product Back 113.375×44px; Cart title
  167.28125×44px; Remove 50.984375×44px; Clear 94.671875×44px; Login inputs/submit
  293×44px; Checkout inputs 278×44px; confirmation Back 113.78125×44px; empty-Cart
  Browse 121.0625×44px; NotFound link 98.140625×44px. Gallery stayed 76×76px.
  PLAN.md contains the per-screen counts, remaining target sizes and overflow data.
- **Result:** All eight screens met the target-size check; document width did
  not overflow at 375px. Focus, hover, disabled appearance and responsive layouts
  were also checked in Chrome at 375px and desktop. Firefox is not verified.
- **Fix commit:** [dc67c1adec594662e398eae3bfbae1672c808f31](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/dc67c1adec594662e398eae3bfbae1672c808f31)
  (`fix: improve responsive sizing and add error boundary`), verified by read-only
  inspection of the local commit's actual diff.
- **What was learned:** Measure the clickable box rather than its inner icon or
  text. Check disabled and offscreen controls too; font size and padding alone
  do not guarantee a 44×44px target.

**Quality-stage review status (2026-10-27)**

- Four genuine fixed bugs are documented above. The first two have reviewed
  existing fix commits; the grid and target corrections have verified results,
  and both fix references now identify the verified source commit above.
- Chrome production purchase flow passed with matching $3,799.98 totals, saved
  fictional delivery/item details, disappearing badge and empty Cart after ordering.
- Actual child-render fault → ErrorBoundary fallback → fault removed from source/
  production build while fallback stayed mounted → actual Reload recovery passed.
  The temporary probe was removed; `src/main.tsx` is byte-for-byte restored.
  This intentional test failure is test evidence, not an application bug.
- After cleanup, typecheck, lint and build passed. The clean production build
  contains no temporary probe/fault marker, and a fresh Chrome smoke tab logged
  no warnings/errors. No additional permanent application changes were needed.
- Firefox has no approved working connection in the available inventory; its
  version and checks remain pending. CORE 19–23 remains in progress.
- The same verified source commit adds ErrorBoundary and wraps the Router/providers
  in `src/main.tsx`. The user committed these application changes; remote push
  status was not checked. Historical verification evidence is unchanged.

## Product discounts were omitted from cart totals

- **Reproduction:** Run `node reports/full/check-pricing.mjs`. It imports the baseline currency code from `967e75c` and passes a $9.99 item with a 10% discount and quantity six.
- **Observed:** The baseline calculated 5,994 cents. The discounted line should be 5,394 cents after rounding the unit to 899 cents.
- **Fix:** Compute discounted unit cents once in the shared pricing code and multiply by quantity. Preserve original price and discount metadata in storage and order snapshots.
- **Verification:** The regression confirms 5,394 cents, explicit zero and fractional discounts, repeated additions, and legacy cart round trips. [Pricing check](reports/full/check-pricing.mjs)
- **Fix commit:** [`193c740ec28901586d681f8b0795f0a41c657fda`](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/193c740ec28901586d681f8b0795f0a41c657fda) introduces `discountedUnitCents()` and uses it for line totals in `src/utils/currency.ts`.

## Search lost focus after the debounced URL update

- **Reproduction:** In the local Chrome preview, type `phone` into Search products and let the debounced navigation commit.
- **Observed:** The URL became `?q=phone` and focus moved to the document body.
- **Fix:** Keep the search input mounted and reset its draft from the navigation key.
- **Verification:** Chrome 156.0.8078.81 reported the search field as active after the same URL update. Search pagination and Back/Forward also restored their URLs. [Browser evidence](reports/full/chrome-preview.json)
- **Fix commit:** [`193c740ec28901586d681f8b0795f0a41c657fda`](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/193c740ec28901586d681f8b0795f0a41c657fda) contains the stable input and navigation-key draft in `src/components/CatalogSearch.tsx`.

## Disabled Previous showed the enabled hover accent

- **Reproduction:** Hover over Previous on the first catalog page in the local desktop production preview. The button was disabled and used a `not-allowed` cursor, but its background moved toward the enabled hover accent in both themes.
- **Cause and fix:** The shared secondary style applied its accent to every hovered element. Limit it to elements outside `:disabled` so secondary links retain their hover styling.
- **Verification:** Chrome 156.0.8078.81 on the rebuilt preview measured an unchanged disabled background in both themes. The enabled secondary theme toggle still changed background. [Hover evidence](reports/full/chrome-hover.json)
- **Fix commit:** [`193c740ec28901586d681f8b0795f0a41c657fda`](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/193c740ec28901586d681f8b0795f0a41c657fda) scopes `.secondary-button` hover to `not-disabled` in `src/index.css`.

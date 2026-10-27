# CORE project plan

Implement one stage at a time. Future features wait for their detailed requirements.
Checkboxes mark verified work only.

- [x] **1–2: Configuration and project plan.** Verify React 19 and its types,
  Vite, strict TypeScript, Tailwind CSS v4, ESLint, and all five npm scripts;
  document this CORE roadmap.
- [x] **3–6: Foundation.** Add required types, shared Layout/Header/Footer,
  routing, local AuthContext login/logout, and a checkout login redirect.
- [x] **7–8: Catalog.** Fetch DummyJSON products; handle loading, error, and
  empty states; add product cards and a responsive grid.
- [x] **10–13: Product Details and Cart.** Load individual products, validate route
  IDs, select images and quantities, complete CartContext actions, and implement
  Cart editing, totals, empty state, and confirmed clearing.
- **12 (complete):** Shared items, `addItem` and the Header badge were brought
  forward for Catalog. `removeItem`, `setQuantity`, `clearCart` and synchronization
  with Catalog, Product and Cart are now implemented and verified.
- [x] **14–16: Checkout and review.** Four-field checkout, local confirmation,
  duplicate-submit protection, and the required React concepts are implemented
  and verified. Quality and delivery are tracked below.
- [ ] **19–23: Quality (in progress).** Error Boundary and focused sizing changes
  pass the automated Chrome checks below; non-browser checks pass and the user
  manually verified Catalog grid boundaries. Source fix references are verified;
  Firefox verification remains pending. See the quality status below.
- [ ] **24–25 and 28: Delivery (in progress).** English README and CORE REPORT
  and Vercel deployment configuration are prepared; DEBUG-LOG preserves four
  verified bugs. Actual deployment, the live URL, hosted direct-route/refresh
  checks, a basic deployed-site Lighthouse report and final verification remain pending.

## Planned routes and behavior

- `/`: catalog. Other routes: `/login`, `/products/:id`, `/cart`, `/checkout`, and `*`.
- Login is a local simulation. Checkout requires login and has `fullName`,
  `email`, `address`, and `city`. Order confirmation is local.
- Stay within CORE scope; detailed requirements will guide later stages.

## Submission documentation (2026-10-27)

- [x] Replace the Vite starter README with English project information, actual
  architecture/dependencies, repository setup, five scripts, source-confirmed
  local test login, limitations, pending Live Demo and credits including AI assistance.
- [x] Prepare the English CORE REPORT with delivered/planned scope, recorded
  verification, three supported debugging challenges, reflection and AI assistance.
- [x] Review documentation against the current source and read-only Git history;
  preserve all four DEBUG-LOG entries and their distinct evidence sources.
- [ ] Complete Firefox verification and record its version when an approved
  working connection is available. CORE 19–23 remains in progress.
- [ ] Deploy, record the live URL, verify deployed direct-route refresh and run
  one basic Lighthouse report on the deployed site.
- [x] Verify the user's source commit and record genuine references for the
  Catalog breakpoint and interactive-target fixes. The diff also contains ErrorBoundary.
- [ ] Complete final submission verification and synchronize the documents with those results.

This source-reference update changed README.md, REPORT.md, PLAN.md and DEBUG-LOG.md only.
Application code, dependencies, configuration and historical verification evidence were preserved.
Existing Chrome results were not repeated, and typecheck/lint/build were not rerun
for Markdown-only changes. The user committed the quality source changes; the agent
performed no staging, commits, pushes or deployment during this documentation update.

## CORE 24: Vercel deployment preparation (2026-10-27)

- [x] Confirm the application root is the repository root (`D:\Paul Learn\React\10x-shop`).
  The existing `npm run build` runs `tsc -b && vite build`; Vite's resolved output
  directory is `dist` and its base is `/`.
- [x] Add minimal root `vercel.json` with the schema URL and `/(.*)` → `/index.html`
  SPA rewrite from the [official Vercel Vite guide](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas).
  JSON parsing and checks of the schema URL/rewrite passed. BrowserRouter is unchanged.
- [x] Document Vercel settings in README: repository `pritulapavel/10x-shop-pavlepritula`,
  production branch `main`, Vite preset, repository root, `npm run build`, `dist`,
  and no required environment variables in the current source.
- [x] Run `npm run build` once successfully for this preparation. Confirm generated
  `dist/index.html` exists and its referenced local assets exist and are non-empty:
  `assets/index-B1SdGF_Z.js` and `assets/index-DiCu7KeB.css`.
- [ ] Publish to Vercel and record the actual live URL.
- [ ] Verify hosted direct loads and refreshes for Catalog, Login, a valid Product,
  Cart, Checkout and NotFound; check the guest checkout redirect and hosted purchase flow.
- [ ] Run and record one basic Lighthouse report on the deployed site.

Deployment configuration is prepared; deployed behavior is not verified. A local
build or Vite preview does not establish that Vercel routing works. Firefox and its
version remain pending under CORE 19–23. Existing Chrome QA was not repeated.
Only vercel.json, README.md and PLAN.md were changed for this preparation; application
code, dependencies and existing evidence were preserved. No Vercel CLI installation,
hosting-account connection, staging, commits, pushes or deployment were performed.

## Stage 1–2 verification

- Passed: `npm run typecheck`, `npm run lint`, and `npm run build`.
- Confirmed: typecheck covers application TS/TSX files and `vite.config.ts`.
- Passed: `dev` and `preview` start and serve HTTP 200 responses.
- Confirmed: Tailwind generates `cursor-pointer` in development and production CSS.
- Visual Tailwind verification was completed during stage 3–6.

## Stage 3–6 verification

- Added shared types, one BrowserRouter, Layout with Header/Outlet/Footer,
  active NavLinks, NotFound, ScrollToTop, and AuthProvider with children.
- Added local login/logout and controlled login inputs with React validation.
  Passwords stay in form state; authentication is not persisted.
- Passed: `npm run typecheck`, `npm run lint`, and `npm run build`.
- Browser-verified: Catalog, Product, Cart, navigation without losing login,
  exact active navigation, NotFound and its catalog link, and logout to catalog.
- Browser-verified: both required-field messages, whitespace-only username,
  the short-password message, and ordinary login returning to catalog.
- Browser-verified: guest checkout redirects to login, then returns to checkout
  after successful login through Router state, without an empty-cart check.
- Visually verified Tailwind, Header and Login at 375px and 1280px with no
  horizontal overflow, plus visible keyboard focus. Browser console was clean.
- At the end of stage 3–6, Catalog, Product, Cart and Checkout were heading-only
  shells. The Catalog update is recorded below; the other business features remain planned.

## Stage 7–8 and partial task 12 verification

- Catalog fetches `https://dummyjson.com/products?limit=12&skip=0` with
  `useEffect`, `fetch`, `response.ok`, and abort cleanup for StrictMode/unmounts.
- Added typed ProductGrid/ProductCard, stable product keys, image/title links,
  reserved image dimensions, object-contain thumbnails, and two-decimal USD prices.
- CartProvider stays above AuthProvider and routes. Immutable functional updates
  merge repeated products and reject invalid quantities or additions beyond stock.
  Cards confirm success from the actual quantity increase; unavailable additions
  are disabled. The Header badge sums quantities and hides at zero.
- Passed: `npm run typecheck`, `npm run lint`, and `npm run build`.
- Browser-verified: loading, all 12 real products, IDs 1–12 in links, product-route
  navigation, inline success, repeated additions and the summed badge without navigation.
- Browser-verified: cart quantity survives route changes, returning to Catalog,
  login and logout. Product, Cart and Checkout remain their existing route shells.
- Browser-verified with temporary request overrides on an isolated Vite server:
  HTTP 503, network failure, successful empty response, stock 0, and stock 2
  (quantity 1 to 2, then adding is disabled). No fallback products or debug controls
  were added to application code; the temporary verification server was removed.
- Browser layout measurements confirmed 1/2/3/4 columns at 375/640/768/1280px.
  Visually checked 375px and desktop with no horizontal overflow. The real-data
  browser console had no warnings/errors.
- Additional temporary Node assertions verified rejection of zero, negative and
  fractional quantities, stock limits, no duplicate items, unit prices, and pure
  immutable updates when the updater is called twice as in StrictMode.
- No pending checks for this stage. The remaining purchase flow stays planned.

## Stage 10–13 verification

- Product uses `useParams`, validates positive safe integer IDs before fetching,
  handles API 404 with the existing NotFound, and displays loading/request errors.
  Abort cleanup and a component key prevent stale data and reset image/quantity selection.
- Added image selection, thumbnail fallback, exact stock messages, shared quantity
  steppers, and additions limited by stock already in the cart.
- Completed immutable CartContext actions. `setQuantity` replaces the total;
  `clearCart` has no confirmation. The Cart UI alone asks for confirmation.
- Cart supports editing/removal, integer-cent line/subtotal calculations, a shared
  USD formatter, empty state, and the existing guarded checkout link.
- Fixed stale stored stock after adding an existing product with fresher stock.
  Reproduction and the catalog badge-label correction are recorded in DEBUG-LOG.md.
- Passed: `npm run typecheck`, `npm run lint`, and `npm run build`.
- Browser-verified real product data and additions to an existing cart item.
- Temporary overrides verified invalid IDs `abc`, `0`, `1.5` with zero product
  requests; API 404; loading; HTTP 503/network failure; all stock messages;
  thumbnail fallback; multiple-image selection; SPA ID changes; selection reset;
  and ignoring a delayed old response even when the test response ignored abort.
- Browser-verified cumulative stock limits, quantity editing, removal, empty state,
  and synchronization of Product, Catalog and Header. Totals included
  `$59.95` for 4 × `$9.99` + `$19.99`, then `$69.94` after increasing to 5 units.
- Browser-verified the exact clear-cart prompt, native cancellation with Escape,
  and confirmation with Enter. Controlled false/true confirmation results also passed.
- Guest Cart → Login → Checkout preserved contents; logout also preserved them.
- Visually verified Product and Cart at 375px and 1280px, stacked/beside layouts,
  and no horizontal overflow. The real-data browser console was clean.
- Temporary Node assertions passed for all cart actions, invalid quantities,
  cumulative/refreshed stock, duplicate prevention, pure immutable updates,
  direct clearing without a dialog, and integer-cent currency calculations.
- Temporary verification routes, overrides and server were removed. No pending
  checks for this stage. Tasks 14–16 remain planned; no Git writes or deployment.

## Stage 14–16 verification

- Checkout has exactly four controlled fields, submit-time React validation,
  associated labels/errors and visible focus. Invalid submissions preserve values/cart.
- Cart and Checkout share `calculateSubtotalCents`, `toCents` and `formatUSD`.
  Confirmation stores independent item/delivery copies and totals before clearing.
  A ref blocks immediate duplicate submits; submission errors allow a safe retry.
- Confirmation renders before the empty-cart redirect. Orders use React state
  only, with no API, persistence, order numbers or extra checkout fields.
- Passed: `npm run typecheck`, `npm run lint`, and `npm run build`.
- Browser-verified guest Cart → Login → Checkout, authenticated empty-cart redirect,
  exact empty/whitespace/short/invalid-email errors, correction and successful submit.
- Browser-verified matching Cart/Checkout totals (`$39.97`), saved delivery/items,
  exact confirmation message, disappearing badge, empty Cart and stable confirmation.
  A rapid double click and a new purchase (`$9.99`) also passed without a page reload.
- Visually verified Checkout/confirmation at 375px and 1280px, summary below/beside
  the form, keyboard focus and no horizontal overflow. Browser console was clean.
- Temporary Node assertions verified trim boundaries, independent item copies,
  five immediate cached submits processing once, failure before clearing preserving
  values/cart and allowing retry, confirmation priority and no order API calls.
- Task 16 review found no new application bugs; DEBUG-LOG.md history is preserved.
  No pending checks or temporary verification overrides remain for this stage.

### Task 16: examples in the actual code

| Concept | Example |
| --- | --- |
| Typed props and children | `CheckoutSummaryProps`; `AuthProvider` and `CartProvider` render `children` |
| Callback props | `ProductGrid` passes `onAdd`; `QuantityStepper` calls `onChange` |
| map and stable keys | `ProductGrid`: `product.id`; `CheckoutSummary`: `item.productId` |
| Conditional rendering | `Checkout`: confirmation, empty redirect, form and errors |
| Controlled forms and useState | `Login` and `Checkout`: `value`, `onChange`, values/errors state |
| Shared Context | `AuthContext` and `CartContext` provide state/actions across routes |
| Effects and cleanup | `Catalog` (`[]`) and `Product` (`[productId]`) abort requests; `ScrollToTop` depends on `pathname` |
| Immutable updates | `CartContext` functional updates; `Checkout` copies items with `map`/spread |

## Stage 19–23: current quality status (2026-10-27)

- Preserved the existing changes. Typed class ErrorBoundary uses
  `getDerivedStateFromError` and `componentDidCatch`, an intentional error diagnostic,
  the exact fallback text, and a Reload button. Router/providers occur once, inside
  the boundary. Existing API/form error handling and application state remain unchanged.
- Passed again after removing the temporary render fault: `npm run typecheck`,
  `npm run lint`, and `npm run build`.
- Passed direct class assertions for normal children, derived fallback state,
  exact fallback text, diagnostic content, and the reload callback. Actual React
  child-render catching and browser Reload recovery now also pass, as recorded below.
- Generated production CSS contains the 481/768/1025px media rules and the
  minimum-size utilities. The five Catalog boundary measurements remain the user's
  manual evidence below; they were not repeated. ProductGrid and its styles were unchanged.
- Started the existing Vite production preview at `http://127.0.0.1:4173/` when it
  returned connection refused. The connected Chrome extension confirmed that exact
  URL and allowed local-project access. The earlier Windows Computer Use URL failure
  was not bypassed; this run used the now-available approved extension connection.
- Final preview smoke passed in a fresh Chrome tab: real Catalog → Product → Cart,
  correct item/total and an empty warning/error log. Browser-loaded assets matched
  final `dist/index.html`: `index-CQB7AyhK.js` and `index-BZy0JIxn.css`.
- No temporary fault component, crash route/query/button, test override or stray
  `console.log` remains in application source or the final bundle. The intentional
  ErrorBoundary diagnostic remains. `src/main.tsx` has the same SHA-256 as before
  fault injection: `2BB4889AD84312F166FD90458F76907EC99E84CC33ACBB093CE788DD87BA2144`.
- DEBUG-LOG now has four genuine fixed bugs. The third retains user-operated grid
  evidence; the fourth records the earlier undersized targets and their automated
  Chrome retest. Both quality fix references now identify the verified source revision below.

### Browser access, identity and remaining work

| Browser | Version actually confirmed | Current-stage status |
| --- | --- | --- |
| Google Chrome | 156.0.8078.48 | Approved extension; automated target, purchase, visual, ErrorBoundary and production checks passed; earlier grid evidence remains user-operated |
| Firefox | Pending | No Firefox browser connection or app in the available inventory; tests were not run |

The Chrome identity is supported by the connected Chrome extension and metadata of
the running `C:\Program Files\Google\Chrome\Application\chrome.exe`: ProductName
Google Chrome, ProductVersion/FileVersion 156.0.8078.48. `chrome://version/` was
rejected by the URL policy (only HTTP/HTTPS allowed); that navigation was stopped.
The version was read from local executable metadata, without controlling a blocked
browser page. The user-supplied Windows 10 Version 22H2 (Build 19045.6456) remains
operating-system evidence, not browser-version evidence for the earlier manual run.

- Pending verification: Firefox purchase/visual/recovery checks and its version;
  no approved, working Firefox capability is available. No other browser was
  relabeled as Firefox. CORE 19–23 remains in progress.
- **Verified source revision:** [dc67c1adec594662e398eae3bfbae1672c808f31](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/dc67c1adec594662e398eae3bfbae1672c808f31)
  (`fix: improve responsive sizing and add error boundary`). Read-only local Git
  inspection confirmed the 481/768/1025px grid transitions, interactive-target sizing
  corrections and ErrorBoundary implementation/wrapper. Remote push status was not checked.

### Automated Chrome target and visual verification (2026-10-27)

Read-only `getBoundingClientRect()` measurements targeted actual `#root` links,
buttons and form controls identified in source. There are no custom clickable
containers; the quantity `role="group"` is not a control. Hidden/non-rendered nodes
were excluded; disabled nodes and controls below the fold were included. There
were **81 control observations across the eight required screens**, with zero
widths or heights below 44 CSS px. The fallback Reload was checked separately.

All rows have `innerWidth = 375`. Sizes below are actual width × height in CSS px;
the common Header controls are listed after the table.

| Screen | Controls checked | Main-content targets | clientWidth / scrollWidth |
| --- | --- | --- | --- |
| Catalog | 28 | 12 product links: 294×232; 12 Add buttons: 294×44 | 360 / 360 |
| Product `/products/11` | 11 | Back: 113.375×44; 3 gallery buttons: 76×76; −/+: 44×44 (disabled − included); Add: 328×48 | 360 / 360 |
| Populated Cart | 10 | Product link: 167.28125×44; −/+: 44×44; Remove: 50.984375×44; Clear: 94.671875×44; Proceed: 278×48 | 360 / 360 |
| Login | 8 | Both inputs and submit: 293×44; Back: 113.375×44 | 375 / 375 |
| Checkout | 9 | All four inputs: 278×44; Place order: 278×48 | 360 / 360 |
| Confirmation | 5 | Back to Catalog: 113.78125×44 | 360 / 360 |
| Empty Cart after order | 5 | Browse products: 121.0625×44 | 375 / 375 |
| NotFound | 5 | Go to catalog: 98.140625×44 | 375 / 375 |

Header measurements: brand 85.515625×44; Catalog 72.828125×44; Cart 50.65625×44
or 74.65625×44 with the two-item badge; Log in 63.328125×44; Log out 73.078125×44.
Catalog included 21 controls below the fold; Product included three, including the
disabled decrease button; Cart included its below-fold checkout link. The 15px
difference on scrolling pages is the browser's vertical scrollbar, not overflow.

- Visual screenshots and layout reads passed at 375px and 1280px for Catalog,
  Product, populated/empty Cart, Login, Checkout, confirmation and NotFound.
  Document `scrollWidth` equaled `clientWidth`; desktop Catalog had 1265/1265
  with a scrollbar, and the other desktop screens had 1280/1280.
- Product content and Checkout/confirmation summaries stack on mobile and sit
  side by side on desktop. Images loaded; product images have descriptive alt
  text, gallery thumbnail images use empty alt inside labeled native buttons,
  fields have associated labels, and landmarks/headings remain semantic.
- Actual Tab navigation showed a 2px focus outline with a 3px offset on navigation
  and form inputs. The gallery's selected image/pressed state changed correctly.
  Pointer hover changed Add from indigo-600 to indigo-700, added the card shadow,
  and highlighted the quantity button. Disabled decrease buttons were 44×44,
  visibly muted and not enabled at quantity one.

### Automated Chrome purchase and ErrorBoundary verification

- Guest Catalog → Annibale Colombo Bed → Cart → Login → Checkout → confirmation
  passed on the production preview. Two units at $1,899.99 produced $3,799.98 in
  Cart, Checkout and confirmation. Login returned to Checkout with both units intact.
- Fictional delivery details (Alex Example, alex@example.test, 12 Test Street,
  Test City), item title, quantity and total remained in confirmation after the
  live cart cleared and after resizing. The badge disappeared; visiting Cart
  showed the empty state. Gallery selection, cart quantity editing and item removal
  also worked. The normal purchase run had no console warnings/errors.
- An additional native clear-dialog cancellation attempt returned an automation
  timeout and then no active dialog; the next observed Cart was empty. No new
  cancellation pass is claimed from that attempt. Earlier stage 10–13 dialog
  evidence is preserved; the full purchase test was restarted from Catalog.
- Temporarily rendered a throwing child inside the existing ErrorBoundary in a
  production build. Chrome showed the exact fallback and useful component diagnostic.
  Reload measured 89.578125×48 at 375px, with no document overflow.
- Removed the child/throw from source and built the clean version while the open
  production page kept its mounted fallback and old script `index-ca7KYRtS.js`.
  No boundary reset or page navigation occurred during removal. Clicking the actual
  Reload button loaded `index-CQB7AyhK.js`, removed the fallback and restored Cart.
  The intentional test exception is not an application bug. Final source/bundle
  scans found no probe or fault marker; final clean-tab smoke had no warnings/errors.

### Original pre-fix Catalog measurements (preserved)

These are the original **pre-fix embedded-browser** observations. They are not Chrome
observations. The separate post-fix user-operated Chrome evidence follows below.

| Viewport | Original columns | Intended columns after correction |
| --- | --- | --- |
| 480px | 1 | 1 |
| 481px | 1 | 2 |
| 1024px | 4 | 3 |
| 1025px | 4 | 4 |

### User-operated manual Chrome grid verification (2026-10-27)

The user ran the read-only DevTools Console measurement on the production preview's
Catalog page and supplied these actual post-fix results:

| innerWidth | clientWidth | scrollWidth | gridTemplateColumns | columnCount |
| --- | --- | --- | --- | --- |
| 375 | 375 | 375 | `343px` | 1 |
| 480 | 480 | 480 | `448px` | 1 |
| 481 | 481 | 481 | `212.5px 212.5px` | 2 |
| 1024 | 1024 | 1024 | `309.328px 309.328px 309.344px` | 3 |
| 1025 | 1025 | 1025 | `226.25px 226.25px 226.25px 226.25px` | 4 |

Verified by the user: intended column counts at all five widths and no horizontal
document overflow on Catalog (`scrollWidth === clientWidth` in every supplied row).
These manual measurements cover Catalog grid boundaries only; the separate automated
Chrome evidence above covers other screens, targets, purchase flow and recovery.
Firefox remains pending. Fix commit:
[dc67c1adec594662e398eae3bfbae1672c808f31](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/dc67c1adec594662e398eae3bfbae1672c808f31).

### Interactive targets: original pre-fix observations (preserved)

Original embedded-browser 375px targets included: brand link 85.52×28px; navigation 36px high;
quantity buttons 40×40px; Remove 50.98×20px; Clear cart 94.67×38px;
catalog Add buttons 40px high; form inputs 42px high; short text links 20–24px high.
Image selectors were already 76×76px. Their separate automated Chrome post-fix
measurements are recorded above. These original observations are not relabeled as
Chrome observations. Quality (Firefox pending), final documentation and deployment
are not complete; the source fix references are now verified.

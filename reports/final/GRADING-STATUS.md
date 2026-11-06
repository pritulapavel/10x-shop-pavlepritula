# 10X Shop grading status · 2026-11-06

[Original assessment of `967e75c`](GRADING-967e75c.md) is preserved byte for byte. This matrix covers its 83 CORE, 46 FULL and one bonus ID. It is a remediation record, not an assessor's revised grade.

Candidate: `test/firefox-compatibility` at `fdf9ced12015021fd5b7cb5cedb071fd51de0e69` with unstaged source changes. The production preview at `http://127.0.0.1:4208/` loaded `index-DJmMyxpY.js`. The live domain still loaded `index-2SMlxQzf.js`. “Passed” applies only to the evidence scope in the row. Earlier browser and historical process results remain separate from final candidate publication.

## Delivery and process

| ID | Requirement | Implementation / evidence | Status | Remaining action |
| --- | --- | --- | --- | --- |
| C-D01 | Public repository with the required name | Connected GitHub metadata reported `pritulapavel/10x-shop-pavlepritula`, visibility public | Passed | Owner checks the URL signed out before submission |
| C-D02 | Complete English README | About, CORE/FULL, stack, tree, data flow, startup, scripts, live link and credits in [README](../../README.md) | Passed | Add the actual demo link when recorded |
| C-D03 | Working live link in README | [Chrome live observation](chrome-checks.json) rendered Catalog on the published domain with the old entry | Passed | Confirm the same URL serves the final candidate after publication |
| C-D04 | CORE/FULL plan, three dated weeks, before code and by Oct 23 | [PLAN](../../PLAN.md) now has a dated WBS. `64d85cc` first added it Oct 26 before `5c46c1e` | Partial | Report the missed historical date as-is |
| C-D05 | Planned/delivered scope, gaps, three challenges and AI disclosure | [REPORT](../../REPORT.md) covers scope, pricing, legacy storage and order snapshots plus AI assistance | Passed | Update hosted results after publication |
| C-D06 | Genuine descriptive Git history | Original 12 commits / 5 dates. Current candidate HEAD has 15 / 6, recorded `origin/main` has 18 / 6 | Passed | Preserve real history |
| C-D07 | Version available by the deadline | Original assessor reviewed `967e75c`. The final follow-up is still local | Partial | Owner publishes and submits the exact revision before cutoff |
| F-D01 | GitHub Project and at least 20 issues | Connected issue search returned 0. [21 substantive task definitions](GITHUB-TRACKING.md) are local; Project and milestones unverified | Failed | Owner checks duplicates, creates or links the actual issues and Project, and adds evidence links |
| F-D02 | At least 40 commits over at least 15 days | Recorded `origin/main` has 18 commits over 6 dates; historical baseline 12 / 5 | Failed | Report the true count; historical cadence cannot be retroactively earned |
| F-D03 | At least 8 merged PRs | Connected GitHub search and Git merge history show #1–#3, three merged PRs | Failed | Report the real count; merge only substantive work |
| F-D04 | Three weekly progress notes | Three [retrospective notes](../../docs/progress/week-01.md) now exist and are linked from the plan | Partial | Submit as retrospective; timely posting has no evidence |
| F-D05 | Demo video | [Timed 2:40 script](../full/DEMO.md) prepared | Awaiting verification | Record the video, link it in README and check assessor access |
| F-D06 | WBS, estimated effort, ≥3 risks and DoD | [PLAN](../../PLAN.md) has 44 estimated hours, per-task acceptance, four risks and a DoD | Passed | Use the DoD for the owner handoff |
| F-D07 | Report with bundle, commit/PR/Issue counts, hours and Lighthouse | [Metrics](../../REPORT.md#metrics-as-of-2026-11-06) separate local size, current history and historical audits | Partial | Add a clean final audit and any real time records if available |

## Technology and architecture

| ID | Requirement | Implementation / evidence | Status | Remaining action |
| --- | --- | --- | --- | --- |
| C-T01 | Vite, no CRA | `package.json` and `vite.config.ts` use Vite 8.3.5 at build time | Passed | None |
| C-T02 | React 19, React Router and TypeScript | Runtime and dev dependencies are in `package.json` | Passed | None |
| C-T03 | Strict TypeScript | `tsconfig.app.json` sets `strict` and unused checks | Passed | None |
| C-T04 | Real app typecheck | `tsc -b --force` checks referenced app/node projects; final run passed | Passed | None |
| C-T05 | Working production build | Final Vite build passed; port 4208 served `index-DJmMyxpY.js` | Passed | None locally |
| C-T06 | Required npm scripts | `dev`, `build`, `preview`, `typecheck`, `lint` | Passed | None |
| C-T07 | No explicit `any` | ESLint check passed and decoders narrow `unknown` | Passed | None |
| C-T08 | Required domain and form types | `src/types.ts` defines Product, response, Cart and Login/Checkout shapes | Passed | None |
| C-T09 | Typed props and API payloads | ProductCard and stepper props; `ApiClient.get<T>` with typed decoders | Passed | None |
| C-T10 | No suppression or unsafe unchecked casts | Checked by typecheck and source review. `main.tsx` retains the template root assertion covered by fixed `index.html` | Passed | None |
| F-T01 | Generics | `useRequest<T>`, `ApiClient.get<T>` and `StorageService<T>` | Passed | None |
| F-T02 | ApiError subclass | `src/utils/api.ts` defines `ApiError extends Error` with HTTP status | Passed | None |
| F-T03 | Type guards | `isApiError`, `isCartItem`, `isRecord` and validated storage readers | Passed | None |
| F-T04 | Discriminated unions | `AsyncState<T>` and `CartAction` discriminate status and action | Passed | None |
| F-T05 | Utility types and literal unions | `Partial`, `Pick`, `Parameters`, `CatalogSort`, `PromoCode` and `OrderStatus` | Passed | None |
| F-T06 | OOP and storage constants | Cart, Order, ApiClient, StorageService and `STORAGE_KEYS as const` | Passed | None |
| F-T07 | ESLint with hooks and no-explicit-any | Final lint passed. Rules are explicit in `eslint.config.js` | Passed | None |
| C-R01 | Functional components and separation | `pages`, `components`, `context`, `hooks`, `utils` follow the [architecture tree](../../README.md#architecture) | Passed | None |
| C-R02 | `children` composition | Providers, ErrorBoundary and layout compose children | Passed | None |
| C-R03 | Stable keys | Product IDs, cart IDs, order IDs and pagination numbers identify rows | Passed | None |
| C-R04 | Immutable updates | Cart reducer uses copied arrays and objects; [cart tests](../full/check-cart.mjs) | Passed | None |
| C-R05 | Conditional rendering | Catalog request states, auth links, empty Cart and Checkout confirmation | Passed | None |
| C-R06 | Effect dependencies and cleanup | `useRequest` aborts on key changes and unmount; Reorder abort verified in [fixture](chrome-checks.json) | Passed | None locally |
| C-R07 | Auth and cart context | Shared `AuthContext` and reducer-backed `CartContext` | Passed | None |
| C-R08 | Callback props and lifted state | Grid sends add callback, stepper emits quantity, pagination calls Catalog URL update | Passed | None |
| F-R01 | Custom hooks | Generic `useRequest` and `useOrderClock` used by routes | Passed | None |
| F-R02 | Formik and Yup | Review and Profile validation in `ProductReviews` and `Profile` | Passed | None |

## CORE routes, login and shopping

| ID | Requirement | Implementation / evidence | Status | Remaining action |
| --- | --- | --- | --- | --- |
| C-P0-01 | One BrowserRouter and shared Layout | Router in `main.tsx`, shared Header/Outlet/Footer in Layout | Passed | None |
| C-P0-02 | All required routes | `App.tsx` defines index, login, product, Cart, protected Checkout and wildcard | Passed | None locally |
| C-P0-03 | Active NavLink state | `StoreNavigation` uses NavLink and accessible active styles | Passed | None locally |
| C-P0-04 | App NotFound and missing product | Product ID validation and API 404 use shared NotFound; earlier [Chrome checks](../full/chrome-preview.json) | Passed | Retest on the published candidate under C-DP03 |
| C-P0-05 | Scroll to top on route changes | `ScrollToTop` observes pathname and search | Passed | None |
| C-P0-06 | Header brand, Cart badge and auth actions | Shared Header navigation and quantity-aware badge. Chrome verified and owner saw the badge disappear in Firefox | Passed | None locally |
| C-P0-07 | Logout returns to guest Catalog and keeps cart | Auth logout transitions route and session together. [Chrome evidence](../../COMPATIBILITY.md) | Passed | Firefox final logout retest is part of C-O06 |
| C-P0-08 | Guest Checkout login return | Chrome and [owner Firefox](../../docs/compat/firefox/2026-11-06/README.md) reported return to Checkout | Passed | None locally |
| C-P0-09 | Loading, error and empty states | Catalog skeleton/Retry/empty and Product loading/Retry/404 | Passed | Verify adverse API timing in final Firefox |
| F-P0-01 | Lazy routes and Suspense | Secondary routes lazy imported; isolated [Error Boundary fixture](../full/error-boundary.html) | Passed | None locally |
| F-P0-02 | Toast feedback | Toast provider with live status. Full and partial Reorder toasts observed | Passed | None locally |
| F-P0-03 | Theme | Light/dark theme provider persists setting; both themes checked | Passed | None locally |
| C-P1-01 | Controlled login form and preventDefault | React state and `handleSubmit` in Login | Passed | None |
| C-P1-02 | Trim username and require six-character password | Login validates before changing auth state | Passed | None |
| C-P1-03 | Exact login error strings | Username required, password required and minimum length messages in Login | Passed | None |
| C-P1-04 | Login to requested Checkout or root | Route state validated in Login and observed in both browser paths | Passed | None locally |
| C-P1-05 | No auth API or password persistence | `AuthContext` stores session in memory. Owner saw expected logout on F5 | Passed | None |
| C-P1-06 | Back to catalog link | Native React Router Link in Login | Passed | None |
| C-P2-01 | Initial GET with limit 12 and skip 0 | `catalogRequest` uses `PAGE_SIZE = 12`; 12 initial products observed | Passed | None locally |
| C-P2-02 | Typed ProductCard/Grid and product keys | Typed card/grid props and stable `product.id` key | Passed | None |
| C-P2-03 | Lazy sized thumbnail, title, category, brand and rating | ProductCard renders all fields. Decorative thumbnail has `alt=""`; adjacent title names the link | Passed | None locally |
| C-P2-04 | Discounted, struck-through and percent pricing | Shared ProductPrice; $8.99 to $7.96 at 11.44% was observed | Passed | None locally |
| C-P2-05 | Shared discounted price and two-decimal USD format | `discountedPrice`, `formatCents` and [pricing regression](../full/check-pricing.mjs) | Passed | None |
| C-P2-06 | Exact stock labels and color tiers | [Chrome fixture](chrome-checks.json) measured danger at 0, warning at 5, success at 6, both themes | Passed | Retest final hosted render |
| C-P2-07 | Card link, add action and disabled stock zero | Separate Product link and button. Fixture confirmed disabled Out of stock | Passed | None locally |
| C-P2-08 | Exact empty Catalog message | Catalog renders `No products found.` and Clear filters | Passed | None locally |
| F-P2-01 | Search | Debounced `q` and API search; final Chrome observed `phone` | Passed | None locally |
| F-P2-02 | Category selection | API categories and selection observed with groceries; search replaced | Passed | None locally |
| F-P2-03 | Sorting | API `sortBy/order`, final price-desc retained in URL | Passed | None locally |
| F-P2-04 | Accessible numbered pages and boundaries | [Chrome](chrome-checks.json) checked first/last, ellipses, 12 items, 44 px, Enter, active filters and reload | Passed | Retest the four changes on final Firefox/hosted candidate |
| F-P2-05 | URL state and browser history | Page/query/category/sort preserved through direct URL, Back, Forward and F5 | Passed | None locally |
| F-P2-06 | Abort stale request | `useRequest` aborts and matches result key/attempt before rendering | Passed | Final Firefox timing check remains open |
| F-P2-07 | Skeleton and Retry | CatalogSkeleton and explicit request Retry controls | Passed | Final Firefox offline/retry check remains open |
| C-P3-01 | Product ID from route and request dependencies | `useParams`, keyed ProductDetails and `useRequest` keyed by ID | Passed | None locally |
| C-P3-02 | Product details including discounted price and stock | Shared ProductPrice/StockBadge, image and description | Passed | None locally |
| C-P3-03 | Invalid and missing product use NotFound | Invalid IDs rejected before request; API 404 handled separately from other errors | Passed | Hosted retest under C-DP03 |
| C-P3-04 | Stepper and disabled stock boundaries | Available stock accounts for units in cart. Zero-stock Add was disabled in final fixture | Passed | None locally |
| C-P3-05 | No add past stock, with inline feedback | Product calculates available stock; reducer also validates inventory and UI announces the add | Passed | None locally |
| C-P3-06 | Back to catalog link | Product has the required React Router link | Passed | None |
| F-P3-01 | Gallery | Selectable labeled native thumbnail buttons; [previous candidate check](../lighthouse/2026-11-06/candidate/verification.json) switched the main image | Passed | None locally |
| F-P3-02 | Product tabs | ProductReviews uses tablist, tabs, panels and arrow-key navigation | Passed | Final Firefox keyboard check remains open |
| F-P3-03 | Write and persist reviews | Formik/Yup review form and validated local review map; earlier Chrome reload evidence | Passed | Final Firefox review retest remains open |
| F-P3-04 | Related products | Category query, omits current item and limits cards | Passed | None locally |
| C-P4-01 | Immutable shared cart operations | CartContext exposes add, remove and setQuantity through reducer | Passed | None |
| C-P4-02 | Cart row fields and controls | Lazy thumbnail, linked title, unit price, stepper, line total and Remove | Passed | None locally |
| C-P4-03 | Stock-bounded quantities | Reducer and stepper enforce `1 ≤ quantity ≤ stock` | Passed | None |
| C-P4-04 | Discounted cent-based totals | Pricing regression and four matching Firefox purchase totals on port 4205 | Passed | None locally |
| C-P4-05 | Confirmed cart clearing | ConfirmAction allows cancel and confirm. Earlier Chrome evidence | Passed | None locally |
| C-P4-06 | Empty Cart and Browse products | Cart shows empty copy/link without a summary. Firefox saw empty Cart after F5 | Passed | None locally |
| C-P4-07 | Checkout link and synced badge | Cart link and shared Header quantity observed in Chrome and Firefox | Passed | None locally |
| C-P4-08 | Validated `shop_cart` persistence | Lazy reducer initializer and persistence effect; owner reported retained quantity and promo after F5 | Passed | None locally |
| F-P4-01 | useReducer and CartAction | Reducer and discriminated actions in `src/context/cartReducer.ts` | Passed | None |
| F-P4-02 | Promo 10X10 | Trimmed case-insensitive promo, error and removal path. Owner confirmed valid and invalid code | Passed | None locally |
| F-P4-03 | Shipping and Cart class | Cart class uses $10 below $100 before promo; Node verifies both boundaries | Passed | None |
| C-P5-01 | Protected Checkout | RequireAuth wraps Checkout; direct navigation guards tested | Passed | None locally |
| C-P5-02 | Four controlled Checkout fields | Full name, email, address, city use labels and controlled values | Passed | None |
| C-P5-03 | Exact field validation messages | Source strings and four errors reported by owner in Firefox; earlier Chrome evidence in both themes | Passed | None locally |
| C-P5-04 | Empty Checkout routes to Cart with message | Cart displays the `empty-checkout` notice; earlier Chrome observed it | Passed | None locally |
| C-P5-05 | Order summary and total | Shared totals and CheckoutSummary. $26.09 throughout the owner's Firefox retest | Passed | None locally |
| C-P5-06 | Disabled submission and duplicate protection | Checkout checks a synchronous ref and `isSubmitting`. Owner observed 0 → 1 from one send | Passed | Rapid double-click on final Firefox remains unrecorded |
| C-P5-07 | Confirmation and cleared cart | Owner saw matching confirmation/Orders totals, badge gone and empty Cart after F5 | Passed | Final hosted purchase check remains open |
| C-P5-08 | No payment fields or API submission | Order simulation only, with local delivery snapshot | Passed | None |
| F-P5-01 | Durable `shop_orders` | Validated order snapshots. Node storage test and owner saw saved Order total | Passed | None locally |

## Orders, profile, styling and delivery QA

| ID | Requirement | Implementation / evidence | Status | Remaining action |
| --- | --- | --- | --- | --- |
| F-P6-01 | Protected Orders list and order numbers | `Order #10X-00001` shown in Orders from unchanged numeric storage in fixture | Passed | Retest hosted after publication |
| F-P6-02 | Derived order status | `Order.statusAt()` and boundary assertions for Processing/Shipped/Delivered | Passed | None |
| F-P6-03 | Status clock and cleanup | `useOrderClock` updates periodically with interval cleanup | Passed | None |
| F-P6-04 | Order Details, snapshot and stock-aware Reorder | [Chrome fixture](chrome-checks.json) confirmed reload, full/partial toast + Cart, zero/retry and abort on leaving | Passed | Retest final Firefox and deployed candidate |
| F-P7-01 | Profile, display name and optional phone | Formik/Yup and Header update. [Final Chrome phone checks](profile-phone-checks.json) verified optional whitespace, digit boundaries, formatting, exact accessible error, no invalid save and valid correction | Passed | Final Firefox profile check remains open |
| F-P7-02 | Persistent theme switch | Header/Profile share theme and local preference; Chrome tested reload | Passed | Final Firefox theme check remains open |
| F-P7-03 | Scoped clear local data | Profile removes cart/orders/reviews with confirmation and retains theme/session | Passed | Final Firefox clear-data check remains open |
| C-TW01 | Tailwind CSS v4 | Vite Tailwind plugin and `@import "tailwindcss"` | Passed | None |
| C-TW02 | Utilities on at least three components | Header, CatalogPagination, Cart, Checkout and product components use utilities | Passed | None |
| C-TW03 | Mobile-first flex/grid | 481/768/1025 grid boundaries; Header layout and mobile controls measured | Passed | None locally |
| C-TW04 | Hover, visible focus and disabled treatments | Theme CSS, hover/disabled measurements and native keyboard controls | Passed | Final Firefox/Edge or Safari check remains open |
| F-TW01 | Theme tokens | `@theme inline` exposes surface, ink, danger, warning and success colors | Passed | None |
| B-TW01 | Dark mode, custom variants or utilities | Persistent dark theme via `data-theme` and CSS tokens. Custom Tailwind variants or `@utility` are absent | Partial | Assessor decides whether the implemented dark mode alone earns bonus |
| C-O01 | Error Boundary fallback and Reload | Shared Error Boundary. Earlier real fault and isolated lazy fixture recovered after Reload | Passed | Final Firefox fallback test remains open |
| C-O02 | At least three documented real bugs with commit references | [DEBUG-LOG](../../DEBUG-LOG.md) has seven existing verified issues and source commit links | Passed | None |
| C-O03 | 375 px responsiveness, Header through 480 px, required grid | Historical Chrome per-route measurements and current 375 px pagination 44 px/no overflow | Passed | Repeat final live Catalog/Product/Cart/Checkout viewport checks |
| C-O04 | Accessibility semantics, labels, alt and focus | Shared semantic layout, named inputs, decorative alt/title links, accessible pagination | Passed | Final Firefox/Edge keyboard spot-check remains open |
| C-O05 | No stray production console logging | Source review found only intentional Error Boundary `console.error` | Passed | None |
| C-O06 | Chrome and Firefox functional verification | Chrome final changes and owner Firefox purchase on 4205 with four $26.09 totals and 0 → 1 order | Partial | Check changed scenarios and remaining compatibility on final Firefox, and record deployed results separately |
| F-O01 | Comparable Lighthouse before/after | Multiple [production baselines](../lighthouse/2026-11-06/README.md); 20:26 reports have extension data and the old bundle | Partial | Audit verified final deployment in clean Chrome Mobile Navigation, and Desktop where available |
| F-O02 | COMPATIBILITY report and cross-browser evidence | [COMPATIBILITY](../../COMPATIBILITY.md) separates Chrome, owner Firefox and blocked Edge/Safari | Partial | Record final Firefox and Edge/Safari checks with real versions |
| F-O03 | At least five genuine debug cases | Seven documented cases with observed failures, fixes, evidence and commit references | Passed | None |
| F-O04 | Evidence-based memoization | ProductCard `memo`, stable add callback and [Profiler samples](../full/profiler-results.json) | Passed | None |
| C-DP01 | SPA rewrite | Existing Vercel config retained; local direct routes served the SPA shell | Passed | Verify hosted rewrite after publication |
| C-DP02 | Live root and direct Product route | Live root observed on older bundle; final local Product and Order Details SPA shell served HTTP 200 | Partial | Owner deploys the final revision and reloads both live direct routes |
| C-DP03 | Live unknown path and product show app 404 | Older hosted `/robots.txt` rendered app NotFound; current wildcard/API 404 in source | Awaiting verification | On final deployment open `/abc` and `/products/999999` and verify Header, Footer, heading and catalog link |

[Owner publication checklist](PUBLICATION.md) · [GitHub task definitions](GITHUB-TRACKING.md) · [Demo](../full/DEMO.md)

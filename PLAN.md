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
- [ ] **14–16: Checkout and review.** Add the checkout form, local order
  confirmation, and the React concepts review. Checkout remains a protected shell.
- [ ] **19–23: Quality.** Check the UI at 375px and desktop, hover/focus states,
  and the purchase flow. Add an Error Boundary, record real debugging sessions,
  and finish with clean typecheck/build results.
- [ ] **24–25 and 28: Delivery.** Deploy, verify direct-route refresh, write the
  English README, REPORT, and DEBUG-LOG, maintain genuine Git history, and
  complete final verification. Deployment and Git writes belong to later stages.

## Planned routes and behavior

- `/`: catalog. Other routes: `/login`, `/products/:id`, `/cart`, `/checkout`, and `*`.
- Login is a local simulation. Checkout requires login and has `fullName`,
  `email`, `address`, and `city`. Order confirmation is local.
- Stay within CORE scope; detailed requirements will guide later stages.

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

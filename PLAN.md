# CORE project plan

Implement one stage at a time. Future features wait for their detailed requirements.
Checkboxes mark verified work only.

- [x] **1–2: Configuration and project plan.** Verify React 19 and its types,
  Vite, strict TypeScript, Tailwind CSS v4, ESLint, and all five npm scripts;
  document this CORE roadmap.
- [x] **3–6: Foundation.** Add required types, shared Layout/Header/Footer,
  routing, local AuthContext login/logout, and a checkout login redirect.
- [ ] **7–8: Catalog.** Fetch DummyJSON products; handle loading, error, and
  empty states; add product cards and a responsive grid.
- [ ] **10–16: Purchase flow.** Add product details, quantity selection, shared
  CartContext, cart editing and totals, checkout, local order confirmation,
  and a React concepts review.
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
- Catalog, Product, Cart and Checkout contain headings only. Data fetching,
  CartContext, totals, checkout fields and order confirmation remain planned.

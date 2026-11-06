# 10X Shop

## About

10X Shop is an educational storefront. Browse live catalog data, compare prices and complete a simulated checkout without payment.

## Implemented features

- **CORE:** Browse product cards and details with stock, ratings and discounts. Use a shared persistent cart, integer-cent pricing, local sign-in and a protected checkout with confirmation.
- **FULL:** Catalog search, category, sort and numbered pagination use the URL. Search updates it after 400 ms. Back, Forward and reload restore the catalog selection.
- Product details include a gallery, keyboard-operable review tabs, local reviews and related products.
- The cart persists locally and accepts promo code `10X10` for 10% off items. Shipping is $10 below a $100 product-discounted subtotal, measured before the promo.
- Checkout saves an order in the browser. Orders show numbers such as `Order #10X-00001`, frozen purchase prices and a simulated timeline. Reorder checks current stock and opens Cart if it adds units.
- Profile editing updates the current local session. The light/dark theme persists. Confirmed local-data clearing removes cart, orders and reviews while retaining the session and theme.

## Tech stack

React 19, React Router 7, strict TypeScript, Vite 8, Tailwind CSS 4, Formik, Yup and ESLint.

## Architecture

```text
src/
├── main.tsx       Router, Error Boundary and app providers
├── App.tsx        routes and lazy route imports
├── pages/         Catalog, Product, Cart, Checkout, Login, Orders, OrderDetails, Profile
├── components/    shared layout, product grid, pagination, forms and summaries
├── context/       session, cart reducer, orders, reviews, theme and toast
├── hooks/         request lifecycle and order clock
├── utils/         API decoding, URL queries, cent pricing and validated storage
└── types.ts       API, app state, form and snapshot types
```

Catalog maps URL parameters to a DummyJSON query. `useRequest` starts and cancels requests, and the API client validates each response. Cart actions update a shared reducer and persist through validated storage. The route guard returns a guest to the protected page after sign-in. Checkout saves a copy of the delivery details, items and totals before clearing the cart. Secondary routes load through React.lazy and Suspense.

## Installation and local startup

```sh
git clone https://github.com/pritulapavel/10x-shop-pavlepritula.git
cd 10x-shop-pavlepritula
npm ci
npm run dev
```

## npm scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run typecheck` | Strict TypeScript checks |
| `npm run lint` | ESLint checks |
| `npm run build` | Typecheck and build `dist/` |
| `npm run preview` | Serve the production build locally |

## Demo account and limitations

Use `demo` / `demo123`. Simulated sign-in accepts a nonblank username and a password of at least six characters. Session and profile state reset on full reload. Cart, theme, reviews and orders are local to the browser profile and origin. Order snapshots include the fictional delivery details entered during the demo.

## Live demo

The [live demo](https://10x-shop-pavlepritula.vercel.app/) was verified on November 6, including direct Product reload, app NotFound and a simulated purchase. It served `index-C3zB35AX.js`; the follow-up promo hint has been verified locally and awaits publication. Vercel settings are `main`, repository root, Vite preset, `npm run build`, and `dist` with the SPA fallback. No environment variables are needed.

[Delivery plan](PLAN.md) · [Report](REPORT.md) · [Grading status](reports/final/GRADING-STATUS.md) · [Browser evidence](COMPATIBILITY.md) · [Hosted Lighthouse evidence](reports/final/2026-11-06/README.md)

**Demo video:** recording pending. [2:40 walkthrough script](reports/full/DEMO.md)

## Defense walkthrough

1. Open [Catalog](src/pages/Catalog.tsx). Explain why filters, sort and page live in the URL and how [useRequest](src/hooks/useRequest.ts) stops stale responses from winning.
2. Open [Product](src/pages/Product.tsx). Explain how the product key resets image and quantity when the route ID changes, and how the stepper and reducer enforce stock.
3. Open [currency](src/utils/currency.ts) and [cart storage](src/utils/cartStorage.ts). Show discounted unit cents before multiplication and how the type guard handles invalid stored values.
4. Open [Checkout](src/pages/Checkout.tsx). Show the synchronous submit guard and why confirmation renders before the empty-cart redirect. Explain the saved snapshot and stock-aware Reorder in [OrderDetails](src/pages/OrderDetails.tsx).
5. Point to the [debug log](DEBUG-LOG.md), [grading evidence](reports/final/GRADING-STATUS.md) and [2–3 minute demo script](reports/full/DEMO.md). State which local checks passed and which hosted checks remain open.

## Credits

[DummyJSON](https://dummyjson.com/docs/products) supplies catalog data and assets. The 10X mark and school social links come from the [10X site](https://10x.edu.ge/). OpenAI Codex assisted with implementation, verification and documentation. [Earlier production evidence](reports/core/REPORT.md)

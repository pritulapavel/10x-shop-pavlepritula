# 10X Shop

10X Shop is a demo storefront built with React, Vite, strict TypeScript and Tailwind CSS. The catalog, categories, product images and API reviews come from [DummyJSON](https://dummyjson.com/docs/products).

[Live demo](https://10x-shop-pavlepritula.vercel.app/) · [Delivery plan](PLAN.md) · [Report](REPORT.md)

## Features

- CORE product cards and details include stock, ratings, original prices and discounts. Cart and checkout share integer-cent pricing.
- Catalog search, category, sort and pagination use the URL. Search updates the URL after 400 ms. Back, Forward and reload restore the catalog selection.
- Product details include a gallery, keyboard-operable review tabs, local reviews and related products.
- The cart persists locally and accepts promo code `10X10`. Shipping is $10 below a $100 product-discounted subtotal, measured before the promo.
- Checkout saves an order in the browser. Orders and order details show frozen purchase prices, a simulated status timeline and stock-aware Reorder.
- Profile editing updates the current local session. The light/dark theme persists. Confirmed local-data clearing removes cart, orders and reviews while retaining the session and theme.

## Run locally

```sh
git clone https://github.com/pritulapavel/10x-shop-pavlepritula.git
cd 10x-shop-pavlepritula
npm ci
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run typecheck` | Strict TypeScript checks |
| `npm run lint` | ESLint checks |
| `npm run build` | Typecheck and build `dist/` |
| `npm run preview` | Serve the production build locally |

Demo login accepts a username and a password of at least six characters. Use `demo` / `demo123`. Authentication and profile details belong to the current tab session. Cart, theme, reviews and orders belong to the browser profile and origin. Demo delivery details are stored in order snapshots on that origin.

## Structure

- `src/pages` contains routes for the catalog, product, cart, checkout, login, orders and profile.
- `src/components` contains the shared layout, price and stock presentation, checkout summary and forms.
- `src/context` contains app state and the pure cart reducer. `src/utils` handles API decoding, pricing, order snapshots and typed storage.
- `reports/full` contains current regression checks, browser evidence and a demo script. [Compatibility](COMPATIBILITY.md) records tested versions.

The initial catalog loads eagerly. Secondary routes load through React.lazy and Suspense. Review and profile forms use Formik and Yup. Vercel serves the SPA with the existing route rewrite. Publication of this working tree and its hosted verification are pending.

Earlier production observations remain in [CORE verification history](reports/core/REPORT.md). Credits go to DummyJSON for catalog assets and data, and to OpenAI Codex for implementation and verification assistance.

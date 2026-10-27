# 10X Shop

## About

10X Shop is an educational CORE storefront built with React and TypeScript.
It demonstrates product loading, shared state, local login and a complete simulated
purchase flow, from browsing a catalog to viewing an order confirmation.

## Implemented features

- DummyJSON catalog of 12 products, with loading, error and empty states.
- Product details with image selection, quantity controls, stock limits and NotFound handling.
- Shared cart with a quantity badge, editing, removal, confirmed clearing and USD totals calculated in cents.
- Local login/logout and a protected checkout that returns guests to checkout after login.
- Validated checkout with `fullName`, `email`, `address` and `city`, duplicate-submit protection,
  and a local confirmation snapshot saved before clearing the cart.
- Shared Header/Layout/Footer, responsive layouts, keyboard focus and hover/disabled states,
  plus an ErrorBoundary with a Reload button.

## Tech stack

- React 19 and React DOM 19, with matching React 19 TypeScript types.
- TypeScript 6 with strict, unused-code and switch-fallthrough checks.
- Vite 8 with `@vitejs/plugin-react`; React Router DOM 7 for routing.
- Tailwind CSS 4 through `@tailwindcss/vite` and the CSS import.
- ESLint 10 with `typescript-eslint` and React Hooks rules. The lint script runs
  ESLint; Oxlint remains a dependency from the scaffold.

## Architecture

```text
src/
├── components/   # Layout, navigation, product cards, summaries, controls, ErrorBoundary
├── context/      # AuthContext and CartContext
├── pages/        # Catalog, Product, Cart, Login, Checkout, NotFound
├── utils/        # Shared currency calculations and formatting
├── App.tsx       # Route definitions
├── main.tsx      # Router, providers and ErrorBoundary setup
├── types.ts      # Shared application types
└── index.css     # Tailwind import and global focus styles
```

Catalog and Product load DummyJSON data with `fetch` inside effects and use
`AbortController` cleanup to ignore obsolete requests.
AuthContext and CartContext share local login state and a cart with stock limits across pages.
BrowserRouter renders `/`, `/products/:id`, `/cart`, `/login`, protected `/checkout`
and a `*` NotFound route inside the shared Layout.
Checkout validates four fields, uses the shared currency helpers and copies the
items, delivery details and totals into confirmation state before clearing the cart.

## Installation and local startup

Prerequisites: Git, npm and Node.js 22.13+ within 22.x, or Node.js 24+.
For a fresh checkout:

```sh
git clone https://github.com/pritulapavel/10x-shop-pavlepritula.git
cd 10x-shop-pavlepritula
npm ci
npm run dev
```

For an existing checkout, skip cloning and run the npm commands from its root.
Open the URL printed by Vite, normally [http://localhost:5173/](http://localhost:5173/).
No API key or environment file is required; product loading needs internet access.

To view a production build locally:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Open [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

## npm scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reloading. |
| `npm run build` | Check TypeScript project references and create the production build in `dist/`. |
| `npm run preview` | Serve the existing production build locally; run build first. |
| `npm run typecheck` | Run `tsc -b --force` to check application TS/TSX and `vite.config.ts` through project references. |
| `npm run lint` | Run ESLint, including TypeScript and React Hooks checks. |

## Test login

Use username `demo` and password `123456`.
The implementation accepts any username that is non-empty after trimming and a
password of at least six characters, so this example satisfies its validation.
Login is a local simulation with no registration or server credential check.

## Known limitations

- Authentication and cart contents exist only in React memory. They survive route
  changes but reset on a page reload or tab close; logout preserves the cart.
- Confirmation belongs to the mounted Checkout page. It survives cart clearing,
  but leaving that page or reloading loses it. Orders are not sent to a backend;
  there is no payment processing or order persistence.
- Catalog data and image URLs depend on the external DummyJSON service. The catalog
  loads a fixed first set of 12 products.
- Firefox verification and its version remain pending because no approved connection
  is available. Deployment, deployed-route refresh checks and the deployed-site
  Lighthouse report are also pending. Detailed evidence is recorded in PLAN.md.

Verified source revision:
[dc67c1adec594662e398eae3bfbae1672c808f31](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/dc67c1adec594662e398eae3bfbae1672c808f31)
contains the responsive-grid and interactive-target fixes and ErrorBoundary.
Its diff was inspected locally; remote push status was not checked.

## Deployment preparation: Vercel

Use these settings when importing the repository into Vercel:

| Setting | Value |
| --- | --- |
| Repository | `pritulapavel/10x-shop-pavlepritula` |
| Production branch | `main` |
| Framework preset | Vite |
| Root directory | Repository root (`.`) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variables | None required by the current source. |

The root `vercel.json` adds the `/index.html` SPA rewrite for BrowserRouter deep
links, following the [official Vite on Vercel guide](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas).
Configuration is prepared; an actual deployment and hosted direct-route/refresh
checks are pending. A local build or Vite preview does not verify Vercel routing.
After publication, record the live URL, verify hosted routes and the purchase flow,
and run the basic Lighthouse report on the deployed site. Firefox remains pending.

## Live Demo

**Pending deployment.** No public demo URL is available yet.

## Credits

- Product data and image URLs: [DummyJSON products API](https://dummyjson.com/products?limit=12&skip=0).
- Initial scaffold: Vite's React and TypeScript template.
- OpenAI Codex assisted with planning, implementation, debugging, verification
  and documentation. The user supplied the manual Chrome grid measurements;
  PLAN.md distinguishes those results from automated browser checks.
- REPORT.md summarizes the CORE scope and verification; DEBUG-LOG.md preserves
  four genuine bugs, their corrections and evidence.

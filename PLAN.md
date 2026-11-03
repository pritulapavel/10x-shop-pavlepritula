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
  verified bugs. The production URL is available; external route evidence and the
  agent's completed production Checkout retest are recorded below. Hosted route
  checks pass and supplied Lighthouse JSON/HTML reports are recorded. The latest
  Mobile export has no extension resources, with separate user confirmation of
  Incognito. Firefox, signed-out repository access and final verification remain
  pending. The November 3 cart-persistence enhancement is verified locally;
  publication and production verification of that change remain pending.

## Planned routes and behavior

- `/`: catalog. Other routes: `/login`, `/products/:id`, `/cart`, `/checkout`, and `*`.
- Login is a local simulation. Checkout requires login and has `fullName`,
  `email`, `address`, and `city`. Order confirmation is local.
- Stay within CORE scope; detailed requirements will guide later stages.

## Submission documentation (2026-10-27)

- [x] Replace the Vite starter README with English project information, actual
  architecture/dependencies, repository setup, five scripts, source-confirmed
  local test login, limitations, Live Demo and credits including AI assistance.
- [x] Prepare the English CORE REPORT with delivered/planned scope, recorded
  verification, three supported debugging challenges, reflection and AI assistance.
- [x] Review documentation against the current source and read-only Git history;
  preserve all four DEBUG-LOG entries and their distinct evidence sources.
- [ ] Complete Firefox verification and record its version when an approved
  working connection is available. CORE 19–23 remains in progress.
- [x] Record the user's production deployment URL and confirm availability in Chrome.
- [x] Complete the focused production purchase, confirmation and empty-Cart check
  (2026-10-30); evidence is recorded in the Checkout follow-up below.
- [x] Finish hosted route verification in Chrome (2026-10-30); retain the new
  agent-operated evidence separately from external observations.
- [x] Extract the user's saved production Lighthouse audits and render readable
  HTML without changing their original JSON (2026-10-30).
- [x] Record the latest deployed-site Mobile/Navigation Lighthouse export without
  extension resources and the user's separate Incognito confirmation (2026-10-31).
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
- [x] The user published to Vercel; the production URL is
  [https://10x-shop-pavlepritula.vercel.app/](https://10x-shop-pavlepritula.vercel.app/).
  The agent confirmed that URL and rendered application through the approved Chrome connection.
- [x] Complete the production purchase flow (2026-10-30); the initial inconclusive
  run and the successful follow-up remain separate records below.
- [x] Finish hosted direct-load/refresh coverage in Chrome (2026-10-30).
  External product-route/reload and NotFound observations remain separately attributed.
- [x] Record the supplied basic Lighthouse audits and generated HTML reports.
- [x] Record the required Incognito Mobile/Navigation evidence: the user confirmed
  Incognito, and the latest JSON has no extension resources (2026-10-31).

Deployment configuration is prepared and the production URL is available. A local
build or Vite preview does not establish that Vercel routing works; hosted evidence
is recorded separately below. Firefox and its version remain pending under CORE
19–23. The earlier local Chrome QA was not repeated.
Only vercel.json, README.md and PLAN.md were changed for this preparation; application
code, dependencies and existing evidence were preserved. No Vercel CLI installation,
hosting-account connection, staging, commits, pushes or deployment were performed.

## Production delivery review (2026-10-27)

Local revision at the start of this review:
`1c977b10f2f1795885990bd58916ba4cdfe09f03` (`feature: prepare Vercel SPA deployment`).
The working tree was clean. The deployed Git SHA was not independently confirmed;
the existing verified quality-source revision remains unchanged below.

### External cloud-Chrome evidence supplied by the user

These observations were made externally on 2026-10-27, not executed by this agent.
The cloud Chrome version was not recorded.

- Catalog rendered 12 products and all 12 images.
- Direct navigation to `/products/5` and a browser reload both displayed Red Nail Polish.
- Adding quantity 2 showed a badge of 2 and $17.98 total at $8.99 per unit.
- Guest checkout redirected to `/login`.
- `/not-a-route` displayed the application's NotFound page; its Catalog link worked.
- At a 1363px viewport, the grid had four columns, and document clientWidth and
  scrollWidth were both 1348px (no horizontal document overflow in that observation).

These observations do not establish authenticated purchase completion, Firefox
compatibility or Lighthouse results.

### Agent-operated production check

- Actual target URL confirmed: `https://10x-shop-pavlepritula.vercel.app/`.
- Google Chrome **156.0.8078.48**, identified by the connected Chrome extension and
  metadata of the running `C:\Program Files\Google\Chrome\Application\chrome.exe`.
- Product → Cart → guest checkout → local demo login → Checkout passed for
  Red Nail Polish, two units at $8.99. Cart and Checkout both showed **$17.98**;
  the badge showed 2. The guest reached `/login`, and `demo` / `123456` returned
  to `/checkout` with both units intact.
- Synthetic fields: Alex Example, alex@example.test, 24 Demo Street, Test City.
  Submit attempts left the Checkout form displayed; no validation alerts or console
  warnings/errors were captured. The cause was not established. Confirmation,
  badge disappearance and an empty Cart were not observed and are not marked passed.
  No application bug or source fix is claimed from this incomplete run.

### Blockers recorded in the October 27 review

Historical status follows. The October 30 import below supersedes artifact
availability and closes Chrome hosted route coverage. The October 31 Mobile
import/user confirmation closes the later Lighthouse-evidence condition.

- **Browser safety stop:** native Windows Computer Use reported that it
  "could not determine the current browser URL on Windows with enough confidence
  to enforce policy". Further browser interaction stopped. The approved extension's
  management capability only supports normal, non-Incognito windows; no approved
  route to the required Incognito/DevTools audit remained available after that stop.
  No alternate driver, CLI audit or safeguard bypass was attempted.
- [x] Complete the production confirmation/cart-clearing check in the agent-operated
  2026-10-30 follow-up below. This is new hosted evidence, not a relabeling of local checks.
- [x] Finish hosted direct-route/refresh coverage in the separate 2026-10-30
  final evidence review below.
- [ ] **Lighthouse:** audit the production Catalog in Chrome Incognito with
  extensions inactive and the Mobile preset. No audit ran in this review, so no
  artifact, Lighthouse version or actual scores existed at that point. Supplied
  reports and the later Incognito confirmation are recorded below. No score
  threshold is assigned.
- [ ] **Firefox:** no approved Firefox connection/app was available. Its version
  and production catalog, direct product/reload, purchase, keyboard-focus and
  375px usability checks remain pending.
- [ ] **Public repository visibility:** the read-only GitHub metadata request for
  `pritulapavel/10x-shop-pavlepritula` returned 404. Visibility is unverified; no
  conclusion about public/private status was drawn from the error.

The earlier request for manual purchase completion is closed by the successful
2026-10-30 production retest below. The current short handoff is in the final
delivery evidence section; completed Chrome checks do not need another manual run.

Only README.md, REPORT.md and PLAN.md were updated in this review. Application code,
dependencies and DEBUG-LOG evidence were preserved; typecheck/lint/build were not
rerun. No Lighthouse artifact was fabricated, and no staging, commits, pushes or
deployment were performed. CORE remains incomplete.

## Checkout submission diagnosis (2026-10-30)

Scope: diagnose the unconfirmed production submit only. Git remained at
`1c977b10f2f1795885990bd58916ba4cdfe09f03`; the existing uncommitted documentation
was preserved. Chrome was **156.0.8078.76**, identified from the running executable.

### Initial inspection and reproduced symptom

- Before any navigation/reload, the available old tab was at `/`, heading Catalog,
  authenticated, with no badge, form, delivery fields, alerts or available console
  warnings/errors. The old failed Checkout was not open, so its exact old field
  values and error states could not be recovered.
- A new guest run reached production Checkout with two Red Nail Polish units and
  matching Cart/Checkout totals of $17.98. Ordinary browser filling was followed
  by a check of every field:

| Field | Verified synthetic value | aria-invalid before submit |
| --- | --- | --- |
| Full name | Test Buyer | false |
| Email | qa@example.com (visually verified; text reader redacts this input) | false |
| Address | 12 Test Street | false |
| City | Tbilisi | false |

- Place order was enabled; form `aria-busy` was false. No inline validation or
  general submission error was present. After one click in the inactive tab,
  Checkout stayed visible with badge 2 and total $17.98. Application and extension
  warning/error captures were separately empty.
- An empty-Full-name diagnostic attempt also did not show its expected validation
  alert. The button was inside the correct `noValidate` form, not disabled/inert,
  and its center was not covered by another element.

### Handler trace and controlled comparison

- Source review: `handleSubmit` prevents default navigation, checks the ref/
  confirmation duplicate guard, trims and validates the four fields, displays
  inline errors and stops on invalid data. After validation it locks submission,
  copies the item/delivery snapshot, calculates integer-cent totals, stores
  confirmation and calls `clearCart`. The catch displays the general retry message
  and releases the ref; finally it clears the busy state.
- `CartContext.clearCart` only performs a React state update to an empty item array.
  Confirmation renders before the empty-cart redirect. `RequireAuth` redirects
  guests to Login with `/checkout` return state. There is no order API call;
  absence of a POST is expected, and absence of a Console exception alone would
  not rule out the catch branch.
- Temporary **local-only** console traces were placed before the duplicate guard
  and around validation, snapshot creation, clearCart and catch. The loaded preview
  bundle was `index-CG9bitzT.js`. Before activation, neither handler entry nor the
  expected empty-form validation was captured.
- Read-only Chrome metadata showed another tab active. API activation was not
  supported (`tabs.update` rejected `active`; the visibility capability was unavailable).
  The user selected the test tab without clicking Submit or reloading it.
- On that same loaded bundle, an ordinary click immediately logged handler entry
  and four validation errors, and all four inline messages appeared. Valid fields
  then produced zero errors, `snapshot 1 1798`, clearCart returning, confirmation,
  a missing badge and an empty local Cart. No exception/catch message was observed.
- Conclusion: the current reproduced symptom came from the verification action
  not reaching submission in an inactive tab. Duplicate protection, validation and
  clearCart were not the cause in this controlled comparison. The original October
  27 tab's exact state remains unknown; it was not retrospectively reconstructed.

### Successful production retest and cleanup

- [x] Keep the same tab active, navigate it to the production URL and perform
  Product → Cart → guest Login → Checkout → one actual Place order click.
- [x] Verify each field with the synthetic values above. All four values were
  present, `aria-invalid` was false, Place order was enabled and `aria-busy` was false.
- [x] Cart, Checkout and confirmation totals each equal **$17.98** (2 × $8.99).
- [x] Exact heading: **Thank you! Your order has been placed.** Delivery details,
  item/quantity and total remain visible after clearCart; the badge is absent.
- [x] Navigate to Cart and observe **Your cart is empty.** Production application
  and extension warning/error logs were separately empty.
- [x] Restore `src/pages/Checkout.tsx` exactly to its original contents, remove
  all diagnostic markers from source and the final build, and pass `npm run typecheck`,
  `npm run lint` and `npm run build`. The final clean bundle is `index-B1SdGF_Z.js`.
  Temporary local preview and diagnostic browser documents were closed.

Evidence: [full JSON observations/trace](reports/checkout/2026-10-30/evidence.json),
[background form](reports/checkout/2026-10-30/production-checkout.png),
[production confirmation](reports/checkout/2026-10-30/production-confirmation.png),
[empty production Cart](reports/checkout/2026-10-30/production-empty-cart.png).
The correction was to the verification procedure, not application code. No genuine
application defect was reproduced, so DEBUG-LOG retains its four existing entries
and no application fix/publish is required. Documentation/evidence can be committed
by the user separately. The final evidence review below updates route coverage and
Lighthouse artifacts; the October 31 follow-up closes the Lighthouse-evidence
condition. Firefox and signed-out public access remain pending. CORE is not complete.

## Final delivery evidence review (2026-10-30)

- [x] Read-only Git inspection: local revision remains
  `1c977b10f2f1795885990bd58916ba4cdfe09f03`. Existing uncommitted README/REPORT/PLAN
  changes and `reports/checkout/2026-10-30` were preserved. The deployed Git SHA
  remains unconfirmed; historical fix references and all four DEBUG-LOG entries
  are unchanged.
- [x] Agent-operated production routing in **Google Chrome 156.0.8078.76**, confirmed
  from the running executable: `/`, `/products/5`, `/cart`, `/login` and
  `/not-a-route` loaded directly and after reload. Catalog finished loading 12
  products; Product showed Red Nail Polish; Cart was empty; NotFound was the app's
  page. Direct guest `/checkout` redirected to `/login`, whose reload stayed on
  Login. No persistence across reload is claimed for in-memory auth/cart.
  [Route evidence](reports/routes/2026-10-30/evidence.json) and
  [Catalog screenshot](reports/routes/2026-10-30/catalog.png) are separate from
  external cloud-Chrome observations and the preserved $17.98 purchase evidence.
- [x] Independently parse both **user-supplied**, saved Lighthouse **13.5.0** JSONs
  from `reports/lighthouse/2026-10-30`. The Desktop file actually present is
  `10x-shop-pavlepritula.vercel.app_2026-10-30_23-22-49_DESKTOP.json` (the filename
  without a suffix is absent). Requested/final URL is the production Catalog.

| Audit | Actual fetchTime (UTC) | Asia/Tbilisi (UTC+04:00) | Performance / Accessibility / Best Practices / SEO | Artifacts |
| --- | --- | --- | --- | --- |
| Desktop | `2026-10-30T19:22:49.941Z` | 2026-10-30 23:22:49.941 | **82 / 100 / 100 / 83** | [JSON](reports/lighthouse/2026-10-30/10x-shop-pavlepritula.vercel.app_2026-10-30_23-22-49_DESKTOP.json), [HTML](reports/lighthouse/2026-10-30/10x-shop-pavlepritula.vercel.app_2026-10-30_23-22-49_DESKTOP.html) |
| Mobile | `2026-10-30T19:23:28.105Z` | 2026-10-30 23:23:28.105 | **96 / 100 / 100 / 83** | [JSON](reports/lighthouse/2026-10-30/10x-shop-pavlepritula.vercel.app_2026-10-30_23-22-49_MOBILE.json), [HTML](reports/lighthouse/2026-10-30/10x-shop-pavlepritula.vercel.app_2026-10-30_23-22-49_MOBILE.html) |

- [x] Extract settings, numeric metrics and warnings into REPORT.md. Both runs use
  Navigation / DevTools and simulated throttling. Reduced Chrome/156.0.0.0 UAs
  and configured Chrome/136.0.0.0 emulation strings do not supply the full browser
  build for these audits; the separately checked purchase/route browser was
  156.0.8078.76. `runWarnings` is empty in both, but extension contamination remains.
- [x] Render both HTML reports using official Lighthouse 13.5.0 ReportGenerator
  from a temporary npm cache, without rerunning audits or changing project
  dependencies. Confirm readable HTML and matching scores through the approved
  Chrome connection. [Desktop preview](reports/lighthouse/2026-10-30/desktop-html-preview.png)
  and [Mobile preview](reports/lighthouse/2026-10-30/mobile-html-preview.png) are
  screenshots of rendered saved reports, not new audits. Original JSON SHA-256
  checks passed before/after conversion; hashes are recorded in REPORT.md.
- **Limits/observations:** both contain `chrome-extension://` scripts; Incognito
  is unverified. All 12 unminified-JS items concern extensions. Unused JS includes
  five extension items and one application bundle item (46,084 estimated unused
  application bytes out of 225,674 combined bytes). Missing meta description,
  HTML returned for robots.txt and Desktop CLS 0.346207 are observations, not
  verified fixes. No new bug/fix entry or optional optimization was introduced.
- [x] Recheck supported connection inventory/capabilities only. There is no
  approved Firefox connection/app or supported Incognito Lighthouse control.
  The earlier native URL-safety failure was not retried or bypassed. Temporary
  report-preview tabs/server were closed. No new audit or Firefox test is claimed.
- [x] Review the documentation diff and pass `git diff --check`; all 12 unique
  referenced local evidence files exist. Original Lighthouse JSON, checkout
  evidence and package-file hashes are unchanged. Earlier stage/quality records
  and historical commit references are preserved.
- [x] **Later Mobile evidence:** `mobile_result.json` supplies Navigation/Mobile
  results with no extension resources; the user confirmed Incognito separately
  on October 31. Both earlier reports remain preserved. See the new import below.
- [ ] **Firefox:** actual version and production catalog/product-refresh/purchase/
  375px layout, horizontal-overflow and keyboard-focus checks remain unverified.
- [ ] **Public repository:** the read-only connector again returned 404 and an
  anonymous web fetch could not retrieve the page. Neither proves private/missing
  status. Signed-out access remains unconfirmed.
- [ ] Close final CORE verification only after these required results are present.

### Remaining handoff (updated October 31)

The Lighthouse handoff is closed by the supplied Mobile report and separate user
confirmation below; no repeat audit is requested in this evidence pass.

1. **Firefox:** record the real version; load Catalog and direct `/products/5`,
   refresh Product, then use quantity 2 → Cart → guest Checkout → `demo` / `123456`
   → Checkout with synthetic delivery data → confirmation → empty Cart. Record
   matching three totals, retained confirmation details and badge removal. At
   375px check layout/no horizontal document overflow and visible Tab focus.
2. **GitHub:** while signed out, open the repository URL and confirm its files
   are readable. Record the outcome without changing visibility.

This pass changes documentation and saved evidence only. Application source,
configuration, dependencies, DEBUG-LOG and checkout evidence are preserved; npm
checks were not repeated solely for Markdown/report files. No staging, commit,
push, deploy, visibility change or course-form submission was performed.

## Additional Mobile Lighthouse evidence (2026-10-31)

- [x] Inspect `main` read-only at local revision
  `6e1e3317d4708fa70d6f9a96316f3064db741b2d`. Preserve existing work,
  all historical fix references, DEBUG-LOG and successful Checkout/routes evidence.
- [x] Locate [mobile_result.json](reports/lighthouse/2026-10-30/mobile_result.json)
  already in `reports/lighthouse/2026-10-30/` and retain its exact contents.
  Requested/final URL is `https://10x-shop-pavlepritula.vercel.app/`; Lighthouse
  **13.5.0**, **Mobile / Navigation** (DevTools). Actual `fetchTime` is
  **2026-10-30T19:55:15.614Z**, or **October 30, 23:55:15.614 in Tbilisi**.
  The import date is October 31; the audit date remains October 30.
- [x] Independently extract **Performance 95 / Accessibility 100 / Best Practices
  100 / SEO 83**, **CLS 0**, **TBT 0 ms**, **LCP 2829.442 ms**. No runtime error,
  run warnings, non-empty audit warnings or `chrome-extension://` occurrences
  were found. REPORT.md records the other metrics, settings and SEO observations.
- [x] Record provenance separately: the user explicitly confirmed Incognito on
  October 31. For Chrome's full build the user said “the same”, referring to the
  earlier **156.0.8078.76** session; this is user-reported audit metadata. The JSON
  itself only contains reduced/configured UAs and proves neither Incognito nor
  the full build. No deployed Git revision or browser-wide extension preferences
  are inferred. The export contains no extension resources.
- [x] Convert to [mobile_result.html](reports/lighthouse/2026-10-30/mobile_result.html)
  with the already cached official Lighthouse **13.5.0 ReportGenerator**, without
  rerunning an audit or changing project dependencies. Open the HTML in approved
  Chrome and observe the same **95 / 100 / 100 / 83** scores.
  [HTML preview](reports/lighthouse/2026-10-30/mobile_result-html-preview.png) is
  a converted-report screenshot, not a new audit.
- [x] Remove exactly four whitespace-only trailing-whitespace occurrences from
  the older HTML reports (two each) and two equivalent lines from the new HTML.
  Compare embedded report data before/after cleanup: unchanged. Original JSON
  SHA-256 for `mobile_result.json`:
  `114a58a5bfcd2fbd6d1fa3e0d667ad591dafa474889bd7540c509406276e8175`.
- [x] Review the documentation/HTML diff, pass `git diff --check`, and separately
  check the untracked HTML with a no-index diff and trailing-whitespace scan.
  All three HTML files have zero trailing-whitespace lines, all 15 referenced
  local evidence files exist, and original JSON/Checkout/routes/package hashes
  remain unchanged.
- **Unresolved observations:** missing meta description and HTML returned for
  robots.txt (13 syntax errors) remain in the latest export. No optional SEO or
  performance changes were made. The older reports remain historical evidence
  with their extension-related limits and Desktop CLS observation.
- [ ] Complete actual Firefox version/catalog/product-reload/purchase/375px
  layout, overflow and keyboard-focus verification.
- [ ] Confirm repository file access while signed out of GitHub.
- [ ] Mark CORE complete only after remaining required evidence and final review.

Only documentation and Lighthouse artifacts changed in this pass. No application
code, dependency, DEBUG-LOG, Checkout/routes evidence or original JSON was changed;
typecheck/lint/build were not repeated. No staging, commit, push or deploy was performed.

## Cart persistence and focused CORE review (2026-11-03)

- [x] Inspect repository instructions, current source/docs and read-only Git:
  `main` at `12079f9399c62789029ca12fde7ea63715502141`; the tree started clean.
- [x] Implement the user-requested persistence enhancement, separate from the four
  historical bugs: lazy read-only initialization, unknown-data validation and an
  effect that writes only `shop_cart`. Invalid carts are rejected as a whole;
  storage failures do not reset working React state. No auth/delivery/confirmation
  persistence, dependencies, cross-tab sync or temporary application fault code.
- [x] Pass **38/38 Node checks** against the actual helper, including malformed and
  incompatible data, invalid IDs/prices/stock/quantities, duplicates, extra-field
  removal, repeated initialization without writes and mocked access/read/write failures.
  [Runnable check](reports/cart-persistence/2026-11-03/check-storage.mjs),
  [results](reports/cart-persistence/2026-11-03/storage-checks.json).
- [x] Verify local production build `index-a-XYIfQo.js` at
  `http://127.0.0.1:4195/` in **Google Chrome 156.0.8078.80** (executable metadata).
  Add two nail-polish units → reload: badge 2, **$17.98**. Change to three → reload:
  badge 3, **$26.97**. Add one lipstick → reload: badge 4, **$39.96**. Remove lipstick
  → reload: three units remain. Remove the last product → reload: empty, no badge.
  Cancel Clear cart → reload: two units remain; confirm Clear cart → reload: empty.
- [x] Preserve cart through guest login return and logout/login. Complete a local
  order for two nail-polish units: Cart/Checkout/confirmation **$17.98**, copied
  delivery details remain visible, badge disappears, Cart stays empty after reload.
  **Attribution:** the user activated the test tab and clicked Place order after
  automation inputs remained inconclusive. Codex inspected the real confirmation
  and performed Cart/reload checks. This is not a new application bug or a hosted test.
  [Browser evidence](reports/cart-persistence/2026-11-03/browser-checks.json),
  [confirmation screenshot](reports/cart-persistence/2026-11-03/confirmation.png),
  [empty Cart screenshot](reports/cart-persistence/2026-11-03/empty-cart-after-reload.png).
- [x] Pass `npm run typecheck`, `npm run lint` and `npm run build`. No application
  warnings/errors were captured. The temporary preview was stopped; no test controls
  or diagnostic code were added to application source.
- [x] Review the final diff, pass `git diff --check` and verify all 21 referenced
  local files. Generated assets exist and match the browser's loaded bundle;
  DEBUG-LOG, previous evidence, Checkout, types and dependencies are unchanged.

| Mandatory CORE area | Focused source/evidence review |
| --- | --- |
| React/Vite/TypeScript/Tailwind/scripts | React/DOM/types 19; React and Tailwind Vite plugins; CSS import; all four strict/unused/fallthrough options; five scripts and referenced TS configs. Current npm checks pass. |
| Six routes and shared shell | App defines `/`, `/login`, `/products/:id`, `/cart`, guarded `/checkout`, `*`; Layout renders Header/Footer/Outlet. Reuse [hosted route evidence](reports/routes/2026-10-30/evidence.json). |
| Local login and return | Login trims username, requires a six-character password, returns only the intended Checkout destination; AuthContext stays in memory. Earlier checks plus this focused flow. |
| DummyJSON Catalog/Product | Effects fetch with status handling/abort cleanup; Catalog loading/error/empty branches; Product validates IDs and handles 404/errors. Reuse stage 7–8/10–13 evidence below. |
| Shared cart and totals | Immutable actions enforce stock/quantity limits; Header sums units; currency helpers use cents. Existing stock-fix evidence plus current storage/reload checks. |
| Checkout | Four controlled fields/inline validation, ref duplicate guard, copied confirmation before clearCart; confirmation renders before empty-cart redirect. Earlier evidence plus assisted local persistence flow. |
| React concepts and types | Typed Product/Cart/form state, props/children, callbacks, map/keys, Context, conditional rendering, effects and immutable updates; see Task 16 examples below. |
| Responsive/focus/ErrorBoundary/debugging | Reuse original attributed grid/81-target/focus/hover/recovery results below; layout code is unchanged. DEBUG-LOG retains four genuine bugs. No complete QA rerun is claimed. |
| English documents/history/live routes/Lighthouse | README/PLAN/REPORT present; real Git history inspected; hosted evidence and original October 30 audits retained. Audits and old hosted checks do not measure this enhancement. |
| Outstanding delivery evidence | Firefox/version absent from approved inventory; signed-out public GitHub access unverified (anonymous fetch 404 is inconclusive); new persistence publication/production retest pending. |

React state remains the UI source. Cart storage is per browser profile/origin
(protocol/host/port); preview, localhost/127.0.0.1 and production are separate.
Only the last successful save can be restored after a storage failure. Restored
stock/prices remain snapshots; no cross-tab synchronization was added. Earlier
in-memory-cart statements describe their historical revision, not this enhancement.

- [ ] User publishes the new source, then verify add/edit/remove/clear/reload and
  Checkout-clearing behavior on the production origin. No publication was performed.
- [ ] Complete actual Firefox verification and signed-out GitHub access.
- [ ] Close CORE delivery only after those results and final review are present.

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
| Google Chrome | 156.0.8078.48 (earlier local QA); 156.0.8078.76 (2026-10-30) | Earlier local QA passed; the focused production Checkout retest passed on 2026-10-30 as recorded above |
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
Chrome observations. Quality (Firefox pending), final documentation and production
verification remain incomplete; the source fix references are verified.

# CORE report

Status as of 2026-10-31: implementation through tasks 14–16 is complete.
CORE 19–23 remains in progress because Firefox verification is pending; delivery
is incomplete. The focused production purchase retest now passes. Temporary local
diagnostics were removed, the original source was restored exactly, and typecheck,
lint and build passed after cleanup. No permanent application fix was required.

## Planned and delivered scope

The CORE plan covers configuration, typed React components, shared layout and
routing, a DummyJSON catalog, product details, a shared cart, local authentication,
checkout and a local confirmation. These modules are implemented, together with
responsive styling, an ErrorBoundary and the React concepts review in PLAN.md.
README.md and this report are prepared; DEBUG-LOG.md contains four genuine fixed bugs.

Hosted direct-route/refresh checks pass. Three user-supplied production Lighthouse
audits have been imported and rendered below. The latest Mobile/Navigation JSON
has no extension resources; the user separately confirmed Incognito on October 31.
Remaining submission items are Firefox checks and its version, signed-out
repository-access confirmation and final verification. The full Chrome build for
the latest audit is user-reported; no deployed Git revision is inferred.

**Verified source revision:**
[dc67c1adec594662e398eae3bfbae1672c808f31](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/dc67c1adec594662e398eae3bfbae1672c808f31)
(`fix: improve responsive sizing and add error boundary`). Read-only inspection
of the user's local commit confirmed its responsive-grid fixes, interactive-target
sizing corrections and ErrorBoundary implementation/wrapper. Remote push status
was not checked.

## Earlier local verification

- Google Chrome **156.0.8078.48** passed the production-preview checks at
  `http://127.0.0.1:4173/` through the approved extension. The browser identity and
  running executable metadata supported the recorded name/version.
- At 375px, **81 interactive-target observations across eight screens** met
  44×44 CSS px, including disabled and rendered below-fold controls. Layout,
  overflow, keyboard focus, hover and disabled-state checks passed at 375px and desktop.
- The user separately measured Catalog in Chrome at 375/480/481/1024/1025px:
  **1/1/2/3/4 columns**, with no horizontal document overflow. The original
  pre-fix embedded-browser observations remain separately attributed in PLAN.md.
- Guest Catalog → Product → Cart → Login → Checkout → confirmation passed.
  Two Annibale Colombo Bed units at $1,899.99 produced matching **$3,799.98**
  Cart, Checkout and confirmation totals. Login returned to Checkout, confirmation
  retained the fictional delivery/item details while mounted, the badge disappeared
  and Cart became empty after ordering.
- ErrorBoundary caught a real, intentionally injected child-render failure.
  After the fault was removed from source and the served build, the mounted fallback
  remained until its actual Reload button restored the application. The test fault
  was removed and is not counted as an application bug.
- After fault cleanup, `npm run typecheck`, `npm run lint` and `npm run build`
  passed. Final source/bundle scans found no test fault, and a fresh production
  smoke tab logged no warnings/errors.

## Production review (2026-10-27)

Live URL: [10X Shop on Vercel](https://10x-shop-pavlepritula.vercel.app/).
Local revision inspected at the start of this review:
`1c977b10f2f1795885990bd58916ba4cdfe09f03` (`feature: prepare Vercel SPA deployment`).
This records the local checkout; the deployed Git SHA was not independently confirmed.

### External cloud-Chrome observations supplied by the user

These were reported on 2026-10-27, not executed by this agent. The cloud Chrome
version was not recorded.

- Catalog rendered 12 products and all 12 images.
- Direct `/products/5` navigation and reload displayed Red Nail Polish.
- Quantity two showed a badge of 2 and $17.98 at $8.99 per unit; guest checkout
  redirected to `/login`.
- `/not-a-route` showed the application NotFound page and its Catalog link worked.
- At a 1363px viewport, Catalog had four columns; document clientWidth and
  scrollWidth were both 1348px.

### Agent-operated production Chrome check

Google Chrome **156.0.8078.48** was confirmed through running-executable metadata
and the approved Chrome connection. Product → Cart → guest checkout → demo login
(`demo` / `123456`) → Checkout worked for two Red Nail Polish units. Cart and
Checkout both showed **$17.98**, and login returned to `/checkout` with the cart intact.

Synthetic delivery details were entered, but submit attempts left the Checkout
form visible with no validation alerts or captured console warnings/errors.
Confirmation, badge disappearance and an empty Cart were **not verified**.
The cause of the unchanged form was not established; no application bug or fix is
claimed from this incomplete run.

This records the initial 2026-10-27 outcome. The focused follow-up below closes
the production purchase check without rewriting those earlier observations.

### Blocked and unverified items at the end of the October 27 review

This is historical status. The October 30 evidence import and route checks below
supersede the earlier lack of Lighthouse artifacts and remaining hosted route coverage.

- Native Windows Computer Use stopped because it could not determine the current
  browser URL confidently enough to enforce policy. All further browser actions
  stopped. This prevented further purchase diagnosis and the required Incognito
  Lighthouse workflow; no alternate driver or safeguards bypass was used.
- Lighthouse was **not run in that review**. No report, version or scores were
  available at that point. The required production-catalog audit remains Incognito,
  extensions inactive, Mobile preset. No passing-score threshold is claimed.
- No approved Firefox connection/app was available. Firefox version, catalog,
  product direct-route/reload, purchase, focus and 375px usability checks are pending.
- The read-only GitHub repository metadata lookup returned 404. Public repository
  visibility remains unverified; this response does not establish that it is private.

PLAN.md records focused manual completion steps for the blocked checks.

## Checkout diagnosis and production retest (2026-10-30)

The source revision remained `1c977b10f2f1795885990bd58916ba4cdfe09f03`.
The old failed Checkout was no longer open: the existing tab showed Catalog,
an authenticated user and no badge. Its old field/error state could not be recaptured.
New checks used Google Chrome **156.0.8078.76**, confirmed from running-executable metadata.

In a fresh production attempt, each synthetic field was verified: Test Buyer,
qa@example.com, 12 Test Street, Tbilisi. Email was checked visually because the
read-only textual interface redacts email input values. All four `aria-invalid`
values were false, Place order was enabled, `aria-busy` was false, and no inline
or general error was visible. A click in the background tab left that form unchanged;
captured application and extension warning/error logs were both empty.

Temporary local trace logs before the duplicate guard and around validation,
snapshot creation and clearCart reproduced the observation. While the test tab
was inactive, no handler-entry trace or expected empty-form errors appeared.
The user activated that tab without submitting or reloading it. The same automation
click then reached the same handler/bundle and produced all four expected validation
messages. A valid local submit logged zero validation errors, one snapshot totaling
1798 cents and clearCart returning; confirmation and empty Cart both worked.

The reproduced cause was delivery of the verification action to an inactive tab,
not a confirmed Checkout defect. The exact state of the old October 27 tab remains
unknown. The corrected procedure keeps the target tab active and inspects the full
result after one ordinary submit click; it does not assign DOM values or access React internals.

The active tab was then used for the complete **production** flow: Product → Cart
→ guest checkout → `demo` / `123456` → Checkout → one Place order click.
Cart, Checkout and confirmation all showed **$17.98** for two Red Nail Polish units.
The exact confirmation heading and all four delivery values remained visible after
cart clearing, the badge disappeared, and visiting Cart showed “Your cart is empty.”
No production application or extension warnings/errors were captured.

Evidence: [JSON observations and local trace](reports/checkout/2026-10-30/evidence.json),
[confirmation screenshot](reports/checkout/2026-10-30/production-confirmation.png),
[empty Cart screenshot](reports/checkout/2026-10-30/production-empty-cart.png),
and [background-tab form](reports/checkout/2026-10-30/production-checkout.png).
All temporary source logs and their diagnostic bundle were removed; clean source
and build scans passed. No new DEBUG-LOG entry or application fix commit is needed.
Lighthouse and Firefox were not attempted in this focused follow-up and remain pending.

## Final delivery evidence review (2026-10-30)

### Agent-operated hosted route checks

Google Chrome **156.0.8078.76** was confirmed again from the running executable.
Direct loads and browser reloads rendered `/` (12 products after loading),
`/products/5` (Red Nail Polish), `/cart` (empty state), `/login` and `/not-a-route`
(the application NotFound page). A direct guest request to `/checkout` loaded the
application and redirected to `/login`; reloading that destination stayed on Login.
These checks confirm hosted routing, not persistence of in-memory login/cart on reload.
[Raw route observations](reports/routes/2026-10-30/evidence.json) and a
[Catalog screenshot](reports/routes/2026-10-30/catalog.png) are saved separately from
the user's earlier cloud-browser observations. The successful $17.98 purchase above
was preserved and not repeated. The local Git revision is still
`1c977b10f2f1795885990bd58916ba4cdfe09f03`; no deployed Git revision is inferred.

### User-supplied Lighthouse audits, independently extracted by Codex

Both requested/final URLs are [the production Catalog](https://10x-shop-pavlepritula.vercel.app/).
These are supplied saved audits, not new agent-operated runs. Actual times come from
`fetchTime`, not filenames; both use Lighthouse **13.5.0**.
The Desktop file present on disk has the `_DESKTOP.json` suffix; the filename without
that suffix was not present. Neither original JSON was renamed or edited.

| Audit | fetchTime (UTC) | Asia/Tbilisi (UTC+04:00) | Performance / Accessibility / Best Practices / SEO | Evidence |
| --- | --- | --- | --- | --- |
| Desktop | `2026-10-30T19:22:49.941Z` | 2026-10-30 23:22:49.941 | **82 / 100 / 100 / 83** | [JSON](reports/lighthouse/2026-10-30/10x-shop-pavlepritula.vercel.app_2026-10-30_23-22-49_DESKTOP.json), [HTML](reports/lighthouse/2026-10-30/10x-shop-pavlepritula.vercel.app_2026-10-30_23-22-49_DESKTOP.html) |
| Mobile | `2026-10-30T19:23:28.105Z` | 2026-10-30 23:23:28.105 | **96 / 100 / 100 / 83** | [JSON](reports/lighthouse/2026-10-30/10x-shop-pavlepritula.vercel.app_2026-10-30_23-22-49_MOBILE.json), [HTML](reports/lighthouse/2026-10-30/10x-shop-pavlepritula.vercel.app_2026-10-30_23-22-49_MOBILE.html) |

| Metric (numeric audit values, rounded here) | Desktop | Mobile |
| --- | --- | --- |
| First Contentful Paint | 489.357 ms | 1318.204 ms |
| Largest Contentful Paint | 908.937 ms | 2769.047 ms |
| Speed Index | 670.817 ms | 1509.905 ms |
| Total Blocking Time | 0 ms | 4 ms |
| Cumulative Layout Shift | 0.346207 | 0 |
| Time to Interactive | 908.937 ms | 2776.547 ms |

Mobile TBT's numeric value is 4 ms; the report's rounded display says 0 ms.
Both use `gatherMode: navigation`, `channel: devtools`, locale `en-US`, the four
listed categories and `throttlingMethod: simulate`. Desktop uses RTT 40 ms,
throughput 10240 Kbps and CPU slowdown 1; Mobile uses RTT 150 ms, throughput
1638.4 Kbps and CPU slowdown 4. Storage reset is enabled
(`disableStorageReset: false`), and `ignoreStatusCode` is true. In both JSONs,
`screenEmulation.disabled` is true; the stored 412×823, DPR 1.75/mobile fields do
not establish the actual audited viewport. Full settings remain in the JSONs.

The reduced host UA identifies Windows and **Chrome/156.0.0.0**. Desktop's network
UA identifies Macintosh; Mobile's identifies Android 11 / moto g power (2022),
also with reduced Chrome/156.0.0.0. The configured emulated UA strings contain
Chrome/136.0.0.0. These UA/config values are not separately verified browser builds;
the full browser version for these supplied audits is unconfirmed. Chrome
156.0.8078.76 belongs to the separately verified purchase/route sessions above.

Both `runWarnings` arrays are empty, no non-empty per-audit warnings were found,
and neither JSON reports a runtime error. This does not establish clean audit conditions:

- **Extensions:** both contain `chrome-extension://` scripts; Incognito is unverified.
  All 12 `unminified-javascript` entries are extensions (90,410 estimated wasted bytes).
  `unused-javascript` has five extension entries and one application bundle entry:
  `assets/index-B1SdGF_Z.js`, 89,604 total bytes and 46,084 estimated wasted bytes.
  Its combined 225,674-byte estimate includes 179,590 extension bytes; attributing
  all of it to the application would be incorrect.
- **Observations only:** both audits report no meta description and HTML content
  returned for `robots.txt` (13 syntax errors). Desktop CLS is 0.346207. These have
  not been reproduced/fixed in this pass and are not new DEBUG-LOG fixed-bug entries.
- No passing-score threshold is imposed. The reports do not replace the required
  clean Incognito Mobile/Navigation run with extensions inactive.

Codex rendered both saved JSONs with the official
[Lighthouse 13.5.0 ReportGenerator](https://github.com/GoogleChrome/lighthouse/blob/v13.5.0/report/generator/report-generator.js)
using `ReportGenerator.generateReport(lhr, 'html')`. Tooling was obtained in a
temporary npm cache; project dependencies/configuration were unchanged and no audit
was rerun. Both standalone HTML files rendered in Chrome with matching scores;
[Desktop preview](reports/lighthouse/2026-10-30/desktop-html-preview.png) and
[Mobile preview](reports/lighthouse/2026-10-30/mobile-html-preview.png) are derived
HTML screenshots, not evidence of a new audit. SHA-256 before/after conversion:

- Desktop: `8025d146dbeb816df69155bd0c640ce69974a983dd73333cd4bf7ec4815ac6f6`.
- Mobile: `b7d9ce091fd9bbd3bf475654744180710acfd0a9717a89236a9f7e787c4005c3`.

### Remaining conditions at the end of the October 30 review

The later Mobile import and user confirmation below close the Lighthouse-evidence
condition. The following paragraph preserves the earlier state of that review.

The current approved browser inventory contains Chrome extension access, no Firefox
connection/app, and no supported Lighthouse/Incognito control. The earlier native
URL-safety stop was not retried or bypassed. The clean audit and real Firefox
version/catalog/product-refresh/purchase/375px focus and overflow checks remain
pending. A read-only GitHub metadata lookup again returned 404, and an anonymous
web fetch could not retrieve the repository; neither establishes private/missing
status. A signed-out repository-page check is still needed. PLAN.md gives the
short remaining handoff. CORE stays incomplete; application code and DEBUG-LOG
were unchanged, and npm checks were not repeated for documentation/report changes.

## Additional Mobile evidence import (2026-10-31)

Read-only inspection found branch `main` at local revision
`6e1e3317d4708fa70d6f9a96316f3064db741b2d`. The newly supplied
[mobile_result.json](reports/lighthouse/2026-10-30/mobile_result.json) was already
in the requested evidence folder and was not moved or changed. This is an import
and conversion of the user's audit, not a new agent-operated Lighthouse run.

| Independently extracted field | Result |
| --- | --- |
| Requested/final URL | `https://10x-shop-pavlepritula.vercel.app/` |
| Lighthouse / mode | **13.5.0**, Mobile / Navigation, DevTools channel |
| Actual fetchTime | `2026-10-30T19:55:15.614Z` |
| Asia/Tbilisi (UTC+04:00) | **2026-10-30 23:55:15.614** |
| Performance / Accessibility / Best Practices / SEO | **95 / 100 / 100 / 83** |
| FCP / Speed Index | 1273.105 ms / 1273.105 ms |
| LCP / Time to Interactive | **2829.442 ms** / 2829.442 ms |
| Total Blocking Time / CLS | **0 ms / 0** |
| Runtime error / run warnings | No runtime error recorded; `runWarnings: []` |
| Extension resources | No `chrome-extension://` occurrences anywhere in the parsed JSON |

No non-empty per-audit warnings were found. Settings use simulated throttling
(RTT 150 ms, throughput 1638.4 Kbps, CPU slowdown 4), locale `en-US`, the four
listed categories and storage reset enabled. `screenEmulation.disabled` is true;
its stored 412×823/DPR 1.75 fields do not independently establish the actual viewport.
The reduced host/network UA contains Chrome/156.0.0.0; the configured emulated
UA contains Chrome/136.0.0.0. These values do not identify the full browser build.

**Separate user confirmation, October 31:** the user explicitly answered that this
audit ran in Incognito. For the full Chrome build, the user answered “the same”,
referring to the previously recorded **Google Chrome 156.0.8078.76** session.
That build is recorded as user-reported for this audit, not independently extracted
from its JSON or from a new browser-version check. Incognito confirmation plus the
Mobile/Navigation export with no extension resources closes the outstanding
Lighthouse-evidence condition. Browser-wide extension preferences are not inferred
from JSON, and the deployed Git revision remains unverified.

The new audit still reports no meta description and HTML for `robots.txt`
(13 syntax errors). `unminified-javascript` passes with no items; unused JavaScript
is now only the application `assets/index-DNidW9H4.js`, with 46,084 estimated unused
bytes out of 89,604 total bytes. These are audit observations, not fixes or an
optimization campaign. Different bundle filenames do not establish a deployed Git
revision. The earlier reports' extension limitations and Desktop CLS are preserved.

Codex used the same cached official Lighthouse **13.5.0 ReportGenerator** to create
[mobile_result.html](reports/lighthouse/2026-10-30/mobile_result.html), then opened
it through the approved Chrome connection and observed **95 / 100 / 100 / 83**.
[HTML preview](reports/lighthouse/2026-10-30/mobile_result-html-preview.png) is a
screenshot of the converted saved report, not a new audit. No project dependency
was installed or changed. The original JSON SHA-256 remains
`114a58a5bfcd2fbd6d1fa3e0d667ad591dafa474889bd7540c509406276e8175`.

Whitespace cleanup removed exactly four whitespace-only lines from the older HTML
reports (two per file), and two equivalent lines from the newly generated HTML.
Embedded report JSON was compared before/after cleanup and remained identical;
all original JSON files and Checkout/routes evidence were preserved unchanged.
DEBUG-LOG retains its four genuine fixed bugs. No application code or SEO behavior
was changed, and typecheck/lint/build were not rerun for this documentation-only pass.
The documentation diff was reviewed, `git diff --check` reported no errors, and
the untracked HTML was also checked with a no-index diff and a line-by-line
whitespace scan. All three HTML files have zero trailing-whitespace lines;
all 15 unique referenced local evidence files exist.
Firefox verification and signed-out GitHub access remain pending; CORE is incomplete.

## Three implementation and debugging challenges

1. **Keeping stored stock consistent.** An accepted add validated against fresh
   stock but retained an older stock value in an existing cart item. CartContext
   now updates stock together with quantity through an immutable update. The
   regression now produces quantity 3 and stock 5 instead of quantity 3 and stock 2;
   stock-limit and synchronization checks passed.
2. **Matching exact grid boundaries.** Tailwind's default `sm`/`lg` transitions
   left 481px at one column and put 1024px at four. ProductGrid uses explicit
   481/768/1025px transitions. The user's manual measurements verified the corrected
   boundaries. The fix is included in the verified source revision above.
3. **Sizing actual interactive targets.** Line-height, padding and `h-10 w-10`
   left links, buttons and inputs below 44px. Minimum-size utilities and 44px
   stepper dimensions now apply to the actual clickable/editable elements.
   The recorded Chrome retest passed all 81 observations; the same verified source
   revision contains this correction.

The causes, original measurements, corrections and evidence are preserved in
DEBUG-LOG.md, which also records the singular cart badge-label issue.

## Reflection

A small maintained regression suite for cart stock, checkout snapshots and
breakpoint boundaries would make the existing checks easier to repeat. Firefox
verification and signed-out repository access remain necessary before calling the
submission finished. The latest Mobile export and separate user confirmations
now complement the earlier audits, whose extension limitations remain explicit.

## AI assistance

- OpenAI Codex assisted with the staged CORE plan and project configuration.
- Codex helped implement typed components, contexts, routing and checkout.
- Codex investigated the four recorded bugs and documented verified corrections.
- Codex ran local checks and supported automated browser and ErrorBoundary verification.
- The user supplied manual Chrome grid measurements and saved Lighthouse JSON; Codex recorded/extracted them separately and rendered HTML reports.
- Codex diagnosed the background-tab verification issue, completed the production Checkout retest and hosted route checks, and documented remaining conditions.

# CORE report

Status as of 2026-10-27: implementation through tasks 14–16 is complete.
CORE 19–23 remains in progress because Firefox verification is pending; delivery
is incomplete. This report summarizes existing evidence. Browser checks and
typecheck/lint/build were not repeated for this documentation-only update.

## Planned and delivered scope

The CORE plan covers configuration, typed React components, shared layout and
routing, a DummyJSON catalog, product details, a shared cart, local authentication,
checkout and a local confirmation. These modules are implemented, together with
responsive styling, an ErrorBoundary and the React concepts review in PLAN.md.
README.md and this report are prepared; DEBUG-LOG.md contains four genuine fixed bugs.

Remaining submission items are Firefox checks and its version, deployment and a
live URL, deployed direct-route refresh verification, a basic Lighthouse report
on the deployed site, and final verification/documentation updates.

**Verified source revision:**
[dc67c1adec594662e398eae3bfbae1672c808f31](https://github.com/pritulapavel/10x-shop-pavlepritula/commit/dc67c1adec594662e398eae3bfbae1672c808f31)
(`fix: improve responsive sizing and add error boundary`). Read-only inspection
of the user's local commit confirmed its responsive-grid fixes, interactive-target
sizing corrections and ErrorBoundary implementation/wrapper. Remote push status
was not checked.

## Recorded verification

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

Firefox was not tested: no approved connection was available and its version is
unknown. Deployment and deployed-site Lighthouse results are not yet available.

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
breakpoint boundaries would make the existing checks easier to repeat. Completing
Firefox and deployed-site verification is still necessary before calling the
submission finished.

## AI assistance

- OpenAI Codex assisted with the staged CORE plan and project configuration.
- Codex helped implement typed components, contexts, routing and checkout.
- Codex investigated the four recorded bugs and documented verified corrections.
- Codex ran local checks and supported automated browser and ErrorBoundary verification.
- The user supplied manual Chrome grid measurements; Codex recorded them separately.
- Codex prepared submission documentation while retaining the Firefox and delivery gaps.

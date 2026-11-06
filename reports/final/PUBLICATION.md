# Owner publication and submission checklist

The local port 4209 build contains the promo hint on top of `567a625a470df7f715d7159d62b028eb7ae914b6`; the hint and delivery records are unstaged. [PR #4](https://github.com/pritulapavel/10x-shop-pavlepritula/pull/4) already merged the base into `main` as `4ed8f7ff73b8d9659a48450d304982a499017de5`. The currently observed hosted entry is `index-C3zB35AX.js`; the locally built follow-up entry is `index-BN9bX7CA.js`. Confirm the actual deployment SHA in Vercel. [Dated evidence](2026-11-06/README.md)

## Owner Git commands

Run this block in PowerShell. It stages the named files only and stops if the branch, HEAD, index or staged list differ. Review the staged changes before confirming the commit and push.

```powershell
& {
  Set-Location -LiteralPath 'D:\Paul Learn\React\10x-shop' -ErrorAction Stop
  function Invoke-ShopGit {
    & git --no-pager @args
    if ($LASTEXITCODE -ne 0) { throw "Git failed: $args" }
  }
  $branch = 'test/firefox-compatibility'
  $expectedHead = '567a625a470df7f715d7159d62b028eb7ae914b6'
  if ((Invoke-ShopGit branch --show-current) -ne $branch) { throw 'Wrong branch' }
  if ((Invoke-ShopGit rev-parse HEAD) -ne $expectedHead) { throw 'Review the new HEAD first' }
  if (Invoke-ShopGit diff --cached --name-only) { throw 'Index is not empty' }

  $paths = @(
    'src/components/PromoForm.tsx'
    'COMPATIBILITY.md'
    'PLAN.md'
    'README.md'
    'REPORT.md'
    'docs/compat/firefox/2026-11-06/README.md'
    'reports/final/GITHUB-TRACKING.md'
    'reports/final/GRADING-STATUS.md'
    'reports/final/PUBLICATION.md'
    'reports/lighthouse/2026-11-06/README.md'
    'reports/final/2026-11-06/README.md'
    'reports/final/2026-11-06/browser-checks.json'
    'reports/final/2026-11-06/hosted-desktop.html'
    'reports/final/2026-11-06/hosted-desktop.json'
    'reports/final/2026-11-06/hosted-mobile.html'
    'reports/final/2026-11-06/hosted-mobile.json'
    'reports/final/2026-11-06/local-double-click-order.jpg'
  )

  Invoke-ShopGit status -sb
  Invoke-ShopGit add -- @paths
  $staged = @(Invoke-ShopGit diff --cached --name-only)
  if (Compare-Object -ReferenceObject $paths -DifferenceObject $staged) {
    throw 'Staged files differ from the reviewed list'
  }
  Invoke-ShopGit diff --cached --check
  Invoke-ShopGit diff --cached --stat
  if ((Read-Host 'Review the staged changes; type YES to commit and push') -cne 'YES') {
    throw 'Stopped before commit; the reviewed files remain staged'
  }
  Invoke-ShopGit commit -m 'fix: clarify cart promo and record delivery verification'
  Invoke-ShopGit push origin $branch
  Invoke-ShopGit status -sb
  Invoke-ShopGit log -3 --oneline
}
```

## Follow-up PR

**Title:** Clarify the cart promo and record final delivery evidence

**What and why:** Show the existing `10X10` discount beside the input and associate it with the input without dropping the validation error. Import both hosted Lighthouse exports and record the route, purchase and grading evidence with its limitations.

**How tested:** Typecheck, lint, Vite build and the existing cart regression passed. Chrome verified the local hint in both themes at 375 and 1920 CSS px. A local in-app browser double-click produced one saved order. On the earlier hosted build, Chrome verified direct Product and NotFound; the in-app browser completed a simulated purchase and order reload. Final Firefox, Edge/Safari and the clean post-publication Lighthouse audit remain open.

Related: [PR #4](https://github.com/pritulapavel/10x-shop-pavlepritula/pull/4). There is no published Issue to link yet.

## Owner verification and submission order

1. Open the follow-up PR from `test/firefox-compatibility` into `main` and review it. After merging, confirm the production source SHA and domain in Vercel. Open [10X Shop](https://10x-shop-pavlepritula.vercel.app/), verify the promo hint in Cart, Product direct reload, the saved Order Details login return, and app NotFound. If checking static resources, use Network to verify `/robots.txt` returns 200 as plain text and `/favicon.svg` returns 200 as SVG.
2. Record the [2:40 demo](../full/DEMO.md) with synthetic data. Replace the “Demo video” pending line under README → Live demo with the actual video link. Check the video and [repository](https://github.com/pritulapavel/10x-shop-pavlepritula) while signed out.
3. Run Mobile / Navigation Lighthouse on the confirmed hosted build in Chrome Incognito with extensions inactive. Save JSON and HTML, Desktop if available, with version, date and Vercel source SHA. Finish the [Firefox scenarios](../../docs/compat/firefox/2026-11-06/README.md) and check Edge or Safari separately; log the actual versions and CSS widths. Use the [tracking workflow](GITHUB-TRACKING.md) to create real Issues and a Project without duplicates.
4. Before 23:59 Asia/Tbilisi on November 6, submit the repository, live site, actual demo URL and exact revision. If anything remains open, report it with the [grading matrix](GRADING-STATUS.md). Do not backdate work or wait past the cutoff to improve optional scores.

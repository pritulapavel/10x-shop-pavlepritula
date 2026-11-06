# Owner publication and submission checklist

The final source changes were built from `fdf9ced12015021fd5b7cb5cedb071fd51de0e69` with an unstaged working tree. The preview at `http://127.0.0.1:4208/` served `index-DJmMyxpY.js`. The recorded `origin/main` was `27fb2884ee57bc38f487b232301f9ed47d77dbff`; connected Chrome still saw the old `index-2SMlxQzf.js` on the production domain. Publish from the reviewed branch and check the source SHA in Vercel before treating the domain as current. [Local and live evidence](chrome-checks.json)

## Owner Git commands

Run these from PowerShell. Review the staged stat before each commit. Stop if the branch, HEAD, index or staged list differs from the expected state. The attached grading and JSON evidence are preserved as supplied.

```powershell
Set-Location -LiteralPath 'D:\Paul Learn\React\10x-shop'
git status -sb
if ((git branch --show-current) -ne 'test/firefox-compatibility') { throw 'Wrong branch' }
if ((git rev-parse HEAD) -ne 'fdf9ced12015021fd5b7cb5cedb071fd51de0e69') { throw 'Review newer HEAD before continuing' }
if (git diff --cached --name-only) { throw 'Review the existing index before continuing' }

$appPaths = @(
  'src/components/CatalogPagination.tsx', 'src/components/StockBadge.tsx',
  'src/pages/Catalog.tsx', 'src/pages/OrderDetails.tsx', 'src/utils/order.ts',
  'reports/full/check-orders.mjs', 'reports/final/storefront-fixture.html',
  'reports/final/storefront-fixture.ts'
)
git add -- @appPaths
if ($LASTEXITCODE) { throw 'App staging failed' }
git diff --cached --check
if ($LASTEXITCODE) { throw 'Review staged whitespace' }
git diff --cached --stat
git commit -m 'fix: align catalog stock pagination and saved order flows'
if ($LASTEXITCODE) { throw 'App commit failed' }

$docsPaths = @(
  'COMPATIBILITY.md', 'DEBUG-LOG.md', 'PLAN.md', 'README.md', 'REPORT.md',
  'docs/compat/firefox/2026-11-06/README.md',
  'docs/progress/week-01.md', 'docs/progress/week-02.md', 'docs/progress/week-03.md',
  'reports/final/GRADING-967e75c.md', 'reports/final/GRADING-STATUS.md',
  'reports/final/GITHUB-TRACKING.md', 'reports/final/PUBLICATION.md',
  'reports/final/chrome-checks.json', 'reports/final/profile-phone-checks.json',
  'reports/full/DEMO.md', 'reports/full/RESOLUTION.md', 'reports/lighthouse/2026-11-06/README.md',
  'reports/lighthouse/2026-11-06/baseline/20-26-desktop.json',
  'reports/lighthouse/2026-11-06/baseline/20-26-desktop.html',
  'reports/lighthouse/2026-11-06/baseline/20-26-mobile.json',
  'reports/lighthouse/2026-11-06/baseline/20-26-mobile.html'
)
git add -- @docsPaths
if ($LASTEXITCODE) { throw 'Evidence staging failed' }
git diff --cached --check
if ($LASTEXITCODE) { throw 'Review staged whitespace' }
git diff --cached --stat
git commit -m 'docs: record final rubric coverage and delivery evidence'
if ($LASTEXITCODE) { throw 'Evidence commit failed' }

git push origin test/firefox-compatibility
if ($LASTEXITCODE) { throw 'Push failed; review remote state before retrying' }
git status -sb
git log -3 --oneline
```

## Owner verification and submission order

1. In GitHub review the branch diff and open a PR from `test/firefox-compatibility` into `main`. Merge only after reviewing the changes. In Vercel confirm the production project, domain and deployment's source SHA agree with that merge. The expected domain is [10X Shop](https://10x-shop-pavlepritula.vercel.app/).
2. Open the live root. Inspect the entry script and the nonempty description in the actual page source. The old entry `index-2SMlxQzf.js` means the candidate still has not reached production. Compare the live entry to the artifact built for the published SHA. Open `/robots.txt` and verify a `200 text/plain` response with `User-agent: *` and `Allow: /`. Open `/favicon.svg` and verify a `200 image/svg+xml` response that renders the mark. Use the Network panel for response MIME and the actual response body.
3. Open and reload live `/products/5`. Place one synthetic order, then open its saved `/orders/<uuid>` link directly and reload. After signing in again the same order should open with its saved total. Open `/abc` and `/products/999999` directly. Expect the app's Page not found heading and Catalog link with Header and Footer. Check the 375 px layout and numbered pagination. Finish the remaining [Firefox](../../docs/compat/firefox/2026-11-06/README.md) and Edge/Safari checks on the final candidate.
4. In a clean Chrome Incognito session with extensions inactive, audit the confirmed deployed URL in Lighthouse Mobile/Navigation with the required categories. Save JSON and HTML, and repeat once in Desktop when available. Record versions, source SHA and exact deployed URL in [Lighthouse evidence](../lighthouse/2026-11-06/README.md).
5. Verify the public repository signed out, record the [2:40 demo](../full/DEMO.md), add the actual video link, and submit the repository, live URL, video and exact revision. Use the [grading matrix](GRADING-STATUS.md) to disclose open items. Handle actual Project/Issues through the [tracking handoff](GITHUB-TRACKING.md) and retain accurate historical counts.

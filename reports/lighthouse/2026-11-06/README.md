# Lighthouse evidence · 2026-11-06

The owner supplied two production exports for [10X Shop](https://10x-shop-pavlepritula.vercel.app/). Both requested and finished at the production root. Scores are Performance / Accessibility / Best Practices / SEO. The JSON files are unchanged, and the HTML files were generated from them with the official Lighthouse 13.5.0 ReportGenerator.

| Baseline | Audit time (UTC) | Scores | FCP | LCP | TBT | CLS | Reports |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | `2026-11-06T14:49:26.589Z` | 100 / 100 / 100 / 83 | 395 ms | 821 ms | 0 ms | 0.000191 | [JSON](baseline/desktop.json) · [HTML](baseline/desktop.html) |
| Mobile | `2026-11-06T14:48:12.202Z` | 96 / 100 / 100 / 83 | 1,426 ms | 2,609 ms | 0 ms | 0 | [JSON](baseline/mobile.json) · [HTML](baseline/mobile.html) |

Both reports used Lighthouse 13.5.0, DevTools Navigation, simulated throttling, the four listed categories and storage reset enabled. Desktop used 40 ms RTT, 10,240 Kbps and 1× CPU slowdown. Mobile used 150 ms RTT, 1,638.4 Kbps and 4× CPU slowdown. Both record `screenEmulation.disabled: true`; 412 × 823 and 1.75 are configuration fields rather than proof of the actual viewport. The reduced host UA is Windows `Chrome/156.0.0.0`, while the network UAs identify desktop and mobile emulation. Neither report establishes a full Chrome build, Incognito status or audited Git SHA. Both have no runtime errors, run warnings or observed `chrome-extension://` requests.

| Initial resource fingerprint, both audits | Resource bytes |
| --- | ---: |
| `/assets/index-2SMlxQzf.js` | 246,647 |
| `/assets/decode-N1rXnKT9.js` | 48,067 |
| `/assets/cartStorage-Cqnlx0eF.js` | 2,263 |
| `/assets/index-CEzaTVqM.css` | 35,324 |

SHA-256 of the original JSON and repository copies matched. Desktop `ec3ce26cc3c207bd7cacb0a8ce65ddf9e30dfdee7ce207bbd6d4425dba9fd0f6`. Mobile `5461beb67203c5b8d03c869c6dd29b1938338e2dd1f88b0d0f36407c11ebf535`.

## Findings and candidate checks

- Both SEO audits reported a missing meta description and 15 robots syntax errors from the HTML fallback. Both recorded `/favicon.ico` as HTTP 200 `text/html`. The candidate has a demo-store description, two plain-text robots rules and a valid local SVG favicon based on the existing 10X mark. Vercel gives static files precedence over rewrites, so the SPA rewrite stays in place. [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json)
- The Mobile dependency chain was document → entry module → product API → first thumbnail after rendering. The categories request ran alongside the product request. The mobile trace recorded 544 ms of LCP resource delay and 12 ms of resource loading; the actual Lighthouse simulated LCP is 2,609 ms. The first thumbnail had Low priority. The candidate marks only the first card of the current Catalog result set `fetchpriority="high"`. All thumbnails remain `loading="lazy"`, including Cart and Product gallery. Related Products have default priority. The API-supplied URL still cannot be found in the initial HTML, and Lighthouse's eager-loading recommendation conflicts with the appendix requirement. [LCP discovery guidance](https://developer.chrome.com/docs/performance/insights/lcp-discovery)
- Mobile estimated 26,216 unused entry bytes in its initial view. The remaining routes are already lazy; no specific unused code could be safely removed based on this trace. The preconnect insight found no good additional origins. The candidate adds no new dependency, preconnect, speculative image URL or route/provider split.

The candidate was built from `2f884bf74dc1febde398a05211b0f740772430a4` plus uncommitted source changes and checked at [local Vite preview](http://127.0.0.1:4205/). HTTP served `/robots.txt` as `text/plain` with the two rules and `/favicon.svg` as `image/svg+xml`. Chrome verified search, category, sort, pagination, navigation, image loading and layout in both themes at 375 × 900 and 1920 × 900 CSS px. Cart persisted after F5. The demo order stayed at $17.96 across Cart, Checkout, confirmation and Order Details, including direct open and reload after login. The order cleared the cart. [Structured checks](candidate/verification.json) · [Mobile preview](candidate/catalog-mobile-dark.jpg)

## Audit and publication handoff

Lighthouse CLI 13.5.0 returned `Unable to connect to Chrome`. The retained 19:12 Tbilisi launcher log (`lighthouse.y1tv6F/chrome-err.log` in the Windows temporary directory) shows a loopback DevTools listener, repeated GPU process exits (`-1073741790`), then `GPU process isn't usable. Goodbye.` The connected Chrome tool had no Lighthouse capability. The native DevTools attempt stopped at the mandatory Windows URL check because the active Chrome URL could not be determined with enough confidence. There are zero new candidate audits, so candidate scores, performance deltas and median LCP remain pending.

Reuse the running [local preview](http://127.0.0.1:4205/). In a Chrome Incognito window with extensions inactive, open DevTools → Lighthouse → Navigation. Keep simulated throttling and Clear storage enabled. Select Performance, Accessibility, Best Practices and SEO. Run Mobile first and use the report menu → Save as JSON into `candidate/mobile-1.json`. Switch to Desktop and save `candidate/desktop.json`. Two additional Mobile runs can establish the median Performance and LCP when comparable repeats are available. Use the same host environment and settings for before/after comparisons. After publication, verify `/robots.txt` and `/favicon.svg` MIME and body, direct route refresh and a hosted audit separately. [Chrome Lighthouse instructions](https://developer.chrome.com/docs/lighthouse/overview)

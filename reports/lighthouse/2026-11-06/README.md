# Lighthouse evidence · 2026-11-06

For the newer 21:44 Desktop and 21:55 Mobile exports on hosted `index-C3zB35AX.js`, see [dated delivery evidence](../../final/2026-11-06/README.md). Both scored SEO 100; extensions were present and Desktop recorded a screenshot timeout. The reports below are earlier baselines.

The owner supplied production exports for [10X Shop](https://10x-shop-pavlepritula.vercel.app/) at 18:48–18:49 and again at 20:26 Tbilisi. All requested and finished at the production root. Scores are Performance / Accessibility / Best Practices / SEO. The JSON files are unchanged, and the HTML files were generated from them with the official Lighthouse 13.5.0 ReportGenerator.

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

## Additional production baselines at 20:26 Tbilisi

| Device | Time (UTC) | Performance / Accessibility / Best Practices / SEO | LCP | TBT | CLS | Original and rendered reports |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Desktop | `2026-11-06T16:26:20.753Z` | 100 / 100 / 100 / 83 | 442 ms | 0 ms | 0.000311 | [JSON](baseline/20-26-desktop.json) · [HTML](baseline/20-26-desktop.html) |
| Mobile | `2026-11-06T16:26:50.208Z` | 95 / 100 / 100 / 83 | 2,818 ms | 54 ms | 0 | [JSON](baseline/20-26-mobile.json) · [HTML](baseline/20-26-mobile.html) |

Both used DevTools Navigation, Lighthouse 13.5.0 and simulated throttling at the production root. Both also reported Agentic Browsing 50. The host UA reports reduced Chrome `156.0.0.0`. Extension script URLs appear in source maps, treemaps, unused and unminified JavaScript and third-party audits, despite no extension rows in `network-requests`. These runs do not establish clean extension-free performance or the full Chrome version. The copied JSON is byte-identical to the supplied files.

SHA-256 of the 20:26 originals and copies matched. Desktop `cd96daf54c834979a3f0d34cd4fb151b97882fe8d0b3a00706df25760314f1c6`. Mobile `f8d2e1ba68bd26bc423b99b547da4a5c1546bd7f3809360d61b64a92bdf4c63b`.

Both still used `index-2SMlxQzf.js`, with the description missing and 15 `robots.txt` syntax errors. A later connected-Chrome check observed the same entry and a `text/html` app fallback at `/robots.txt`. The final local build on port 4208 has `index-DJmMyxpY.js`, the intended description, `text/plain` robots rules and `image/svg+xml` favicon. The newer production reports are still before evidence. [Observed live fingerprint](../../final/chrome-checks.json) · [Publication checklist](../../final/PUBLICATION.md)

## Findings and candidate checks

- Both SEO audits reported a missing meta description and 15 robots syntax errors from the HTML fallback. Both recorded `/favicon.ico` as HTTP 200 `text/html`. The candidate has a demo-store description, two plain-text robots rules and a valid local SVG favicon based on the existing 10X mark. Vercel gives static files precedence over rewrites, so the SPA rewrite stays in place. [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json)
- The Mobile dependency chain was document → entry module → product API → first thumbnail after rendering. The categories request ran alongside the product request. The mobile trace recorded 544 ms of LCP resource delay and 12 ms of resource loading; the actual Lighthouse simulated LCP is 2,609 ms. The first thumbnail had Low priority. The candidate marks only the first card of the current Catalog result set `fetchpriority="high"`. All thumbnails remain `loading="lazy"`, including Cart and Product gallery. Related Products have default priority. The API-supplied URL still cannot be found in the initial HTML, and Lighthouse's eager-loading recommendation conflicts with the appendix requirement. [LCP discovery guidance](https://developer.chrome.com/docs/performance/insights/lcp-discovery)
- Mobile estimated 26,216 unused entry bytes in its initial view. The remaining routes are already lazy; no specific unused code could be safely removed based on this trace. The preconnect insight found no good additional origins. The candidate adds no new dependency, preconnect, speculative image URL or route/provider split.

The earlier SEO candidate was built from `2f884bf74dc1febde398a05211b0f740772430a4` plus uncommitted source changes and checked on local port 4205. HTTP served `/robots.txt` as `text/plain` and `/favicon.svg` as `image/svg+xml`. Chrome verified search, category, sort, pagination, navigation, images and layout in both themes at 375 × 900 and 1920 × 900 CSS px. Cart persisted after F5. The demo order stayed at $17.96 across Cart, Checkout, confirmation and Order Details, including direct open and reload after login. The order cleared the cart. [Structured checks](candidate/verification.json) · [Mobile preview](candidate/catalog-mobile-dark.jpg)

## Audit and publication handoff

Lighthouse CLI 13.5.0 returned `Unable to connect to Chrome`. The retained 19:12 Tbilisi launcher log (`lighthouse.y1tv6F/chrome-err.log` in the Windows temporary directory) shows a loopback DevTools listener, repeated GPU process exits (`-1073741790`), then `GPU process isn't usable. Goodbye.` The connected Chrome tool had no Lighthouse capability. The native DevTools attempt stopped at the mandatory Windows URL check because the active Chrome URL could not be determined with enough confidence. The later owner exports establish hosted scores, while the clean post-hint audit and controlled performance comparison remain open.

After owner publication, first verify the source SHA and live entry, description, robots and favicon. In Chrome Incognito with extensions inactive, open the confirmed production URL and run DevTools → Lighthouse → Navigation. Keep simulated throttling and Clear storage enabled. Select Performance, Accessibility, Best Practices and SEO. Run Mobile first and save JSON and HTML into `candidate/` with a `hosted-mobile` prefix. Switch to Desktop where available and save `hosted-desktop`. Keep comparable settings if making a before/after claim, and prioritize required evidence over repetitions. [Chrome Lighthouse instructions](https://developer.chrome.com/docs/lighthouse/overview)

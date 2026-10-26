# Debug log

Only reproduced issues and verified fixes are recorded here.

## Catalog stage (7–8 and partial task 12): singular badge label

- **Observed:** With one unit in the cart, the browser accessibility tree showed
  `Cart 1 items in cart`. The numeric badge worked, but its accessible label used
  the plural for a single unit.
- **Cause:** The initial `aria-label` always used `items`.
- **Fix:** Use `item` when the quantity is 1, and `items` otherwise.
- **Verification:** The bad label was observed during the stock-limit browser
  check. The final Header contains the singular/plural conditional; stage checks passed.
  This was an accessibility-tree check, not a separate screen-reader session.
- **Commit reference:** `32fd6aa1e4e04aa24ed84a33a562ecb1e0ae5394`
  (`feature: add product catalog and shared cart state`) contains the corrected
  label. The correction was made before that commit; there is no separate fix commit.

## Product/Cart stage (10–13): accepted add retained stale stock

- **Baseline:** `32fd6aa1e4e04aa24ed84a33a562ecb1e0ae5394`.
- **Reproduction:** Call `addItem` with stock 2 and quantity 1, then add 2 more
  units of the same product with an updated stock of 5. A temporary Node check
  of the actual CartContext updater produced quantity 3 but stored stock 2.
- **Impact:** The accepted cart state could have quantity greater than its own
  stored stock. Cart quantity controls would then use an outdated limit.
- **Cause:** Validation used the incoming product's stock, but the existing-item
  update copied only the new quantity into the stored item.
- **Fix:** An accepted addition now updates the stored stock from `product.stock`
  together with the quantity, while retaining central stock validation.
- **Verification:** The regression check now produces quantity 3 and stock 5.
  Additional assertions reject quantities above stock and invalid totals, and
  check immutable/pure updates. Browser stock-limit and cross-page synchronization
  checks also passed.
- **Fix commit:** None yet. The fix is in the working tree; no commit was created
  during this stage, as requested.

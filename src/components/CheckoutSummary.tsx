import type { CartTotals, PromoCode, OrderLine } from '../types'
import { formatCents } from '../utils/currency'
import ProductPrice from './ProductPrice'
import TotalsBreakdown from './TotalsBreakdown'

interface CheckoutSummaryProps {
  items: OrderLine[]
  totals: CartTotals
  promoCode?: PromoCode
}

function CheckoutSummary({ items, totals, promoCode }: CheckoutSummaryProps) {
  return (
    <aside
      aria-labelledby="checkout-summary-heading"
      className="panel min-w-0 p-4 sm:p-6"
    >
      <h2 id="checkout-summary-heading" className="text-xl font-semibold text-ink">
        Order summary
      </h2>
      <ul className="my-4 divide-y divide-line border-b border-line">
        {items.map((item) => (
          <li key={item.productId} className="space-y-1.5 py-3 first:pt-0">
            <p className="break-words font-medium text-ink">{item.title}</p>
            <div className="flex flex-wrap justify-between gap-2 text-sm text-muted">
              <div className="flex flex-wrap items-center gap-x-2">
                <ProductPrice {...item} />
                <span>× {item.quantity}</span>
              </div>
              <span className="font-semibold text-ink tabular-nums">{formatCents(item.lineTotalCents)}</span>
            </div>
          </li>
        ))}
      </ul>
      <TotalsBreakdown totals={totals} promoCode={promoCode} />
    </aside>
  )
}

export default CheckoutSummary

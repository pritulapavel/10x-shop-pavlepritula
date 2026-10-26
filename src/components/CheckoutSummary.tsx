import type { CartItem } from '../types'
import { formatUSD, toCents } from '../utils/currency'

interface CheckoutSummaryProps {
  items: CartItem[]
  subtotalCents: number
  totalCents: number
}

function CheckoutSummary({ items, subtotalCents, totalCents }: CheckoutSummaryProps) {
  return (
    <aside
      aria-labelledby="checkout-summary-heading"
      className="min-w-0 rounded-xl border border-slate-200 bg-white p-6"
    >
      <h2 id="checkout-summary-heading" className="text-xl font-semibold text-slate-900">
        Order summary
      </h2>
      <ul className="my-6 divide-y divide-slate-200">
        {items.map((item) => (
          <li key={item.productId} className="space-y-2 py-4 first:pt-0">
            <p className="break-words font-medium text-slate-900">{item.title}</p>
            <div className="flex flex-wrap justify-between gap-2 text-sm text-slate-600">
              <span>{formatUSD(item.price)} × {item.quantity}</span>
              <span>{formatUSD(toCents(item.price) * item.quantity / 100)}</span>
            </div>
          </li>
        ))}
      </ul>
      <dl className="space-y-4">
        <div className="flex justify-between gap-4 text-slate-600">
          <dt>Subtotal</dt>
          <dd>{formatUSD(subtotalCents / 100)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
          <dt>Total</dt>
          <dd>{formatUSD(totalCents / 100)}</dd>
        </div>
      </dl>
    </aside>
  )
}

export default CheckoutSummary

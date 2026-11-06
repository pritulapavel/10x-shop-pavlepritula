import type { CartTotals, PromoCode } from '../types'
import { formatCents } from '../utils/currency'

export default function TotalsBreakdown({ totals, promoCode }: { totals?: CartTotals; promoCode?: PromoCode }) {
  return (
    <dl className="space-y-2.5 text-sm tabular-nums">
      <div className="flex justify-between gap-3 text-muted">
        <dt>Subtotal</dt>
        <dd className="shrink-0 font-medium text-ink">{totals ? formatCents(totals.subtotalCents) : 'Pending'}</dd>
      </div>
      {promoCode && (
        <div className="flex justify-between gap-3 text-success">
          <dt>Discount (10X10 −10%)</dt>
          <dd className="shrink-0 font-semibold">{totals ? formatCents(-totals.promoDiscountCents) : 'Pending'}</dd>
        </div>
      )}
      <div className="flex justify-between gap-3 text-muted">
        <dt>Shipping</dt>
        <dd className="shrink-0 font-medium text-ink">{totals ? totals.shippingCents ? formatCents(totals.shippingCents) : 'Free' : 'Pending'}</dd>
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded-xl bg-surface-muted px-3 py-2.5 text-base font-semibold">
        <dt>Total</dt>
        <dd className="text-xl font-bold">{totals ? formatCents(totals.totalCents) : 'Pending'}</dd>
      </div>
    </dl>
  )
}

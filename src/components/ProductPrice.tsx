import { discountedUnitCents, formatCents, toCents } from '../utils/currency'

interface ProductPriceProps {
  price: number
  discountPercentage: number
  unitPriceCents?: number
}

export default function ProductPrice({ price, discountPercentage, unitPriceCents }: ProductPriceProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="font-bold tabular-nums">{formatCents(unitPriceCents ?? discountedUnitCents({ price, discountPercentage }))}</span>
      {discountPercentage >= 1 && (
        <>
          <del aria-label={`Original price ${formatCents(toCents(price))}`} className="text-sm text-muted">
            {formatCents(toCents(price))}
          </del>
          <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">
            −{discountPercentage}%
          </span>
        </>
      )}
    </div>
  )
}

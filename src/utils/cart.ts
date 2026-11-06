import type { CartState, CartTotals, PromoCode } from '../types'
import { calculateSubtotalCents, hasResolvedPrice } from './currency.ts'

export interface ICart {
  getTotals(): CartTotals | undefined
}

export class Cart implements ICart {
  readonly snapshot: CartState

  constructor(snapshot: CartState) {
    this.snapshot = snapshot
  }

  getTotals(): CartTotals | undefined {
    const { items, promoCode } = this.snapshot
    if (!items.every(hasResolvedPrice)) return undefined
    const subtotalCents = calculateSubtotalCents(items)
    const promoDiscountCents = promoCode ? Math.round(subtotalCents / 10) : 0
    // Shipping uses product-discounted subtotal before the cart promo.
    const shippingCents = items.length > 0 && subtotalCents < 10_000 ? 1_000 : 0
    return {
      subtotalCents,
      promoDiscountCents,
      shippingCents,
      totalCents: subtotalCents - promoDiscountCents + shippingCents,
    }
  }
}

export function parsePromoCode(input: string): PromoCode | undefined {
  return input.trim().toUpperCase() === '10X10' ? '10X10' : undefined
}

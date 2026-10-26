import type { CartItem } from '../types'

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function toCents(amount: number) {
  return Math.round((amount + Number.EPSILON) * 100)
}

export function formatUSD(amount: number) {
  return usdFormatter.format(toCents(amount) / 100)
}

export function calculateSubtotalCents(items: CartItem[]) {
  return items.reduce((total, item) => total + toCents(item.price) * item.quantity, 0)
}

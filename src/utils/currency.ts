import type { CartItem, Product, ResolvedCartItem } from '../types'

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function toCents(amount: number) {
  const cents = amount * 100
  return Math.round(cents + Number.EPSILON * cents)
}

export function formatCents(cents: number) {
  return usdFormatter.format(cents / 100)
}

export function discountedPrice(price: number, discountPercentage: number) {
  return price * (100 - discountPercentage) / 100
}

export function discountedUnitCents({ price, discountPercentage }: Pick<Product, 'price' | 'discountPercentage'>) {
  return toCents(discountedPrice(price, discountPercentage))
}

export function lineTotalCents(item: ResolvedCartItem) {
  return discountedUnitCents(item) * item.quantity
}

export function hasResolvedPrice(item: CartItem): item is ResolvedCartItem {
  return item.discountPercentage !== undefined
}

export function calculateSubtotalCents(items: ResolvedCartItem[]) {
  return items.reduce((total, item) => total + lineTotalCents(item), 0)
}

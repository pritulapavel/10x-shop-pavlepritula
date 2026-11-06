import type { CartItem, Product } from '../types'

export function addCartItem(items: CartItem[], product: Product, quantity: number): CartItem[] {
  if (!Number.isSafeInteger(quantity) || quantity <= 0) return items

  const existing = items.find((item) => item.productId === product.id)
  const nextQuantity = (existing?.quantity ?? 0) + quantity
  if (nextQuantity > product.stock) return items

  const nextItem: CartItem = {
    productId: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    discountPercentage: product.discountPercentage,
    stock: product.stock,
    quantity: nextQuantity,
  }

  return existing
    ? items.map((item) => item.productId === product.id ? nextItem : item)
    : [...items, nextItem]
}

export type ResolvedPrice = Pick<Product, 'id' | 'price' | 'discountPercentage'>

export function mergeLegacyPrices(items: CartItem[], prices: ResolvedPrice[]): CartItem[] {
  return items.map((item) => {
    if (item.discountPercentage !== undefined) return item
    const pricing = prices.find((price) => price.id === item.productId)
    return pricing ? { ...item, price: pricing.price, discountPercentage: pricing.discountPercentage } : item
  })
}

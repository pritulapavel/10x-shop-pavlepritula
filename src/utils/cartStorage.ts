import type { CartItem, CartState } from '../types'
import { isDiscount } from './decode.ts'

import { STORAGE_KEYS, StorageService } from './storage.ts'

export function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false

  return (
    'productId' in value && typeof value.productId === 'number' &&
    Number.isSafeInteger(value.productId) && value.productId > 0 &&
    'title' in value && typeof value.title === 'string' && value.title.trim() !== '' &&
    'thumbnail' in value && typeof value.thumbnail === 'string' && value.thumbnail.trim() !== '' &&
    'price' in value && typeof value.price === 'number' && Number.isFinite(value.price) && value.price >= 0 &&
    'stock' in value && typeof value.stock === 'number' && Number.isSafeInteger(value.stock) && value.stock >= 0 &&
    'quantity' in value && typeof value.quantity === 'number' && Number.isSafeInteger(value.quantity) &&
    value.quantity > 0 && value.quantity <= value.stock &&
    (!('discountPercentage' in value) || isDiscount(value.discountPercentage))
  )
}

export const cartStorage = new StorageService<CartState>(STORAGE_KEYS.cart, (saved) => {
  if (
    typeof saved !== 'object' || saved === null ||
    !('items' in saved) || !Array.isArray(saved.items) || !saved.items.every(isCartItem)
  ) return

  const productIds = new Set(saved.items.map((item) => item.productId))
  if (productIds.size !== saved.items.length) return

  // Copy the allowed cart fields while preserving an unresolved legacy price.
  const items = saved.items.map((item) => ({
    productId: item.productId,
    title: item.title,
    thumbnail: item.thumbnail,
    price: item.price,
    stock: item.stock,
    quantity: item.quantity,
    ...(item.discountPercentage === undefined ? {} : { discountPercentage: item.discountPercentage }),
  }))
  return {
    items,
    ...('promoCode' in saved && saved.promoCode === '10X10' && items.length ? { promoCode: '10X10' } : {}),
  }
})

export function readCart(): CartState {
  const stored = cartStorage.read()
  return stored.ok ? stored.value ?? { items: [] } : { items: [] }
}

export function saveCart(cart: CartState) {
  return cartStorage.write(cart)
}

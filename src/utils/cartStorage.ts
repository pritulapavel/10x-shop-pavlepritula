import type { CartItem, CartState } from '../types'

const CART_STORAGE_KEY = 'shop_cart'

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false

  return (
    'productId' in value && typeof value.productId === 'number' &&
    Number.isSafeInteger(value.productId) && value.productId > 0 &&
    'title' in value && typeof value.title === 'string' && value.title.trim() !== '' &&
    'thumbnail' in value && typeof value.thumbnail === 'string' && value.thumbnail.trim() !== '' &&
    'price' in value && typeof value.price === 'number' && Number.isFinite(value.price) && value.price >= 0 &&
    'stock' in value && typeof value.stock === 'number' && Number.isSafeInteger(value.stock) && value.stock >= 0 &&
    'quantity' in value && typeof value.quantity === 'number' && Number.isSafeInteger(value.quantity) &&
    value.quantity > 0 && value.quantity <= value.stock
  )
}

export function readCart(): CartState {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    if (stored === null) return { items: [] }

    const saved: unknown = JSON.parse(stored)
    if (
      typeof saved !== 'object' || saved === null ||
      !('items' in saved) || !Array.isArray(saved.items) || !saved.items.every(isCartItem)
    ) {
      return { items: [] }
    }

    const productIds = new Set(saved.items.map((item) => item.productId))
    if (productIds.size !== saved.items.length) return { items: [] }

    // Copy only cart fields; unrelated stored properties never enter React state.
    return {
      items: saved.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        thumbnail: item.thumbnail,
        price: item.price,
        stock: item.stock,
        quantity: item.quantity,
      })),
    }
  } catch {
    return { items: [] }
  }
}

export function saveCart(cart: CartState): void {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch {
    // Storage can be blocked or full. Keep the current cart working in memory.
  }
}

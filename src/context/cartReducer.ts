import type { CartState, Product, PromoCode } from '../types'
import { addCartItem, mergeLegacyPrices } from '../utils/cartItems.ts'
import type { ResolvedPrice } from '../utils/cartItems.ts'

export interface ReorderEntry {
  product: Product
  quantity: number
}

export interface ReorderResult {
  id: string
  added: number
  requested: number
}

export interface CartModel extends CartState {
  reorderResult?: ReorderResult
}

export type CartAction =
  | { type: 'add'; product: Product; quantity: number }
  | { type: 'set-quantity'; productId: number; quantity: number }
  | { type: 'remove'; productId: number }
  | { type: 'clear' }
  | { type: 'apply-promo'; code: PromoCode }
  | { type: 'remove-promo' }
  | { type: 'resolve-prices'; prices: ResolvedPrice[] }
  | { type: 'reorder'; id: string; entries: ReorderEntry[]; requested: number }

export function cartReducer(state: CartModel, action: CartAction): CartModel {
  switch (action.type) {
    case 'add': {
      const items = addCartItem(state.items, action.product, action.quantity)
      return items === state.items ? state : { ...state, items }
    }
    case 'set-quantity': {
      const { productId, quantity } = action
      const item = state.items.find((entry) => entry.productId === productId)
      if (!item || !Number.isSafeInteger(quantity) || quantity < 1 ||
        quantity > item.stock || quantity === item.quantity) return state
      const items = state.items.map((entry) => entry.productId === productId ? { ...entry, quantity } : entry)
      return { ...state, items }
    }
    case 'remove': {
      const items = state.items.filter((item) => item.productId !== action.productId)
      return items.length ? { ...state, items } : { items }
    }
    case 'clear':
      return { items: [] }
    case 'apply-promo':
      return state.items.length ? { ...state, promoCode: action.code } : state
    case 'remove-promo':
      return { ...state, promoCode: undefined }
    case 'reorder': {
      let items = state.items
      let added = 0
      for (const { product, quantity } of action.entries) {
        const inCart = items.find((item) => item.productId === product.id)?.quantity ?? 0
        const available = Math.min(quantity, Math.max(0, product.stock - inCart))
        const nextItems = addCartItem(items, product, available)
        if (nextItems !== items) added += available
        items = nextItems
      }
      return { ...state, items, reorderResult: { id: action.id, added, requested: action.requested } }
    }
    case 'resolve-prices':
      return { ...state, items: mergeLegacyPrices(state.items, action.prices) }
  }
}

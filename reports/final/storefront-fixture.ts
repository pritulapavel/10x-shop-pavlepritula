import type { Product, ResolvedCartItem } from '../../src/types'
import { Cart } from '../../src/utils/cart'
import { Order } from '../../src/utils/order'
import { STORAGE_KEYS } from '../../src/utils/storage'

// This test replaces local cart and order data on the dedicated fixture origin.
if (location.origin !== 'http://127.0.0.1:4207') throw new Error('Use the dedicated fixture server on port 4207')

const params = new URLSearchParams(location.search)
const stock = Number(params.get('stock') ?? 5)
const cartQuantity = Number(params.get('cart') ?? 0)
const delay = params.has('delay')
const product: Product = {
  id: 5, title: 'Stock test item', description: 'Local test fixture', price: 10, stock,
  thumbnail: '/favicon.svg', images: [], category: 'beauty', rating: 4, discountPercentage: 0, reviews: [],
}
const stored: ResolvedCartItem = {
  productId: product.id, title: product.title, thumbnail: product.thumbnail,
  price: product.price, stock: 10, quantity: 2, discountPercentage: 0,
}
const totals = new Cart({ items: [stored] }).getTotals()
if (!totals) throw new Error('Fixture total unavailable')
const order = Order.create(1, [stored], {
  fullName: 'Fixture Buyer', email: 'fixture@example.test', address: '123 Test Street', city: 'Tbilisi',
}, totals, undefined)
localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify([{ ...order, id: 'fixture-existing-order' }]))
localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify({
  items: cartQuantity > 0 ? [{ ...stored, quantity: cartQuantity }] : [],
}))

const output = document.querySelector('output')
const originalFetch = window.fetch.bind(window)
window.fetch = async (input, options) => {
  if (input === 'https://dummyjson.com/products?limit=12&skip=0') {
    return Response.json({ products: [product], total: 1, skip: 0, limit: 12 })
  }
  if (input !== 'https://dummyjson.com/products/5') return originalFetch(input, options)
  if (output) output.textContent = 'Stock request started'
  if (delay) {
    await new Promise<never>((_, reject) => {
      options?.signal?.addEventListener('abort', () => {
        if (output) output.textContent = 'Stock request aborted'
        reject(new DOMException('Fixture request aborted', 'AbortError'))
      }, { once: true })
    })
  }
  return Response.json(product)
}

history.replaceState(null, '', params.get('view') === 'catalog' ? '/' : '/orders/fixture-existing-order')
void import('../../src/main.tsx')

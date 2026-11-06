import assert from 'node:assert/strict'
import { Cart } from '../../src/utils/cart.ts'
import { cartReducer } from '../../src/context/cartReducer.ts'
import { Order } from '../../src/utils/order.ts'
import { orderStorage, saveNewOrder } from '../../src/utils/orderStorage.ts'
import { STORAGE_KEYS } from '../../src/utils/storage.ts'

const cart = { items: [{
  productId: 5, title: 'Fixture', thumbnail: '/fixture.webp', price: 9.99, discountPercentage: 10, stock: 6, quantity: 6,
}], promoCode: '10X10' }
const delivery = { fullName: 'Test Buyer', email: 'qa@example.test', address: '12 Test Street', city: 'Tbilisi' }
const totals = new Cart(cart).getTotals()
const now = Date.parse('2026-11-05T12:00:00Z')
const values = new Map([[STORAGE_KEYS.cart, JSON.stringify(cart)]])
let canWrite = false
globalThis.window = { localStorage: {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => {
    if (!canWrite) throw new Error('Mocked quota failure')
    values.set(key, value)
  },
  removeItem: (key) => values.delete(key),
} }
assert.equal(saveNewOrder(cart.items, delivery, totals, cart.promoCode, now), undefined)
assert.deepEqual(JSON.parse(values.get(STORAGE_KEYS.cart)), cart)
assert.equal(values.has(STORAGE_KEYS.orders), false)
canWrite = true
const first = saveNewOrder(cart.items, delivery, totals, cart.promoCode, now).order
const second = saveNewOrder(cart.items, delivery, totals, cart.promoCode, now + 1).order
assert.equal(first.number, 1)
assert.equal(second.number, 2)
assert.notEqual(first.id, second.id)
assert.equal(first.items[0].unitPriceCents, 899)
assert.equal(first.items[0].lineTotalCents, 5394)
assert.equal(first.totals.totalCents, 5855)
cart.items[0].price = 2
delivery.city = 'Other'
assert.equal(first.items[0].price, 9.99)
assert.equal(first.delivery.city, 'Tbilisi')
assert.deepEqual(orderStorage.read(), { ok: true, value: [second, first] })
const order = new Order(first)
assert.equal(order.label, 'Order #10X-00001')
assert.equal(new Order(second).label, 'Order #10X-00002')
for (const [elapsed, expected] of [
  [0, 'Processing'], [59_999, 'Processing'], [60_000, 'Shipped'],
  [179_999, 'Shipped'], [180_000, 'Shipped'], [180_001, 'Delivered'],
]) assert.equal(order.statusAt(now + elapsed), expected)
const partial = cartReducer({ items: [] }, {
  type: 'reorder', id: 'test', requested: 6,
  entries: [{ product: { id: 5, title: 'Fixture', price: 20, discountPercentage: 0, stock: 2, thumbnail: '/fixture.webp' }, quantity: 6 }],
})
assert.equal(partial.items[0].quantity, 2)
assert.equal(partial.items[0].price, 20)
assert.deepEqual(partial.reorderResult, { id: 'test', added: 2, requested: 6 })
const product = { id: 5, title: 'Fixture', price: 20, discountPercentage: 0, stock: 6, thumbnail: '/fixture.webp' }
const full = cartReducer(partial, {
  type: 'reorder', id: 'full', requested: 4, entries: [{ product, quantity: 4 }],
})
assert.equal(full.items[0].quantity, 6)
assert.deepEqual(full.reorderResult, { id: 'full', added: 4, requested: 4 })
const zero = cartReducer(full, {
  type: 'reorder', id: 'zero', requested: 1, entries: [{ product, quantity: 1 }],
})
assert.equal(zero.items, full.items)
assert.deepEqual(zero.reorderResult, { id: 'zero', added: 0, requested: 1 })
values.set(STORAGE_KEYS.theme, JSON.stringify('dark'))
assert.equal(orderStorage.remove(), true)
assert.equal(values.has(STORAGE_KEYS.orders), false)
assert.equal(values.get(STORAGE_KEYS.theme), '"dark"')
console.log('Order storage, labels, snapshots, status boundaries, full/partial/zero reorder and scoped clearing passed')

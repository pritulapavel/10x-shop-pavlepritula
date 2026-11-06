import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { stripTypeScriptTypes } from 'node:module'
import { addCartItem, mergeLegacyPrices } from '../../src/utils/cartItems.ts'
import { readCart, saveCart } from '../../src/utils/cartStorage.ts'
import { calculateSubtotalCents, discountedUnitCents, hasResolvedPrice } from '../../src/utils/currency.ts'
import { getProduct, isApiError } from '../../src/utils/api.ts'

const product = {
  id: 1, title: 'Fixture', price: 9.99, stock: 9, discountPercentage: 10,
  description: '', thumbnail: '/fixture.webp', images: [], category: 'fixture', rating: 4.5,
}
const legacy = { productId: 1, title: product.title, thumbnail: product.thumbnail, price: 9.99, stock: 9, quantity: 6 }
const baseline = execFileSync('git', ['show', '967e75c:src/utils/currency.ts'], { encoding: 'utf8' })
const oldCurrency = await import(`data:text/javascript,${encodeURIComponent(stripTypeScriptTypes(baseline))}`)
assert.equal(oldCurrency.calculateSubtotalCents([{ ...legacy, discountPercentage: 10 }]), 5994)
assert.equal(discountedUnitCents(product), 899)
assert.equal(discountedUnitCents({ price: 9.99, discountPercentage: 0 }), 999)
assert.equal(discountedUnitCents({ price: 9.99, discountPercentage: 0.55 }), 994)
assert.equal(discountedUnitCents({ price: 1.005, discountPercentage: 0 }), 101)

const values = new Map([['shop_cart', JSON.stringify({ items: [legacy] })]])
globalThis.window = { localStorage: {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value),
} }
assert.deepEqual(readCart().items, [legacy])
assert.equal(hasResolvedPrice(readCart().items[0]), false)
const resolved = mergeLegacyPrices(readCart().items, [product])
assert.equal(calculateSubtotalCents(resolved), 5394)
assert.equal(resolved[0].price, 9.99)
saveCart({ items: resolved })
assert.deepEqual(readCart().items, resolved)
assert.equal(calculateSubtotalCents(readCart().items), 5394)
assert.deepEqual(mergeLegacyPrices([], [product]), [])
assert.equal(mergeLegacyPrices([{ ...legacy, quantity: 2 }], [product])[0].quantity, 2)
const newer = addCartItem([legacy], { ...product, price: 12, discountPercentage: 0 }, 1)
assert.equal(newer[0].quantity, 7)
assert.equal(newer[0].price, 12)
assert.equal(mergeLegacyPrices(newer, [product])[0].price, 12)
assert.equal(hasResolvedPrice(newer[0]), true)
assert.equal(addCartItem(newer, product, 3), newer)
saveCart({ items: [{ ...legacy, discountPercentage: -1 }] })
assert.deepEqual(readCart().items, [])
saveCart({ items: [] })
assert.deepEqual(readCart().items, [])

let requests = 0
globalThis.fetch = async () => ++requests === 1
  ? new Response(null, { status: 503 })
  : Response.json(product)
await assert.rejects(getProduct(1), (error) => isApiError(error) && error.status === 503)
assert.equal((await getProduct(1)).discountPercentage, 10)
await assert.rejects(getProduct(2), (error) => isApiError(error) && error.status === 502)
console.log('Pricing, baseline reproduction, legacy round trip, late merges, repeated add, API failure/retry passed')

import assert from 'node:assert/strict'
import { Cart, parsePromoCode } from '../../src/utils/cart.ts'
import { cartReducer } from '../../src/context/cartReducer.ts'
import { readCart, saveCart } from '../../src/utils/cartStorage.ts'

const item = { productId: 1, title: 'Fixture', thumbnail: '/fixture.webp', price: 99.99, quantity: 1, stock: 2, discountPercentage: 0 }
for (const [subtotal, shipping] of [[9999, 1000], [10000, 0], [10001, 0]]) {
  for (const promoCode of [undefined, '10X10']) {
    const promoDiscountCents = promoCode ? 1000 : 0
    assert.deepEqual(new Cart({ items: [{ ...item, price: subtotal / 100 }], promoCode }).getTotals(), {
      subtotalCents: subtotal, shippingCents: shipping, promoDiscountCents,
      totalCents: subtotal + shipping - promoDiscountCents,
    })
  }
}
assert.equal(new Cart({ items: [], promoCode: '10X10' }).getTotals().shippingCents, 0)
assert.equal(new Cart({ items: [{ ...item, discountPercentage: undefined }] }).getTotals(), undefined)
assert.equal(parsePromoCode(' 10x10 '), '10X10')
assert.equal(parsePromoCode('10X'), undefined)
const state = Object.freeze({ items: Object.freeze([Object.freeze(item)]) })
const applied = cartReducer(state, { type: 'apply-promo', code: '10X10' })
assert.equal(applied.promoCode, '10X10')
assert.equal(cartReducer(applied, { type: 'set-quantity', productId: 1, quantity: 3 }), applied)
assert.deepEqual(cartReducer(applied, { type: 'remove', productId: 1 }), { items: [] })
assert.deepEqual(cartReducer(applied, { type: 'clear' }), { items: [] })
assert.deepEqual(cartReducer(applied, { type: 'remove-promo' }), { items: state.items, promoCode: undefined })
const values = new Map()
globalThis.window = { localStorage: {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value),
} }
assert.equal(saveCart(applied), true)
assert.deepEqual(readCart(), applied)
console.log('Shipping $99.99/$100.00/$100.01 with/without promo, reducer and promo reload passed')

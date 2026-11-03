// Run from the repository root: node reports/cart-persistence/2026-11-03/check-storage.mjs
// Uses Node's built-in TypeScript support and assertions; no test framework.
import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'
import { readCart, saveCart } from '../../../src/utils/cartStorage.ts'

const item = {
  productId: 5,
  title: 'Red Nail Polish',
  thumbnail: 'https://example.test/product.webp',
  price: 8.99,
  stock: 10,
  quantity: 2,
}
const empty = { items: [] }
const results = []
let values
let writes

function reset(raw = null) {
  values = new Map([['unrelated_key', 'keep me']])
  if (raw !== null) values.set('shop_cart', raw)
  writes = []
  globalThis.window = {
    localStorage: {
      getItem(key) {
        assert.equal(key, 'shop_cart')
        return values.get(key) ?? null
      },
      setItem(key, value) {
        writes.push(key)
        values.set(key, value)
      },
    },
  }
}

function check(name, run) {
  try {
    run()
    results.push({ name, passed: true })
  } catch (error) {
    results.push({ name, passed: false, error: String(error) })
    process.exitCode = 1
  }
}

check('valid initialization reads twice without any writes (StrictMode-safe)', () => {
  const raw = JSON.stringify({ items: [item] })
  reset(raw)
  assert.deepEqual(readCart(), { items: [item] })
  assert.deepEqual(readCart(), { items: [item] })
  assert.deepEqual(writes, [])
  assert.equal(values.get('shop_cart'), raw)
})

const invalidValues = [
  null, [], {}, { items: null }, { items: {} }, { items: [null] },
  ...[0, -1, 1.5, '5', Number.MAX_SAFE_INTEGER + 1].map(productId => ({ items: [{ ...item, productId }] })),
  ...[-1, 1.5, '10', Number.MAX_SAFE_INTEGER + 1].map(stock => ({ items: [{ ...item, stock }] })),
  ...[0, -1, 1.5, '2', 11].map(quantity => ({ items: [{ ...item, quantity }] })),
  ...[-0.01, '8.99', null].map(price => ({ items: [{ ...item, price }] })),
  { items: [{ ...item, stock: 0 }] },
  { items: [{ ...item, title: '' }] },
  { items: [{ ...item, thumbnail: 123 }] },
  { items: [item, item] },
]

for (const [index, value] of invalidValues.entries()) {
  check(`invalid stored shape/field/invariant ${index + 1} is rejected without writing`, () => {
    reset(JSON.stringify(value))
    assert.deepEqual(readCart(), empty)
    assert.deepEqual(writes, [])
  })
}

for (const raw of ['{broken', '{"items":[{"productId":5,"title":"Test","thumbnail":"x","price":1e400,"stock":2,"quantity":1}]}']) {
  check(`malformed or non-finite JSON is rejected: ${raw.slice(0, 16)}`, () => {
    reset(raw)
    assert.deepEqual(readCart(), empty)
    assert.equal(values.get('shop_cart'), raw)
  })
}

check('missing storage entry and a valid empty cart restore empty', () => {
  reset()
  assert.deepEqual(readCart(), empty)
  reset(JSON.stringify(empty))
  assert.deepEqual(readCart(), empty)
})

check('zero-priced item with quantity equal to stock is valid', () => {
  const freeItem = { ...item, price: 0, quantity: 10 }
  reset(JSON.stringify({ items: [freeItem] }))
  assert.deepEqual(readCart(), { items: [freeItem] })
})

check('unrelated fields are discarded and only cart fields are saved', () => {
  reset(JSON.stringify({ items: [{ ...item, password: 'do not persist' }], delivery: { city: 'discard' } }))
  const cart = readCart()
  assert.deepEqual(cart, { items: [item] })
  saveCart(cart)
  assert.deepEqual(JSON.parse(values.get('shop_cart')), { items: [item] })
  assert.equal(values.get('unrelated_key'), 'keep me')
  assert.deepEqual(writes, ['shop_cart'])
})

check('multiple products and changed quantities round-trip', () => {
  reset()
  const cart = { items: [{ ...item, quantity: 3 }, { ...item, productId: 4, quantity: 1 }] }
  saveCart(cart)
  assert.deepEqual(readCart(), cart)
  saveCart({ items: [cart.items[0]] })
  assert.deepEqual(readCart(), { items: [cart.items[0]] })
})

check('saving an empty cart prevents removed or purchased items returning', () => {
  reset(JSON.stringify({ items: [item] }))
  saveCart(empty)
  assert.deepEqual(JSON.parse(values.get('shop_cart')), empty)
  assert.deepEqual(readCart(), empty)
  assert.equal(values.get('unrelated_key'), 'keep me')
})

check('localStorage property access failure is caught on read and write', () => {
  globalThis.window = Object.defineProperty({}, 'localStorage', {
    get() { throw new Error('Storage blocked') },
  })
  assert.deepEqual(readCart(), empty)
  assert.doesNotThrow(() => saveCart({ items: [item] }))
})

check('getItem failure is caught', () => {
  reset()
  window.localStorage.getItem = () => { throw new Error('Read denied') }
  assert.deepEqual(readCart(), empty)
})

check('quota/write failure does not mutate a working in-memory cart or other keys', () => {
  reset(JSON.stringify({ items: [item] }))
  const cart = readCart()
  cart.items[0].quantity = 3
  const before = structuredClone(cart)
  window.localStorage.setItem = () => { throw new Error('Quota exceeded') }
  assert.doesNotThrow(() => saveCart(cart))
  assert.deepEqual(cart, before)
  assert.equal(values.get('unrelated_key'), 'keep me')
  // A denied write cannot replace the browser's previous stored value.
  assert.equal(JSON.parse(values.get('shop_cart')).items[0].quantity, 2)
})

delete globalThis.window
const report = {
  date: '2026-11-03',
  tool: `Node ${process.version}, built-in assertions against actual cartStorage.ts`,
  scope: 'Mocked localStorage failure/validation checks, separate from real Chrome UI checks',
  passed: results.filter(result => result.passed).length,
  failed: results.filter(result => !result.passed).length,
  results,
}
writeFileSync(new URL('./storage-checks.json', import.meta.url), JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify(report))

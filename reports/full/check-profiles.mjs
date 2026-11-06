import assert from 'node:assert/strict'
import { clearSavedProfiles, emptyProfile, readProfile, saveProfile } from '../../src/utils/profileStorage.ts'
import { STORAGE_KEYS } from '../../src/utils/storage.ts'

const otherData = new Map([
  [STORAGE_KEYS.cart, '{"items":[]}'],
  [STORAGE_KEYS.orders, '[]'],
  [STORAGE_KEYS.reviews, '{}'],
  [STORAGE_KEYS.theme, '"dark"'],
])
const values = new Map(otherData)
let failRead = false
let failWrite = false
let failRemove = false
let writes = 0

globalThis.window = { localStorage: {
  getItem(key) {
    if (failRead) throw new DOMException('Blocked storage', 'SecurityError')
    return values.get(key) ?? null
  },
  setItem(key, value) {
    writes++
    if (failWrite) throw new DOMException('Storage full', 'QuotaExceededError')
    values.set(key, value)
  },
  removeItem(key) {
    if (failRemove) throw new DOMException('Blocked storage', 'SecurityError')
    values.delete(key)
  },
} }

const alex = { firstName: 'Alex', lastName: 'Tester', email: 'alex@example.test', phone: '+995 555 123 456' }
const sam = { firstName: 'Sam', lastName: 'Tester', email: 'sam@example.test', phone: '' }
assert.deepEqual(readProfile('alex'), emptyProfile)
assert.equal(writes, 0)
assert.equal(saveProfile('   ', alex), false)
assert.equal(saveProfile('  AlEx ', { ...alex, password: 'fixture-only', token: 'fixture-only' }), true)
assert.deepEqual(readProfile(' ALEX '), alex)
assert.deepEqual(readProfile('sam'), emptyProfile)
assert.equal(saveProfile('Sam', sam), true)
assert.deepEqual(readProfile('alex'), alex)
assert.deepEqual(readProfile('sam'), sam)
assert.deepEqual(JSON.parse(values.get(STORAGE_KEYS.profiles)), { alex, sam })
assert.deepEqual(readProfile('constructor'), emptyProfile)
assert.deepEqual(readProfile('__proto__'), emptyProfile)
assert.equal(saveProfile('__proto__', sam), true)
assert.deepEqual(readProfile('__proto__'), sam)

for (const badValue of ['{invalid', 'null', '[]', '"not a map"']) {
  values.set(STORAGE_KEYS.profiles, badValue)
  assert.deepEqual(readProfile('alex'), emptyProfile)
  assert.equal(saveProfile('alex', alex), true)
  assert.deepEqual(readProfile('alex'), alex)
}
values.set(STORAGE_KEYS.profiles, JSON.stringify({ alex, sam: { ...sam, phone: 555 }, SAM: sam }))
assert.deepEqual(readProfile('alex'), alex)
assert.deepEqual(readProfile('sam'), emptyProfile)
assert.equal(saveProfile('sam', sam), true)
const stored = values.get(STORAGE_KEYS.profiles)
assert.deepEqual(JSON.parse(stored), { alex, sam })

failRead = true
const writesBefore = writes
assert.deepEqual(readProfile('alex'), emptyProfile)
assert.equal(saveProfile('alex', sam), false)
assert.equal(writes, writesBefore)
failRead = false
failWrite = true
assert.equal(saveProfile('alex', sam), false)
assert.equal(values.get(STORAGE_KEYS.profiles), stored)
assert.deepEqual(readProfile('alex'), alex)
failWrite = false

failRemove = true
assert.equal(clearSavedProfiles(), false)
assert.deepEqual(readProfile('alex'), alex)
failRemove = false
assert.equal(clearSavedProfiles(), true)
assert.deepEqual(readProfile('alex'), emptyProfile)
assert.deepEqual(readProfile('sam'), emptyProfile)
assert.deepEqual(values, otherData)
console.log('Profile storage passed: username isolation, field validation, malformed data recovery, read/quota/removal failures and scoped clear')

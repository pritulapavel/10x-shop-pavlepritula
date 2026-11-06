export const STORAGE_KEYS = {
  cart: 'shop_cart',
  reviews: 'shop_reviews',
  orders: 'shop_orders',
  theme: 'shop_theme',
  profiles: 'shop_profiles',
} as const

type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]
type ReadResult<T> = { ok: true; value: T | undefined } | { ok: false; reason: 'unavailable' | 'invalid' }

export class StorageService<T> {
  readonly key: StorageKey
  readonly decode: (input: unknown) => T | undefined

  constructor(key: StorageKey, decode: (input: unknown) => T | undefined) {
    this.key = key
    this.decode = decode
  }

  read(): ReadResult<T> {
    let raw: string | null
    try {
      raw = window.localStorage.getItem(this.key)
    } catch {
      return { ok: false, reason: 'unavailable' }
    }
    if (raw === null) return { ok: true, value: undefined }

    try {
      const value = this.decode(JSON.parse(raw) as unknown)
      return value === undefined ? { ok: false, reason: 'invalid' } : { ok: true, value }
    } catch {
      return { ok: false, reason: 'invalid' }
    }
  }

  write(value: T): boolean {
    try {
      window.localStorage.setItem(this.key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  }

  remove(): boolean {
    try {
      window.localStorage.removeItem(this.key)
      return true
    } catch {
      return false
    }
  }
}

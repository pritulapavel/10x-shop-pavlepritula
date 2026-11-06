export const STORAGE_KEYS = {
  cart: 'shop_cart',
  reviews: 'shop_reviews',
  orders: 'shop_orders',
  theme: 'shop_theme',
} as const

type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]

export class StorageService<T> {
  readonly key: StorageKey
  readonly decode: (input: unknown) => T | undefined

  constructor(key: StorageKey, decode: (input: unknown) => T | undefined) {
    this.key = key
    this.decode = decode
  }

  read(): { ok: true; value: T | undefined } | { ok: false } {
    try {
      const raw = window.localStorage.getItem(this.key)
      if (raw === null) return { ok: true, value: undefined }
      const value = this.decode(JSON.parse(raw) as unknown)
      return value === undefined ? { ok: false } : { ok: true, value }
    } catch {
      return { ok: false }
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

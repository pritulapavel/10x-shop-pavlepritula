import type { CartTotals, CheckoutFormValues, OrderLine, OrderSnapshot, OrderStatus, PromoCode, ResolvedCartItem } from '../types'
import { discountedUnitCents } from './currency.ts'

export const orderStatuses = ['Processing', 'Shipped', 'Delivered'] as const

export function makeOrderLines(items: ResolvedCartItem[]): OrderLine[] {
  return items.map((item) => {
    const unitPriceCents = discountedUnitCents(item)
    return { ...item, unitPriceCents, lineTotalCents: unitPriceCents * item.quantity }
  })
}

export class Order {
  readonly snapshot: OrderSnapshot

  constructor(snapshot: OrderSnapshot) {
    this.snapshot = snapshot
  }

  static create(number: number, items: ResolvedCartItem[], delivery: CheckoutFormValues, totals: CartTotals,
    promoCode: PromoCode | undefined, now = Date.now()): OrderSnapshot {
    return {
      id: crypto.randomUUID(),
      number,
      placedAt: new Date(now).toISOString(),
      items: makeOrderLines(items),
      delivery: { ...delivery },
      totals: { ...totals },
      promoCode,
    }
  }

  get label() {
    return `Order #${String(this.snapshot.number).padStart(4, '0')}`
  }

  get itemCount() {
    return this.snapshot.items.reduce((count, item) => count + item.quantity, 0)
  }

  statusAt(now: number): OrderStatus {
    const age = now - Date.parse(this.snapshot.placedAt)
    if (age < 60_000) return 'Processing'
    if (age <= 180_000) return 'Shipped'
    return 'Delivered'
  }
}

const orderDateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' })

export function formatOrderDate(date: string) {
  return orderDateFormat.format(new Date(date))
}

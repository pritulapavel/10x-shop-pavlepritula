import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext'
import { useOrderClock } from '../hooks/useOrderClock'
import { formatCents } from '../utils/currency'
import { Order, formatOrderDate } from '../utils/order'

export default function Orders() {
  const { orders } = useOrders()
  const now = useOrderClock(orders.length > 0)
  return (
    <section className="space-y-6">
      <h1 className="display-title">Orders</h1>
      {orders.length === 0 ? (
        <div className="panel space-y-4 p-6">
          <p>You have no orders yet.</p>
          <Link to="/" className="primary-button">Browse products</Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((snapshot) => {
            const order = new Order(snapshot)
            return (
              <li key={snapshot.id}>
                <Link to={`/orders/${snapshot.id}`} className="panel flex min-h-11 flex-wrap items-center justify-between gap-3 p-4 motion-safe:transition-colors hover:border-control">
                  <div>
                    <span className="block font-bold">{order.label}</span>
                    <time className="text-sm text-muted" dateTime={snapshot.placedAt}>{formatOrderDate(snapshot.placedAt)}</time>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span>{order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}</span>
                    <span className="text-base font-bold tabular-nums">{formatCents(snapshot.totals.totalCents)}</span>
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-on-accent-soft">{order.statusAt(now)}</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

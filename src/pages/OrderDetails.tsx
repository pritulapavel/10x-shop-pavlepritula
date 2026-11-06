import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CheckoutSummary from '../components/CheckoutSummary'
import DeliveryDetails from '../components/DeliveryDetails'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import { useToast } from '../context/ToastContext'
import { useOrderClock } from '../hooks/useOrderClock'
import type { OrderSnapshot } from '../types'
import { getProduct } from '../utils/api'
import { formatOrderDate, Order, orderStatuses } from '../utils/order'
import NotFound from './NotFound'

function OrderContents({ snapshot }: { snapshot: OrderSnapshot }) {
  const { reorder, reorderResult } = useCart()
  const navigate = useNavigate()
  const showToast = useToast()
  const order = new Order(snapshot)
  const now = useOrderClock(true)
  const status = order.statusAt(now)
  const [requestId, setRequestId] = useState<string>()
  const controller = useRef<AbortController | null>(null)
  const handledId = useRef<string | null>(null)
  const feedback = requestId && reorderResult?.id === requestId ? reorderResult : undefined
  const loading = Boolean(requestId && feedback?.added !== 0)

  useEffect(() => () => controller.current?.abort(), [])

  useEffect(() => {
    const request = controller.current
    if (!feedback || !request || request.signal.aborted || handledId.current === feedback.id) return
    handledId.current = feedback.id
    if (feedback.added === 0) {
      controller.current = null
      return
    }

    showToast(feedback.added === feedback.requested
      ? 'Items added to cart ✓'
      : `Added ${feedback.added} of ${feedback.requested} items to your cart. The rest were unavailable or exceeded stock limits.`)
    navigate('/cart')
  }, [feedback, navigate, showToast])

  async function handleReorder() {
    if (controller.current) return
    const request = new AbortController()
    controller.current = request
    const id = crypto.randomUUID()
    setRequestId(id)
    const results = await Promise.allSettled(snapshot.items.map(async (item) => ({
      product: await getProduct(item.productId, request.signal),
      quantity: item.quantity,
    })))
    if (request.signal.aborted) return
    const entries = results.flatMap((result) => result.status === 'fulfilled' ? [result.value] : [])
    reorder(id, entries, order.itemCount)
  }

  return (
    <section className="space-y-6">
      <Link to="/orders" className="secondary-button">← Back to orders</Link>
      <div>
        <h1 className="display-title">{order.label}</h1>
        <p className="mt-2 text-muted">Placed <time dateTime={snapshot.placedAt}>{formatOrderDate(snapshot.placedAt)}</time></p>
      </div>
      <section aria-labelledby="timeline-heading" className="panel p-4 sm:p-6">
        <h2 id="timeline-heading" className="text-xl font-semibold">Order timeline</h2>
        <ol className="mt-4 flex flex-wrap gap-2">
          {orderStatuses.map((step, index) => (
            <li key={step} aria-current={step === status ? 'step' : undefined}
              className={`rounded-full px-3 py-1.5 text-sm ${index <= orderStatuses.indexOf(status) ? 'bg-accent-soft font-semibold text-on-accent-soft' : 'bg-surface-muted text-muted'}`}>
              {index + 1}. {step}{step === status && ' (current)'}
            </li>
          ))}
        </ol>
      </section>
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <DeliveryDetails delivery={snapshot.delivery} />
        <CheckoutSummary items={snapshot.items} totals={snapshot.totals} promoCode={snapshot.promoCode} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="primary-button" disabled={loading} onClick={() => void handleReorder()}>
          {loading ? 'Checking availability…' : 'Reorder'}
        </button>
        <Link to="/cart" className="secondary-button">View cart</Link>
      </div>
      {feedback?.added === 0 && (
        <p role="status" className="text-muted">
          No items could be added. Check product availability.
        </p>
      )}
    </section>
  )
}

export default function OrderDetails() {
  const { id } = useParams()
  const { orders } = useOrders()
  const order = orders.find((entry) => entry.id === id)
  return order ? <OrderContents key={order.id} snapshot={order} /> : <NotFound />
}

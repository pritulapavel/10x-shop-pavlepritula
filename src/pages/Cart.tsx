import { Link } from 'react-router-dom'
import QuantityStepper from '../components/QuantityStepper'
import { useCart } from '../context/CartContext'
import { formatUSD, toCents } from '../utils/currency'

function Cart() {
  const { items, removeItem, setQuantity, clearCart } = useCart()
  const subtotalCents = items.reduce(
    (total, item) => total + toCents(item.price) * item.quantity,
    0,
  )

  function handleClearCart() {
    if (window.confirm('Clear the cart? This cannot be undone.')) {
      clearCart()
    }
  }

  return (
    <section>
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-slate-900">Cart</h1>
      {items.length === 0 ? (
        <div className="space-y-4">
          <p className="text-slate-600">Your cart is empty.</p>
          <Link to="/" className="inline-block rounded-sm font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0 space-y-5">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.productId} className="flex min-w-0 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} product thumbnail`}
                    width={96}
                    height={96}
                    className="h-24 w-24 shrink-0 rounded-md bg-slate-50 object-contain"
                  />
                  <div className="min-w-0 flex-1 space-y-3">
                    <Link to={`/products/${item.productId}`} className="inline-block break-words rounded-sm font-semibold text-slate-900 hover:text-indigo-700">
                      {item.title}
                    </Link>
                    <p className="text-sm text-slate-600">Unit price: {formatUSD(item.price)}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <QuantityStepper
                        quantity={item.quantity}
                        max={item.stock}
                        label={item.title}
                        onChange={(quantity) => setQuantity(item.productId, quantity)}
                      />
                      <button
                        type="button"
                        aria-label={`Remove ${item.title}`}
                        onClick={() => removeItem(item.productId)}
                        className="cursor-pointer rounded-sm text-sm font-medium text-red-700 underline underline-offset-4 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="shrink-0 text-sm text-slate-600 sm:text-right">
                    <p>Line total</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {formatUSD(toCents(item.price) * item.quantity / 100)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleClearCart}
              className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Clear cart
            </button>
          </div>
          <aside aria-labelledby="summary-heading" className="min-w-0 rounded-xl border border-slate-200 bg-white p-6">
            <h2 id="summary-heading" className="text-xl font-semibold text-slate-900">Order summary</h2>
            <dl className="my-6 space-y-4">
              <div className="flex justify-between gap-4 text-slate-600">
                <dt>Subtotal</dt>
                <dd>{formatUSD(subtotalCents / 100)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
                <dt>Total</dt>
                <dd>{formatUSD(subtotalCents / 100)}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="block rounded-md bg-indigo-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-indigo-700">
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart

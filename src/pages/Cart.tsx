import { Link, useLocation } from 'react-router-dom'
import ConfirmAction from '../components/ConfirmAction'
import TotalsBreakdown from '../components/TotalsBreakdown'
import PromoForm from '../components/PromoForm'
import ProductPrice from '../components/ProductPrice'
import { isRecord } from '../utils/decode'
import QuantityStepper from '../components/QuantityStepper'
import { useCart } from '../context/CartContext'
import { formatCents, hasResolvedPrice, lineTotalCents } from '../utils/currency'

function Cart() {
  const { items, removeItem, setQuantity, clearCart, priceLoadFailed, retryPrices, totals, promoCode } = useCart()
  const redirectState: unknown = useLocation().state
  const emptyCheckout = isRecord(redirectState) && redirectState.reason === 'empty-checkout'
  const allPricesReady = totals !== undefined

  return (
    <section>
      <h1 className="display-title mb-5 sm:mb-6">Cart</h1>
      {items.length === 0 ? (
        <div className="panel space-y-3 p-4 sm:p-6">
          {emptyCheckout && <p role="status" className="text-warning">Add items to your cart before checking out.</p>}
          <p className="text-muted">Your cart is empty.</p>
          <Link to="/" className="inline-flex min-h-11 min-w-11 items-center rounded-sm font-medium text-accent underline underline-offset-4 hover:text-accent-hover">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0 space-y-5">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.productId} className="flex min-w-0 flex-col gap-4 panel p-4 sm:flex-row">
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} product thumbnail`}
                    width={96}
                    height={96}
                    className="h-24 w-24 shrink-0 rounded-md bg-surface-muted object-contain"
                  />
                  <div className="min-w-0 flex-1 space-y-3">
                    <Link to={`/products/${item.productId}`} className="inline-flex min-h-11 min-w-11 items-center break-words rounded-sm font-semibold text-ink hover:text-accent">
                      {item.title}
                    </Link>
                    {hasResolvedPrice(item) ? <ProductPrice {...item} /> : <p>Price pending</p>}
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
                        className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-sm text-sm font-medium text-danger underline underline-offset-4 hover:bg-danger-soft"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="shrink-0 text-sm text-muted sm:text-right">
                    <p>Line total</p>
                    <p className="mt-1 text-lg font-semibold text-ink">
                      {hasResolvedPrice(item) ? formatCents(lineTotalCents(item)) : 'Pending'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <ConfirmAction label="Clear cart" question="Clear the cart? This cannot be undone." onConfirm={clearCart} />
          </div>
          <aside aria-labelledby="summary-heading" className="panel min-w-0 p-4 sm:p-6">
            <h2 id="summary-heading" className="text-xl font-semibold text-ink">Order summary</h2>
            <div className="my-6 space-y-5">
              <PromoForm />
              <TotalsBreakdown totals={totals} promoCode={promoCode} />
              <p className="text-xs text-muted">Free shipping from $100 before the promo discount.</p>
            </div>
            {allPricesReady ? (
              <Link to="/checkout" className="primary-button w-full">
                Proceed to checkout
              </Link>
            ) : (
              <div className="space-y-3">
                <p role="status" className={priceLoadFailed ? 'text-warning' : 'text-muted'}>
                  {priceLoadFailed ? 'Some prices could not be loaded. Retry before checking out.' : 'Loading current prices…'}
                </p>
                {priceLoadFailed && (
                  <button type="button" onClick={retryPrices} className="min-h-11 rounded-md border border-control bg-surface px-4 font-semibold text-ink hover:bg-surface-muted">
                    Retry prices
                  </button>
                )}
              </div>
            )}
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart

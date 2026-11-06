import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import DeliveryDetails from '../components/DeliveryDetails'
import { useOrders } from '../context/OrdersContext'
import { makeOrderLines } from '../utils/order'
import CheckoutSummary from '../components/CheckoutSummary'
import { useCart } from '../context/CartContext'
import type { OrderSnapshot, CheckoutFormValues } from '../types'
import { hasResolvedPrice } from '../utils/currency'

const inputClassName =
  'field'

function Checkout() {
  const { items, clearCart, clearSavedCart, totals, promoCode } = useCart()
  const { placeOrder } = useOrders()
  const [values, setValues] = useState<CheckoutFormValues>({
    fullName: '',
    email: '',
    address: '',
    city: '',
  })
  const [errors, setErrors] = useState<Partial<CheckoutFormValues>>({})
  const [confirmation, setConfirmation] = useState<OrderSnapshot | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cartClearFailed, setCartClearFailed] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const submissionStarted = useRef(false)
  const pricedItems = items.filter(hasResolvedPrice)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submissionStarted.current || confirmation || !totals || items.length === 0) return

    const delivery: CheckoutFormValues = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      address: values.address.trim(),
      city: values.city.trim(),
    }
    const nextErrors: Partial<CheckoutFormValues> = {}

    if (delivery.fullName.length < 3) {
      nextErrors.fullName = 'Full name must be at least 3 characters'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(delivery.email)) {
      nextErrors.email = 'Please enter a valid email address'
    }
    if (delivery.address.length < 5) {
      nextErrors.address = 'Address must be at least 5 characters'
    }
    if (!delivery.city) {
      nextErrors.city = 'City is required'
    }

    setErrors(nextErrors)
    setSubmissionError(null)
    if (Object.keys(nextErrors).length > 0) return

    // The ref blocks a second submit immediately, before React renders new state.
    submissionStarted.current = true
    setIsSubmitting(true)

    try {
      const order = placeOrder(pricedItems, delivery, totals, promoCode)
      if (!order) throw new Error('Order could not be saved')
      setConfirmation(order)
      if (!clearSavedCart()) {
        clearCart()
        setCartClearFailed(true)
      }
    } catch {
      setConfirmation(null)
      setSubmissionError('Unable to place your order. Please try again.')
      submissionStarted.current = false
    } finally {
      setIsSubmitting(false)
    }
  }

  // A completed snapshot takes priority over the now-empty live cart.
  if (confirmation) {
    return (
      <section>
        <h1 className="display-title mb-5 sm:mb-6">
          Thank you! Your order has been placed.
        </h1>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <DeliveryDetails delivery={confirmation.delivery} />
          <CheckoutSummary
            items={confirmation.items}
            totals={confirmation.totals}
            promoCode={confirmation.promoCode}
          />
        </div>
        {cartClearFailed && <p role="alert" className="mt-4 text-warning">Order saved. The browser could not clear the saved cart.</p>}
        <Link
          to="/"
          className="mt-6 inline-flex min-h-11 min-w-11 items-center rounded-sm font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          Back to Catalog
        </Link>
        <Link to={`/orders/${confirmation.id}`} className="secondary-button ml-3 mt-6">View order</Link>
      </section>
    )
  }

  if (items.length === 0) return <Navigate to="/cart" replace state={{ reason: 'empty-checkout' }} />
  if (!totals) return <Navigate to="/cart" replace />

  return (
    <section>
      <h1 className="display-title mb-5 sm:mb-6">Checkout</h1>
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <form
          noValidate
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          className="panel min-w-0 space-y-4 p-4 sm:p-6"
        >
          <h2 className="text-xl font-semibold">Delivery details</h2>
          <div>
            <label htmlFor="full-name" className="control-label">
              Full name
            </label>
            <input
              id="full-name"
              name="fullName"
              autoComplete="name"
              required
              value={values.fullName}
              onChange={(event) => setValues({ ...values, fullName: event.target.value })}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'full-name-error' : undefined}
              className={inputClassName}
            />
            {errors.fullName && (
              <p id="full-name-error" role="alert" className="field-error">
                {errors.fullName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="control-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(event) => setValues({ ...values, email: event.target.value })}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClassName}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="field-error">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="address" className="control-label">
              Address
            </label>
            <input
              id="address"
              name="address"
              autoComplete="street-address"
              required
              value={values.address}
              onChange={(event) => setValues({ ...values, address: event.target.value })}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? 'address-error' : undefined}
              className={inputClassName}
            />
            {errors.address && (
              <p id="address-error" role="alert" className="field-error">
                {errors.address}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="city" className="control-label">
              City
            </label>
            <input
              id="city"
              name="city"
              autoComplete="address-level2"
              required
              value={values.city}
              onChange={(event) => setValues({ ...values, city: event.target.value })}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? 'city-error' : undefined}
              className={inputClassName}
            />
            {errors.city && (
              <p id="city-error" role="alert" className="field-error">
                {errors.city}
              </p>
            )}
          </div>
          {submissionError && (
            <p role="alert" className="text-sm text-danger">{submissionError}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="primary-button w-full sm:w-auto"
          >
            Place order
          </button>
        </form>
        <CheckoutSummary items={makeOrderLines(pricedItems)} totals={totals} promoCode={promoCode} />
      </div>
    </section>
  )
}

export default Checkout

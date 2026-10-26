import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import CheckoutSummary from '../components/CheckoutSummary'
import { useCart } from '../context/CartContext'
import type { CheckoutConfirmation, CheckoutFormValues } from '../types'
import { calculateSubtotalCents } from '../utils/currency'

const inputClassName =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-indigo-600'

function Checkout() {
  const { items, clearCart } = useCart()
  const [values, setValues] = useState<CheckoutFormValues>({
    fullName: '',
    email: '',
    address: '',
    city: '',
  })
  const [errors, setErrors] = useState<Partial<CheckoutFormValues>>({})
  const [confirmation, setConfirmation] = useState<CheckoutConfirmation | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const submissionStarted = useRef(false)
  const subtotalCents = calculateSubtotalCents(items)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submissionStarted.current || confirmation) return

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
      const savedItems = items.map((item) => ({ ...item }))
      const savedSubtotalCents = calculateSubtotalCents(savedItems)

      setConfirmation({
        items: savedItems,
        delivery: { ...delivery },
        subtotalCents: savedSubtotalCents,
        totalCents: savedSubtotalCents,
      })
      clearCart()
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
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-slate-900">
          Thank you! Your order has been placed.
        </h1>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section
            aria-labelledby="delivery-heading"
            className="min-w-0 rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
          >
            <h2 id="delivery-heading" className="mb-6 text-xl font-semibold text-slate-900">
              Delivery details
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-slate-600">Full name</dt>
                <dd className="break-words font-medium text-slate-900">{confirmation.delivery.fullName}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-600">Email</dt>
                <dd className="break-words text-slate-900">{confirmation.delivery.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-600">Address</dt>
                <dd className="break-words text-slate-900">{confirmation.delivery.address}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-600">City</dt>
                <dd className="break-words text-slate-900">{confirmation.delivery.city}</dd>
              </div>
            </dl>
          </section>
          <CheckoutSummary
            items={confirmation.items}
            subtotalCents={confirmation.subtotalCents}
            totalCents={confirmation.totalCents}
          />
        </div>
        <Link
          to="/"
          className="mt-6 inline-block rounded-sm font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
        >
          Back to Catalog
        </Link>
      </section>
    )
  }

  if (items.length === 0) return <Navigate to="/cart" replace />

  return (
    <section>
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-slate-900">Checkout</h1>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form
          noValidate
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          className="min-w-0 space-y-5 rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
        >
          <div>
            <label htmlFor="full-name" className="mb-2 block text-sm font-medium text-slate-700">
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
              <p id="full-name-error" role="alert" className="mt-2 text-sm text-red-700">
                {errors.fullName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
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
              <p id="email-error" role="alert" className="mt-2 text-sm text-red-700">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-700">
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
              <p id="address-error" role="alert" className="mt-2 text-sm text-red-700">
                {errors.address}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="city" className="mb-2 block text-sm font-medium text-slate-700">
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
              <p id="city-error" role="alert" className="mt-2 text-sm text-red-700">
                {errors.city}
              </p>
            )}
          </div>
          {submissionError && (
            <p role="alert" className="text-sm text-red-700">{submissionError}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-600 sm:w-auto"
          >
            Place order
          </button>
        </form>
        <CheckoutSummary items={items} subtotalCents={subtotalCents} totalCents={subtotalCents} />
      </div>
    </section>
  )
}

export default Checkout

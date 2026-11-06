import { useState } from 'react'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import ConfirmAction from '../components/ConfirmAction'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import { useReviews } from '../context/ReviewsContext'
import { useToast } from '../context/ToastContext'
import { useTheme } from '../context/ThemeContext'
import type { Profile as ProfileValues } from '../types'

const firstNameMessage = 'First name must be at least 2 characters'
const lastNameMessage = 'Last name must be at least 2 characters'
const emailMessage = 'Please enter a valid email address'
const profileSchema = object({
  firstName: string().trim().required(firstNameMessage).min(2, firstNameMessage),
  lastName: string().trim().required(lastNameMessage).min(2, lastNameMessage),
  email: string().trim().required(emailMessage).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, emailMessage),
  phone: string().trim().test('phone', 'Please enter a valid phone number', (value) => {
    if (!value) return true
    const digits = value.replace(/\D/g, '')
    return /^\+?[\d().\s-]+$/.test(value) && digits.length >= 9 && digits.length <= 15
  }),
})
const fields = [
  { name: 'firstName', label: 'First name', type: 'text', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last name', type: 'text', autoComplete: 'family-name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel' },
] as const

export default function Profile() {
  const { username, profile, updateProfile } = useAuth()
  const { clearSavedCart } = useCart()
  const { clearOrders } = useOrders()
  const { clearReviews } = useReviews()
  const { theme, setTheme } = useTheme()
  const showToast = useToast()
  const [clearStatus, setClearStatus] = useState('')
  const form = useFormik<ProfileValues>({
    initialValues: profile,
    validationSchema: profileSchema,
    onSubmit(values, helpers) {
      const next = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      }
      updateProfile(next)
      helpers.resetForm({ values: next })
      showToast('Profile saved.')
      helpers.setSubmitting(false)
    },
  })

  function clearLocalData() {
    const results = [
      { label: 'cart', success: clearSavedCart() },
      { label: 'orders', success: clearOrders() },
      { label: 'reviews', success: clearReviews() },
    ]
    const failures = results.filter((result) => !result.success).map((result) => result.label)
    setClearStatus(failures.length ? `Could not clear: ${failures.join(', ')}. Please try again.` : 'Local cart, orders and reviews cleared.')
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="display-title">Profile</h1>
        <p className="mt-2 break-words text-muted">Signed in as <strong>{username}</strong></p>
      </div>
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <form noValidate onSubmit={form.handleSubmit} className="panel space-y-4 p-5 sm:p-6">
          <h2 className="text-xl font-semibold">Personal details</h2>
          {fields.map(({ name, label, type, autoComplete }) => {
            const error = form.touched[name] && form.errors[name]
            return (
              <div key={name}>
                <label htmlFor={`profile-${name}`} className="control-label">{label}</label>
                <input id={`profile-${name}`} className="field" type={type} autoComplete={autoComplete}
                  {...form.getFieldProps(name)} aria-invalid={Boolean(error)}
                  aria-describedby={error ? `profile-${name}-error` : undefined} />
                {error && <p id={`profile-${name}-error`} role="alert" className="field-error">{error}</p>}
              </div>
            )
          })}
          <button type="submit" className="primary-button" disabled={form.isSubmitting}>Save profile</button>
        </form>
        <div className="space-y-5">
          <fieldset className="panel min-w-0 p-5">
            <legend className="px-2 text-lg font-semibold">Theme</legend>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={theme === 'light' ? 'primary-button' : 'secondary-button'}
                aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>Light</button>
              <button type="button" className={theme === 'dark' ? 'primary-button' : 'secondary-button'}
                aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>Dark</button>
            </div>
          </fieldset>
          <section aria-labelledby="local-data-heading" className="panel space-y-3 p-5">
            <h2 id="local-data-heading" className="text-lg font-semibold">Local data</h2>
            <p className="text-sm text-muted">Clear cart, orders and reviews from this browser. Your session and theme will stay active.</p>
            <ConfirmAction label="Clear local data" question="Clear your cart, orders and reviews? This cannot be undone." onConfirm={clearLocalData} />
            {clearStatus && <p role="status">{clearStatus}</p>}
          </section>
        </div>
      </div>
    </section>
  )
}

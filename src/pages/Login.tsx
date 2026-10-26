import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { LoginFormValues } from '../types'

const inputClassName =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-indigo-600'

function Login() {
  const [values, setValues] = useState<LoginFormValues>({ username: '', password: '' })
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({})
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectState: unknown = location.state
  const returnToCheckout =
    typeof redirectState === 'object' &&
    redirectState !== null &&
    'from' in redirectState &&
    redirectState.from === '/checkout'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const username = values.username.trim()
    const nextErrors: Partial<LoginFormValues> = {}

    if (!username) {
      nextErrors.username = 'Username is required'
    }

    if (!values.password) {
      nextErrors.password = 'Password is required'
    } else if (values.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    login(username)
    navigate(returnToCheckout ? '/checkout' : '/', { replace: true })
  }

  return (
    <section
      aria-labelledby="login-heading"
      className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h1
        id="login-heading"
        className="mb-6 text-center text-3xl font-semibold tracking-tight text-slate-900"
      >
        Log in
      </h1>
      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={values.username}
            onChange={(event) => setValues({ ...values, username: event.target.value })}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? 'username-error' : undefined}
            className={inputClassName}
          />
          {errors.username && (
            <p id="username-error" role="alert" className="mt-2 text-sm text-red-700">
              {errors.username}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={6}
            value={values.password}
            onChange={(event) => setValues({ ...values, password: event.target.value })}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={inputClassName}
          />
          {errors.password && (
            <p id="password-error" role="alert" className="mt-2 text-sm text-red-700">
              {errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-indigo-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Log In
        </button>
      </form>
      <Link
        to="/"
        className="mt-6 inline-block rounded-sm text-sm font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
      >
        ← Back to catalog
      </Link>
    </section>
  )
}

export default Login

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isRecord } from '../utils/decode'
import { useAuth } from '../context/AuthContext'
import type { LoginFormValues } from '../types'

const inputClassName =
  'field'

function Login() {
  const [values, setValues] = useState<LoginFormValues>({ username: '', password: '' })
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({})
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectState: unknown = location.state
  const from = isRecord(redirectState) ? redirectState.from : undefined
  const returnPath = typeof from === 'string' &&
    (from === '/checkout' || from === '/profile' || from === '/orders' || /^\/orders\/[a-z0-9-]+$/i.test(from))
    ? from : '/'

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
    navigate(returnPath, { replace: true })
  }

  return (
    <section
      aria-labelledby="login-heading"
      className="panel mx-auto w-full max-w-md p-5 sm:p-7"
    >
      <h1
        id="login-heading"
        className="display-title mb-5"
      >
        Log in
      </h1>
      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="control-label">
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
            <p id="username-error" role="alert" className="field-error">
              {errors.username}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="control-label">
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
            <p id="password-error" role="alert" className="field-error">
              {errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="primary-button w-full"
        >
          Log In
        </button>
      </form>
      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 min-w-11 items-center rounded-sm text-sm font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
      >
        ← Back to catalog
      </Link>
    </section>
  )
}

export default Login

import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught a rendering error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" className="flex min-h-svh items-center justify-center bg-canvas px-4 py-8 text-ink">
          <section className="w-full max-w-md panel bg-danger-soft p-6 text-center shadow-sm">
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-danger">
              Something went wrong.
            </h1>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md bg-accent px-5 py-3 font-semibold text-on-accent hover:bg-accent-hover"
            >
              Reload
            </button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

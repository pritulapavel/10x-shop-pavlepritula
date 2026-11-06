import { lazy, Suspense, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from '../../src/components/ErrorBoundary'
import '../../src/index.css'

const BrokenRoute = lazy(() => Promise.reject(new Error('Intentional lazy route failure')))

function Fixture() {
  const [open, setOpen] = useState(false)

  return (
    <ErrorBoundary>
      <Suspense fallback={<p role="status">Loading route…</p>}>
        {open ? <BrokenRoute /> : (
          <main className="p-6">
            <h1>Fixture ready</h1>
            <button type="button" className="primary-button" onClick={() => setOpen(true)}>
              Open failing lazy route
            </button>
          </main>
        )}
      </Suspense>
    </ErrorBoundary>
  )
}

const root = document.getElementById('root')
if (!root) throw new Error('Fixture root missing')
createRoot(root).render(<Fixture />)

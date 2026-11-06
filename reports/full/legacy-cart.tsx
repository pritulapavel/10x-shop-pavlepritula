import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../src/context/CartContext'
import { ToastProvider } from '../../src/context/ToastContext'
import Cart from '../../src/pages/Cart'
import { STORAGE_KEYS } from '../../src/utils/storage'
import '../../src/index.css'

const fixture = {
  id: 5, title: 'Legacy fixture', description: 'Test data for the migration check',
  category: 'beauty', rating: 4, discountPercentage: 10, price: 9.99,
  stock: 10, thumbnail: '/favicon.svg', images: [],
}
const originalFetch = window.fetch.bind(window)
let behavior: 'fail' | 'hold' | 'release' = 'release'
const pending: Array<() => void> = []

window.fetch = (input, options) => {
  if (input !== 'https://dummyjson.com/products/5') return originalFetch(input, options)
  if (behavior === 'fail') {
    behavior = 'release'
    return Promise.resolve(new Response(null, { status: 503 }))
  }
  if (behavior === 'hold') {
    // Deliberately resolve even after abort to exercise the late-response guard.
    return new Promise((resolve) => pending.push(() => resolve(Response.json(fixture))))
  }
  return Promise.resolve(Response.json(fixture))
}

function Harness() {
  const [run, setRun] = useState(0)

  function seed(mode: 'fail' | 'hold') {
    pending.length = 0
    behavior = mode
    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify({
      items: [{
        productId: fixture.id, title: fixture.title, thumbnail: fixture.thumbnail,
        price: 12, stock: fixture.stock, quantity: 6,
      }],
    }))
    setRun(run + 1)
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4">
      <h1 className="text-2xl font-bold">Legacy cart QA fixture</h1>
      <p>Isolated development origin. Buttons replace the fixture cart and mock its one API request.</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="secondary-button" onClick={() => seed('fail')}>Seed legacy cart with first request failure</button>
        <button type="button" className="secondary-button" onClick={() => seed('hold')}>Seed legacy cart with delayed response</button>
        <button type="button" className="secondary-button" onClick={() => {
          behavior = 'release'
          for (const release of pending.splice(0)) release()
        }}>Release delayed response</button>
      </div>
      {run > 0 && <MemoryRouter key={run}><CartProvider><ToastProvider><Cart /></ToastProvider></CartProvider></MemoryRouter>}
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<Harness />)

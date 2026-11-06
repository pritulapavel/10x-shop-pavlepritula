import { Profiler, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import ProductGrid from '../../src/components/ProductGrid'
import { CartProvider, useCart } from '../../src/context/CartContext'
import type { Product } from '../../src/types'
import '../../src/index.css'

const products: Product[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1001,
  title: `Product fixture ${index + 1}`,
  description: '',
  price: 9.99,
  stock: 100,
  category: 'beauty',
  rating: 4.25,
  discountPercentage: 10,
  thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 3%22/%3E',
  images: [],
  reviews: [],
}))

function Harness() {
  const { items, addItem, setQuantity } = useCart()
  const activeSample = useRef<number[] | null>(null)
  const [result, setResult] = useState('')
  const first = products[0]
  const quantity = items.find((item) => item.productId === first.id)?.quantity

  function measure() {
    if (!quantity) flushSync(() => addItem(first, 1))
    else if (quantity !== 1) flushSync(() => setQuantity(first.id, 1))
    for (let index = 0; index < 6; index++) {
      flushSync(() => setQuantity(first.id, index % 2 === 0 ? 2 : 1))
    }

    const samples: number[] = []
    activeSample.current = samples
    for (let index = 0; index < 24; index++) {
      flushSync(() => setQuantity(first.id, index % 2 === 0 ? 2 : 1))
    }
    activeSample.current = null
    const sorted = [...samples].sort((a, b) => a - b)
    const center = Math.floor(sorted.length / 2)
    const median = sorted.length % 2 ? sorted[center] : (sorted[center - 1] + sorted[center]) / 2
    setResult(JSON.stringify({ commits: samples.length, medianMs: median, samplesMs: samples }))
  }

  return (
    <main className="mx-auto max-w-7xl space-y-4 p-4">
      <h1 className="display-title">Product grid React Profiler</h1>
      <p>Development build · 12 fixed products · 6 warm-up commits · 24 measured quantity updates</p>
      <button type="button" className="primary-button" onClick={measure}>Measure grid updates</button>
      <output aria-label="Profiler results" className="block break-all">{result}</output>
      <Profiler id="ProductGrid" onRender={(_, phase, actualDuration) => {
        if (phase !== 'mount') activeSample.current?.push(Number(actualDuration.toFixed(3)))
      }}>
        <ProductGrid products={products} />
      </Profiler>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <MemoryRouter><CartProvider><Harness /></CartProvider></MemoryRouter>,
)

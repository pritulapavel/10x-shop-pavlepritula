import { useEffect, useState } from 'react'
import ProductGrid from '../components/ProductGrid'
import type { Product, ProductsResponse } from '../types'

function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=12&skip=0', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Product request failed')
        }

        const data: ProductsResponse = await response.json()

        if (!controller.signal.aborted) {
          setProducts(data.products)
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('Unable to load products. Please try again later.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => controller.abort()
  }, [])

  return (
    <section aria-labelledby="catalog-heading">
      <h1
        id="catalog-heading"
        className="mb-8 text-3xl font-semibold tracking-tight text-slate-900"
      >
        Catalog
      </h1>
      {isLoading ? (
        <p role="status" className="text-slate-600">
          Loading products...
        </p>
      ) : error ? (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      ) : products.length === 0 ? (
        <p className="text-slate-600">No products found.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  )
}

export default Catalog

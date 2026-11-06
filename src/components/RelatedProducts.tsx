import ProductGrid from './ProductGrid'
import { useRequest } from '../hooks/useRequest'
import { getProducts } from '../utils/api'

export default function RelatedProducts({ id, category }: { id: number; category: string }) {
  const endpoint = `/products/category/${encodeURIComponent(category)}?limit=5&skip=0`
  const { state, retry } = useRequest(endpoint, (signal) => getProducts(endpoint, signal))
  const products = state.status === 'success' ? state.data.products.filter((product) => product.id !== id).slice(0, 4) : []
  if (state.status === 'success' && products.length === 0) return null
  return (
    <section aria-labelledby="related-products" className="mt-10 space-y-4">
      <h2 id="related-products" className="text-2xl font-semibold">Related products</h2>
      {state.status === 'loading' && <p role="status" className="text-muted">Loading related products…</p>}
      {state.status === 'error' && (
        <div className="flex flex-wrap items-center gap-3">
          <p role="status" className="text-danger">Unable to load related products.</p>
          <button type="button" className="secondary-button" onClick={retry}>Retry related products</button>
        </div>
      )}
      {products.length > 0 && <ProductGrid products={products} />}
    </section>
  )
}

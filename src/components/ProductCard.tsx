import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { formatUSD } from '../utils/currency'

interface ProductCardProps {
  product: Product
  quantityInCart: number
  onAdd: () => void
}

function ProductCard({ product, quantityInCart, onAdd }: ProductCardProps) {
  const [quantityBeforeAdd, setQuantityBeforeAdd] = useState<number | null>(null)
  const isOutOfStock = product.stock <= 0
  const isStockLimitReached = quantityInCart >= product.stock
  const canAdd = !isOutOfStock && !isStockLimitReached
  // Confirm success from the shared quantity, not just from a button click.
  const wasAdded = quantityBeforeAdd !== null && quantityInCart > quantityBeforeAdd

  function handleAdd() {
    setQuantityBeforeAdd(quantityInCart)
    onAdd()
  }

  return (
    <article className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/products/${product.id}`} className="group block rounded-md">
        <img
          src={product.thumbnail}
          alt={`${product.title} product thumbnail`}
          width={320}
          height={240}
          loading="lazy"
          className="h-48 w-full rounded-lg bg-slate-50 object-contain transition-opacity group-hover:opacity-90"
        />
        <h2 className="mt-4 break-words text-base font-semibold text-slate-900 group-hover:text-indigo-700">
          {product.title}
        </h2>
      </Link>
      <p className="mb-4 mt-3 text-lg font-semibold text-slate-900">
        {formatUSD(product.price)}
      </p>
      <button
        type="button"
        disabled={!canAdd}
        onClick={handleAdd}
        className="mt-auto w-full cursor-pointer rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-600"
      >
        {isOutOfStock ? 'Out of stock' : isStockLimitReached ? 'Stock limit reached' : 'Add to cart'}
      </button>
      <p role="status" className="mt-2 min-h-5 text-sm text-emerald-700">
        {wasAdded ? 'Added to cart ✓' : ''}
      </p>
    </article>
  )
}

export default ProductCard

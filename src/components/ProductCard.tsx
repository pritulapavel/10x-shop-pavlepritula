import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import ProductPrice from './ProductPrice'
import StockBadge from './StockBadge'

interface ProductCardProps {
  product: Product
  quantityInCart: number
  onAdd: (product: Product, quantity: number) => void
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
    onAdd(product, 1)
  }

  return (
    <article className="panel product-card motion-safe:transition-[border-color,box-shadow] hover:border-control hover:shadow-sm">
      <Link to={`/products/${product.id}`} className="group block min-w-0 rounded-xl">
        <img
          src={product.thumbnail}
          alt=""
          width={320}
          height={240}
          loading="lazy"
          className="image-well block aspect-[4/3] h-auto w-full object-contain p-3"
        />
        <h2 className="mt-3 line-clamp-2 min-h-11 wrap-anywhere text-base leading-[1.375rem] font-semibold text-ink group-hover:text-accent">
          {product.title}
        </h2>
      </Link>
      <p className="mt-1 truncate text-sm text-muted">
        <span className="capitalize">{product.category.replaceAll('-', ' ')}</span>
        {product.brand && <> · {product.brand}</>}
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-medium text-muted tabular-nums" aria-label={`Rating ${product.rating} out of 5`}>
          <span aria-hidden="true" className="text-warning">★ </span>{product.rating}/5
        </span>
        <StockBadge stock={product.stock} />
      </div>
      <div className="mt-auto pt-3 text-[1.375rem] leading-7"><ProductPrice {...product} /></div>
      <button
        type="button"
        disabled={!canAdd}
        onClick={handleAdd}
        className="primary-button mt-3 w-full"
      >
        {isOutOfStock ? 'Out of stock' : isStockLimitReached ? 'Stock limit reached' : 'Add to cart'}
      </button>
      <p role="status" className="mt-1 min-h-5 text-center text-sm font-medium text-success">
        {wasAdded ? 'Added to cart ✓' : ''}
      </p>
    </article>
  )
}

export default memo(ProductCard)

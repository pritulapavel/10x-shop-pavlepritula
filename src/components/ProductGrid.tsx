import { useCart } from '../context/CartContext'
import type { Product } from '../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

function ProductGrid({ products }: ProductGridProps) {
  const { items, addItem } = useCart()

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantityInCart={items.find((item) => item.productId === product.id)?.quantity ?? 0}
          onAdd={addItem}
        />
      ))}
    </div>
  )
}

export default ProductGrid

import { useCart } from '../context/CartContext'
import type { Product } from '../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

function ProductGrid({ products }: ProductGridProps) {
  const { items, addItem } = useCart()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantityInCart={items.find((item) => item.productId === product.id)?.quantity ?? 0}
          onAdd={() => addItem(product, 1)}
        />
      ))}
    </div>
  )
}

export default ProductGrid

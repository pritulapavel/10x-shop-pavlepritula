import { useCart } from '../context/CartContext'
import type { Product } from '../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  prioritizeFirstImage?: boolean
}

function ProductGrid({ products, prioritizeFirstImage = false }: ProductGridProps) {
  const { items, addItem } = useCart()

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          prioritizeImage={prioritizeFirstImage && index === 0}
          quantityInCart={items.find((item) => item.productId === product.id)?.quantity ?? 0}
          onAdd={addItem}
        />
      ))}
    </div>
  )
}

export default ProductGrid

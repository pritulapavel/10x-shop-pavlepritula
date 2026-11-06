import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import QuantityStepper from '../components/QuantityStepper'
import { useCart } from '../context/CartContext'
import { useRequest } from '../hooks/useRequest'
import ProductReviews from '../components/ProductReviews'
import RelatedProducts from '../components/RelatedProducts'
import { getProduct, isApiError } from '../utils/api'
import ProductPrice from '../components/ProductPrice'
import StockBadge from '../components/StockBadge'
import NotFound from './NotFound'

interface ProductDetailsProps {
  productId: number
}

function ProductDetails({ productId }: ProductDetailsProps) {
  const { state, retry } = useRequest(String(productId), (signal) => getProduct(productId, signal))
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [quantityBeforeAdd, setQuantityBeforeAdd] = useState<number | null>(null)
  const { items, addItem } = useCart()

  if (state.status === 'loading') return <p role="status" className="text-muted">Loading product...</p>
  if (state.status === 'error') {
    if (isApiError(state.error) && state.error.status === 404) return <NotFound />
    return (
      <div className="panel space-y-4 p-6">
        <p role="alert" className="text-danger">Unable to load this product. Please try again later.</p>
        <button type="button" onClick={retry} className="secondary-button">Retry</button>
      </div>
    )
  }

  const product = state.data
  const images = product.images.filter((image) => image.trim() !== '')
  const mainImage = images[selectedImage] || product.thumbnail
  const quantityInCart = items.find((item) => item.productId === product.id)?.quantity ?? 0
  const availableStock = Math.max(0, product.stock - quantityInCart)
  const quantity = Math.min(selectedQuantity, Math.max(1, availableStock))
  const wasAdded = quantityBeforeAdd !== null && quantityInCart > quantityBeforeAdd

  function handleAdd() {
    if (!product || availableStock < 1) return
    setQuantityBeforeAdd(quantityInCart)
    addItem(product, quantity)
  }

  return (
    <section>
      <Link
        to="/"
        className="mb-3 inline-flex min-h-11 min-w-11 items-center rounded-xl text-sm font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
      >
        ← Back to catalog
      </Link>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="min-w-0">
          <img
            src={mainImage}
            alt={product.title}
            width={600}
            height={600}
            className="image-well aspect-square h-auto w-full object-contain p-6"
          />
          {images.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-3" aria-label="Product images">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Show image ${index + 1} of ${product.title}`}
                  aria-pressed={selectedImage === index}
                  className={`cursor-pointer rounded-lg border-2 bg-surface p-1 hover:border-focus ${selectedImage === index ? 'border-accent' : 'border-control'}`}
                >
                  <img src={image} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="panel min-w-0 space-y-4 self-start p-4 sm:p-6">
          <div className="space-y-1">
            <p className="eyebrow">{product.category.replaceAll('-', ' ')}{product.brand && ` · ${product.brand}`}</p>
            <h1 className="display-title wrap-anywhere">{product.title}</h1>
          </div>
          <div className="text-2xl"><ProductPrice {...product} /></div>
          <StockBadge stock={product.stock} />
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted">Quantity</p>
            <QuantityStepper
              quantity={quantity}
              max={availableStock}
              label={product.title}
              onChange={setSelectedQuantity}
            />
            {quantityInCart > 0 && (
              <p className="text-sm text-muted">
                In your cart: {quantityInCart}. Available to add: {availableStock}.
              </p>
            )}
          </div>
          <button
            type="button"
            disabled={availableStock < 1}
            onClick={handleAdd}
            className="primary-button w-full sm:w-auto"
          >
            {product.stock <= 0 ? 'Out of stock' : availableStock < 1 ? 'Stock limit reached' : 'Add to cart'}
          </button>
          <p role="status" className="min-h-5 text-sm text-success">
            {wasAdded ? 'Added to cart ✓' : ''}
          </p>
        </div>
      </div>
      <ProductReviews product={product} />
      <RelatedProducts id={product.id} category={product.category} />
    </section>
  )
}

function ProductPage() {
  const { id } = useParams()
  const productId = Number(id)

  if (!id || !/^\d+$/.test(id) || !Number.isSafeInteger(productId) || productId <= 0) {
    return <NotFound />
  }

  // A different product ID resets the request, image and quantity state together.
  return <ProductDetails key={productId} productId={productId} />
}

export default ProductPage

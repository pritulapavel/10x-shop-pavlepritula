import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import QuantityStepper from '../components/QuantityStepper'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'
import { formatUSD } from '../utils/currency'
import NotFound from './NotFound'

interface ProductDetailsProps {
  productId: number
}

function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [quantityBeforeAdd, setQuantityBeforeAdd] = useState<number | null>(null)
  const { items, addItem } = useCart()

  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
          signal: controller.signal,
        })

        if (response.status === 404) {
          if (!controller.signal.aborted) setIsNotFound(true)
          return
        }

        if (!response.ok) {
          throw new Error('Product request failed')
        }

        const data: Product = await response.json()

        if (!controller.signal.aborted) setProduct(data)
      } catch {
        if (!controller.signal.aborted) {
          setError('Unable to load this product. Please try again later.')
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadProduct()
    return () => controller.abort()
  }, [productId])

  if (isLoading) {
    return <p role="status" className="text-slate-600">Loading product...</p>
  }

  if (isNotFound) return <NotFound />

  if (error || !product) {
    return <p role="alert" className="text-red-700">{error ?? 'Unable to load this product.'}</p>
  }

  const images = product.images.filter((image) => image.trim() !== '')
  const mainImage = images[selectedImage] || product.thumbnail
  const quantityInCart = items.find((item) => item.productId === product.id)?.quantity ?? 0
  const availableStock = Math.max(0, product.stock - quantityInCart)
  const quantity = Math.min(selectedQuantity, Math.max(1, availableStock))
  const wasAdded = quantityBeforeAdd !== null && quantityInCart > quantityBeforeAdd
  const stockText = product.stock > 5
    ? 'In stock'
    : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of stock'

  function handleAdd() {
    if (!product || availableStock < 1) return
    setQuantityBeforeAdd(quantityInCart)
    addItem(product, quantity)
  }

  return (
    <section>
      <Link
        to="/"
        className="mb-6 inline-block rounded-sm text-sm font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
      >
        ← Back to catalog
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="min-w-0">
          <img
            src={mainImage}
            alt={product.title}
            width={600}
            height={600}
            className="h-80 w-full rounded-xl border border-slate-200 bg-white p-6 object-contain sm:h-96"
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
                  className={`cursor-pointer rounded-lg border-2 bg-white p-1 hover:border-indigo-400 ${selectedImage === index ? 'border-indigo-600' : 'border-slate-200'}`}
                >
                  <img src={image} alt="" width={64} height={64} className="h-16 w-16 object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="min-w-0 space-y-5">
          <h1 className="break-words text-3xl font-semibold tracking-tight text-slate-900">
            {product.title}
          </h1>
          <p className="leading-relaxed text-slate-600">{product.description}</p>
          <p className="text-2xl font-semibold text-slate-900">{formatUSD(product.price)}</p>
          <p className={product.stock > 0 ? 'font-medium text-emerald-700' : 'font-medium text-slate-600'}>
            {stockText}
          </p>
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">Quantity</p>
            <QuantityStepper
              quantity={quantity}
              max={availableStock}
              label={product.title}
              onChange={setSelectedQuantity}
            />
            {quantityInCart > 0 && (
              <p className="text-sm text-slate-600">
                In your cart: {quantityInCart}. Available to add: {availableStock}.
              </p>
            )}
          </div>
          <button
            type="button"
            disabled={availableStock < 1}
            onClick={handleAdd}
            className="w-full cursor-pointer rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-600 sm:w-auto"
          >
            {product.stock <= 0 ? 'Out of stock' : availableStock < 1 ? 'Stock limit reached' : 'Add to cart'}
          </button>
          <p role="status" className="min-h-5 text-sm text-emerald-700">
            {wasAdded ? 'Added to cart ✓' : ''}
          </p>
        </div>
      </div>
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

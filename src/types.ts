export interface Review {
  reviewerName: string
  rating: number
  date: string
  comment: string
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  stock: number
  thumbnail: string
  images: string[]
  category: string
  brand?: string
  rating: number
  discountPercentage: number
  reviews: Review[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface CartItem {
  productId: number
  title: string
  thumbnail: string
  price: number
  stock: number
  quantity: number
  discountPercentage?: number
}

export type ResolvedCartItem = CartItem & Pick<Product, 'discountPercentage'>

export type PromoCode = '10X10'

export interface CartState {
  items: CartItem[]
  promoCode?: PromoCode
}

export interface CartTotals {
  subtotalCents: number
  promoDiscountCents: number
  shippingCents: number
  totalCents: number
}

export interface AuthState {
  username: string
  isLoggedIn: boolean
}

export interface LoginFormValues {
  username: string
  password: string
}

export interface CheckoutFormValues {
  fullName: string
  email: string
  address: string
  city: string
}

export interface OrderLine extends ResolvedCartItem {
  unitPriceCents: number
  lineTotalCents: number
}

export interface OrderSnapshot {
  id: string
  number: number
  placedAt: string
  items: OrderLine[]
  delivery: CheckoutFormValues
  totals: CartTotals
  promoCode?: PromoCode
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered'

export interface Profile {
  firstName: string
  lastName: string
  email: string
  phone: string
}

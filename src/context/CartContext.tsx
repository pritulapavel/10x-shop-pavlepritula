import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartState, Product } from '../types'
import { readCart, saveCart } from '../utils/cartStorage'

interface CartContextValue extends CartState {
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: number) => void
  setQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartState>(readCart)

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  function addItem(product: Product, quantity: number) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return
    }

    setCart((currentCart) => {
      const existingItem = currentCart.items.find((item) => item.productId === product.id)
      const nextQuantity = (existingItem?.quantity ?? 0) + quantity

      if (nextQuantity > product.stock) {
        return currentCart
      }

      if (existingItem) {
        return {
          items: currentCart.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: nextQuantity, stock: product.stock }
              : item,
          ),
        }
      }

      return {
        items: [
          ...currentCart.items,
          {
            productId: product.id,
            title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            stock: product.stock,
            quantity,
          },
        ],
      }
    })
  }

  function removeItem(productId: number) {
    setCart((currentCart) => ({
      items: currentCart.items.filter((item) => item.productId !== productId),
    }))
  }

  function setQuantity(productId: number, quantity: number) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return
    }

    setCart((currentCart) => {
      const existingItem = currentCart.items.find((item) => item.productId === productId)

      if (!existingItem || quantity > existingItem.stock) {
        return currentCart
      }

      return {
        items: currentCart.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      }
    })
  }

  function clearCart() {
    setCart(() => ({ items: [] }))
  }

  return (
    <CartContext.Provider value={{ ...cart, addItem, removeItem, setQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}

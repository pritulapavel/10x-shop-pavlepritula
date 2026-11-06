import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { OrderSnapshot } from '../types'
import { orderStorage, saveNewOrder } from '../utils/orderStorage'

interface OrdersContextValue {
  orders: OrderSnapshot[]
  placeOrder: (...input: Parameters<typeof saveNewOrder>) => OrderSnapshot | undefined
  clearOrders: () => boolean
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderSnapshot[]>(() => {
    const stored = orderStorage.read()
    return stored.ok ? stored.value ?? [] : []
  })

  function placeOrder(...input: Parameters<typeof saveNewOrder>) {
    const saved = saveNewOrder(...input)
    if (!saved) return undefined
    setOrders(saved.orders)
    return saved.order
  }

  function clearOrders() {
    if (!orderStorage.remove()) return false
    setOrders([])
    return true
  }

  return <OrdersContext.Provider value={{ orders, placeOrder, clearOrders }}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) throw new Error('OrdersProvider is required')
  return context
}

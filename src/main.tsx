import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { ThemeProvider } from './context/ThemeContext'
import { OrdersProvider } from './context/OrdersContext'
import { ReviewsProvider } from './context/ReviewsContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <AuthProvider>
            <OrdersProvider>
              <ReviewsProvider>
                <ThemeProvider>
                  <ToastProvider><App /></ToastProvider>
                </ThemeProvider>
              </ReviewsProvider>
            </OrdersProvider>
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

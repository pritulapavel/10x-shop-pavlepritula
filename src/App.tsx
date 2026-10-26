import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import ScrollToTop from './components/ScrollToTop'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Product from './pages/Product'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Catalog />} />
          <Route path="login" element={<Login />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route element={<RequireAuth />}>
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

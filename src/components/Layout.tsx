import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function Layout() {
  return (
    <div className="flex min-h-svh flex-col bg-canvas text-ink">
      <Header />
      <main className="shop-container flex-1 pt-5 pb-8 sm:pt-7 sm:pb-12">
        <Suspense fallback={<p role="status" className="panel p-6 text-muted">Loading page…</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default Layout

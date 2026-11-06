import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/10x-logo.svg'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function getNavLinkClassName({ isActive }: { isActive: boolean }) {
  return `store-nav-item ${isActive ? 'bg-accent-soft font-semibold text-on-accent-soft' : 'font-medium text-muted'}`
}

export function StoreBrand({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex min-h-11 min-w-11 shrink-0 items-center gap-2 rounded-xl text-lg font-bold tracking-tight text-ink no-underline ${className}`}
    >
      <span className="inline-flex items-center rounded-lg bg-brand-plate px-2 py-1.5">
        <img src={logo} width="60" height="22" alt="10X" className="h-auto w-[60px]" />
      </span>
      <span>Shop</span>
    </Link>
  )
}

export function StoreNavigation({ showProfileName = false }: { showProfileName?: boolean }) {
  const { isLoggedIn, logout, displayName } = useAuth()
  const { items } = useCart()
  const cartQuantity = items.reduce((total, item) => total + item.quantity, 0)
  const cartLabel = cartQuantity > 0
    ? `Cart, ${cartQuantity} ${cartQuantity === 1 ? 'item' : 'items'} in cart`
    : undefined

  return (
    <>
      <NavLink to="/" end className={getNavLinkClassName}>Catalog</NavLink>
      <NavLink to="/cart" aria-label={cartLabel} className={getNavLinkClassName}>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
          <path d="M3 4h2l2.4 11h11.2l2-8H6" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
        Cart
        {cartQuantity > 0 && (
          <span aria-hidden="true" className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs leading-tight font-semibold text-on-accent tabular-nums">
            {cartQuantity}
          </span>
        )}
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/orders" className={getNavLinkClassName}>Orders</NavLink>
          <NavLink to="/profile" className={getNavLinkClassName}>
            Profile
            {showProfileName && <span className="ml-1 max-w-24 truncate" title={displayName}>· {displayName}</span>}
          </NavLink>
          <button type="button" onClick={logout} className="store-nav-item font-medium text-muted">
            Log out
          </button>
        </>
      ) : (
        <NavLink to="/login" className={getNavLinkClassName}>Log in</NavLink>
      )}
    </>
  )
}

import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const navigationClassName =
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-medium motion-safe:transition-colors hover:bg-accent-soft hover:text-on-accent-soft sm:px-3'

function getNavLinkClassName({ isActive }: { isActive: boolean }) {
  return `${navigationClassName} ${isActive ? 'bg-accent-soft text-on-accent-soft underline underline-offset-4' : 'text-muted'}`
}

function Header() {
  const { isLoggedIn, logout, displayName } = useAuth()
  const { theme, setTheme } = useTheme()
  const { items } = useCart()
  const cartQuantity = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="border-b border-line bg-surface">
      <div className="shop-container flex flex-col gap-1.5 py-2 min-[481px]:flex-row min-[481px]:items-center min-[481px]:justify-between sm:gap-4 sm:py-3">
        <Link
          to="/"
          className="inline-flex min-h-11 min-w-11 shrink-0 self-start items-center gap-2 rounded-xl text-lg font-bold tracking-tight text-ink min-[481px]:self-center"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-accent text-xs text-on-accent">10X</span>
          <span>Shop</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex min-w-0 flex-wrap items-center gap-1 min-[481px]:justify-end"
        >
          <NavLink to="/" end className={getNavLinkClassName}>
            Catalog
          </NavLink>
          <NavLink to="/cart" className={getNavLinkClassName}>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
              <path d="M3 4h2l2.4 11h11.2l2-8H6" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            Cart
            {cartQuantity > 0 && (
              <span
                aria-label={`${cartQuantity} ${cartQuantity === 1 ? 'item' : 'items'} in cart`}
                className="inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 py-0.5 text-xs font-semibold text-on-accent tabular-nums"
              >
                {cartQuantity}
              </span>
            )}
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/orders" className={getNavLinkClassName}>Orders</NavLink>
              <NavLink to="/profile" className={getNavLinkClassName}>
                Profile <span className="ml-1 max-w-24 truncate" title={displayName}>· {displayName}</span>
              </NavLink>
              <button type="button" onClick={logout} className={`${navigationClassName} text-muted`}>
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={getNavLinkClassName}>Log in</NavLink>
          )}
          <button type="button" className="secondary-button gap-1.5 px-2.5 sm:px-3"
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
              {theme === 'light'
                ? <path d="M20 15a8 8 0 0 1-11-11 8.5 8.5 0 1 0 11 11Z" />
                : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>}
            </svg>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header

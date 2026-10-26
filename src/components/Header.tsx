import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navigationClassName =
  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-indigo-50 hover:text-indigo-700'

function getNavLinkClassName({ isActive }: { isActive: boolean }) {
  return `${navigationClassName} ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`
}

function Header() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          to="/"
          className="w-fit rounded-sm text-xl font-bold tracking-tight text-slate-900"
        >
          10X Shop
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-2"
        >
          <NavLink to="/" end className={getNavLinkClassName}>
            Catalog
          </NavLink>
          <NavLink to="/cart" className={getNavLinkClassName}>
            Cart
          </NavLink>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logout}
              className={`${navigationClassName} cursor-pointer text-slate-600`}
            >
              Log out
            </button>
          ) : (
            <NavLink to="/login" className={getNavLinkClassName}>
              Log in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

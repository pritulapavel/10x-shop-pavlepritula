import { useTheme } from '../context/ThemeContext'
import { StoreBrand, StoreNavigation } from './StoreNavigation'

function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b border-line bg-surface">
      <div className="shop-container flex flex-col gap-1.5 py-2 min-[481px]:flex-row min-[481px]:items-center min-[481px]:justify-between sm:gap-4 sm:py-3">
        <StoreBrand className="self-start min-[481px]:self-center" />
        <nav
          aria-label="Main navigation"
          className="flex min-w-0 flex-wrap items-center gap-1 min-[481px]:justify-end"
        >
          <StoreNavigation showProfileName />
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

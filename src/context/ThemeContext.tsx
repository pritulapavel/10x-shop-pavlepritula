import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { STORAGE_KEYS, StorageService } from '../utils/storage'

type Theme = 'light' | 'dark'
const themeStorage = new StorageService<Theme>(STORAGE_KEYS.theme, (value) =>
  value === 'light' || value === 'dark' ? value : undefined,
)

const ThemeContext = createContext<{ theme: Theme; setTheme: (value: Theme) => void } | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = themeStorage.read()
    return stored.ok ? stored.value ?? 'light' : 'light'
  })

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    themeStorage.write(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const theme = useContext(ThemeContext)
  if (!theme) throw new Error('ThemeProvider is required')
  return theme
}

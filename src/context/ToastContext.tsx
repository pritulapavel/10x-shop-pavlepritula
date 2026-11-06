import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

const ToastContext = createContext<((message: string) => void) | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string } | null>(null)

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 5000)
    return () => window.clearTimeout(timeout)
  }, [toast])

  return (
    <ToastContext.Provider value={(message) => setToast({ message })}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 left-4 z-20 flex justify-end">
        <div className={toast ? 'panel pointer-events-auto flex max-w-sm items-center gap-3 bg-success-soft p-3 text-success shadow-raised' : ''}>
          <p role="status" aria-atomic="true" className="text-sm font-semibold">{toast?.message}</p>
          {toast && (
            <button type="button" aria-label="Dismiss notification" className="secondary-button px-2" onClick={() => setToast(null)}>
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const showToast = useContext(ToastContext)
  if (!showToast) throw new Error('ToastProvider is required')
  return showToast
}

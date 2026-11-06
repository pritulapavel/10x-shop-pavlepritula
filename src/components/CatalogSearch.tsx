import { useEffect, useEffectEvent, useState } from 'react'
import { normalizeSearch } from '../utils/catalogQuery'

export default function CatalogSearch({ value, navigationKey, onSearch }: {
  value: string
  navigationKey: string
  onSearch: (query: string) => void
}) {
  const [edit, setEdit] = useState({ key: navigationKey, text: value })
  // Reset the draft on navigation while keeping the focused input mounted.
  if (edit.key !== navigationKey) setEdit({ key: navigationKey, text: value })
  const draft = edit.key === navigationKey ? edit.text : value
  const updateSearch = useEffectEvent(onSearch)

  useEffect(() => {
    const query = normalizeSearch(draft)
    if (query === value) return
    const timer = window.setTimeout(() => updateSearch(query), 400)
    return () => window.clearTimeout(timer)
  }, [draft, value])

  return (
    <label className="min-w-0 sm:col-span-2 lg:col-span-1">
      <span className="control-label">Search products</span>
      <span className="relative block">
        <input
          type="search"
          value={draft}
          maxLength={120}
          placeholder="Search by product name"
          onChange={(event) => setEdit({ key: navigationKey, text: event.target.value })}
          className="field block pl-10"
        />
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted">
          <circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 4 4" />
        </svg>
      </span>
    </label>
  )
}

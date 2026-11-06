interface CatalogPaginationProps {
  page: number
  pages: number
  onPageChange: (page: number) => void
}

function visiblePages(page: number, pages: number) {
  if (pages <= 5) return Array.from({ length: pages }, (_, index) => index + 1)
  const middle = Math.min(Math.max(page, 3), pages - 2)
  return [1, middle - 1, middle, middle + 1, pages]
}

export default function CatalogPagination({ page, pages, onPageChange }: CatalogPaginationProps) {
  const numbers = visiblePages(page, pages)

  return (
    <nav aria-label="Catalog pagination" className="flex flex-wrap items-center justify-center gap-2 border-t border-line pt-4 sm:gap-3">
      <button type="button" className="secondary-button" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <ul className="flex flex-wrap items-center justify-center gap-1">
        {numbers.map((number, index) => {
          const previous = numbers[index - 1]
          const current = page === number
          return (
            <li key={number} className="flex items-center gap-1">
              {index > 0 && number > previous + 1 && <span aria-hidden="true" className="text-muted">…</span>}
              <button type="button" aria-label={`Page ${number}`} aria-current={current ? 'page' : undefined}
                className={current ? 'primary-button px-2 tabular-nums' : 'secondary-button px-2 tabular-nums'}
                onClick={() => { if (!current) onPageChange(number) }}>
                {number}
              </button>
            </li>
          )
        })}
      </ul>
      <button type="button" className="secondary-button" disabled={page === pages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </nav>
  )
}

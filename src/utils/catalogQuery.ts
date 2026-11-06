export const PAGE_SIZE = 12

export const sortOptions = {
  default: { label: 'Default', field: '', order: '' },
  'price-asc': { label: 'Price: low to high', field: 'price', order: 'asc' },
  'price-desc': { label: 'Price: high to low', field: 'price', order: 'desc' },
  'rating-desc': { label: 'Rating: high to low', field: 'rating', order: 'desc' },
  'name-asc': { label: 'Name A→Z', field: 'title', order: 'asc' },
} as const

export type CatalogSort = keyof typeof sortOptions

export interface CatalogQuery {
  q: string
  category: string
  sort: CatalogSort
  page: number
}

export const defaultCatalogQuery: CatalogQuery = { q: '', category: '', sort: 'default', page: 1 }

export function isCatalogSort(value: string): value is CatalogSort {
  return Object.hasOwn(sortOptions, value)
}

export function normalizeSearch(value: string): string {
  return value.trim().slice(0, 120)
}

export function readCatalogQuery(params: URLSearchParams): CatalogQuery {
  const q = normalizeSearch(params.get('q') ?? '')
  const rawCategory = params.get('category') ?? ''
  const rawSort = params.get('sort') ?? ''
  const rawPage = params.get('page') ?? ''
  const page = Number(rawPage)
  return {
    q,
    category: !q && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rawCategory) ? rawCategory : '',
    sort: isCatalogSort(rawSort) ? rawSort : 'default',
    page: /^\d+$/.test(rawPage) && page > 0 && Number.isSafeInteger(page * PAGE_SIZE) ? page : 1,
  }
}

export function catalogParams({ q, category, sort, page }: CatalogQuery): URLSearchParams {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  else if (category) params.set('category', category)
  if (sort !== 'default') params.set('sort', sort)
  if (page > 1) params.set('page', String(page))
  return params
}

export function catalogRequest(query: CatalogQuery): string {
  const { q, category, sort, page } = query
  const path = q ? '/products/search' : category ? `/products/category/${encodeURIComponent(category)}` : '/products'
  const params = new URLSearchParams({ limit: String(PAGE_SIZE), skip: String((page - 1) * PAGE_SIZE) })
  if (q) params.set('q', q)
  if (sort !== 'default') {
    params.set('sortBy', sortOptions[sort].field)
    params.set('order', sortOptions[sort].order)
  }
  return `${path}?${params}`
}

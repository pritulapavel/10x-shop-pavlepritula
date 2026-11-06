import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import CatalogSearch from '../components/CatalogSearch'
import CatalogSkeleton from '../components/CatalogSkeleton'
import ProductGrid from '../components/ProductGrid'
import SelectField from '../components/SelectField'
import { useRequest } from '../hooks/useRequest'
import { getCategories, getProducts } from '../utils/api'
import {
  catalogParams, catalogRequest, defaultCatalogQuery, isCatalogSort,
  PAGE_SIZE, readCatalogQuery, sortOptions,
} from '../utils/catalogQuery'
import type { CatalogQuery } from '../utils/catalogQuery'

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const { key } = useLocation()
  const query = readCatalogQuery(params)
  const categories = useRequest('categories', getCategories)
  const categoryList = categories.state.status === 'success' ? categories.state.data : []
  if (query.category && categories.state.status === 'success' &&
    !categoryList.some((category) => category.slug === query.category)) {
    query.category = ''
    query.page = 1
  }

  const endpoint = catalogRequest(query)
  const { state, retry } = useRequest(endpoint, (signal) => getProducts(endpoint, signal))
  const total = state.status === 'success' ? state.data.total : 0
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const correctedPage = state.status === 'success' ? Math.min(query.page, pages) : query.page
  const normalized = catalogParams({ ...query, page: correctedPage }).toString()
  const current = params.toString()

  useEffect(() => {
    if (normalized !== current) setParams(normalized, { replace: true, preventScrollReset: true })
  }, [current, normalized, setParams])

  function change(next: Partial<CatalogQuery>) {
    setParams(catalogParams({ ...query, ...next }))
  }

  const activeFilters = Boolean(query.q || query.category || query.sort !== 'default')
  const activeCategory = categoryList.find(({ slug }) => slug === query.category)?.name ?? query.category.replaceAll('-', ' ')
  const showClearFilters = activeFilters && !(state.status === 'success' && total === 0)
  return (
    <section aria-labelledby="catalog-heading" className="space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <div>
          <p className="eyebrow">Product collection</p>
          <h1 id="catalog-heading" className="display-title mt-0.5">Catalog</h1>
        </div>
        <p role="status" className="text-sm font-medium text-muted tabular-nums sm:pb-1">
          {state.status === 'success' && total > 0
            ? `Showing ${state.data.skip + 1}–${state.data.skip + state.data.products.length} of ${total} products`
            : 'Product collection'}
        </p>
      </div>

      <div className="panel grid items-end gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <CatalogSearch navigationKey={key} value={query.q} onSearch={(q) => change({ q, category: '', page: 1 })} />
        <label className="min-w-0">
          <span className="control-label">Category</span>
          <SelectField value={query.category} onChange={(event) => change({ category: event.target.value, q: '', page: 1 })}>
            <option value="">All categories</option>
            {query.category && !categoryList.some((category) => category.slug === query.category) && (
              <option value={query.category}>{query.category.replaceAll('-', ' ')}</option>
            )}
            {categoryList.map(({ slug, name }) => <option value={slug} key={slug}>{name}</option>)}
          </SelectField>
        </label>
        <label className="min-w-0">
          <span className="control-label">Sort</span>
          <SelectField value={query.sort} onChange={(event) => {
            const sort = event.target.value
            if (isCatalogSort(sort)) change({ sort, page: 1 })
          }}>
            {Object.entries(sortOptions).map(([value, option]) => <option value={value} key={value}>{option.label}</option>)}
          </SelectField>
        </label>
        {categories.state.status === 'error' && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-danger sm:col-span-2 lg:col-span-3">
            <span role="status">Categories are unavailable.</span>
            <button type="button" className="secondary-button" onClick={categories.retry}>Retry categories</button>
          </div>
        )}
      </div>

      {(query.q || activeCategory || showClearFilters) && (
        <div aria-label="Active filters" role="group" className="flex flex-wrap items-center gap-2">
          {query.q && (
            <button type="button" aria-label={`Remove search filter: ${query.q}`}
              className="secondary-button max-w-full gap-2 bg-accent-soft px-3 text-on-accent-soft hover:bg-surface-muted"
              onClick={() => change({ q: '', page: 1 })}>
              <span className="min-w-0 truncate">Search: {query.q}</span><span aria-hidden="true">×</span>
            </button>
          )}
          {activeCategory && (
            <button type="button" aria-label={`Remove category filter: ${activeCategory}`}
              className="secondary-button max-w-full gap-2 bg-accent-soft px-3 text-on-accent-soft hover:bg-surface-muted"
              onClick={() => change({ category: '', page: 1 })}>
              <span className="min-w-0 truncate">{activeCategory}</span><span aria-hidden="true">×</span>
            </button>
          )}
          {showClearFilters && (
            <button type="button" className="secondary-button" onClick={() => change(defaultCatalogQuery)}>Clear filters</button>
          )}
        </div>
      )}

      {state.status === 'loading' || correctedPage !== query.page ? <CatalogSkeleton /> :
        state.status === 'error' ? (
          <div className="panel bg-danger-soft p-5 sm:p-6">
            <p role="alert" className="text-danger">Unable to load products. Please try again later.</p>
            <button type="button" className="primary-button mt-4" onClick={retry}>Retry</button>
          </div>
        ) : state.data.products.length === 0 ? (
          <div className="panel space-y-4 p-8 text-center">
            <p className="text-lg font-semibold">No products found.</p>
            <button type="button" className="secondary-button" onClick={() => change(defaultCatalogQuery)}>Clear filters</button>
          </div>
        ) : (
          <>
            <ProductGrid products={state.data.products} prioritizeFirstImage />
            {pages > 1 && (
              <nav aria-label="Catalog pagination" className="flex flex-wrap items-center justify-center gap-2 border-t border-line pt-4 sm:gap-3">
                <button type="button" className="secondary-button" disabled={query.page === 1} onClick={() => change({ page: query.page - 1 })}>
                  Previous
                </button>
                <span aria-current="page" className="rounded-xl bg-accent-soft px-3 py-2 text-sm font-semibold text-on-accent-soft tabular-nums">Page {query.page} of {pages}</span>
                <button type="button" className="secondary-button" disabled={query.page === pages} onClick={() => change({ page: query.page + 1 })}>
                  Next
                </button>
              </nav>
            )}
          </>
        )}
    </section>
  )
}

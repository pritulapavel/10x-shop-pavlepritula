export default function CatalogSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">Loading products...</p>
      <div aria-hidden="true" className="product-grid motion-safe:animate-pulse">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="panel product-card">
            <div className="image-well aspect-[4/3]" />
            <div className="mt-3 h-11 w-3/4 rounded-lg bg-surface-muted" />
            <div className="mt-1 h-5 w-1/2 rounded-lg bg-surface-muted" />
            <div className="mt-2 h-6 w-2/3 rounded-lg bg-surface-muted" />
            <div className="mt-3 h-7 w-1/3 rounded-lg bg-surface-muted" />
            <div className="mt-3 h-11 rounded-xl bg-surface-muted" />
            <div className="mt-1 h-5" />
          </div>
        ))}
      </div>
    </>
  )
}

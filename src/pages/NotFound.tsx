import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="text-muted">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="inline-flex min-h-11 min-w-11 items-center rounded-sm font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
      >
        Go to catalog
      </Link>
    </div>
  )
}

export default NotFound

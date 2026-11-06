import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="panel space-y-4 p-6 sm:p-8">
      <h1 className="display-title">Page not found</h1>
      <p className="text-muted">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="secondary-button"
      >
        Go to catalog
      </Link>
    </div>
  )
}

export default NotFound

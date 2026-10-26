import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Page not found</h1>
      <p className="text-slate-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="inline-block rounded-sm font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
      >
        Go to catalog
      </Link>
    </div>
  )
}

export default NotFound

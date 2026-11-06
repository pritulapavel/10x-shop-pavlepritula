export default function StockBadge({ stock }: { stock: number }) {
  const text = stock === 0 ? 'Out of stock' : stock <= 5 ? `Only ${stock} left!` : 'In stock'
  const color = stock === 0 ? 'bg-surface-muted text-muted'
    : stock <= 5 ? 'bg-warning-soft text-warning' : 'bg-success-soft text-success'

  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>{text}</span>
}

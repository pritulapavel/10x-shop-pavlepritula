import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useFormik } from 'formik'
import { number, object, string } from 'yup'
import type { Product } from '../types'
import { useAuth } from '../context/AuthContext'
import { useReviews } from '../context/ReviewsContext'
import SelectField from './SelectField'

const ratingMessage = 'Please select a rating'
const commentMessage = 'Comment must be at least 10 characters'
const reviewSchema = object({
  rating: number().typeError(ratingMessage).integer(ratingMessage).min(1, ratingMessage).max(5, ratingMessage).required(ratingMessage),
  comment: string().trim().min(10, commentMessage).required(commentMessage),
})
const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })
const tabs = ['description', 'reviews'] as const
type Tab = typeof tabs[number]

export default function ProductReviews({ product }: { product: Product }) {
  const { reviews, addReview } = useReviews()
  const { displayName } = useAuth()
  const [selected, setSelected] = useState<Tab>('description')
  const descriptionTab = useRef<HTMLButtonElement>(null)
  const reviewsTab = useRef<HTMLButtonElement>(null)
  const local = [...(reviews[product.id] ?? [])].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  const entries = [...local, ...product.reviews]
  const average = entries.length ? entries.reduce((sum, review) => sum + review.rating, 0) / entries.length : undefined

  const form = useFormik({
    initialValues: { rating: 0, comment: '' },
    validationSchema: reviewSchema,
    onSubmit(values, helpers) {
      const saved = addReview(product.id, {
        reviewerName: displayName || 'Guest',
        rating: values.rating,
        comment: values.comment.trim(),
        date: new Date().toISOString(),
      })
      if (saved) helpers.resetForm()
      helpers.setStatus(saved ? 'Review added ✓' : 'Unable to save your review. Please try again.')
      helpers.setSubmitting(false)
    },
  })
  const status: unknown = form.status
  const ratingError = form.touched.rating && form.errors.rating
  const commentError = form.touched.comment && form.errors.comment

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    let target: Tab
    if (event.key === 'Home') target = 'description'
    else if (event.key === 'End') target = 'reviews'
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') target = selected === 'reviews' ? 'description' : 'reviews'
    else return
    event.preventDefault()
    setSelected(target)
    const button = target === 'description' ? descriptionTab : reviewsTab
    button.current?.focus()
  }

  return (
    <section className="panel mt-8 p-4 sm:p-6">
      <div role="tablist" aria-label="Product information" className="flex flex-wrap gap-2 border-b border-line pb-3">
        {tabs.map((tab) => (
          <button key={tab} type="button" role="tab" id={`tab-${tab}`}
            ref={tab === 'description' ? descriptionTab : reviewsTab}
            aria-selected={selected === tab} aria-controls={`panel-${tab}`} tabIndex={selected === tab ? 0 : -1}
            onClick={() => setSelected(tab)} onKeyDown={onTabKey}
            className={selected === tab ? 'primary-button' : 'secondary-button'}>
            {tab === 'description' ? 'Description' : `Reviews (${entries.length})`}
          </button>
        ))}
      </div>
      <div id="panel-description" role="tabpanel" aria-labelledby="tab-description" tabIndex={0}
        hidden={selected !== 'description'} className="mt-4 break-words leading-relaxed text-muted">
        {product.description}
      </div>
      <div id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" tabIndex={0}
        hidden={selected !== 'reviews'} className="mt-4 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0 space-y-4">
          <h2 className="text-xl font-semibold">Customer reviews</h2>
          <p className="text-sm text-muted">
            {average === undefined ? 'No reviews yet.' : `Average rating ${average.toFixed(2)} out of 5 · ${entries.length} reviews`}
          </p>
          <ul className="divide-y divide-line">
            {entries.map((entry, index) => (
              <li key={`${entry.date}-${entry.reviewerName}-${index}`} className="space-y-1 py-3 break-words">
                <p className="font-semibold">{entry.reviewerName}</p>
                <p className="text-sm text-muted">{entry.rating} out of 5 · <time dateTime={entry.date}>{dateFormat.format(new Date(entry.date))}</time></p>
                <p>{entry.comment}</p>
              </li>
            ))}
          </ul>
        </div>
        <form noValidate onSubmit={form.handleSubmit} className="min-w-0 space-y-4 rounded-xl border border-line bg-surface-muted p-4">
          <h2 className="text-xl font-semibold">Write a review</h2>
          <div>
            <label htmlFor="review-rating" className="control-label">Rating</label>
            <SelectField id="review-rating" name="rating" value={form.values.rating} onBlur={form.handleBlur}
              onChange={(event) => void form.setFieldValue('rating', Number(event.target.value))}
              aria-invalid={Boolean(ratingError)} aria-describedby={ratingError ? 'rating-error' : undefined}>
              <option value={0}>Select rating</option>
              {[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating} out of 5</option>)}
            </SelectField>
            {ratingError && <p id="rating-error" role="alert" className="field-error">{ratingError}</p>}
          </div>
          <div>
            <label htmlFor="review-comment" className="control-label">Comment</label>
            <textarea id="review-comment" rows={3} className="field" {...form.getFieldProps('comment')}
              aria-invalid={Boolean(commentError)} aria-describedby={commentError ? 'comment-error' : undefined} />
            {commentError && <p id="comment-error" role="alert" className="field-error">{commentError}</p>}
          </div>
          <button type="submit" className="primary-button" disabled={form.isSubmitting}>Add review</button>
          {typeof status === 'string' && <p role="status">{status}</p>}
        </form>
      </div>
    </section>
  )
}

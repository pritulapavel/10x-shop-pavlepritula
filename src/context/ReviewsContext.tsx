import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Review } from '../types'
import { reviewStorage } from '../utils/reviewStorage'
import type { ReviewMap } from '../utils/reviewStorage'

interface ReviewsContextValue {
  reviews: ReviewMap
  addReview: (id: number, review: Review) => boolean
  clearReviews: () => boolean
}

const ReviewsContext = createContext<ReviewsContextValue | undefined>(undefined)

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<ReviewMap>(() => {
    const result = reviewStorage.read()
    return result.ok ? result.value ?? {} : {}
  })

  function addReview(id: number, review: Review) {
    const next = { ...reviews, [id]: [review, ...(reviews[id] ?? [])] }
    if (!reviewStorage.write(next)) return false
    setReviews(next)
    return true
  }

  function clearReviews() {
    if (!reviewStorage.remove()) return false
    setReviews({})
    return true
  }

  return <ReviewsContext.Provider value={{ reviews, addReview, clearReviews }}>{children}</ReviewsContext.Provider>
}

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (!context) throw new Error('ReviewsProvider is required')
  return context
}

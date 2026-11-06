import type { Review } from '../types'
import { isRecord } from './decode.ts'
import { STORAGE_KEYS, StorageService } from './storage.ts'

export function isReview(value: unknown): value is Review {
  return isRecord(value) && typeof value.reviewerName === 'string' && value.reviewerName.trim() !== '' &&
    typeof value.rating === 'number' && Number.isInteger(value.rating) && value.rating >= 1 && value.rating <= 5 &&
    typeof value.date === 'string' && Number.isFinite(Date.parse(value.date)) &&
    typeof value.comment === 'string' && value.comment.trim() !== ''
}

export type ReviewMap = Record<string, Review[]>

export const reviewStorage = new StorageService<ReviewMap>(STORAGE_KEYS.reviews, (input) => {
  if (!isRecord(input)) return
  const reviews: ReviewMap = {}
  for (const [id, entries] of Object.entries(input)) {
    if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id)) ||
      !Array.isArray(entries) || !entries.every(isReview)) return
    reviews[id] = entries
  }
  return reviews
})

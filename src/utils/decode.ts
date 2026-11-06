export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isNonnegativeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

export function isNonnegativeInteger(value: unknown): value is number {
  return isNonnegativeNumber(value) && Number.isSafeInteger(value)
}

export function isDiscount(value: unknown): value is number {
  return isNonnegativeNumber(value) && value <= 100
}

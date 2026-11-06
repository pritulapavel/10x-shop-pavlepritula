import { useEffect, useEffectEvent, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: unknown }

export function useRequest<T>(key: string, load: (signal: AbortSignal) => Promise<T>) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<{ key: string; attempt: number; state: AsyncState<T> }>()
  const request = useEffectEvent(load)

  useEffect(() => {
    const controller = new AbortController()
    void request(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setResult({ key, attempt, state: { status: 'success', data } })
      },
      (error: unknown) => {
        if (!controller.signal.aborted) setResult({ key, attempt, state: { status: 'error', error } })
      },
    )
    return () => controller.abort()
  }, [key, attempt])

  const state: AsyncState<T> = result?.key === key && result.attempt === attempt
    ? result.state
    : { status: 'loading' }
  return { state, retry: () => setAttempt((previous) => previous + 1) }
}

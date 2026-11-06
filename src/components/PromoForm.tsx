import { useState } from 'react'
import type { FormEvent } from 'react'
import { useToast } from '../context/ToastContext'
import { useCart } from '../context/CartContext'
import { parsePromoCode } from '../utils/cart'

export default function PromoForm() {
  const { promoCode, applyPromo, removePromo } = useCart()
  const showToast = useToast()
  const [input, setInput] = useState('')
  const [invalid, setInvalid] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const code = parsePromoCode(input)
    setInvalid(!code)
    if (code) {
      applyPromo(code)
      showToast('Promo code applied.')
      setInput('')
    }
  }

  if (promoCode) return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-success-soft p-3 text-success">
      <span className="text-sm font-semibold">10X10 applied</span>
      <button type="button" aria-label="Remove promo code" className="secondary-button" onClick={() => { removePromo(); showToast('Promo code removed.') }}>Remove</button>
    </div>
  )

  return (
    <form onSubmit={submit} className="space-y-2">
      <label htmlFor="promo-code" className="control-label">Promo code</label>
      <div className="flex gap-2">
        <input id="promo-code" className="field min-w-0" value={input} maxLength={24}
          aria-invalid={invalid} aria-describedby={invalid ? 'promo-error' : undefined}
          onChange={(event) => { setInput(event.target.value); setInvalid(false) }} />
        <button type="submit" className="secondary-button shrink-0">Apply</button>
      </div>
      {invalid && <p id="promo-error" role="alert" className="text-sm text-danger">Invalid promo code</p>}
    </form>
  )
}

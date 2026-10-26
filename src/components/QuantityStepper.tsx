interface QuantityStepperProps {
  quantity: number
  max: number
  label: string
  onChange: (quantity: number) => void
}

const buttonClassName =
  'h-10 w-10 cursor-pointer rounded-md text-lg font-medium text-indigo-700 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-white'

function QuantityStepper({ quantity, max, label, onChange }: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label={`Quantity for ${label}`}
      className="inline-flex w-fit items-center rounded-md border border-slate-300 bg-white"
    >
      <button
        type="button"
        aria-label={`Decrease quantity for ${label}`}
        disabled={max < 1 || quantity <= 1}
        onClick={() => onChange(quantity - 1)}
        className={buttonClassName}
      >
        −
      </button>
      <span aria-live="polite" className="min-w-8 text-center tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        aria-label={`Increase quantity for ${label}`}
        disabled={max < 1 || quantity >= max}
        onClick={() => onChange(quantity + 1)}
        className={buttonClassName}
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper

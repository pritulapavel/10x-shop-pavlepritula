interface QuantityStepperProps {
  quantity: number
  max: number
  label: string
  onChange: (quantity: number) => void
}

const buttonClassName =
  'h-11 w-11 shrink-0 cursor-pointer rounded-lg text-lg font-semibold text-accent-ink motion-safe:transition-colors not-disabled:hover:bg-accent-soft not-disabled:hover:text-on-accent-soft disabled:cursor-not-allowed disabled:bg-disabled-surface disabled:text-disabled-ink'

function QuantityStepper({ quantity, max, label, onChange }: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label={`Quantity for ${label}`}
      className="inline-flex w-fit max-w-full items-center rounded-control border border-control bg-surface p-0.5"
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
      <span aria-live="polite" className="min-w-9 px-1 text-center font-semibold tabular-nums">
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

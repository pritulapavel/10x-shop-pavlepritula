import { useId, useState } from 'react'

interface ConfirmActionProps {
  label: string
  question: string
  onConfirm: () => void
}

export default function ConfirmAction({ label, question, onConfirm }: ConfirmActionProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="space-y-2">
      <button type="button" className="secondary-button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {label}
      </button>
      <div id={id} hidden={!open} role="group" aria-labelledby={`${id}-question`}
        className="space-y-3 rounded-xl border border-line bg-warning-soft p-4 text-warning">
        <p id={`${id}-question`}>{question}</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="secondary-button" onClick={() => setOpen(false)}>Cancel</button>
          <button type="button" className="primary-button bg-danger-soft text-danger not-disabled:hover:bg-danger-soft not-disabled:hover:underline not-disabled:active:bg-danger-soft" onClick={() => { onConfirm(); setOpen(false) }}>
            Confirm {label.toLowerCase()}
          </button>
        </div>
      </div>
    </div>
  )
}

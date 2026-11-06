import type { ComponentProps } from 'react'

type SelectFieldProps = Omit<ComponentProps<'select'>, 'className' | 'multiple' | 'size'>

export default function SelectField(props: SelectFieldProps) {
  return (
    <span className="relative block min-w-0">
      <select
        {...props}
        className="field block min-w-0 appearance-none truncate pr-11 enabled:cursor-pointer disabled:cursor-not-allowed disabled:bg-disabled-surface disabled:text-disabled-ink"
      />
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 16 16"
        fill="none"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
      >
        <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

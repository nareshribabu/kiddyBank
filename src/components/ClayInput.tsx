import { useId, type InputHTMLAttributes } from 'react'
import { cx } from '../lib/cx'

interface ClayInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

/** Labelled text field with a recessed clay look. The error message is announced and linked to the input. */
export function ClayInput({ label, error, className, id, ...props }: ClayInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="font-semibold">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cx(
          'min-h-11 rounded-pill bg-bg px-5 py-3 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-lavender-strong disabled:opacity-50',
          error && 'ring-2 ring-coral-strong',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="px-2 text-sm text-coral-strong">
          {error}
        </p>
      )}
    </div>
  )
}

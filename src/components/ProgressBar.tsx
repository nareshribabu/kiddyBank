import { progressPercent } from '../lib/progressPercent'
import { cx } from '../lib/cx'

interface ProgressBarProps {
  value: number
  max: number
  label: string
  className?: string
}

/** Mint progress bar. The label names what is being measured for screen readers. */
export function ProgressBar({ value, max, label, className }: ProgressBarProps) {
  const percent = progressPercent(value, max)
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx('h-3.5 overflow-hidden rounded-pill bg-mint-soft shadow-inner', className)}
    >
      <div className="h-full rounded-pill bg-mint" style={{ width: `${percent}%` }} />
    </div>
  )
}

import type { HTMLAttributes } from 'react'
import { cx } from '../lib/cx'

/** Raised white card with the clay shadow and large radius. */
export function ClayCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('rounded-card bg-card p-5 shadow-card', className)} {...props} />
}

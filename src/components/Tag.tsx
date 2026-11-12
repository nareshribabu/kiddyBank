import type { HTMLAttributes } from 'react'
import { cx } from '../lib/cx'

type Tone = 'lavender' | 'mint' | 'peach' | 'yellow' | 'sky'

const toneClasses: Record<Tone, string> = {
  lavender: 'bg-lavender-soft',
  mint: 'bg-mint-soft',
  peach: 'bg-peach-soft',
  yellow: 'bg-yellow-soft',
  sky: 'bg-sky-soft',
}

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

/** Small pastel pill for a category or status. Text stays dark so contrast holds on every tone. */
export function Tag({ tone = 'lavender', className, ...props }: TagProps) {
  return (
    <span
      className={cx('inline-block rounded-pill px-3 py-1.5 text-sm font-semibold text-ink', toneClasses[tone], className)}
      {...props}
    />
  )
}

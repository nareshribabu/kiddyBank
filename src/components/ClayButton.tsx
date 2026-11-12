import { motion, type HTMLMotionProps } from 'motion/react'
import { cx } from '../lib/cx'

type Variant = 'primary' | 'coral' | 'light'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-lavender-strong text-white shadow-press',
  coral: 'bg-coral-strong text-white shadow-coral',
  light: 'bg-card text-ink shadow-card',
}

interface ClayButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant
}

/** Pill button that squishes on press. Primary is the kid action, coral is the parent action. */
export function ClayButton({ variant = 'primary', className, ...props }: ClayButtonProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      className={cx(
        'min-h-11 cursor-pointer rounded-pill px-6 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}

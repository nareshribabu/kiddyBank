import { cx } from '../lib/cx'

interface AvatarProps {
  name: string
  src?: string
  className?: string
}

/** Round avatar. Shows the picture when given, otherwise the first letter of the name (used for parents). */
export function Avatar({ name, src, className }: AvatarProps) {
  return (
    <div
      className={cx(
        'grid size-13 shrink-0 place-items-center overflow-hidden rounded-full bg-peach-soft shadow-card',
        !src && 'bg-sky-soft text-xl font-bold text-ink',
        className,
      )}
    >
      {src ? <img src={src} alt={name} className="size-full" /> : name.charAt(0).toUpperCase()}
    </div>
  )
}

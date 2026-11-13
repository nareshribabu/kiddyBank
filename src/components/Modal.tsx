import { useEffect, useRef, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/** Centered dialog built on the native dialog element, which provides focus trapping and Escape to close. */
export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="modal-title"
      className="m-auto w-[min(92vw,28rem)] rounded-card bg-card p-6 text-ink shadow-card backdrop:bg-ink/40"
    >
      <h2 id="modal-title" className="mb-4 text-xl font-bold">
        {title}
      </h2>
      {children}
    </dialog>
  )
}

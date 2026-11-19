import { useEffect, useId, useRef, type ReactNode } from 'react'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

type DrawerProps = {
  open: boolean
  onClose: () => void
  title: string
  side?: 'left' | 'right'
  children: ReactNode
  footer?: ReactNode
}

/**
 * Painel lateral sobre <dialog> nativo (showModal): foco preso, fundo inerte e
 * Esc já vêm do navegador. Clique no backdrop também fecha.
 */
export function Drawer({ open, onClose, title, side = 'right', children, footer }: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useLockBodyScroll(open)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    // Clique no backdrop fecha; o equivalente de teclado (Esc) é nativo do <dialog>.
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className={`fixed inset-y-0 m-0 h-dvh max-h-none w-full max-w-[400px] bg-white p-0 text-ink shadow-header backdrop:bg-ink/50 open:flex open:flex-col ${
        side === 'right'
          ? 'right-0 left-auto open:animate-slide-in-right'
          : 'left-0 open:animate-slide-in-left'
      }`}
    >
      <header className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 id={titleId} className="text-base font-semibold uppercase">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="grid size-9 cursor-pointer place-items-center rounded-full text-2xl leading-none transition hover:bg-surface"
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div className="flex-1 overflow-y-auto">{open && children}</div>
      {footer && <div className="border-t border-line p-5">{footer}</div>}
    </dialog>
  )
}

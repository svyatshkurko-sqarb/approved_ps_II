import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Button } from './button'

interface SheetProps {
  open: boolean
  title?: string
  description?: string
  onClose: () => void
  children: ReactNode
}

export function Sheet({ open, title, description, onClose, children }: SheetProps) {
  return (
    <aside
      aria-hidden={!open}
      className={cn(
        'fixed right-0 top-0 z-20 h-full w-full max-w-xl border-l border-slate-200 bg-white shadow-2xl transition-transform duration-200',
        open ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      <header className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
        <div>
          {title ? <h2 className="text-lg font-semibold text-slate-900">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
        </div>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </header>
      <div className="h-[calc(100%-73px)] overflow-y-auto px-5 py-4">{children}</div>
    </aside>
  )
}

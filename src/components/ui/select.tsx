import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm',
        'focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200',
        className,
      )}
      {...props}
    />
  )
}

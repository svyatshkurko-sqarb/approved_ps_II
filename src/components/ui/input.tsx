import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm',
        'placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200',
        className,
      )}
      {...props}
    />
  )
}

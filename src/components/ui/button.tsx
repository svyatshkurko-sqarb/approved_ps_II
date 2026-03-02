import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'default' | 'outline' | 'ghost'

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-slate-900 text-white hover:bg-slate-800',
  outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}

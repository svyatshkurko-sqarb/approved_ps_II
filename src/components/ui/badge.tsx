import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Tone = 'green' | 'yellow' | 'red' | 'gray' | 'slate'

const toneClasses: Record<Tone, string> = {
  green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  yellow: 'bg-amber-100 text-amber-800 border-amber-200',
  red: 'bg-rose-100 text-rose-800 border-rose-200',
  gray: 'bg-slate-100 text-slate-700 border-slate-200',
  slate: 'bg-white text-slate-700 border-slate-300',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ className, tone = 'gray', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}

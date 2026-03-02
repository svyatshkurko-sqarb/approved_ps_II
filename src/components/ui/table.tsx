import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function TableContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-slate-200 bg-white', className)} {...props} />
  )
}

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn('w-full text-left text-sm', className)} {...props} />
}

export function THead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('bg-slate-50', className)} {...props} />
}

export function TBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('divide-y divide-slate-100', className)} {...props} />
}

export function TR({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn(className)} {...props} />
}

export function TH({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn('px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500', className)}
      {...props}
    />
  )
}

export function TD({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-4 py-3 align-middle text-slate-800', className)} {...props} />
}

import { useState, type FormEvent } from 'react'
import type { NewSiteApprovalEntry, NewSiteInput, PSApprovalStatus } from '../types/approval'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select } from './ui/select'

interface MerchantOption {
  id: string
  name: string
}

interface AddSiteFormProps {
  merchantOptions: MerchantOption[]
  onAddSite: (merchantId: string, input: NewSiteInput) => void
  defaultMerchantId?: string
  showMerchantField?: boolean
  title?: string
}

interface DraftApprovalRow extends NewSiteApprovalEntry {
  rowId: string
}

const statusOptions: PSApprovalStatus[] = ['draft', 'pending', 'approved', 'rejected']

function createDraftRow(): DraftApprovalRow {
  return {
    rowId: `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    psName: '',
    geo: '',
    currency: '',
    status: 'draft',
    comment: '',
  }
}

export function AddSiteForm({
  merchantOptions,
  onAddSite,
  defaultMerchantId,
  showMerchantField = true,
  title = 'Add New Site',
}: AddSiteFormProps) {
  const [merchantId, setMerchantId] = useState(defaultMerchantId ?? merchantOptions[0]?.id ?? '')
  const [domain, setDomain] = useState('')
  const [checkout, setCheckout] = useState('')
  const [rows, setRows] = useState<DraftApprovalRow[]>([createDraftRow()])
  const [error, setError] = useState<string | null>(null)

  const updateRow = (
    rowId: string,
    key: keyof Omit<DraftApprovalRow, 'rowId'>,
    value: string | PSApprovalStatus,
  ) => {
    setRows((prev) =>
      prev.map((row) =>
        row.rowId === rowId
          ? {
              ...row,
              [key]: value,
            }
          : row,
      ),
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedDomain = domain.trim().toLowerCase()
    const normalizedCheckout = checkout.trim()

    if (!merchantId) {
      setError('Merchant is required.')
      return
    }

    if (!normalizedDomain) {
      setError('Site domain is required.')
      return
    }

    if (!normalizedCheckout) {
      setError('Checkout is required.')
      return
    }

    const approvals = rows
      .map((row) => ({
        psName: row.psName.trim(),
        geo: row.geo.trim(),
        currency: row.currency.trim(),
        status: row.status,
        comment: row.comment?.trim(),
      }))
      .filter((row) => row.psName && row.geo && row.currency)

    if (approvals.length === 0) {
      setError('Add at least one approval row with PS, GEO, and currency.')
      return
    }

    onAddSite(merchantId, {
      domain: normalizedDomain,
      checkout: normalizedCheckout,
      approvals,
    })

    setDomain('')
    setCheckout('')
    setRows([createDraftRow()])
    setError(null)
  }

  return (
    <form className="mb-4 rounded-lg border border-slate-200 bg-white p-4" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{title}</h2>
          <p className="mt-1 text-xs text-slate-500">
            Create a site and initial PS approvals by GEO and currency.
          </p>
        </div>
        <Button type="submit">Add site</Button>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-3">
        {showMerchantField && (
          <div>
            <label htmlFor="new-site-merchant" className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
              Merchant
            </label>
            <Select
              id="new-site-merchant"
              value={merchantId}
              onChange={(event) => setMerchantId(event.target.value)}
            >
              {merchantOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </div>
        )}

        <div>
          <label htmlFor="new-site-checkout" className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
            Касса
          </label>
          <Input
            id="new-site-checkout"
            placeholder="e.g. Main Checkout"
            value={checkout}
            onChange={(event) => setCheckout(event.target.value)}
          />
        </div>

        <div className={showMerchantField ? '' : 'md:col-span-2'}>
        <label htmlFor="new-site-domain" className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
          Site domain
        </label>
        <Input
          id="new-site-domain"
          placeholder="e.g. launch.example.com"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
        />
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div
            key={row.rowId}
            className="grid gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr_1.2fr_auto]"
          >
            <Input
              placeholder="PS name"
              value={row.psName}
              onChange={(event) => updateRow(row.rowId, 'psName', event.target.value)}
            />
            <Input
              placeholder="GEO (US)"
              value={row.geo}
              onChange={(event) => updateRow(row.rowId, 'geo', event.target.value)}
            />
            <Input
              placeholder="Currency (USD)"
              value={row.currency}
              onChange={(event) => updateRow(row.rowId, 'currency', event.target.value)}
            />
            <Select
              value={row.status}
              onChange={(event) => updateRow(row.rowId, 'status', event.target.value as PSApprovalStatus)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Comment (optional)"
              value={row.comment}
              onChange={(event) => updateRow(row.rowId, 'comment', event.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setRows((prev) => (prev.length > 1 ? prev.filter((item) => item.rowId !== row.rowId) : prev))}
              className="h-10"
              aria-label={`Remove row ${index + 1}`}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <Button type="button" variant="outline" onClick={() => setRows((prev) => [...prev, createDraftRow()])}>
          Add approval row
        </Button>
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      </div>
    </form>
  )
}

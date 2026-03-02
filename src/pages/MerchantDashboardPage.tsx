import { useMemo, useState } from 'react'
import { AddSiteForm } from '../components/AddSiteForm'
import { LaunchStatusBadge } from '../components/StatusBadge'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import {
  Table,
  TableContainer,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from '../components/ui/table'
import { calculateMerchantStatus, countMerchantSitesByStatus, launchStatusLabel } from '../lib/status'
import type { Merchant, NewSiteInput, SiteLaunchStatus } from '../types/approval'

type MerchantStatusFilter = SiteLaunchStatus | 'all'

interface MerchantDashboardPageProps {
  merchants: Merchant[]
  onOpenMerchant: (merchantId: string) => void
  onAddSite: (merchantId: string, input: NewSiteInput) => void
}

export function MerchantDashboardPage({
  merchants,
  onOpenMerchant,
  onAddSite,
}: MerchantDashboardPageProps) {
  const [merchantQuery, setMerchantQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<MerchantStatusFilter>('all')
  const [siteQuery, setSiteQuery] = useState('')

  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      const status = calculateMerchantStatus(merchant)
      const matchesMerchant = merchant.name.toLowerCase().includes(merchantQuery.trim().toLowerCase())
      const matchesStatus = statusFilter === 'all' || status === statusFilter
      const normalizedSiteQuery = siteQuery.trim().toLowerCase()
      const matchesSite =
        normalizedSiteQuery.length === 0 ||
        merchant.sites.some((site) => site.domain.toLowerCase().includes(normalizedSiteQuery))
      return matchesMerchant && matchesStatus && matchesSite
    })
  }, [merchantQuery, merchants, siteQuery, statusFilter])

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Merchant Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Aggregated launch readiness across all sites per merchant.
        </p>
      </header>

      <AddSiteForm
        title="Main New Site Form"
        merchantOptions={merchants.map((merchant) => ({ id: merchant.id, name: merchant.name }))}
        onAddSite={onAddSite}
      />

      <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[1fr_220px_1fr]">
        <div>
          <label
            htmlFor="merchant-search"
            className="mb-1 block text-xs uppercase tracking-wide text-slate-500"
          >
            Merchant filter
          </label>
          <Input
            id="merchant-search"
            placeholder="Search merchant name"
            value={merchantQuery}
            onChange={(event) => setMerchantQuery(event.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="merchant-status-filter"
            className="mb-1 block text-xs uppercase tracking-wide text-slate-500"
          >
            Status filter
          </label>
          <Select
            id="merchant-status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as MerchantStatusFilter)}
          >
            <option value="all">All statuses</option>
            <option value="ready">{launchStatusLabel.ready}</option>
            <option value="in_progress">{launchStatusLabel.in_progress}</option>
            <option value="blocked">{launchStatusLabel.blocked}</option>
            <option value="draft">{launchStatusLabel.draft}</option>
          </Select>
        </div>

        <div>
          <label htmlFor="site-search" className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
            Site filter
          </label>
          <Input
            id="site-search"
            placeholder="Search site domain"
            value={siteQuery}
            onChange={(event) => setSiteQuery(event.target.value)}
          />
        </div>
      </div>

      <TableContainer>
        <Table>
          <THead>
            <TR>
              <TH>Merchant name</TH>
              <TH>Overall status</TH>
              <TH>Total sites</TH>
              <TH>Ready</TH>
              <TH>In progress</TH>
              <TH>Blocked</TH>
            </TR>
          </THead>
          <TBody>
            {filteredMerchants.map((merchant) => {
              const status = calculateMerchantStatus(merchant)
              const counts = countMerchantSitesByStatus(merchant)

              return (
                <TR
                  key={merchant.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => onOpenMerchant(merchant.id)}
                >
                  <TD className="font-medium">{merchant.name}</TD>
                  <TD>
                    <LaunchStatusBadge status={status} />
                  </TD>
                  <TD>{merchant.sites.length}</TD>
                  <TD>{counts.ready}</TD>
                  <TD>{counts.in_progress}</TD>
                  <TD>{counts.blocked}</TD>
                </TR>
              )
            })}
          </TBody>
        </Table>
      </TableContainer>

      {filteredMerchants.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
          No merchants match your current filters.
        </div>
      )}
    </section>
  )
}

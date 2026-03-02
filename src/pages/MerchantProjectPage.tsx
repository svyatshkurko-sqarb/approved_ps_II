import { useMemo, useState } from 'react'
import { AddSiteForm } from '../components/AddSiteForm'
import { LaunchStatusBadge } from '../components/StatusBadge'
import { SiteDrawer } from '../components/SiteDrawer'
import { Button } from '../components/ui/button'
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
import { calculateSiteStatus, countPSByStatus, formatDateTime, launchStatusLabel } from '../lib/status'
import type { Merchant, NewSiteInput, PSApprovalStatus, SiteLaunchStatus } from '../types/approval'

type LaunchStatusFilter = SiteLaunchStatus | 'all'
type SiteFilter = string | 'all'

interface MerchantProjectPageProps {
  merchant: Merchant
  onBack: () => void
  onUpdateApprovalStatus: (
    merchantId: string,
    siteId: string,
    approvalId: string,
    marketApprovalId: string,
    status: PSApprovalStatus,
  ) => void
  onAddSite: (merchantId: string, input: NewSiteInput) => void
}

export function MerchantProjectPage({
  merchant,
  onBack,
  onUpdateApprovalStatus,
  onAddSite,
}: MerchantProjectPageProps) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<LaunchStatusFilter>('all')
  const [siteFilter, setSiteFilter] = useState<SiteFilter>('all')
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null)

  const filteredSites = useMemo(() => {
    return merchant.sites.filter((site) => {
      const launchStatus = calculateSiteStatus(site)
      const matchesSearch = site.domain.toLowerCase().includes(search.trim().toLowerCase())
      const matchesStatus = filterStatus === 'all' || launchStatus === filterStatus
      const matchesSite = siteFilter === 'all' || site.id === siteFilter
      return matchesSearch && matchesStatus && matchesSite
    })
  }, [filterStatus, merchant.sites, search, siteFilter])

  const selectedSite = useMemo(
    () => merchant.sites.find((site) => site.id === selectedSiteId) ?? null,
    [merchant.sites, selectedSiteId],
  )

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{merchant.name}</h1>
          <p className="mt-1 text-sm text-slate-600">
            Site-level control view. Launch status is calculated from PS approvals.
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to merchants
        </Button>
      </header>

      <AddSiteForm
        title="Add Site To This Merchant"
        merchantOptions={[{ id: merchant.id, name: merchant.name }]}
        defaultMerchantId={merchant.id}
        showMerchantField={false}
        onAddSite={onAddSite}
      />

      <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[1fr_220px_220px]">
        <div>
          <label htmlFor="site-search" className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
            Search by domain
          </label>
          <Input
            id="site-search"
            placeholder="e.g. checkout.example.com"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="status-filter" className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
            Launch status
          </label>
          <Select
            id="status-filter"
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value as LaunchStatusFilter)}
          >
            <option value="all">All statuses</option>
            <option value="ready">{launchStatusLabel.ready}</option>
            <option value="in_progress">{launchStatusLabel.in_progress}</option>
            <option value="blocked">{launchStatusLabel.blocked}</option>
            <option value="draft">{launchStatusLabel.draft}</option>
          </Select>
        </div>

        <div>
          <label htmlFor="site-filter" className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
            Site filter
          </label>
          <Select
            id="site-filter"
            value={siteFilter}
            onChange={(event) => setSiteFilter(event.target.value as SiteFilter)}
          >
            <option value="all">All sites</option>
            {merchant.sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.domain}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <TableContainer>
        <Table>
          <THead>
            <TR>
              <TH>Site domain</TH>
              <TH>Checkout</TH>
              <TH>Launch status</TH>
              <TH>PS summary</TH>
              <TH>Last updated</TH>
            </TR>
          </THead>
          <TBody>
            {filteredSites.map((site) => {
              const launchStatus = calculateSiteStatus(site)
              const summary = countPSByStatus(site)

              return (
                <TR
                  key={site.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => setSelectedSiteId(site.id)}
                >
                  <TD className="font-medium">{site.domain}</TD>
                  <TD>{site.checkout}</TD>
                  <TD>
                    <LaunchStatusBadge status={launchStatus} />
                  </TD>
                  <TD className="font-medium">
                    <span className="whitespace-nowrap">🟢 {summary.approved}</span>
                    <span className="ml-3 whitespace-nowrap">🟡 {summary.pending}</span>
                    <span className="ml-3 whitespace-nowrap">🔴 {summary.rejected}</span>
                    <span className="ml-3 whitespace-nowrap text-slate-500">⚪ {summary.draft}</span>
                  </TD>
                  <TD>{formatDateTime(site.lastUpdated)}</TD>
                </TR>
              )
            })}
          </TBody>
        </Table>
      </TableContainer>

      {filteredSites.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
          No sites match your current search/filter.
        </div>
      )}

      <SiteDrawer
        open={selectedSite !== null}
        site={selectedSite}
        onClose={() => setSelectedSiteId(null)}
        onUpdateApprovalStatus={(approvalId, marketApprovalId, status) => {
          if (!selectedSite) {
            return
          }
          onUpdateApprovalStatus(merchant.id, selectedSite.id, approvalId, marketApprovalId, status)
        }}
      />
    </section>
  )
}

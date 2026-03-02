import { ApprovalStatusBadge, LaunchStatusBadge } from './StatusBadge'
import { Sheet } from './ui/sheet'
import { Select } from './ui/select'
import { calculatePSApprovalStatus, calculateSiteStatus, formatDateTime } from '../lib/status'
import type { PSApprovalStatus, Site } from '../types/approval'

interface SiteDrawerProps {
  open: boolean
  site: Site | null
  onClose: () => void
  onUpdateApprovalStatus: (
    approvalId: string,
    marketApprovalId: string,
    status: PSApprovalStatus,
  ) => void
}

const statusOptions: PSApprovalStatus[] = ['approved', 'pending', 'rejected', 'draft']

export function SiteDrawer({ open, site, onClose, onUpdateApprovalStatus }: SiteDrawerProps) {
  if (!site) {
    return null
  }

  const launchStatus = calculateSiteStatus(site)

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={site.domain}
      description={`Checkout: ${site.checkout}`}
    >
      <div className="space-y-5">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Launch status</div>
          <div className="mt-2">
            <LaunchStatusBadge status={launchStatus} />
          </div>
        </div>

        <div className="space-y-3">
          {site.psApprovals.map((approval) => {
            const approvalStatus = calculatePSApprovalStatus(approval)

            return (
              <article key={approval.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium text-slate-900">{approval.psName}</h3>
                <ApprovalStatusBadge status={approvalStatus} />
              </div>

              <div className="mt-3 space-y-3">
                {approval.marketApprovals.map((marketApproval) => (
                  <div
                    key={marketApproval.id}
                    className="rounded-md border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-800">
                        {marketApproval.geo} · {marketApproval.currency}
                      </p>
                      <ApprovalStatusBadge status={marketApproval.status} />
                    </div>

                    <dl className="mt-2 grid gap-2 text-sm text-slate-600">
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-slate-500">Submitted</dt>
                        <dd>{formatDateTime(marketApproval.submittedAt)}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-slate-500">Comment</dt>
                        <dd>{marketApproval.comment ?? 'No comment'}</dd>
                      </div>
                    </dl>

                    <div className="mt-3">
                      <label
                        className="mb-1 block text-xs uppercase tracking-wide text-slate-500"
                        htmlFor={marketApproval.id}
                      >
                        Update status
                      </label>
                      <Select
                        id={marketApproval.id}
                        value={marketApproval.status}
                        onChange={(event) =>
                          onUpdateApprovalStatus(
                            approval.id,
                            marketApproval.id,
                            event.target.value as PSApprovalStatus,
                          )
                        }
                      >
                        {statusOptions.map((statusOption) => (
                          <option key={statusOption} value={statusOption}>
                            {statusOption}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </Sheet>
  )
}

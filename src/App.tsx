import { useCallback, useEffect, useMemo, useState } from 'react'
import { mockMerchants } from './data/mockMerchants'
import { MerchantDashboardPage } from './pages/MerchantDashboardPage'
import { MerchantProjectPage } from './pages/MerchantProjectPage'
import type { Merchant, NewSiteInput, PSApprovalStatus } from './types/approval'

type Route = { page: 'dashboard' } | { page: 'merchant'; merchantId: string }

function parseRoute(pathname: string): Route {
  if (pathname === '/' || pathname === '/merchants') {
    return { page: 'dashboard' }
  }

  const match = pathname.match(/^\/merchants\/([^/]+)$/)
  if (match) {
    return { page: 'merchant', merchantId: decodeURIComponent(match[1]) }
  }

  return { page: 'dashboard' }
}

function routeToPath(route: Route): string {
  if (route.page === 'dashboard') {
    return '/merchants'
  }
  return `/merchants/${encodeURIComponent(route.merchantId)}`
}

function makeId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function App() {
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants)
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname))

  useEffect(() => {
    const current = window.location.pathname
    if (current === '/') {
      window.history.replaceState(null, '', '/merchants')
    }
  }, [])

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((nextRoute: Route, replace = false) => {
    const path = routeToPath(nextRoute)
    if (replace) {
      window.history.replaceState(null, '', path)
    } else {
      window.history.pushState(null, '', path)
    }
    setRoute(nextRoute)
  }, [])

  const updateApprovalStatus = useCallback(
    (
      merchantId: string,
      siteId: string,
      approvalId: string,
      marketApprovalId: string,
      status: PSApprovalStatus,
    ) => {
      setMerchants((prev) =>
        prev.map((merchant) => {
          if (merchant.id !== merchantId) {
            return merchant
          }

          return {
            ...merchant,
            sites: merchant.sites.map((site) => {
              if (site.id !== siteId) {
                return site
              }

              return {
                ...site,
                lastUpdated: new Date().toISOString(),
                psApprovals: site.psApprovals.map((approval) =>
                  approval.id === approvalId
                    ? {
                        ...approval,
                        marketApprovals: approval.marketApprovals.map((marketApproval) =>
                          marketApproval.id === marketApprovalId
                            ? { ...marketApproval, status }
                            : marketApproval,
                        ),
                      }
                    : approval,
                ),
              }
            }),
          }
        }),
      )
    },
    [],
  )

  const addSite = useCallback((merchantId: string, input: NewSiteInput) => {
    const now = new Date().toISOString()

    setMerchants((prev) =>
      prev.map((merchant) => {
        if (merchant.id !== merchantId) {
          return merchant
        }

        const groupedByPs = input.approvals.reduce<
          Record<
            string,
            {
              psName: string
              approvals: NewSiteInput['approvals']
            }
          >
        >((acc, approval) => {
          const key = approval.psName.trim().toLowerCase()
          if (!acc[key]) {
            acc[key] = { psName: approval.psName.trim(), approvals: [] }
          }
          acc[key].approvals.push(approval)
          return acc
        }, {})

        const newSite = {
          id: makeId('site'),
          domain: input.domain.trim().toLowerCase(),
          checkout: input.checkout.trim(),
          lastUpdated: now,
          psApprovals: Object.values(groupedByPs).map((group) => ({
            id: makeId('ps'),
            psName: group.psName,
            marketApprovals: group.approvals.map((approval) => ({
              id: makeId('market'),
              geo: approval.geo.trim().toUpperCase(),
              currency: approval.currency.trim().toUpperCase(),
              status: approval.status,
              submittedAt: approval.status === 'draft' ? undefined : now,
              comment: approval.comment?.trim() || undefined,
            })),
          })),
        }

        return {
          ...merchant,
          sites: [newSite, ...merchant.sites],
        }
      }),
    )
  }, [])

  const selectedMerchant = useMemo(() => {
    if (route.page !== 'merchant') {
      return null
    }
    return merchants.find((merchant) => merchant.id === route.merchantId) ?? null
  }, [merchants, route])

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {route.page === 'dashboard' && (
        <MerchantDashboardPage
          merchants={merchants}
          onOpenMerchant={(merchantId) => navigate({ page: 'merchant', merchantId })}
          onAddSite={addSite}
        />
      )}

      {route.page === 'merchant' && selectedMerchant && (
        <MerchantProjectPage
          merchant={selectedMerchant}
          onBack={() => navigate({ page: 'dashboard' })}
          onUpdateApprovalStatus={updateApprovalStatus}
          onAddSite={addSite}
        />
      )}

      {route.page === 'merchant' && !selectedMerchant && (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-2xl font-semibold">Merchant not found</h1>
          <p className="mt-2 text-sm text-slate-600">
            This merchant does not exist in the current mock dataset.
          </p>
          <button
            type="button"
            className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            onClick={() => navigate({ page: 'dashboard' })}
          >
            Back to dashboard
          </button>
        </section>
      )}
    </main>
  )
}

export default App

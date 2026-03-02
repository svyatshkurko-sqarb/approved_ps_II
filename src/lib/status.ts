import type {
  Merchant,
  PSApproval,
  PSApprovalStatus,
  Site,
  SiteLaunchStatus,
} from '../types/approval'

export const approvalStatusLabel: Record<PSApprovalStatus, string> = {
  approved: 'Approved',
  pending: 'Pending',
  rejected: 'Rejected',
  draft: 'Draft',
}

export const launchStatusLabel: Record<SiteLaunchStatus, string> = {
  blocked: 'Blocked',
  in_progress: 'In Progress',
  ready: 'Ready',
  draft: 'Draft',
}

export function calculatePSApprovalStatus(approval: PSApproval): PSApprovalStatus {
  if (approval.marketApprovals.some((marketApproval) => marketApproval.status === 'rejected')) {
    return 'rejected'
  }
  if (approval.marketApprovals.some((marketApproval) => marketApproval.status === 'pending')) {
    return 'pending'
  }
  if (
    approval.marketApprovals.length > 0 &&
    approval.marketApprovals.every((marketApproval) => marketApproval.status === 'approved')
  ) {
    return 'approved'
  }
  return 'draft'
}

export function calculateSiteStatus(site: Site): SiteLaunchStatus {
  const psStatuses = site.psApprovals.map(calculatePSApprovalStatus)
  if (psStatuses.some((status) => status === 'rejected')) {
    return 'blocked'
  }
  if (psStatuses.some((status) => status === 'pending')) {
    return 'in_progress'
  }
  if (psStatuses.length > 0 && psStatuses.every((status) => status === 'approved')) {
    return 'ready'
  }
  return 'draft'
}

export function calculateMerchantStatus(merchant: Merchant): SiteLaunchStatus {
  const siteStatuses = merchant.sites.map(calculateSiteStatus)
  if (siteStatuses.some((status) => status === 'blocked')) {
    return 'blocked'
  }
  if (siteStatuses.some((status) => status === 'in_progress')) {
    return 'in_progress'
  }
  if (siteStatuses.length > 0 && siteStatuses.every((status) => status === 'ready')) {
    return 'ready'
  }
  return 'draft'
}

export function countMerchantSitesByStatus(merchant: Merchant): Record<SiteLaunchStatus, number> {
  return merchant.sites.reduce<Record<SiteLaunchStatus, number>>(
    (acc, site) => {
      const status = calculateSiteStatus(site)
      acc[status] += 1
      return acc
    },
    {
      blocked: 0,
      in_progress: 0,
      ready: 0,
      draft: 0,
    },
  )
}

export function countPSByStatus(site: Site): Record<PSApprovalStatus, number> {
  return site.psApprovals.reduce<Record<PSApprovalStatus, number>>(
    (acc, approval) => {
      const status = calculatePSApprovalStatus(approval)
      acc[status] += 1
      return acc
    },
    {
      approved: 0,
      pending: 0,
      rejected: 0,
      draft: 0,
    },
  )
}

export function formatDateTime(value?: string): string {
  if (!value) {
    return 'Not submitted'
  }
  return new Date(value).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

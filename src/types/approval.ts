export type PSApprovalStatus = 'approved' | 'pending' | 'rejected' | 'draft'
export type SiteLaunchStatus = 'blocked' | 'in_progress' | 'ready' | 'draft'

export interface PSMarketApproval {
  id: string
  geo: string
  currency: string
  status: PSApprovalStatus
  submittedAt?: string
  comment?: string
}

export interface PSApproval {
  id: string
  psName: string
  marketApprovals: PSMarketApproval[]
}

export interface Site {
  id: string
  domain: string
  checkout: string
  psApprovals: PSApproval[]
  lastUpdated: string
}

export interface Merchant {
  id: string
  name: string
  sites: Site[]
}

export interface NewSiteApprovalEntry {
  psName: string
  geo: string
  currency: string
  status: PSApprovalStatus
  comment?: string
}

export interface NewSiteInput {
  domain: string
  checkout: string
  approvals: NewSiteApprovalEntry[]
}

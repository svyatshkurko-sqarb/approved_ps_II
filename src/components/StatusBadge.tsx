import { Badge } from './ui/badge'
import type { PSApprovalStatus, SiteLaunchStatus } from '../types/approval'
import { approvalStatusLabel, launchStatusLabel } from '../lib/status'

function approvalTone(status: PSApprovalStatus): 'green' | 'yellow' | 'red' | 'gray' {
  if (status === 'approved') return 'green'
  if (status === 'pending') return 'yellow'
  if (status === 'rejected') return 'red'
  return 'gray'
}

function launchTone(status: SiteLaunchStatus): 'green' | 'yellow' | 'red' | 'gray' {
  if (status === 'ready') return 'green'
  if (status === 'in_progress') return 'yellow'
  if (status === 'blocked') return 'red'
  return 'gray'
}

interface ApprovalStatusBadgeProps {
  status: PSApprovalStatus
}

interface LaunchStatusBadgeProps {
  status: SiteLaunchStatus
}

export function ApprovalStatusBadge({ status }: ApprovalStatusBadgeProps) {
  return <Badge tone={approvalTone(status)}>{approvalStatusLabel[status]}</Badge>
}

export function LaunchStatusBadge({ status }: LaunchStatusBadgeProps) {
  return <Badge tone={launchTone(status)}>{launchStatusLabel[status]}</Badge>
}

import type { TaskStatus } from './types'

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  pending: 'Pending',
  inProgress: 'In Progress',
  completed: 'Completed',
}

export const TASK_STATUS_COLOR: Record<TaskStatus, string> = {
  pending: '#BDBDBD',
  inProgress: '#F5A623',
  completed: '#2E7D32',
}


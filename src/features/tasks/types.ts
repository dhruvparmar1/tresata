export type TaskStatus = 'pending' | 'inProgress' | 'completed'

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}


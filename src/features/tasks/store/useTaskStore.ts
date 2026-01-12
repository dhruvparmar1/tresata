import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Task, TaskStatus } from '../types'

type NewTaskInput = {
  title: string
  description: string
}

type UpdateTaskInput = Partial<Pick<Task, 'title' | 'description' | 'status'>>

type TaskState = {
  tasks: Task[]
  addTask: (input: NewTaskInput) => string
  updateTask: (id: string, patch: UpdateTaskInput) => void
  deleteTask: (id: string) => void
}

const nowIso = () => new Date().toISOString()

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const createSeedTasks = (): Task[] => {
  const baseDate = new Date()
  const formatDateIso = (d: Date) => d.toISOString()
  const make = (status: TaskStatus, title: string, description: string, daysAgo: number): Task => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() - daysAgo)
    const t = formatDateIso(d)
    return {
      id: createId(),
      title,
      description,
      status,
      createdAt: t,
      updatedAt: t,
    }
  }

  return [
    make(
      'inProgress',
      'Prepare client dashboard demo',
      'Validate KPIs, refresh the dataset, and rehearse the demo flow.',
      2,
    ),
    make(
      'pending',
      'Buy groceries',
      'Milk, eggs, bread, and vegetables.',
      1,
    ),
    make(
      'completed',
      'Plan sprint tasks',
      'Draft the list of tasks for next sprint planning.',
      5,
    ),
  ]
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: createSeedTasks(),
      addTask: ({ title, description }) => {
        const trimmedTitle = title.trim()
        const trimmedDescription = description.trim()
        const id = createId()
        const timestamp = nowIso()
        const next: Task = {
          id,
          title: trimmedTitle,
          description: trimmedDescription,
          status: 'pending',
          createdAt: timestamp,
          updatedAt: timestamp,
        }
        set({ tasks: [next, ...get().tasks] })
        return id
      },
      updateTask: (id, patch) => {
        const timestamp = nowIso()
        set({
          tasks: get().tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...patch,
                  title: patch.title === undefined ? t.title : patch.title.trim(),
                  description:
                    patch.description === undefined ? t.description : patch.description.trim(),
                  updatedAt: timestamp,
                }
              : t,
          ),
        })
      },
      deleteTask: (id) => set({ tasks: get().tasks.filter((t) => t.id !== id) }),
    }),
    {
      name: 'tresata.tasks.v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
)

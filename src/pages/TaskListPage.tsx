import AddIcon from '@mui/icons-material/Add'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Collapse,
  Fab,
  InputAdornment,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import type { ChangeEvent, MouseEvent, SyntheticEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'

import { TaskCard } from '../features/tasks/components/TaskCard'
import { useTaskStore } from '../features/tasks/store/useTaskStore'
import type { Task, TaskStatus } from '../features/tasks/types'

type FilterValue = 'all' | 'incomplete' | 'completed'

const byUpdatedDesc = (a: Task, b: Task) =>
  new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()

const matchesQuery = (task: Task, q: string) => {
  const query = q.trim().toLowerCase()
  if (!query) return true
  return `${task.title} ${task.description}`.toLowerCase().includes(query)
}

const groupByStatus = (tasks: Task[]) => {
  const grouped: Record<TaskStatus, Task[]> = { pending: [], inProgress: [], completed: [] }
  for (const t of tasks) grouped[t.status].push(t)
  grouped.pending.sort(byUpdatedDesc)
  grouped.inProgress.sort(byUpdatedDesc)
  grouped.completed.sort(byUpdatedDesc)
  return grouped
}

export const TaskListPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const tasks = useTaskStore((s) => s.tasks)
  const deleteTask = useTaskStore((s) => s.deleteTask)

  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterValue>('all')
  const [expanded, setExpanded] = useState<Record<TaskStatus, boolean>>({
    inProgress: true,
    pending: false,
    completed: false,
  })

  const highlightTaskId =
    ((location.state ?? null) as { highlightTaskId?: string } | null)?.highlightTaskId ?? null

  const visibleTasks = useMemo(() => {
    const withQuery = tasks.filter((t) => matchesQuery(t, query))
    if (filter === 'completed') return withQuery.filter((t) => t.status === 'completed')
    if (filter === 'incomplete') return withQuery.filter((t) => t.status !== 'completed')
    return withQuery
  }, [filter, query, tasks])

  const grouped = useMemo(() => groupByStatus(visibleTasks), [visibleTasks])

  const sections: Array<{ status: TaskStatus; title: string }> = useMemo(() => {
    const base: Array<{ status: TaskStatus; title: string }> = [
      { status: 'inProgress', title: 'In Progress' },
      { status: 'pending', title: 'Pending' },
      { status: 'completed', title: 'Completed' },
    ]
    if (filter === 'completed') return base.filter((s) => s.status === 'completed')
    if (filter === 'incomplete') return base.filter((s) => s.status !== 'completed')
    return base
  }, [filter])

  const isEmpty = useMemo(
    () => sections.every((s) => grouped[s.status].length === 0),
    [grouped, sections],
  )

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">TO-DO APP</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search To-Do"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#FFFFFF',
                borderRadius: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <ToggleButtonGroup
            exclusive
            value={filter}
            onChange={(_: MouseEvent<HTMLElement>, next: FilterValue | null) => setFilter(next ?? 'all')}
            sx={{ mt: 1.5 }}
            fullWidth
            size="small"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="incomplete">Incomplete</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ px: 2, pb: 10 }}>
          {isEmpty ? (
            <Paper
              variant="outlined"
              sx={{
                mt: 2,
                p: 3,
                borderStyle: 'dashed',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              <ChecklistOutlinedIcon sx={{ fontSize: 40, color: 'text.disabled' }} />
              <Typography variant="h6" sx={{ mt: 1, color: 'text.primary' }}>
                No tasks found
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {query.trim()
                  ? 'Try a different search or clear the filters.'
                  : 'Create your first task to get started.'}
              </Typography>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {query.trim() ? (
                  <Button variant="outlined" onClick={() => setQuery('')}>
                    Clear search
                  </Button>
                ) : null}
                {filter !== 'all' ? (
                  <Button variant="outlined" onClick={() => setFilter('all')}>
                    Clear filter
                  </Button>
                ) : null}
                <Button variant="contained" onClick={() => navigate('/add')}>
                  Add task
                </Button>
              </Box>
            </Paper>
          ) : null}

          {!isEmpty
            ? sections.map(({ status, title }) => {
                const list = grouped[status]
                const isExpanded = expanded[status] || filter !== 'all'
                return (
                  <Accordion
                    key={status}
                    expanded={isExpanded}
                    onChange={(_: SyntheticEvent, next: boolean) =>
                      setExpanded((p) => ({ ...p, [status]: next }))
                    }
                    disableGutters
                    sx={{
                      mb: 1.5,
                      borderRadius: 1,
                      overflow: 'hidden',
                      '&::before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        bgcolor: '#EEF2F6',
                        minHeight: 42,
                        px: 2,
                        '& .MuiAccordionSummary-content': {
                          my: 0,
                          alignItems: 'center',
                        },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {title} ({list.length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0, bgcolor: 'background.paper' }}>
                      <TransitionGroup component={null}>
                        {list.map((task, idx) => (
                          <Collapse key={task.id} timeout={250}>
                            <TaskCard
                              task={task}
                              showDivider={idx !== list.length - 1}
                              onEdit={() => navigate(`/edit/${task.id}`)}
                              onDelete={() => deleteTask(task.id)}
                              highlight={task.id === highlightTaskId}
                            />
                          </Collapse>
                        ))}
                      </TransitionGroup>
                    </AccordionDetails>
                  </Accordion>
                )
              })
            : null}
        </Box>
      </Box>

      <Fab
        color="primary"
        size="large"
        component={Link}
        to="/add"
        sx={{ position: 'fixed', right: 24, bottom: 24, width: 64, height: 64 }}
        aria-label="Add task"
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}

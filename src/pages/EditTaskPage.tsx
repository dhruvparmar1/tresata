import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { TaskForm } from '../features/tasks/components/TaskForm'
import { useTaskStore } from '../features/tasks/store/useTaskStore'

export const EditTaskPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const task = useTaskStore((s) => s.tasks.find((t) => t.id === id))
  const updateTask = useTaskStore((s) => s.updateTask)

  const safeId = useMemo(() => id ?? '', [id])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Back" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Edit Task
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 420, mx: 'auto', pt: 1 }}>
        {task ? (
          <TaskForm
            initialTitle={task.title}
            initialDescription={task.description}
            initialStatus={task.status}
            submitLabel="Update"
            showStatus
            onCancel={() => navigate(-1)}
            onSubmit={({ title, description, status }) => {
              updateTask(safeId, { title, description, status })
              navigate('/', { state: { highlightTaskId: safeId } })
            }}
          />
        ) : (
          <Box sx={{ px: 2, pt: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Task not found.
            </Typography>
            <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/')}>
              Back to list
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

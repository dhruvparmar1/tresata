import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { TaskForm } from '../features/tasks/components/TaskForm'
import { useTaskStore } from '../features/tasks/store/useTaskStore'

export const AddTaskPage = () => {
  const navigate = useNavigate()
  const addTask = useTaskStore((s) => s.addTask)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Back" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Add Task
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 420, mx: 'auto', pt: 1 }}>
        <TaskForm
          submitLabel="ADD"
          showStatus={false}
          onCancel={() => navigate(-1)}
          onSubmit={({ title, description }) => {
            const id = addTask({ title, description })
            navigate('/', { state: { highlightTaskId: id } })
          }}
        />
      </Box>
    </Box>
  )
}

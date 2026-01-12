import DeleteOutline from '@mui/icons-material/DeleteOutline'
import EditOutlined from '@mui/icons-material/EditOutlined'
import { Avatar, Box, Divider, IconButton, Paper, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

import { formatTaskDate } from '../../../shared/format'
import type { Task } from '../types'
import { StatusPill } from './StatusPill'

type Props = {
  task: Task
  onEdit: () => void
  onDelete: () => void
  showDivider: boolean
  highlight?: boolean
}

export const TaskCard = ({ task, onEdit, onDelete, showDivider, highlight = false }: Props) => {
  const initials = task.title.trim().slice(0, 1).toUpperCase() || 'T'

  return (
    <>
      <Paper
        variant="outlined"
        sx={(theme) => ({
          border: 'none',
          px: 2,
          py: 2,
          borderRadius: 0,
          bgcolor: 'transparent',
          '&:hover .taskActions': { opacity: 1, pointerEvents: 'auto' },
          '&:focus-within .taskActions': { opacity: 1, pointerEvents: 'auto' },
          '@media (hover: none) and (pointer: coarse)': {
            '& .taskActions': { opacity: 1, pointerEvents: 'auto' },
          },
          animation: highlight ? 'taskFlash 900ms ease-out' : 'none',
          '@keyframes taskFlash': {
            '0%': { backgroundColor: alpha(theme.palette.primary.main, 0.18) },
            '100%': { backgroundColor: 'transparent' },
          },
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Avatar
            sx={{
              width: 42,
              height: 42,
              bgcolor: 'transparent',
              color: 'primary.main',
              border: '1.5px solid',
              borderColor: 'primary.main',
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: task.status === 'completed' ? 'text.secondary' : 'primary.main',
                  lineHeight: 1.2,
                  wordBreak: 'break-word',
                  flex: 1,
                  textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                }}
              >
                {task.title}
              </Typography>
              <StatusPill status={task.status} />
            </Box>

            {task.description ? (
              <Typography
                variant="body2"
                sx={{ mt: 0.75, color: 'text.secondary', wordBreak: 'break-word' }}
              >
                {task.description}
              </Typography>
            ) : null}

            <Box
              sx={{
                mt: 0.75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {formatTaskDate(task.updatedAt || task.createdAt)}
              </Typography>

              <Box
                className="taskActions"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'opacity 150ms ease',
                }}
              >
                <IconButton
                  aria-label="Edit task"
                  size="small"
                  sx={{ color: 'primary.main' }}
                  onClick={() => {
                    onEdit()
                  }}
                >
                  <EditOutlined fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="Delete task"
                  size="small"
                  sx={{ color: 'error.main' }}
                  onClick={() => {
                    onDelete()
                  }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
      {showDivider ? <Divider /> : null}
    </>
  )
}

import { Box, Typography } from '@mui/material'

import { TASK_STATUS_COLOR, TASK_STATUS_LABEL } from '../taskStatus'
import type { TaskStatus } from '../types'

export const StatusPill = ({ status }: { status: TaskStatus }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          bgcolor: TASK_STATUS_COLOR[status],
        }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {TASK_STATUS_LABEL[status]}
      </Typography>
    </Box>
  )
}


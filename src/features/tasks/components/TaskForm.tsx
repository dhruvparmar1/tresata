import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'

import { TASK_STATUS_COLOR, TASK_STATUS_LABEL } from '../taskStatus'
import type { TaskStatus } from '../types'

type Props = {
  initialTitle?: string
  initialDescription?: string
  initialStatus?: TaskStatus
  submitLabel: string
  showStatus: boolean
  onCancel: () => void
  onSubmit: (values: { title: string; description: string; status?: TaskStatus }) => void
}

export const TaskForm = ({
  initialTitle = '',
  initialDescription = '',
  initialStatus,
  submitLabel,
  showStatus,
  onCancel,
  onSubmit,
}: Props) => {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [status, setStatus] = useState<TaskStatus>(initialStatus ?? 'pending')

  const canSubmit = useMemo(() => title.trim().length > 0, [title])

  return (
    <Box sx={{ px: 2, pt: 2.5 }}>
      <TextField
        fullWidth
        placeholder="Enter the title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        size="small"
      />

      <TextField
        fullWidth
        placeholder="Enter the description"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        multiline
        minRows={3}
        sx={{ mt: 2 }}
        size="small"
      />

      {showStatus ? (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Select
            value={status}
            onChange={(e: SelectChangeEvent) => setStatus(e.target.value as TaskStatus)}
            displayEmpty
            size="small"
            sx={{
              '& .MuiSelect-select': { display: 'flex', alignItems: 'center' },
            }}
            renderValue={(v: unknown) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: TASK_STATUS_COLOR[v as TaskStatus],
                  }}
                />
                <Typography variant="body2">{TASK_STATUS_LABEL[v as TaskStatus]}</Typography>
              </Box>
            )}
          >
            {(['pending', 'inProgress', 'completed'] as const).map((s) => (
              <MenuItem key={s} value={s}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: TASK_STATUS_COLOR[s],
                    }}
                  />
                  <Typography variant="body2">{TASK_STATUS_LABEL[s]}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}

      <Box sx={{ mt: 7, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            minWidth: 140,
            height: 44,
            borderWidth: 2,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!canSubmit}
          onClick={() => onSubmit({ title, description, status: showStatus ? status : undefined })}
          sx={{
            minWidth: 140,
            height: 44,
            px: 3,
            boxShadow: 3,
          }}
        >
          {submitLabel}
        </Button>
      </Box>
    </Box>
  )
}

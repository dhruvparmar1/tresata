import { CssBaseline, ThemeProvider } from '@mui/material'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { theme } from './app/theme'
import { AddTaskPage } from './pages/AddTaskPage'
import { EditTaskPage } from './pages/EditTaskPage'
import { TaskListPage } from './pages/TaskListPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/add" element={<AddTaskPage />} />
          <Route path="/edit/:id" element={<EditTaskPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App

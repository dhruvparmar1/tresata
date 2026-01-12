import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0B4C98' },
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: '"Jost", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    h6: { fontWeight: 700, letterSpacing: 0.4 },
    subtitle1: { fontWeight: 700 },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: { minHeight: 56 },
      },
    },
  },
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@shared/config/i18n/i18n'
import { ThemeProvider } from '@app/providers/theme-provider'
import { QueryProvider } from '@app/providers/query-provider'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)

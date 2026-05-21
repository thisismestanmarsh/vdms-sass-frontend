import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import '@shared/config/i18n/i18n';
import { ThemeProvider } from '@app/providers/theme-provider';
import { QueryProvider } from '@app/providers/query-provider';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <QueryProvider>
        <ThemeProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <App />
        </ThemeProvider>
      </QueryProvider>
    </HashRouter>
  </StrictMode>
);

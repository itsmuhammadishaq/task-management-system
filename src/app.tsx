/* eslint-disable import/no-extraneous-dependencies */
import 'src/global.css';

// ----------------------------------------------------------------------

import { SnackbarProvider } from 'notistack';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';
// eslint-disable-next-line perfectionist/sort-imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ----------------------------------------------------------------------

export default function App() {
  const queryClient = new QueryClient();

  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <SettingsProvider settings={defaultSettings}>
              <ThemeProvider>
                <MotionLazy>
                  <ProgressBar />
                  <SettingsDrawer />
                  <Router />
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </AuthProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

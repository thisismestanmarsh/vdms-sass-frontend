import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, MenuItem, Select, FormControl } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@shared/config/i18n/languages';
import { useUserStore } from '@entities/user/model/userStore';
import { LoginPage } from '@pages/login-page/ui/LoginPage/LoginPage';
import { HomePage } from '@pages/home-page';

function App() {
  const { i18n } = useTranslation();
  const { authData } = useUserStore();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const LanguageSelector = (
    <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 100 }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={i18n.resolvedLanguage || i18n.language}
          onChange={handleLanguageChange}
          displayEmpty
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <>
      {LanguageSelector}
      <Routes>
        <Route
          path="/login"
          element={!authData ? <LoginPage /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/home"
          element={authData ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={<Navigate to={authData ? "/home" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;

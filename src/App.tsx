import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from '@entities/user/model/userStore';
import { LoginPage } from '@pages/login-page/ui/LoginPage/LoginPage';
import { HomePage } from '@pages/home-page';
import { ProfilePage } from '@pages/profile-page';
import { HubPage } from '@pages/hub-page';
import { MainLayout } from '@app/providers/layout';

function App() {
  const { authData } = useUserStore();

  return (
    <Routes>
      <Route
        path="/login"
        element={!authData ? <LoginPage /> : <Navigate to="/home" replace />}
      />

      <Route element={authData ? <MainLayout /> : <Navigate to="/login" replace />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/hubs" element={<HubPage />} />
      </Route>

      <Route
        path="/"
        element={<Navigate to={authData ? "/home" : "/login"} replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

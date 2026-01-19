import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from '@entities/user/model/userStore';
import { LoginPage } from '@pages/login-page/ui/LoginPage/LoginPage';
import { HomePage } from '@pages/home-page';
import { ProfilePage } from '@pages/profile-page';
import { HubPage, HubDetailPage, CreateHubPage, CreateZonePage, ZoneDetailPage } from '@pages/hub-page';
import { MainLayout } from '@app/providers/layout';
import { ROUTES } from '@shared/config/routes';

function App() {
  const { authData } = useUserStore();

  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={!authData ? <LoginPage /> : <Navigate to={ROUTES.HOME} replace />} />

      <Route element={authData ? <MainLayout /> : <Navigate to={ROUTES.LOGIN} replace />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.HUBS} element={<HubPage />} />
        <Route path={ROUTES.HUB_DETAILS} element={<HubDetailPage />} />
        <Route path={ROUTES.HUB_CREATE} element={<CreateHubPage />} />
        <Route path={ROUTES.HUB_EDIT} element={<CreateHubPage />} />
        <Route path={ROUTES.ZONE_CREATE} element={<CreateZonePage />} />
        <Route path={ROUTES.ZONE_DETAILS} element={<ZoneDetailPage />} />
        <Route path={ROUTES.ZONE_EDIT} element={<CreateZonePage />} />
      </Route>

      <Route path="/" element={<Navigate to={authData ? ROUTES.HOME : ROUTES.LOGIN} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

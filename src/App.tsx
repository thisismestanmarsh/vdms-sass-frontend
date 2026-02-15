import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from '@entities/user/model/userStore';
import { LoginPage } from '@pages/login-page/ui/LoginPage/LoginPage';
import { HomePage } from '@pages/home-page';
import { ProfilePage } from '@pages/profile-page';
import {
  HubPage,
  HubDetailPage,
  CreateHubPage,
  CreateZonePage,
  ZoneDetailPage,
} from '@pages/hub-page';
import {
  PermissionsPage,
  CreatePermissionPage,
  EditPermissionPage,
  PermissionDetailPage,
} from '@pages/permissions-page';
import { RolesPage, RoleDetailPage } from '@pages/roles-page';
import { UsersPage } from '@pages/users-page';
import { VehicleListPage, CreateVehiclePage, VehicleDetailPage } from '@pages/vehicle-page';
import {
  DriversPage,
  CreateDriverPage,
  EditDriverPage,
  DriverDetailPage,
} from '@pages/driver-page';
import {
  WorkshopsPage,
  CreateWorkshopPage,
  EditWorkshopPage,
  WorkshopDetailPage,
} from '@pages/workshop-page';
import { IssuesPage, CreateIssuePage } from '@pages/issues-page';
import { MainLayout } from '@app/providers/layout';
import { ROUTES } from '@shared/config/routes';

function App() {
  const { authData } = useUserStore();

  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={!authData ? <LoginPage /> : <Navigate to={ROUTES.HOME} replace />}
      />

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

        {/* Access Management Routes */}
        <Route path={ROUTES.PERMISSIONS} element={<PermissionsPage />} />
        <Route path={ROUTES.PERMISSION_CREATE} element={<CreatePermissionPage />} />
        <Route path={ROUTES.PERMISSION_EDIT} element={<EditPermissionPage />} />
        <Route path={ROUTES.PERMISSION_DETAILS} element={<PermissionDetailPage />} />
        <Route path={ROUTES.ROLES} element={<RolesPage />} />
        <Route path={ROUTES.ROLE_DETAILS} element={<RoleDetailPage />} />
        <Route path={ROUTES.USERS} element={<UsersPage />} />
        <Route path={ROUTES.VEHICLES} element={<VehicleListPage />} />
        <Route path={ROUTES.VEHICLE_CREATE} element={<CreateVehiclePage />} />
        <Route path={ROUTES.VEHICLE_EDIT} element={<CreateVehiclePage />} />
        <Route path={ROUTES.VEHICLE_DETAILS} element={<VehicleDetailPage />} />
        <Route path={ROUTES.DRIVERS} element={<DriversPage />} />
        <Route path={ROUTES.DRIVER_CREATE} element={<CreateDriverPage />} />
        <Route path={ROUTES.DRIVER_EDIT} element={<EditDriverPage />} />
        <Route path={ROUTES.DRIVER_DETAILS} element={<DriverDetailPage />} />
        <Route path={ROUTES.WORKSHOPS} element={<WorkshopsPage />} />
        <Route path={ROUTES.WORKSHOP_CREATE} element={<CreateWorkshopPage />} />
        <Route path={ROUTES.WORKSHOP_EDIT} element={<EditWorkshopPage />} />
        <Route path={ROUTES.WORKSHOP_DETAILS} element={<WorkshopDetailPage />} />
        <Route path={ROUTES.ISSUES} element={<IssuesPage />} />
        <Route path={ROUTES.ISSUE_CREATE} element={<CreateIssuePage />} />
        <Route path={ROUTES.ISSUE_EDIT} element={<CreateIssuePage />} />
      </Route>

      <Route path="/" element={<Navigate to={authData ? ROUTES.HOME : ROUTES.LOGIN} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

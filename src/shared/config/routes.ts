export const ROUTES = {
    LOGIN: '/login',
    HOME: '/home',
    PROFILE: '/profile',
    HUBS: '/hubs',
    HUB_DETAILS: '/zones/:zoneId/hubs/:hubId',
    HUB_CREATE: '/hubs/create',
    HUB_EDIT: '/zones/:zoneId/hubs/:hubId/edit',
    ZONE_DETAILS: '/zones/:id',
    ZONE_CREATE: '/zones/create',
    ZONE_EDIT: '/zones/:id/edit',
    PERMISSIONS: '/access/permissions',
    PERMISSION_CREATE: '/access/permissions/create',
    PERMISSION_EDIT: '/access/permissions/:id/edit',
    PERMISSION_DETAILS: '/access/permissions/:id',
    ROLES: '/access/roles',
    ROLE_DETAILS: '/access/roles/:id',
    USERS: '/access/users',
} as const;

export const getHubDetailsPath = (zoneId: string | number, hubId: string | number) =>
    ROUTES.HUB_DETAILS.replace(':zoneId', zoneId.toString()).replace(':hubId', hubId.toString());
export const getHubEditPath = (zoneId: string | number, hubId: string | number) =>
    ROUTES.HUB_EDIT.replace(':zoneId', zoneId.toString()).replace(':hubId', hubId.toString());
export const getHubCreatePath = (zoneId?: string | number) =>
    zoneId ? `${ROUTES.HUB_CREATE}?zoneId=${zoneId}` : ROUTES.HUB_CREATE;
export const getZoneDetailsPath = (id: string | number) => ROUTES.ZONE_DETAILS.replace(':id', id.toString());
export const getZoneEditPath = (id: string | number) => ROUTES.ZONE_EDIT.replace(':id', id.toString());
export const getPermissionDetailsPath = (id: string | number) => ROUTES.PERMISSION_DETAILS.replace(':id', id.toString());
export const getPermissionEditPath = (id: string | number) => ROUTES.PERMISSION_EDIT.replace(':id', id.toString());
export const getRoleDetailsPath = (id: string | number) => ROUTES.ROLE_DETAILS.replace(':id', id.toString());

export const getHubsTabPath = (tab: 'hubs' | 'zones' = 'hubs') => `${ROUTES.HUBS}?tab=${tab}`;

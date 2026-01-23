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
} as const;

export const getHubDetailsPath = (zoneId: string | number, hubId: string | number) =>
    ROUTES.HUB_DETAILS.replace(':zoneId', zoneId.toString()).replace(':hubId', hubId.toString());
export const getHubEditPath = (zoneId: string | number, hubId: string | number) =>
    ROUTES.HUB_EDIT.replace(':zoneId', zoneId.toString()).replace(':hubId', hubId.toString());
export const getHubCreatePath = (zoneId?: string | number) =>
    zoneId ? `${ROUTES.HUB_CREATE}?zoneId=${zoneId}` : ROUTES.HUB_CREATE;
export const getZoneDetailsPath = (id: string | number) => ROUTES.ZONE_DETAILS.replace(':id', id.toString());
export const getZoneEditPath = (id: string | number) => ROUTES.ZONE_EDIT.replace(':id', id.toString());

export const getHubsTabPath = (tab: 'hubs' | 'zones' = 'hubs') => `${ROUTES.HUBS}?tab=${tab}`;

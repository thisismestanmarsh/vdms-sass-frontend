export const ROUTES = {
    LOGIN: '/login',
    HOME: '/home',
    PROFILE: '/profile',
    HUBS: '/hubs',
    HUB_DETAILS: '/hubs/:id',
    HUB_CREATE: '/hubs/create',
    HUB_EDIT: '/hubs/:id/edit',
    ZONE_DETAILS: '/zones/:id',
    ZONE_CREATE: '/zones/create',
    ZONE_EDIT: '/zones/:id/edit',
} as const;

export const getHubDetailsPath = (id: string) => ROUTES.HUB_DETAILS.replace(':id', id);
export const getHubEditPath = (id: string) => ROUTES.HUB_EDIT.replace(':id', id);
export const getZoneDetailsPath = (id: string) => ROUTES.ZONE_DETAILS.replace(':id', id);
export const getZoneEditPath = (id: string) => ROUTES.ZONE_EDIT.replace(':id', id);

export const getHubsTabPath = (tab: 'hubs' | 'zones' = 'hubs') => `${ROUTES.HUBS}?tab=${tab}`;

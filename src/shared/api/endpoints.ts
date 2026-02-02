export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/company/auth/login',
    LOGOUT: '/company/auth/logout',
  },
  COMPANY: {
    ZONES: '/company/zones',
    ZONES_FLATTENED: '/company/zones/flattened',
    HUBS: '/company/zones/:zoneId/hubs',
    PERMISSIONS: '/company/permissions',
    ROLES: '/company/roles',
    USERS: '/company/users',
    DRIVERS: '/company/drivers',
    VEHICLES: '/company/vehicles',
  },
} as const;

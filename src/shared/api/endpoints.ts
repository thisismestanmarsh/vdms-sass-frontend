export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/company/auth/login',
    LOGOUT: '/company/auth/logout',
  },
  COMPANY: {
    ZONES: '/company/zones',
    HUBS: '/company/zones/:zoneId/hubs',
    PERMISSIONS: '/company/permissions',
    ROLES: '/company/roles',
    USERS: '/company/users',
    DRIVERS: '/company/drivers',
    VEHICLES: '/company/vehicles',
  },
} as const;

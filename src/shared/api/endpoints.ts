export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/company/auth/login',
        LOGOUT: '/company/auth/logout',
    },
    COMPANY: {
        ZONES: '/company/zones',
        HUBS: '/company/zones/:zoneId/hubs',
    },
} as const;

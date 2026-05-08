import type { Role } from '@entities/role/model/types';

export const MOCK_ROLES: Role[] = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to the system',
  },
  {
    id: 2,
    name: 'Hub Manager',
    description: 'Manage specific hub operations',
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Read-only access to most modules',
  },
];

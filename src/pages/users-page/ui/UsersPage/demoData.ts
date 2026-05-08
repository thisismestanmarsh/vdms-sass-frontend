import type { User } from '@entities/user/model/types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '9876500001',
    roles: ['Super Admin'],
    tenant_id: 't1',
    is_active: true,
    hub_list: [1, 2],
    zone_ids: [101],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '2',
    name: 'Hub Manager One',
    email: 'manager1@example.com',
    phone: '9876500002',
    roles: ['Hub Manager'],
    tenant_id: 't1',
    is_active: true,
    hub_list: [1],
    zone_ids: [101],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
];

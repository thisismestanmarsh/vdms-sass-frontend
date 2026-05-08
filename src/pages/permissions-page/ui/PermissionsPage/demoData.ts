import type { Permission } from '@entities/permission/model/types';

export const MOCK_PERMISSIONS: Permission[] = [
  {
    id: 1,
    name: 'View Drivers',
    module: 'Drivers',
    resource: 'driver',
    action: 'view',
    scope: 'all',
    description: 'Allows viewing all drivers',
  },
  {
    id: 2,
    name: 'Edit Drivers',
    module: 'Drivers',
    resource: 'driver',
    action: 'edit',
    scope: 'all',
    description: 'Allows editing all drivers',
  },
  {
    id: 3,
    name: 'Delete Drivers',
    module: 'Drivers',
    resource: 'driver',
    action: 'delete',
    scope: 'all',
    description: 'Allows deleting all drivers',
  },
];

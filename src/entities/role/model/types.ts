import type { Permission } from '@entities/permission/model/types';

export interface Role {
    id: number;
    name: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}

export interface RoleDetail extends Role {
    permissions: Permission[];
}

export interface CreateRolePermissionRequest {
    action: string;
    permissionId: string | number;
    scope: string;
}

export interface CreateRoleRequest {
    name: string;
    description: string;
    permissions: CreateRolePermissionRequest[];
}

export interface RoleRequest {
    name: string;
    description: string;
    permission_ids: number[];
}

export interface RoleListResponse {
    data: Role[];
    message?: string;
    status?: string;
}

export interface RoleDetailResponse {
    data: RoleDetail;
    message?: string;
    status?: string;
}

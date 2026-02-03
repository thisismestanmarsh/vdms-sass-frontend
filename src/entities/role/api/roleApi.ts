import { api } from '@shared/api/apiClient';
import { ENDPOINTS } from '@shared/api/endpoints';
import type { RoleListResponse, RoleDetailResponse, CreateRoleRequest } from '../model/types';

export const roleApi = {
    getRoles: () => api.get<RoleListResponse>(ENDPOINTS.COMPANY.ROLES),

    getRoleById: (id: number | string) =>
        api.get<RoleDetailResponse>(`${ENDPOINTS.COMPANY.ROLES}/${id}`),

    deleteRole: (id: number | string) =>
        api.delete(`${ENDPOINTS.COMPANY.ROLES}/${id}`),

    createRole: (data: CreateRoleRequest) =>
        api.post(ENDPOINTS.COMPANY.ROLES, data),
};

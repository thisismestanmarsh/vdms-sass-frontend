import { api } from '@shared/api/apiClient';
import { ENDPOINTS } from '@shared/api/endpoints';
import type { Permission, PermissionRequest, ApiResponse } from '../model/types';

export const permissionApi = {
  getPermissions: (limit = 50, offset = 0) =>
    api.get<ApiResponse<Permission[]>>(
      `${ENDPOINTS.COMPANY.PERMISSIONS}?limit=${limit}&offset=${offset}`
    ),

  getPermissionById: (id: string | number) =>
    api.get<ApiResponse<Permission>>(`${ENDPOINTS.COMPANY.PERMISSIONS}/${id}`),

  createPermission: (data: PermissionRequest) =>
    api.post<ApiResponse<Permission>>(ENDPOINTS.COMPANY.PERMISSIONS, data),

  updatePermission: (id: string | number, data: PermissionRequest) =>
    api.put<ApiResponse<Permission>>(`${ENDPOINTS.COMPANY.PERMISSIONS}/${id}`, data),

  deletePermission: (id: string | number) =>
    api.delete<ApiResponse<void>>(`${ENDPOINTS.COMPANY.PERMISSIONS}/${id}`),
};

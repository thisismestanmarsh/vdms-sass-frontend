import { api } from '@shared/api/apiClient';
import { ENDPOINTS } from '@shared/api/endpoints';
import type { ApiResponse } from '@entities/zone/model/types';
import type { User, UserRequest, UpdateUserRequest } from '../model/types';

export const userApi = {
    getUsers: (params: { limit: number; offset: number }) =>
        api.get<ApiResponse<User[]>>(ENDPOINTS.COMPANY.USERS, { params }),

    getUserById: (id: string | number) =>
        api.get<ApiResponse<User>>(`${ENDPOINTS.COMPANY.USERS}/${id}`),

    createUser: (data: UserRequest) =>
        api.post<ApiResponse<User>>(ENDPOINTS.COMPANY.USERS, data),

    updateUser: (id: string | number, data: UpdateUserRequest) =>
        api.put<ApiResponse<User>>(`${ENDPOINTS.COMPANY.USERS}/${id}`, data),

    deleteUser: (id: string | number) =>
        api.delete<ApiResponse<void>>(`${ENDPOINTS.COMPANY.USERS}/${id}`),
};

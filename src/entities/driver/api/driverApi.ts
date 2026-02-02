import { api } from '@shared/api/apiClient';
import { ENDPOINTS } from '@shared/api/endpoints';
import type { ApiResponse } from '@entities/zone/model/types';
import type { Driver, DriverCreateRequest, DriverUpdateRequest } from '../model/types';

export const driverApi = {
  getDrivers: (params?: { limit?: number; offset?: number; search?: string }) =>
    api.get<ApiResponse<Driver[]>>(ENDPOINTS.COMPANY.DRIVERS, { params }),

  getDriverById: (id: string | number) =>
    api.get<ApiResponse<Driver>>(`${ENDPOINTS.COMPANY.DRIVERS}/${id}`),

  createDriver: (data: DriverCreateRequest) =>
    api.post<ApiResponse<Driver>>(ENDPOINTS.COMPANY.DRIVERS, data),

  updateDriver: (id: string | number, data: DriverUpdateRequest) =>
    api.put<ApiResponse<Driver>>(`${ENDPOINTS.COMPANY.DRIVERS}/${id}`, data),

  deleteDriver: (id: string | number) =>
    api.delete<ApiResponse<void>>(`${ENDPOINTS.COMPANY.DRIVERS}/${id}`),
};

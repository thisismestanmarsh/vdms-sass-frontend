import { api } from '@shared/api/apiClient';
import { ENDPOINTS } from '@shared/api/endpoints';
import type { Vehicle, VehicleRequest, ApiResponse } from '../model/types';

export const vehicleApi = {
  getVehicles: (page = 1, limit = 50) =>
    api.get<ApiResponse<Vehicle[]>>(`${ENDPOINTS.COMPANY.VEHICLES}?page=${page}&limit=${limit}`, {
      headers: {
        'Accept-Language': 'en',
        'Accept-Country': 'IN',
      },
    }),

  createVehicle: (data: VehicleRequest) =>
    api.post<ApiResponse<Vehicle>>(ENDPOINTS.COMPANY.VEHICLES, data, {
      headers: {
        'Accept-Language': 'en',
        'Accept-Country': 'IN',
      },
    }),

  getVehicleById: (id: string | number) =>
    api.get<ApiResponse<Vehicle>>(`${ENDPOINTS.COMPANY.VEHICLES}/${id}`, {
      headers: {
        'Accept-Language': 'en',
        'Accept-Country': 'IN',
      },
    }),

  updateVehicle: (id: string | number, data: VehicleRequest) =>
    api.put<ApiResponse<Vehicle>>(`${ENDPOINTS.COMPANY.VEHICLES}/${id}`, data, {
      headers: {
        'Accept-Language': 'en',
        'Accept-Country': 'IN',
      },
    }),
};

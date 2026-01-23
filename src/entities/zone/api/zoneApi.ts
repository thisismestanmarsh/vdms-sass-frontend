import { api } from '@shared/api/apiClient';
import { ENDPOINTS } from '@shared/api/endpoints';
import type { Zone, ZoneRequest, ApiResponse, Hub, HubRequest } from '../model/types';

export const zoneApi = {
    getZones: () => api.get<ApiResponse<Zone[]>>(ENDPOINTS.COMPANY.ZONES),

    getZoneById: (id: string | number) => api.get<ApiResponse<Zone>>(`${ENDPOINTS.COMPANY.ZONES}/${id}`),

    createZone: (data: ZoneRequest) => api.post<ApiResponse<Zone>>(ENDPOINTS.COMPANY.ZONES, data),

    updateZone: (id: string | number, data: ZoneRequest) =>
        api.put<ApiResponse<Zone>>(`${ENDPOINTS.COMPANY.ZONES}/${id}`, data),

    getHubById: (zoneId: string | number, hubId: string | number) =>
        api.get<ApiResponse<Hub>>(`${ENDPOINTS.COMPANY.ZONES}/${zoneId}/hubs/${hubId}`),

    createHub: (zoneId: string | number, data: HubRequest) =>
        api.post<ApiResponse<Hub>>(`${ENDPOINTS.COMPANY.ZONES}/${zoneId}/hubs`, data),

    updateHub: (zoneId: string | number, hubId: string | number, data: HubRequest) =>
        api.put<ApiResponse<Hub>>(`${ENDPOINTS.COMPANY.ZONES}/${zoneId}/hubs/${hubId}`, data),
};

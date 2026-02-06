import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@shared/api/apiClient';
import { ENDPOINTS } from '@shared/api/endpoints';
import type {
  Workshop,
  WorkshopPayload,
  WorkshopResponse,
  WorkshopDetailResponse,
} from '../model/types';

export const workshopApi = {
  getWorkshops: async (page = 1, limit = 10) => {
    return api.get<WorkshopResponse>(`${ENDPOINTS.COMPANY.WORKSHOPS}?page=${page}&limit=${limit}`);
  },

  createWorkshop: async (data: WorkshopPayload) => {
    return api.post<Workshop>(ENDPOINTS.COMPANY.WORKSHOPS, data);
  },

  updateWorkshop: async (workshopId: string, data: Partial<WorkshopPayload>) => {
    return api.put<Workshop>(`${ENDPOINTS.COMPANY.WORKSHOPS}/${workshopId}`, data);
  },

  deleteWorkshop: async (workshopId: string) => {
    return api.delete(`${ENDPOINTS.COMPANY.WORKSHOPS}/${workshopId}`);
  },

  getWorkshopById: async (workshopId: string) => {
    return api.get<WorkshopDetailResponse>(`${ENDPOINTS.COMPANY.WORKSHOPS}/${workshopId}`);
  },
};

export const useWorkshops = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['workshops', page, limit],
    queryFn: () => workshopApi.getWorkshops(page, limit),
  });
};

export const useWorkshop = (workshopId: string) => {
  return useQuery({
    queryKey: ['workshop', workshopId],
    queryFn: () => workshopApi.getWorkshopById(workshopId),
    enabled: !!workshopId,
  });
};

export const useCreateWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: workshopApi.createWorkshop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workshops'] });
    },
  });
};

export const useUpdateWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ workshopId, data }: { workshopId: string; data: Partial<WorkshopPayload> }) =>
      workshopApi.updateWorkshop(workshopId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workshops'] });
      queryClient.invalidateQueries({ queryKey: ['workshop', variables.workshopId] });
    },
  });
};

export const useDeleteWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: workshopApi.deleteWorkshop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workshops'] });
    },
  });
};

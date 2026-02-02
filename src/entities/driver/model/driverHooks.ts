import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driverApi } from '../api/driverApi';
import type { DriverCreateRequest, DriverUpdateRequest } from './types';

export const useDrivers = (params?: { limit?: number; offset?: number; search?: string }) => {
  return useQuery({
    queryKey: ['drivers', params],
    queryFn: () => driverApi.getDrivers(params),
  });
};

export const useDriver = (id: string | number) => {
  return useQuery({
    queryKey: ['driver', id],
    queryFn: () => driverApi.getDriverById(id),
    enabled: !!id,
  });
};

export const useCreateDriver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DriverCreateRequest) => driverApi.createDriver(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
  });
};

export const useUpdateDriver = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DriverUpdateRequest) => driverApi.updateDriver(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['driver', id] });
    },
  });
};

export const useDeleteDriver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => driverApi.deleteDriver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
  });
};

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { vehicleApi } from '../api/vehicleApi';
import type { VehicleRequest } from './types';

export const useVehicles = (page = 1, limit = 50) => {
  return useQuery({
    queryKey: ['vehicles', page, limit],
    queryFn: () => vehicleApi.getVehicles(page, limit),
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VehicleRequest) => vehicleApi.createVehicle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
};

export const useVehicle = (id?: string | number) => {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleApi.getVehicleById(id!),
    enabled: !!id,
  });
};
export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: VehicleRequest }) =>
      vehicleApi.updateVehicle(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['vehicle', variables.id] });
    },
  });
};

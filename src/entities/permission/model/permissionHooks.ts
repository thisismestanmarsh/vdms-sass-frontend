import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { permissionApi } from '../api/permissionApi';
import type { PermissionRequest } from './types';

export const usePermissions = (limit = 50, offset = 0) => {
    return useQuery({
        queryKey: ['permissions', limit, offset],
        queryFn: () => permissionApi.getPermissions(limit, offset),
    });
};

export const usePermission = (id: string | number) => {
    return useQuery({
        queryKey: ['permission', id],
        queryFn: () => permissionApi.getPermissionById(id),
        enabled: !!id,
    });
};

export const useCreatePermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PermissionRequest) => permissionApi.createPermission(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });
};

export const useUpdatePermission = (id: string | number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PermissionRequest) => permissionApi.updatePermission(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            queryClient.invalidateQueries({ queryKey: ['permission', id] });
        },
    });
};

export const useDeletePermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => permissionApi.deletePermission(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });
};

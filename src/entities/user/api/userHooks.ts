import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from './userApi';
import type { UserRequest, UpdateUserRequest } from '../model/types';

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (params: { limit: number; offset: number }) => [...userKeys.lists(), params] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: string | number) => [...userKeys.details(), id] as const,
};

export const useUsers = (params: { limit: number; offset: number }) => {
    return useQuery({
        queryKey: userKeys.list(params),
        queryFn: () => userApi.getUsers(params),
    });
};

export const useUser = (id: string | number) => {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => userApi.getUserById(id),
        enabled: !!id,
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UserRequest) => userApi.createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
};

export const useUpdateUser = (id: string | number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateUserRequest) => userApi.updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
            queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => userApi.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
};

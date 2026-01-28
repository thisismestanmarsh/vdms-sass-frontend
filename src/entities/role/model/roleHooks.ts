import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roleApi } from '../api/roleApi';

export const useRoles = () => {
    return useQuery({
        queryKey: ['roles'],
        queryFn: () => roleApi.getRoles(),
    });
};

export const useRole = (id: string | number) => {
    return useQuery({
        queryKey: ['role', id],
        queryFn: () => roleApi.getRoleById(id),
        enabled: !!id,
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => roleApi.deleteRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
        },
    });
};

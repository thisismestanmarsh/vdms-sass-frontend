import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { issueApi } from '../api/issueApi';
import type { CreateIssuePayload } from './types';

export const useIssues = () => {
    return useQuery({
        queryKey: ['issues'],
        queryFn: issueApi.getIssues,
    });
};

export const useIssue = (id: string) => {
    return useQuery({
        queryKey: ['issues', id],
        queryFn: () => issueApi.getIssueById(id),
        enabled: !!id,
    });
};

export const useCreateIssue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateIssuePayload) => issueApi.createIssue(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
        },
    });
};

export const useUpdateIssue = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<CreateIssuePayload>) => issueApi.updateIssue(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            queryClient.invalidateQueries({ queryKey: ['issues', id] });
        },
    });
};

export const useDeleteIssue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => issueApi.deleteIssue(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
        },
    });
};

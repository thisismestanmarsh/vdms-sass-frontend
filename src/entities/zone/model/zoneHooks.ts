import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { zoneApi } from '../api/zoneApi';
import type { ZoneRequest, HubRequest } from '../model/types';

export const zoneKeys = {
    all: ['zones'] as const,
    lists: () => [...zoneKeys.all, 'list'] as const,
    details: () => [...zoneKeys.all, 'detail'] as const,
    detail: (id: string | number) => [...zoneKeys.details(), id] as const,
    hubs: (zoneId: string | number) => [...zoneKeys.detail(zoneId), 'hubs'] as const,
    hubDetail: (zoneId: string | number, hubId: string | number) => [...zoneKeys.hubs(zoneId), hubId] as const,
    flattened: (params?: { page?: number; limit?: number }) => [...zoneKeys.all, 'flattened', params] as const,
};

export const useFlattenedZones = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: zoneKeys.flattened(params),
        queryFn: () => zoneApi.getFlattenedZones(params),
    });
};

export const useZones = () => {
    return useQuery({
        queryKey: zoneKeys.lists(),
        queryFn: zoneApi.getZones,
    });
};

export const useZone = (id: string | number | undefined) => {
    return useQuery({
        queryKey: zoneKeys.detail(id!),
        queryFn: () => zoneApi.getZoneById(id!),
        enabled: !!id,
    });
};

export const useCreateZone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: zoneApi.createZone,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: zoneKeys.lists() });
        },
    });
};

export const useUpdateZone = (id: string | number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ZoneRequest) => zoneApi.updateZone(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: zoneKeys.lists() });
            queryClient.invalidateQueries({ queryKey: zoneKeys.detail(id) });
        },
    });
};

export const useHub = (zoneId: string | number | undefined, hubId: string | number | undefined) => {
    return useQuery({
        queryKey: zoneKeys.hubDetail(zoneId!, hubId!),
        queryFn: () => zoneApi.getHubById(zoneId!, hubId!),
        enabled: !!zoneId && !!hubId,
    });
};

export const useCreateHub = (zoneId: string | number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: HubRequest) => zoneApi.createHub(zoneId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: zoneKeys.detail(zoneId) });
        },
    });
};

export const useUpdateHub = (zoneId: string | number, hubId: string | number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: HubRequest) => zoneApi.updateHub(zoneId, hubId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: zoneKeys.detail(zoneId) });
            queryClient.invalidateQueries({ queryKey: zoneKeys.hubDetail(zoneId, hubId) });
        },
    });
};

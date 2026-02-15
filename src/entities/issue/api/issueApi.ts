import { api } from '@shared/api/apiClient';
import type { Issue, CreateIssuePayload } from '../model/types';

export const issueApi = {
    getIssues: () => api.get<Issue[]>('/api/v1/issues'),
    getIssueById: (id: string) => api.get<Issue>(`/api/v1/issues/${id}`),
    createIssue: (data: CreateIssuePayload) => api.post<Issue>('/api/v1/issues', data),
    updateIssue: (id: string, data: Partial<CreateIssuePayload>) => api.put<Issue>(`/api/v1/issues/${id}`, data),
    deleteIssue: (id: string) => api.delete(`/api/v1/issues/${id}`),
};

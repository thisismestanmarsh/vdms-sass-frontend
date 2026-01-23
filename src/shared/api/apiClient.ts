import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useUserStore } from '@entities/user/model/userStore';

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const authData = useUserStore.getState().authData;
        if (authData?.access_token) {
            config.headers.Authorization = `Bearer ${authData.access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useUserStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export const api = {
    get: <T>(url: string, config = {}) => apiClient.get<T>(url, config).then((res) => res.data),
    post: <T>(url: string, data?: any, config = {}) => apiClient.post<T>(url, data, config).then((res) => res.data),
    put: <T>(url: string, data?: any, config = {}) => apiClient.put<T>(url, data, config).then((res) => res.data),
    delete: <T>(url: string, config = {}) => apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;

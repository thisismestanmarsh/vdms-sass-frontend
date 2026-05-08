import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { useUserStore } from '@entities/user/model/userStore';
import { IS_DEMO_MODE } from '@shared/config/demo';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    'Accept-Country': 'IN',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authData = useUserStore.getState().authData;
    if (authData?.access_token) {
      if (config.headers) {
        config.headers.set('Authorization', `Bearer ${authData.access_token}`);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    const { method } = response.config;
    if (method && ['post', 'put', 'delete'].includes(method.toLowerCase())) {
      const message = response.data?.message || 'Successful :)';
      toast.success(message);
    }
    return response;
  },
  (error) => {
    if (IS_DEMO_MODE) return Promise.reject(error);

    if (error.response?.status === 401) {
      useUserStore.getState().logout();
    }

    const message = error.response?.data?.message || error.message || 'Something went wrong :(';
    toast.error(message);

    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, config = {}) => apiClient.get<T>(url, config).then((res) => res.data),
  post: <T>(url: string, data?: any, config = {}) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),
  put: <T>(url: string, data?: any, config = {}) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),
  delete: <T>(url: string, config = {}) => apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;

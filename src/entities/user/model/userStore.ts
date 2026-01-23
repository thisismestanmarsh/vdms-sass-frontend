import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: string[];
  tenant_id: string;
  is_active: boolean;
  hub_list: number[];
  zone_ids: number[];
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  user: User;
}

interface UserStore {
  authData?: AuthResponse;
  setAuthData: (data: AuthResponse) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      authData: undefined,
      setAuthData: (data) => set({ authData: data }),
      logout: () => set({ authData: undefined }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

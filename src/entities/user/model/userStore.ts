import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from './types';
import { IS_DEMO_MODE } from '@shared/config/demo';

const DUMMY_AUTH_DATA: AuthResponse = {
  access_token: 'dummy_token',
  refresh_token: 'dummy_refresh_token',
  expires_at: new Date(Date.now() + 31536000000).toISOString(), // 1 year
  user: {
    id: 'demo-user-id',
    name: 'Aultix',
    email: 'aultrix@gmail.com',
    role: 'ADMIN',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: 'ACTIVE'
  } as any
};

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
      authData: IS_DEMO_MODE ? DUMMY_AUTH_DATA : undefined,
      setAuthData: (data) => set({ authData: data }),
      logout: () => {
        if (!IS_DEMO_MODE) {
          set({ authData: undefined });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

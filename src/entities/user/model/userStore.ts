import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from './types';

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

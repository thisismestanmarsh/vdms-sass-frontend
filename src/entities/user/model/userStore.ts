import { create } from 'zustand';

interface User {
    id: string;
    username: string;
    role?: string;
}

interface UserStore {
    authData?: User;
    setAuthData: (user: User) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    authData: undefined,
    setAuthData: (user) => set({ authData: user }),
    logout: () => set({ authData: undefined }),
}));

import { create } from 'zustand';

interface AppState {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    setMenuOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    isMenuOpen: false,
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    setMenuOpen: (open) => set({ isMenuOpen: open }),
}));

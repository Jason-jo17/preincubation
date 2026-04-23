import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: {
        id: string;
        name: string;
        email: string;
        role: 'admin' | 'analyst' | 'viewer';
    } | null;
    token: string | null;
    login: (user: AuthState['user'], token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

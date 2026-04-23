import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'analyst' | 'viewer' | 'company_owner' | 'expert' | 'student';
    company_id?: string | null;      // only for company_owner
    student_id?: string | null;      // only for student
    expert_domains?: string[];       // only for expert
    verified?: boolean;
  } | null;
  token: string | null;
  login: (user: AuthState['user'], token: string) => void;
  logout: () => void;
  isCompanyOwner: () => boolean;
  isExpert: () => boolean;
  isAdmin: () => boolean;
  canEditCompany: (companyId: string) => boolean;
  setRole: (role: 'admin' | 'analyst' | 'viewer' | 'company_owner' | 'expert' | 'student', id?: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isCompanyOwner: () => get().user?.role === 'company_owner',
      isExpert: () => get().user?.role === 'expert',
      isAdmin: () => get().user?.role === 'admin' || get().user?.role === 'analyst',
      canEditCompany: (companyId: string) => {
        const user = get().user;
        if (!user) return false;
        if (user.role === 'admin' || user.role === 'analyst') return true;
        if (user.role === 'company_owner' && user.company_id === companyId) return true;
        return false;
      },
      setRole: (role: 'admin' | 'analyst' | 'viewer' | 'company_owner' | 'expert' | 'student', id?: string | null) => {
        const user = get().user;
        if (!user) {
          set({
            user: {
              id: 'demo-user',
              name: 'Demo Principal',
              email: 'demo@intelligence.msme',
              role,
              company_id: role === 'company_owner' ? (id || 'hical-001') : null,
              student_id: role === 'student' ? (id || 'std-001') : null
            }
          });
          return;
        }
        set({ 
          user: { 
            ...user, 
            role, 
            company_id: role === 'company_owner' ? (id || 'hical-001') : null,
            student_id: role === 'student' ? (id || 'std-001') : null
          } 
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

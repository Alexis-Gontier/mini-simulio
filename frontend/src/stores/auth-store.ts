import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { me } from '@/api/backend/auth/service'

interface AuthState {
    isAuthenticated: boolean
    token: string | null
    user: { id: number; email: string; fullName: string } | null
    isChecking: boolean
    login: (token: string) => void
    logout: () => void
    checkAuth: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            token: null,
            user: null,
            isChecking: false,
            login: (token) => set({ isAuthenticated: true, token }),
            logout: () => set({ isAuthenticated: false, token: null, user: null }),
            checkAuth: async () => {
                const { token } = get();
                if (!token) {
                    set({ isAuthenticated: false, user: null });
                    return false;
                }

                set({ isChecking: true });

                try {
                    const result = await me();
                    if (result.success) {
                        set({
                            isAuthenticated: true,
                            user: result.data,
                            isChecking: false
                        });
                        return true;
                    } else {
                        set({
                            isAuthenticated: false,
                            token: null,
                            user: null,
                            isChecking: false
                        });
                        return false;
                    }
                } catch (error) {
                    console.error("Error checking auth:", error);
                    set({
                        isAuthenticated: false,
                        token: null,
                        user: null,
                        isChecking: false
                    });
                    return false;
                }
            },
        }),
        {
            name: 'auth-storage',
        }
    )
)

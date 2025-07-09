import { create } from 'zustand';
import { login } from '../api/auth';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  
  login: async (email, password) => {
    const token = await login(email, password);
    sessionStorage.setItem('authToken', token);
    set({ token, isAuthenticated: true });
  },
  
  logout: () => {
    sessionStorage.removeItem('authToken');
    set({ token: null, isAuthenticated: false });
  },
  
  initialize: () => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      set({ token, isAuthenticated: true });
    }
  }
}));

// Initialize auth state when store is created
useAuthStore.getState().initialize();

export default useAuthStore;
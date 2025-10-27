import { api, setAccessToken } from './api';

export interface AuthenticatedUser {
  id: number;
  email: string;
  full_name: string;
  company?: string | null;
}

export const TOKEN_STORAGE_KEY = 'lumina_access_token';
export const USER_STORAGE_KEY = 'lumina_user';
export const AUTH_EVENT = 'lumina-auth-changed';

export function persistAuth(token: string, user: AuthenticatedUser) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  setAccessToken(token);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(USER_STORAGE_KEY);
  setAccessToken(null);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function getStoredUser(): AuthenticatedUser | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthenticatedUser;
  } catch {
    return null;
  }
}

// Ensure axios is initialised with any stored token when the module is loaded on the client
if (typeof window !== 'undefined') {
  const token = getStoredToken();
  if (token) {
    setAccessToken(token);
  }

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
}

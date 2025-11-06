import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { configureAudienceHeaders, registerAuthTokenProvider } from '../api/client';

interface LovableSignInResult {
  accessToken?: string;
  session?: {
    accessToken?: string;
  };
  user?: {
    id?: string;
    email?: string;
    name?: string;
  };
}

declare global {
  interface Window {
    LovableCloud?: {
      auth?: {
        signIn: (credentials: { email: string; password: string }) => Promise<LovableSignInResult>;
        signOut?: () => Promise<void>;
        currentSession?: () => Promise<LovableSignInResult | null>;
      };
    };
  }
}

export interface AuthSession {
  token: string | null;
  user: {
    email: string;
    name?: string;
    id?: string;
  } | null;
  audience?: string;
  issuer?: string;
}

interface AuthContextValue extends AuthSession {
  loading: boolean;
  isAuthenticated: boolean;
  login: (params: { email: string; password: string; audience?: string; issuer?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'lovable-broadcast-auth';

const loadStoredSession = (): AuthSession | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch (error) {
    console.warn('Failed to parse stored session', error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession>(() => loadStoredSession() ?? { token: null, user: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    registerAuthTokenProvider(() => session.token);
    configureAudienceHeaders({ audience: session.audience, issuer: session.issuer });
  }, [session.audience, session.issuer, session.token]);

  const persistSession = useCallback((next: AuthSession | null) => {
    if (typeof window === 'undefined') return;
    if (next) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback<AuthContextValue['login']>(
    async ({ email, password, audience, issuer }) => {
      setLoading(true);
      try {
        let result: LovableSignInResult | null = null;
        if (window?.LovableCloud?.auth?.signIn) {
          result = await window.LovableCloud.auth.signIn({ email, password });
        }

        const token =
          result?.session?.accessToken || result?.accessToken || btoa(`${email}:${password}:${Date.now()}`);

        const user =
          result?.user ?? {
            email,
            name: email.split('@')[0]
          };

        const nextSession: AuthSession = {
          token,
          user: user ? { email: user.email ?? email, name: user.name, id: user.id } : null,
          audience,
          issuer
        };

        setSession(nextSession);
        persistSession(nextSession);
      } finally {
        setLoading(false);
      }
    },
    [persistSession]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      if (window?.LovableCloud?.auth?.signOut) {
        await window.LovableCloud.auth.signOut();
      }
    } finally {
      setSession({ token: null, user: null });
      persistSession(null);
      setLoading(false);
    }
  }, [persistSession]);

  const refresh = useCallback(async () => {
    if (!window?.LovableCloud?.auth?.currentSession) return;
    setLoading(true);
    try {
      const result = await window.LovableCloud.auth.currentSession();
      if (result) {
        const token = result.session?.accessToken || result.accessToken || session.token;
        const user = result.user ?? session.user;
        const nextSession: AuthSession = {
          token: token ?? null,
          user: user
            ? {
                email: user.email ?? session.user?.email ?? 'unknown@lovable.dev',
                name: user.name ?? session.user?.name,
                id: user.id ?? session.user?.id
              }
            : session.user,
          audience: session.audience,
          issuer: session.issuer
        };
        setSession(nextSession);
        persistSession(nextSession);
      }
    } finally {
      setLoading(false);
    }
  }, [persistSession, session.audience, session.issuer, session.token, session.user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token: session.token,
      user: session.user,
      audience: session.audience,
      issuer: session.issuer,
      loading,
      isAuthenticated: Boolean(session.token),
      login,
      logout,
      refresh
    }),
    [loading, login, logout, refresh, session.audience, session.issuer, session.token, session.user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useRequireAuth = () => {
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return auth;
};

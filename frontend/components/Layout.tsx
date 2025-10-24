import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AUTH_EVENT, AuthenticatedUser, clearAuth, getStoredUser } from '../lib/auth';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function Layout({
  title = 'Lumina Automate',
  description = 'AI-native marketing automation platform',
  children
}: LayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const syncUser = () => {
      setUser(getStoredUser());
    };
    syncUser();
    window.addEventListener(AUTH_EVENT, syncUser);
    return () => window.removeEventListener(AUTH_EVENT, syncUser);
  }, []);

  const handleSignOut = () => {
    clearAuth();
    setUser(null);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <header className="sticky top-0 z-30 border-b border-slate-200/20 bg-white/80 backdrop-blur dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary-500/10 p-2">
              <span className="block h-2 w-2 rounded-full bg-primary-500" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Lumina Automate
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
            <Link href="/dashboard" className="hover:text-primary-500">
              Dashboard
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden text-xs font-medium uppercase tracking-wide text-slate-400 sm:inline">
                  {user.full_name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-primary-400 hover:text-primary-500 dark:border-slate-700 dark:text-slate-200"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/login" className="rounded-full border border-transparent px-3 py-1 text-xs font-semibold text-slate-700 transition hover:text-primary-500 dark:text-slate-200">
                Sign in
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      <footer className="border-t border-slate-200/20 bg-white/80 py-6 text-center text-sm text-slate-500 dark:bg-slate-950/80 dark:text-slate-400">
        © {new Date().getFullYear()} Lumina Automate. Built for performance marketing teams.
      </footer>
    </div>
  );
}

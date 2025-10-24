import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
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

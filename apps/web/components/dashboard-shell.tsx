"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { BarChart3, LayoutDashboard, LogOut, Globe2 } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/app", icon: LayoutDashboard },
  { name: "Campaigns", href: "/app/campaigns", icon: Globe2 },
  { name: "Analytics", href: "/app/analytics", icon: BarChart3 }
];

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50/80 dark:bg-slate-950">
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-white/70 p-6 backdrop-blur dark:bg-slate-900/60 lg:flex">
        <div className="mb-12 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white shadow-lg shadow-primary-500/30">
            Au
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">Aurora Automate</span>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-primary-500/10 hover:text-primary-600 dark:text-slate-300 dark:hover:bg-primary-500/20 dark:hover:text-primary-200"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <button className="flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800">
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-white/60 bg-white/80 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Workspace Dashboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Growth plan · Next renewal in 28 days · 72% utilization
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-600 shadow-inner shadow-primary-500/20 dark:text-primary-200">
                Trial: 14 days left
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

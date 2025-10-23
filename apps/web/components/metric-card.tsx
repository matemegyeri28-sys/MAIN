import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  delta: string;
  icon: ReactNode;
  accent?: string;
}

export function MetricCard({ title, value, delta, icon, accent = "primary" }: MetricCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-6 shadow-lg shadow-primary-500/10 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5",
        accent === "primary" && "hover:shadow-primary-500/30",
        accent === "emerald" && "hover:shadow-emerald-500/30"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-400">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/10 via-primary-500/20 to-primary-500/10 text-primary-600 shadow-inner shadow-primary-500/20 dark:text-primary-200">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-xs font-medium text-emerald-500">{delta}</p>
    </div>
  );
}

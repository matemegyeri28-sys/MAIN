"use client";

import { DashboardShell } from "../../../components/dashboard-shell";
import { LineChart, BarChart3, PieChart } from "lucide-react";

const metrics = [
  {
    title: "Attribution lift",
    value: "+48%",
    description: "Conversion lift across AI-generated ads vs. manual",
    icon: LineChart
  },
  {
    title: "Top performing channel",
    value: "LinkedIn",
    description: "4.3x ROAS · C-Suite ICP",
    icon: BarChart3
  },
  {
    title: "Audience resonance",
    value: "92",
    description: "Creative quality score from Aurora predictive model",
    icon: PieChart
  }
];

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-xl shadow-primary-500/10 dark:border-white/10 dark:bg-white/5">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Performance intelligence</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Aurora keeps a live control tower of campaign KPIs, creative insights, and predictive benchmarks.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="rounded-3xl border border-white/20 bg-gradient-to-br from-white via-white/70 to-slate-100 p-6 shadow-lg shadow-primary-500/10 dark:border-white/10 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900"
            >
              <metric.icon className="h-6 w-6 text-primary-500" />
              <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{metric.title}</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{metric.description}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-lg shadow-primary-500/10 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Creative engagement</h2>
            <div className="mt-6 h-64 rounded-2xl bg-gradient-to-br from-primary-500/10 via-primary-500/20 to-primary-500/10" />
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-lg shadow-primary-500/10 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Audience expansion</h2>
            <div className="mt-6 h-64 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/20 to-emerald-500/10" />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

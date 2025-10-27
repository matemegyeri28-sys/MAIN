import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Layout from '../components/Layout';

const benefits = [
  {
    title: 'AI-native campaign execution',
    description: 'Transform website and blog content into high-performing ads across every channel in seconds.'
  },
  {
    title: 'Automated distribution',
    description: 'Connect social profiles and let Lumina Automate deliver creatives on schedule without copy-paste loops.'
  },
  {
    title: 'Subscription simplicity',
    description: 'Predictable pricing tiers with usage controls tailored for scaling teams and agencies.'
  }
];

export default function HomePage() {
  return (
    <Layout>
      <section className="gradient-bg rounded-3xl px-10 py-16 shadow-xl shadow-primary-500/10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-primary-500/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary-700 dark:text-primary-300">
              Marketing automation reimagined
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white lg:text-5xl">
              Generate, launch, and optimize ads from any URL—without lifting a finger
            </h1>
            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Lumina Automate ingests your web content, distills your value props, and orchestrates on-brand creatives that are ready to deploy across every social surface. One workflow. Zero chaos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700"
              >
                Launch the app
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href="#product"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-500 hover:text-primary-500 dark:border-slate-800 dark:text-slate-300 dark:hover:border-primary-400 dark:hover:text-primary-400"
              >
                Watch product tour
                <PlayIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="space-y-6 rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-500">Workflow snapshot</h2>
            <ol className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <li className="rounded-2xl border border-primary-500/40 bg-white/70 p-4 shadow-sm shadow-primary-500/10 dark:border-primary-400/30 dark:bg-slate-900/80">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary-500">Step 1</span>
                <p className="text-base font-medium text-slate-900 dark:text-white">Paste a URL or connect your sitemap</p>
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary-500">Step 2</span>
                <p className="text-base font-medium text-slate-900 dark:text-white">AI distills benefits and generates ad variants</p>
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary-500">Step 3</span>
                <p className="text-base font-medium text-slate-900 dark:text-white">Automations publish to your connected accounts</p>
              </li>
            </ol>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SOC2-ready architecture, regional data residency, and granular user controls included on every plan.
            </p>
          </div>
        </div>
      </section>

      <section id="product" className="mt-20 space-y-8">
        <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">
          Built for modern growth teams
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-primary-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{benefit.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 rounded-3xl border border-slate-200/60 bg-white/80 p-10 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Enterprise-grade automation, startup-fast execution</h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Orchestrate campaigns with granular control over creative tone, CTA, channel mix, and approval workflows. Every asset is tracked end-to-end with analytics, delivery confirmations, and audit trails ready for compliance.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>• Native connectors for LinkedIn, Meta, TikTok, and YouTube</li>
            <li>• Continuous learning engine tuned to your brand guidelines</li>
            <li>• Built-in subscription billing and workspace management</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-primary-500/40 bg-gradient-to-br from-primary-500/20 to-indigo-500/10 p-6 text-sm text-slate-700 dark:border-primary-500/30 dark:text-slate-200">
          <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300">Launch playbook</h3>
          <ol className="mt-4 space-y-3">
            <li className="rounded-2xl bg-white/80 p-4 shadow dark:bg-slate-900/80">
              Invite your team and pick a subscription tier that matches usage.
            </li>
            <li className="rounded-2xl bg-white/80 p-4 shadow dark:bg-slate-900/80">
              Queue URLs or import your CMS, then let AI generate creative variants.
            </li>
            <li className="rounded-2xl bg-white/80 p-4 shadow dark:bg-slate-900/80">
              Approve, schedule, and monitor automated postings from a single dashboard.
            </li>
          </ol>
        </div>
      </section>
    </Layout>
  );
}

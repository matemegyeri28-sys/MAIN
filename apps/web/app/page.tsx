import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Share2, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "../components/theme-toggle";

const features = [
  {
    title: "Adaptive Content Extraction",
    description:
      "Pull rich media and messaging from any URL with smart scraping that respects structure and metadata.",
    icon: Sparkles
  },
  {
    title: "Generative Ad Studio",
    description:
      "Produce polished copy, imagery, and video storyboards tuned to your audience in seconds.",
    icon: Zap
  },
  {
    title: "One-click Social Publishing",
    description:
      "Orchestrate multi-network campaigns and scheduling with a unified automation layer.",
    icon: Share2
  },
  {
    title: "Enterprise-grade Control",
    description:
      "Subscription tiers, approvals, and observability built for modern marketing teams.",
    icon: ShieldCheck
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white shadow-lg shadow-primary-500/40">
            <span className="text-xl font-semibold">Au</span>
          </div>
          <div>
            <p className="text-xl font-semibold">Aurora Automate</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Marketing Automation for high-growth teams
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-primary-600 dark:bg-white dark:text-slate-900"
          >
            Launch App
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24">
        <section className="grid gap-10 rounded-3xl border border-white/60 bg-white/70 p-10 shadow-2xl shadow-primary-500/10 backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-col gap-6 text-center">
            <span className="mx-auto rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-600 dark:border-primary-500/40 dark:bg-primary-500/20 dark:text-primary-200">
              Launch faster with AI
            </span>
            <h1 className="text-5xl font-semibold leading-tight text-slate-900 dark:text-white">
              Automate campaign creation from URL to published ads in minutes.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Aurora Automate unifies content intelligence, AI creative generation, and cross-network
              publishing into a single subscription platform built for premium marketing teams.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-transform hover:-translate-y-0.5 hover:bg-primary-500"
              >
                Start your free trial
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
              >
                View pricing
              </Link>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-100 bg-white/70 p-6 shadow-inner shadow-white/10 transition hover:-translate-y-1 hover:border-primary-500/40 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:border-primary-400/40"
              >
                <feature.icon className="mb-4 h-8 w-8 text-primary-500" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="grid gap-6 lg:grid-cols-3">
          {[
            {
              plan: "Starter",
              price: "$49",
              description: "Solo strategists validating new offers",
              highlights: ["5 active campaigns", "30 social posts/mo", "URL extraction"],
              featured: false
            },
            {
              plan: "Growth",
              price: "$129",
              description: "Scaling teams shipping weekly launches",
              highlights: [
                "25 active campaigns",
                "AI image & video templates",
                "Multi-account publishing"
              ],
              featured: true
            },
            {
              plan: "Scale",
              price: "Custom",
              description: "Global marketing operations with complex approvals",
              highlights: [
                "Unlimited workspaces",
                "SAML SSO",
                "Custom success playbooks"
              ],
              featured: false
            }
          ].map((tier) => (
            <div
              key={tier.plan}
              className={`relative flex flex-col gap-4 rounded-3xl border p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 ${
                tier.featured
                  ? "border-primary-500 bg-primary-500/10 shadow-primary-500/40 dark:bg-primary-500/20"
                  : "border-slate-100 bg-white/70 shadow-white/30 dark:bg-white/5"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-primary-500/50">
                  Most popular
                </span>
              )}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{tier.plan}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tier.description}</p>
              </div>
              <p className="text-4xl font-bold text-slate-900 dark:text-white">{tier.price}</p>
              <ul className="flex flex-1 flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
                {tier.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tier.featured
                    ? "bg-white text-slate-900 hover:bg-slate-100"
                    : "border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200"
                }`}
              >
                Choose plan
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

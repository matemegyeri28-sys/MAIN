import Link from 'next/link';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { NewsletterSignup } from '@/components/NewsletterSignup';

const benefits = [
  {
    title: 'Decode the stress cycle',
    description:
      'Understand the dialogue between your amygdala, prefrontal cortex, and autonomic nervous system in plain English with cinematic diagrams.'
  },
  {
    title: 'Design habits with biology in mind',
    description:
      'Rewire daily routines with protocols for light, movement, and recovery that work with your dopamine and cortisol rhythms.'
  },
  {
    title: 'Train recovery as a skill',
    description:
      'Use breath, sleep, and micro-stressors intentionally to expand your capacity instead of running on empty.'
  }
];

const howStressWorks = [
  {
    label: 'Trigger',
    text: 'Your brain tags a signal as important. The hypothalamus cues the sympathetic branch to prepare.'
  },
  {
    label: 'Surge',
    text: 'Adrenaline spikes in seconds. Cortisol follows within minutes, unlocking glucose and focus.'
  },
  {
    label: 'Resolution',
    text: 'Recovery is not automatic. Vagal tone, breath, and social safety cues determine how fast you return to baseline.'
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="section-padding bg-brand-light/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-white px-4 py-1 text-xs font-medium uppercase tracking-wider text-brand">
              Neuroscience for ambitious humans
            </span>
            <h1 className="font-display text-4xl leading-tight text-brand-dark md:text-5xl">
              Understand your stress, rewire your response, and build durable momentum.
            </h1>
            <p className="text-base text-muted">
              &lt;Your Brand Here&gt; blends storytelling, science, and interactive tools so you can master stress regulation. Learn
              how dopamine, cortisol, and the autonomic nervous system collaborate—and how to guide them.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/course"
                className="focus-ring inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                View the flagship course
              </Link>
              <Link
                href="#newsletter"
                className="focus-ring inline-flex items-center justify-center rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand hover:bg-brand-light/60"
              >
                Join the newsletter
              </Link>
            </div>
            <div className="callout max-w-xl">
              “Stress is not the enemy. Chronic, unregulated stress is. Learn the levers that let you choose your state.”
            </div>
          </div>
          <div className="relative">
            <div className="gradient-border absolute -left-6 top-12 hidden h-56 w-56 rounded-full opacity-50 blur-3xl md:block" />
            <div className="card relative overflow-hidden rounded-3xl bg-white/80 p-8">
              <h2 className="font-display text-2xl text-brand-dark">Stress dashboard preview</h2>
              <p className="mt-3 text-sm text-muted">
                Track your daily nervous system budget: when to push, when to recover.
              </p>
              <div className="mt-6 grid gap-4 text-sm">
                <div className="rounded-2xl border border-brand-light/50 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">Autonomic balance</p>
                  <div className="mt-2 h-3 rounded-full bg-brand-light">
                    <div className="h-full w-3/4 rounded-full bg-accent" aria-hidden />
                  </div>
                  <p className="mt-2 text-xs text-muted">75% regulated · Extend parasympathetic cues</p>
                </div>
                <div className="rounded-2xl border border-brand-light/50 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">Dopamine window</p>
                  <p className="mt-2 text-2xl font-semibold text-brand-dark">09:30 – 12:30</p>
                  <p className="text-xs text-muted">Plan focus work in the natural motivation upswing.</p>
                </div>
                <div className="rounded-2xl border border-brand-light/50 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">Recovery dose</p>
                  <p className="mt-2 text-sm text-brand-dark">10-minute 4-7-8 session · 2x today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card p-8">
                <h3 className="font-display text-xl text-brand-dark">{benefit.title}</h3>
                <p className="mt-3 text-sm text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-light/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <h2 className="font-display text-3xl text-brand-dark">How stress works (and how you can work with it)</h2>
              <p className="mt-4 text-base text-muted">
                Stress is your body allocating resources. When you understand each phase, you can nudge the system instead of
                fighting it.
              </p>
              <div className="mt-6 space-y-4">
                {howStressWorks.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-brand-light/60 bg-white/90 p-5 shadow-soft/50">
                    <p className="text-xs uppercase tracking-widest text-brand">{item.label}</p>
                    <p className="mt-2 text-sm text-muted">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="key-takeaway">
              <h3 className="font-display text-2xl text-brand-dark">Key takeaway</h3>
              <p className="mt-3 text-base text-brand-dark/90">
                Recovery is not rest by default. It’s an active negotiation between your physiology and your habits. We teach you
                how to guide the negotiation.
              </p>
              <Link
                href="/interactive"
                className="focus-ring mt-6 inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft hover:-translate-y-0.5"
              >
                Explore the interactive tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl text-brand-dark">Learners trust our science-led approach</h2>
          <p className="mt-4 text-base text-muted">
            Coaches, founders, and creators integrate these teachings to build resilient teams and personal practices.
          </p>
          <div className="mt-8">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}

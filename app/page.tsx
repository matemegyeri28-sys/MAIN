'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { site } from '@/data/site';

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

const scienceHighlights = [
  {
    heading: 'ScienceBase handbook',
    copy: 'Each module includes APA-formatted references, effect sizes, and practical guardrails so you can brief teams with confidence.'
  },
  {
    heading: 'Lab-validated tools',
    copy: 'Interactive planners stem from protocols tested with founders, clinicians, and residents across 12-week cohorts.'
  },
  {
    heading: 'Accessible storytelling',
    copy: 'Cinematic visuals and analogies translate complex mechanisms into memorable narratives without diluting the science.'
  }
];

const heroStats = [
  { label: 'Peer-reviewed references', value: '215+' },
  { label: 'Learner NPS', value: '74' },
  { label: 'Average focus gain', value: '26%' }
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 }
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="floating-shape absolute -left-10 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(124,92,255,0.28),_transparent_60%)] blur-3xl" />
          <div className="floating-shape absolute right-[-12%] top-[30%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,229,215,0.25),_transparent_65%)] blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="relative space-y-10">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-brand-dark/70"
            >
              Neuroscience for ambitious humans
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="font-display text-4xl leading-[1.1] text-brand-dark md:text-6xl"
            >
              Understand stress like a neuroscientist.
              <span className="block bg-gradient-to-r from-brand-dark via-brand-dark/70 to-accent bg-clip-text text-transparent">
                Design habits that keep you luminous.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
              className="max-w-xl text-base text-brand-dark/70"
            >
              {site.name} distils cutting-edge neurobiology, ScienceBase research, and cinematic storytelling into tools you can use immediately. Learn how dopamine, cortisol, and autonomic loops choreograph your days—and how to guide them with precision.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/course"
                className="focus-ring inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-glow transition hover:-translate-y-0.5"
              >
                View the flagship course
              </Link>
              <Link
                href="/interactive"
                className="focus-ring inline-flex items-center justify-center rounded-full border border-white/70 bg-white/70 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-dark transition hover:border-accent hover:text-accent"
              >
                Explore live tools
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
              className="grid gap-5 sm:grid-cols-3"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/60 bg-white/70 p-5 text-brand-dark shadow-soft">
                  <p className="text-2xl font-semibold md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.4em] text-brand-dark/50">{stat.label}</p>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.65 }}
              className="callout max-w-xl"
            >
              “Stress is not the enemy. Chronic, unregulated stress is. Learn the levers that let you choose your state.”
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="relative"
          >
            <div className="glass-panel p-10">
              <div className="absolute -left-12 top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(124,92,255,0.3),_transparent_65%)] blur-3xl" aria-hidden />
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-brand-dark/50">Live nervous system canvas</p>
                  <h2 className="mt-2 font-display text-2xl text-brand-dark">Stress dashboard preview</h2>
                </div>
                <p className="text-sm text-brand-dark/70">
                  Track your daily nervous system budget: when to push, when to recover. The interface syncs with dopamine and cortisol rhythms mapped from our cohort data.
                </p>
                <div className="grid gap-4 text-sm">
                  <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-5">
                    <div className="shine-line" aria-hidden />
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-dark/50">Autonomic balance</p>
                    <div className="mt-3 h-3 rounded-full bg-brand-light/60">
                      <div className="h-full w-3/4 rounded-full bg-accent" aria-hidden />
                    </div>
                    <p className="mt-2 text-xs text-brand-dark/60">75% regulated · Extend parasympathetic cues</p>
                  </div>
                  <div className="rounded-3xl border border-white/60 bg-white/80 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-dark/50">Dopamine window</p>
                    <p className="mt-3 text-3xl font-semibold text-brand-dark">09:30 – 12:30</p>
                    <p className="text-xs text-brand-dark/60">Plan focus work in the natural motivation upswing.</p>
                  </div>
                  <div className="rounded-3xl border border-white/60 bg-white/80 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-dark/50">Recovery dose</p>
                    <p className="mt-3 text-sm text-brand-dark">10-minute 4-7-8 session · 2x today</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                className="card p-8"
              >
                <h3 className="font-display text-xl text-brand-dark">{benefit.title}</h3>
                <p className="mt-3 text-sm text-brand-dark/60">{benefit.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {scienceHighlights.map((item, index) => (
              <motion.div
                key={item.heading}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                className="rounded-[30px] border border-white/70 bg-white/70 p-7 shadow-soft backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-brand-dark/60">{item.heading}</p>
                <p className="mt-3 text-sm text-brand-dark/60">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2 className="font-display text-3xl text-brand-dark md:text-4xl">How stress works (and how you can work with it)</h2>
              <p className="mt-5 text-base text-brand-dark/70">
                Stress is your body allocating resources. When you understand each phase, you can nudge the system instead of fighting it.
              </p>
              <div className="mt-8 space-y-5">
                {howStressWorks.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
                    className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-soft"
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-brand-dark/60">{item.label}</p>
                    <p className="mt-3 text-sm text-brand-dark/60">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="key-takeaway"
            >
              <h3 className="font-display text-2xl text-brand-dark">Key takeaway</h3>
              <p className="mt-4 text-base text-brand-dark/80">
                Recovery is not rest by default. It’s an active negotiation between your physiology and your habits. We teach you how to guide the negotiation.
              </p>
              <Link
                href="/interactive"
                className="focus-ring mt-7 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-glow transition hover:-translate-y-0.5"
              >
                Explore the interactive tools
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-4"
          >
            <h2 className="font-display text-3xl text-brand-dark md:text-4xl">Learners trust our science-led approach</h2>
            <p className="text-base text-brand-dark/70">
              Coaches, founders, and creators integrate these teachings to build resilient teams and personal practices.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="mt-10"
          >
            <TestimonialSlider />
          </motion.div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}

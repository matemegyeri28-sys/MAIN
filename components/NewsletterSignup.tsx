'use client';

import { FormEvent, useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setStatus('success');
    setEmail('');
  };

  return (
    <section id="newsletter" className="section-padding">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/70 bg-gradient-to-br from-white/90 via-white/70 to-white/60 p-12 shadow-soft backdrop-blur-2xl">
        <div className="shine-line" aria-hidden />
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-brand-dark/70">
              ScienceBase digest
            </span>
            <p className="font-display text-3xl font-semibold tracking-tight text-brand-dark md:text-4xl">
              Stay ahead of the neuroscience shaping stress mastery.
            </p>
            <p className="text-sm leading-relaxed text-brand-dark/70">
              Receive weekly briefs curated from our ScienceBase research vault—protocol breakdowns, cohort stories, and early access to live lab drops. Evidence-backed, beautifully distilled.
            </p>
          </div>
          <form className="flex w-full flex-col gap-4 md:max-w-md" onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email" className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark/60">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="focus-ring w-full rounded-2xl border border-white/70 bg-white/80 px-5 py-4 text-sm text-brand-dark placeholder:text-brand-dark/40"
            />
            <button
              type="submit"
              className="focus-ring inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-glow transition hover:-translate-y-0.5"
            >
              Join the newsletter
            </button>
            {status === 'success' && (
              <p className="text-xs font-medium text-emerald-500" role="status">
                You’re on the list! Check your inbox for a welcome note.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

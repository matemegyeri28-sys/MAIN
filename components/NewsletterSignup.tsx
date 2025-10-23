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
    <section id="newsletter" className="section-padding bg-brand-dark/95">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-white/20 bg-white/5 p-10 text-brand-light shadow-soft md:flex-row md:items-center md:justify-between">
        <div className="md:max-w-xl">
          <p className="font-display text-3xl font-semibold tracking-tight text-white">
            Stay ahead of stress science.
          </p>
          <p className="mt-4 text-sm text-white/80">
            Receive weekly deep dives, protocols, and course invites. Curated from our ScienceBase research vault—evidence-backed, no spam.
          </p>
        </div>
        <form className="flex w-full flex-col gap-3 md:max-w-sm" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="focus-ring w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50"
          />
          <button
            type="submit"
            className="focus-ring inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/40 transition hover:-translate-y-0.5"
          >
            Join the newsletter
          </button>
          {status === 'success' && (
            <p className="text-xs text-emerald-200" role="status">
              You’re on the list! Check your inbox for a welcome note.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

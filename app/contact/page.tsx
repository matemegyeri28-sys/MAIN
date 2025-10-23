'use client';

import { FormEvent, useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.website) return; // honeypot
    setStatus('success');
    setFormData({ name: '', email: '', message: '', website: '' });
  };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-4xl px-6">
        <header className="space-y-4">
          <h1 className="font-display text-4xl text-brand-dark">Let’s design your next stress milestone.</h1>
          <p className="text-base text-muted">
            Share your goals, team context, or collaboration idea. We respond within two business days with next steps.
          </p>
        </header>

        <form className="card mt-10 space-y-6 p-8" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block text-sm font-semibold text-brand-dark">
              Name
              <input
                type="text"
                required
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                className="focus-ring mt-2 w-full rounded-xl border border-brand-light bg-white px-4 py-3 text-sm"
              />
            </label>
            <label className="block text-sm font-semibold text-brand-dark">
              Email
              <input
                type="email"
                required
                value={formData.email}
                onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                className="focus-ring mt-2 w-full rounded-xl border border-brand-light bg-white px-4 py-3 text-sm"
              />
            </label>
          </div>
          <label className="block text-sm font-semibold text-brand-dark">
            How can we help?
            <textarea
              required
              value={formData.message}
              onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
              className="focus-ring mt-2 h-36 w-full rounded-2xl border border-brand-light bg-white px-4 py-3 text-sm"
            />
          </label>
          <label className="sr-only" aria-hidden="true">
            Leave this field blank
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(event) => setFormData((prev) => ({ ...prev, website: event.target.value }))}
              className="hidden"
            />
          </label>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-muted">
              We use your data solely to respond to your enquiry. No automated marketing without your explicit consent.
            </p>
            <button
              type="submit"
              className="focus-ring inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white"
            >
              Send message
            </button>
          </div>
          {status === 'success' && (
            <p className="text-sm text-emerald-600" role="status">
              Thank you! You’ll hear from us within two business days.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

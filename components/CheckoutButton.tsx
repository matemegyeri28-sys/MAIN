'use client';

import { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

const getStripe = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) {
    return null;
  }
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

type CheckoutButtonProps = {
  className?: string;
  children: React.ReactNode;
  successUrl?: string;
  cancelUrl?: string;
  analyticsLabel?: string;
};

export function CheckoutButton({
  className,
  children,
  successUrl,
  cancelUrl,
  analyticsLabel
}: CheckoutButtonProps) {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(
    publishableKey ? null : 'Add your Stripe publishable key to enable checkout.'
  );

  const handleCheckout = async () => {
    if (!publishableKey) {
      setStatus('error');
      setMessage('Checkout unavailable. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment.');
      return;
    }

    setStatus('loading');
    setMessage(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ successUrl, cancelUrl, analyticsLabel })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unable to start checkout.' }));
        throw new Error(error.error ?? 'Unable to start checkout.');
      }

      const payload: { sessionId?: string; url?: string } = await response.json();

      const stripe = await getStripe();
      if (stripe && payload.sessionId) {
        const result = await stripe.redirectToCheckout({ sessionId: payload.sessionId });
        if (result.error) {
          throw new Error(result.error.message);
        }
      } else if (payload.url) {
        window.location.href = payload.url;
      } else {
        throw new Error('Checkout session missing redirect target.');
      }

      setStatus('idle');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleCheckout}
        className={`focus-ring inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80 ${
          status === 'loading' ? 'animate-pulse' : ''
        } ${className ?? ''}`}
        disabled={status === 'loading' || !publishableKey}
      >
        {status === 'loading' ? 'Launching checkout…' : children}
      </button>
      {message && (
        <p className="mt-3 text-xs text-brand-dark/60 dark:text-brand-dark/70" role={status === 'error' ? 'alert' : 'status'}>
          {message}
        </p>
      )}
    </div>
  );
}

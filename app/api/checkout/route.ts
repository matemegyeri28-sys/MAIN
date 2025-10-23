import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const STRIPE_API_VERSION: Stripe.LatestApiVersion = '2023-10-16';

const getStripeClient = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }
  return new Stripe(secretKey, { apiVersion: STRIPE_API_VERSION });
};

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  const priceId = process.env.STRIPE_MONTHLY_PRICE_ID;

  if (!stripe || !priceId) {
    return NextResponse.json(
      {
        error: 'Stripe configuration missing. Set STRIPE_SECRET_KEY and STRIPE_MONTHLY_PRICE_ID.'
      },
      { status: 500 }
    );
  }

  try {
    const { successUrl, cancelUrl, analyticsLabel } = await request.json().catch(() => ({}));
    const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      allow_promotion_codes: true,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      subscription_data: {
        description: 'NeuroLumen Atlas Monthly Membership',
        metadata: analyticsLabel ? { analyticsLabel } : undefined
      },
      success_url: successUrl ?? `${origin}/course?status=success`,
      cancel_url: cancelUrl ?? `${origin}/course?status=cancelled`,
      billing_address_collection: 'auto'
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Unable to create checkout session.' }, { status: 500 });
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error', error);
    return NextResponse.json({ error: 'Failed to initiate checkout.' }, { status: 500 });
  }
}

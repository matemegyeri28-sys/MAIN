# NeuroLumen Atlas · Neurobiology of Stress

A premium, production-ready Next.js experience teaching the science of stress, dopamine, and recovery. Built with accessibility, performance, and conversion best practices.

## ✨ Features
- Next.js 14 + TypeScript + Tailwind CSS
- Evidence-based content with modular article library and interactive labs
- LocalStorage-powered tools for stress self-check, dopamine planning, and guided breathing
- Responsive design with framer-motion micro-interactions
- SEO ready (metadata, sitemap, robots, Open Graph)
- Newsletter capture, course enrollment CTAs, and analytics placeholder hooks

## 🚀 Getting started

```bash
# install dependencies
npm install

# start local development server
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000) and explore the Home, Learn, Interactive, Course, About, and Contact pages.

### Quality checks
```bash
# run Next.js linting
npm run lint

# create a production build
npm run build
```

## 📦 Deployment
Deploy seamlessly to [Vercel](https://vercel.com/):
1. Push this repository to your Git provider.
2. Import the project into Vercel and select the repository.
3. Vercel auto-detects Next.js. Keep default build command (`npm run build`) and output directory (`.next`).
4. Add any environment variables or analytics keys as needed.
5. Trigger the first deployment—Vercel will manage previews, production, and edge caching.

## 🔐 Environment variables
Create an `.env.local` file (or configure variables in your hosting platform) with the following keys to enable secure Stripe-powered checkout:

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_SITE_URL=https://neurolumenatlas.example.com
```

- `STRIPE_MONTHLY_PRICE_ID` should reference a recurring Price object configured for `$5`/month.
- `NEXT_PUBLIC_SITE_URL` is optional in development but keeps checkout redirects accurate in production.

## 🧰 Customisation
- Swap the placeholder analytics hook in `components/AnalyticsPlaceholder.tsx` with your provider snippet.
- Connect the newsletter form and contact form to your preferred email/CRM service.
- Update Open Graph image URLs in `app/layout.tsx` once your brand artwork is ready.
- Adjust theme colours by editing the CSS variables in `app/globals.css`.

## 📚 Content references
References live under **About → References**. Update `data/references.ts` with your preferred bibliography in APA format.

---
Crafted for motivated learners who want science-backed clarity without jargon.

# Aurora Automate Architecture

Aurora Automate is delivered as a TypeScript monorepo with clear separation between backend services, frontend experience, and shared libraries. The platform is designed around a workflow that converts a source URL into multi-channel creative output and scheduled distribution.

## Monorepo layout

```
.
├── apps
│   ├── server             # Express + Prisma API, background jobs, metrics
│   └── web                # Next.js 14 app router UI
├── packages
│   ├── config             # Runtime configuration loader & schema
│   ├── observability      # Prometheus metrics helpers
│   └── shared             # Shared domain schemas and constants
├── docs                   # Architecture, deployment, observability references
└── README.md              # Getting started
```

## Backend (apps/server)

* **Framework:** Express 4 with TypeScript, Prisma ORM, SQLite database.
* **Domains:** Users, workspaces, campaigns, extracted assets, generated creatives, social accounts, scheduled posts, subscriptions.
* **Modules:**
  * `routes/` – REST endpoints grouped by functional domain (extraction, creatives, campaigns, posting, subscriptions, metrics).
  * `services/` – Content extraction (cheerio + jsdom), AI creative synthesis (deterministic templates, ready for OpenAI integration), social posting orchestrator (stub connectors + Prometheus counters), subscription enforcement helpers, Prisma client wrapper.
  * `jobs/` – Background refresh jobs (e.g., periodic re-scrape of source URLs).
  * `lib/` – Cross-cutting utilities such as error handling.
* **Persistence:** Prisma schema stored in `prisma/schema.prisma`. SQLite is used for local development; swap `DATABASE_URL` for PostgreSQL/MySQL in production.
* **Observability:** Metrics exported at `/metrics` using Prometheus exposition format with HTTP + background job histograms and counters.
* **Testing:** Vitest unit tests (example in `services/ai-generator.test.ts`).

## Frontend (apps/web)

* **Framework:** Next.js 14 (App Router) with React 18, TailwindCSS, React Query, next-themes.
* **UX Approach:** Premium, glassmorphism inspired design, dark mode, data-rich dashboard and marketing site.
* **Structure:**
  * `app/` – App Router routes (`/` marketing landing, `/app` dashboard shell, `/app/campaigns`, `/app/campaigns/[id]`, `/app/analytics`).
  * `components/` – Dashboard shell, cards, pipeline timeline, theme toggle, etc.
  * `lib/` – API client (axios) and UI helpers.
* **Data fetching:** Client-side with React Query pointing to the API (`NEXT_PUBLIC_API_URL` configurable). Includes optimistic cache invalidation on mutations.
* **Styling:** Tailwind + custom gradients, consistent typographic scale, responsive layout, dark mode ready.

## Shared libraries

* `@main/shared` provides Zod schemas and constants used by both server and frontend, ensuring consistent validation and typing.
* `@main/config` centralizes environment variable parsing and validation (dotenv + zod).
* `@main/observability` wraps Prometheus `prom-client` metrics and default collectors.

## Workflow orchestration

1. **Content extraction** – `/api/extraction` fetches a URL, parses metadata/media, persists as `ExtractedAsset`.
2. **Creative generation** – `/api/creatives/generate` uses deterministic templates to simulate AI output across text, image, video. Each creative is stored and returned to UI.
3. **Publishing** – `/api/posting/schedule` validates subscription limits and schedules posts per social account. Publishing status is updated immediately (stub connectors) and reflected in metrics.
4. **Subscriptions** – `/api/subscriptions` maintain plan state; plan limits enforced before scheduling posts.

## Background jobs

* `rescrapeJob` periodically refreshes recently extracted assets (interval configurable via `RESCRAPE_INTERVAL_MINUTES`).

## Extensibility

* Replace deterministic AI generator with OpenAI/Vertex API by plugging into `services/ai-generator.ts`.
* Extend `social-poster.ts` to integrate with real social APIs (e.g., Meta Marketing API) while preserving metric instrumentation.
* Swap SQLite for production database by updating `DATABASE_URL` and running Prisma migrations.

## Security considerations

* All routes expect `x-user-id` and `x-workspace-id` headers. Replace with JWT or session middleware when integrating authentication.
* Helmet configured for baseline hardening.
* Express JSON limit defaults to 2MB to prevent payload abuse.

## Monitoring & analytics

* Prometheus metrics ready for scraping at `/metrics`.
* Healthcheck available via `/health`.
* Frontend leverages instrumentation surfaces for displaying plan utilization; extend to real analytics via API.

# Aurora Automate

Aurora Automate is a SaaS marketing automation platform that extracts insights from any URL, synthesizes AI-powered advertisements, and publishes the creatives across your connected social channels. The project ships as a full-stack monorepo with a premium Next.js experience, Express + Prisma API, subscriptions, observability, and documentation.

## Features

- **URL content extraction** with text, image, and metadata capture.
- **AI creative generation** (text, image, video storyboards) using deterministic templates that can be swapped with OpenAI or other providers.
- **Automated scheduling** to multiple social networks with plan-based quota enforcement.
- **Subscription-ready** data model supporting trialing, active, past-due, and canceled states.
- **Premium UI/UX** with marketing site, dashboard, dark mode, and real-time pipeline visuals.
- **Observability built-in** via Prometheus metrics (`/metrics`) and health checks.
- **Seed data** for instant exploration of campaigns, creatives, and scheduled posts.

## Repository structure

```
.
├── apps
│   ├── server   # Express API, Prisma ORM, background jobs
│   └── web      # Next.js 14 App Router frontend
├── packages     # Shared config, observability, and domain schemas
├── docs         # Architecture, deployment, observability guides
└── .github      # CI workflow
```

## Quickstart

1. **Install dependencies**

   ```bash
   npm install
   ```

   > If your environment blocks the npm registry, use an internal mirror or install dependencies manually.

2. **Configure environment**

   Copy `.env.example` (create from snippet below) into `apps/server/.env`.

   ```
   DATABASE_URL="file:./dev.db"
   PORT=4000
   FRONTEND_URL="http://localhost:3000"
   SESSION_SECRET="change-me"
   RESCRAPE_INTERVAL_MINUTES=720
   ```

3. **Generate Prisma client & database**

   ```bash
   npm run prisma:generate --workspace @main/server
   npm run prisma:migrate --workspace @main/server
   npm run seed
   ```

4. **Start services**

   ```bash
   npm run dev --workspace @main/server
   npm run dev --workspace @main/web
   ```

5. Visit `http://localhost:3000` to explore the marketing site and signed-in workspace dashboard (seed data uses headers `x-user-id: seed-user`, `x-workspace-id: seed-workspace`).

## Testing

- Backend unit tests: `npm test --workspace @main/server`
- Frontend Playwright smoke tests placeholder: `npm test --workspace @main/web`

> Running tests requires dependencies to be installed. In restricted environments, document skipped steps in your CI logs.

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [Observability](./docs/OBSERVABILITY.md)

## Monitoring

- `GET /health` – health check
- `GET /metrics` – Prometheus metrics (`http_request_duration_seconds`, `background_job_duration_seconds`, `scheduled_posts_total`)

## License

MIT

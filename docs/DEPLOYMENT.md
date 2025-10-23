# Deployment Guide

Aurora Automate ships with scripts to run locally via Node.js and to deploy using container-based workflows.

## Prerequisites

* Node.js 18.18+
* npm 9+
* SQLite (bundled by Prisma) for local development.
* Docker (optional) for containerized deployment.

## Environment variables

Create an `.env` file inside `apps/server` with the following defaults:

```
DATABASE_URL="file:./dev.db"
PORT=4000
FRONTEND_URL="http://localhost:3000"
SESSION_SECRET="change-me"
RESCRAPE_INTERVAL_MINUTES=720
```

Optional integrations:

```
OPENAI_API_KEY="sk-..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Local development

```bash
# Install dependencies (workspace-aware)
npm install

# Generate Prisma client
npm run prisma:generate --workspace @main/server

# Apply migrations & seed data
npm run prisma:migrate --workspace @main/server
npm run seed

# Start backend
npm run dev --workspace @main/server

# Start frontend
npm run dev --workspace @main/web
```

Visit `http://localhost:3000` for the UI. The API is available at `http://localhost:4000`.

## Production build

```bash
# Build shared packages, server, and web
npm run build

# Start API (after copying dist & .env)
npm run start --workspace @main/server

# Start Next.js server
npm run start --workspace @main/web
```

## Docker Compose

Create the following `docker-compose.yml` to orchestrate services (example snippet):

```yaml
version: "3.9"
services:
  api:
    build: ./apps/server
    env_file: ./apps/server/.env
    ports:
      - "4000:4000"
    volumes:
      - ./apps/server/prisma:/app/prisma
  web:
    build: ./apps/web
    environment:
      NEXT_PUBLIC_API_URL: "http://api:4000/api"
    ports:
      - "3000:3000"
    depends_on:
      - api
```

## Database migrations

Prisma migration commands are already wired. To generate new migrations:

```bash
npm run prisma:migrate --workspace @main/server -- create <name>
```

## CI/CD

See `.github/workflows/ci.yml` for automated lint/test/build on push and PR. Customize for your cloud provider (e.g., GitHub Actions → Fly.io, Render, Vercel).

## Monitoring

Expose `/metrics` endpoint of the API to your Prometheus server. Example scrape config:

```yaml
- job_name: "aurora-automate"
  metrics_path: /metrics
  static_configs:
    - targets: ["api:4000"]
```

## Subscription billing

Stripe integration is stubbed. To use in production, inject `STRIPE_SECRET_KEY` and update the subscription routes to call real Stripe APIs.

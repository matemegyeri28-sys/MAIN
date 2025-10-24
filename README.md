# Lumina Automate

Lumina Automate is a SaaS marketing automation platform that ingests content from any URL, generates AI-powered ad creatives, and schedules multi-channel publishing through connected social accounts. The project ships as a monorepo containing a FastAPI backend and a Next.js frontend with a modern, premium UI and built-in dark mode.

## Features

- **Content ingestion** – Extracts text, imagery, and metadata from target URLs to build reusable content sources.
- **AI-inspired creative generation** – Produces text, image prompt, and video script creatives using a deterministic mock AI engine.
- **Automated publishing** – Schedules creatives across connected social accounts through background jobs with delivery tracking.
- **Subscription model** – Includes tiered subscription plans, trial management, and simulated billing hooks.
- **Premium UI** – Dark mode, gradient hero sections, and interactive dashboards built with Next.js, Tailwind CSS, and Headless UI.
- **Operations ready** – Docker Compose stack, GitHub Actions CI, Prometheus metrics endpoint, and seeding utilities.

## Project structure

```
.
├── backend            # FastAPI application, domain services, and tests
│   ├── app
│   │   ├── api        # REST endpoints
│   │   ├── core       # Settings and database helpers
│   │   ├── models     # SQLModel models
│   │   ├── schemas    # Pydantic response/request models
│   │   └── services   # Content extraction, ad generation, posting, subscriptions
│   └── tests          # Pytest suite
├── frontend           # Next.js marketing site and product dashboard
├── scripts            # Seed data utilities
├── docker-compose.yml # Local development stack
└── .github/workflows  # CI pipelines
```

## Getting started

### Prerequisites

- Docker and Docker Compose **or**
- Python 3.11 + Node.js 20.x

### 1. Clone and configure

```bash
git clone <repo-url>
cd MAIN
cp .env.example .env
```

### 2. Bootstrap with Docker

```bash
docker compose up --build
```

- Backend available at [http://localhost:8000/docs](http://localhost:8000/docs)
- Frontend available at [http://localhost:3000](http://localhost:3000)

### 3. Seed demo data

In a separate shell execute:

```bash
docker compose exec backend python -m scripts.seed_data
```

This provisions a demo workspace, subscription plans, and a placeholder social account.

### 4. Run tests locally

```bash
# Backend
docker compose exec backend pytest

# Frontend
docker compose exec frontend npm run lint
```

### Manual setup (without Docker)

1. Install backend dependencies:

    ```bash
    cd backend
    python -m venv .venv && source .venv/bin/activate
    pip install -r requirements.txt
    python -m scripts.seed_data
    uvicorn app.main:app --reload
    ```

2. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Monitoring & observability

- Prometheus-compatible metrics are exposed at `/metrics` via `prometheus-fastapi-instrumentator`.
- CI pipeline (`.github/workflows/ci.yml`) validates backend tests, frontend linting, and production builds on every push/PR.

## Roadmap

- Replace mock AI engine with pluggable LLM providers.
- Integrate OAuth flows for social platforms and Stripe billing.
- Expand creative analytics with channel-specific performance metrics.

## License

MIT

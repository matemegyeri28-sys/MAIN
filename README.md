# Lovable Broadcast Admin Dashboard

A production-ready Lovable React + TypeScript + Tailwind dashboard for orchestrating broadcast code pushes against an external FastAPI backend.

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and set the following variables:

- `VITE_APP_NAME` – Display name used in the UI.
- `VITE_BACKEND_BASE_URL` – HTTPS endpoint for the FastAPI backend, or `mock` to enable built-in mock data.
- `VITE_POLL_INTERVAL_MS` – Polling cadence for broadcast request updates (default 1000).
- `VITE_POLL_TIMEOUT_MS` – Maximum duration to poll before timing out (default 60000).

## Testing

```bash
npm test
```

## Build

```bash
npm run build
```

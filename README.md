# Marketing Automation Demo

This repository hosts a self-contained SaaS-style demo that showcases the full pipeline of:

1. Extracting content from any public URL,
2. Generating channel-specific advertisement creatives,
3. Scheduling the generated creatives for automatic publishing across multiple social networks.

The implementation intentionally avoids third-party npm dependencies so it can run in restricted environments without internet package access.

## Project layout

```
.
├── apps
│   ├── server   # ESM HTTP API built on Node.js core modules
│   └── web      # Static UI + lightweight dev server
├── packages
│   └── shared   # Shared content parsing + creative generation utilities
├── scripts
│   └── dev.mjs  # Helper that boots both workspaces together
└── README.md
```

## Prerequisites

- Node.js 18.18 or later (provides the built-in `fetch` API and experimental `--watch` flag)

## Installation

No external packages are required. From the repository root run:

```
npm install
```

This will simply register the workspaces so local `npm run` commands operate correctly.

## Running the stack

Open two terminals or rely on the helper script:

```
npm run dev
```

The helper spawns the following processes:

- `@main/server`: REST API available at <http://localhost:4000>
- `@main/web`: Static UI dev server at <http://localhost:3000>

### Manual workspace commands

```
# API
npm run -w @main/server dev

# Web UI
npm run -w @main/web dev
```

Stop the processes with `Ctrl+C`.

## API Overview

### `POST /api/campaigns`

```json
{
  "url": "https://example.com",
  "name": "Optional custom campaign name",
  "platforms": ["facebook", "instagram", "linkedin"]
}
```

Response includes the generated creatives and posting schedule.

### `GET /api/campaigns`

Returns every campaign, creative, and scheduled slot stored in memory along with summarized metrics.

### `POST /api/creatives/preview`

Accepts raw text and produces platform variations + a suggested schedule without storing anything.

## Front-end walkthrough

Visit <http://localhost:3000> to access the dashboard:

- Submit a URL and pick social platforms to generate a full campaign.
- Review creatives tailored per platform with quick keyword highlights.
- Inspect the automated posting cadence spaced out every six hours.

The UI communicates with the API using simple `fetch` calls, so it can be adapted to other front-end stacks easily.

## Data persistence

All information lives in-memory to keep the demo portable. Restarting the API clears the workspace. The architecture is modular so storage can be swapped for a database in more advanced deployments.

## License

MIT

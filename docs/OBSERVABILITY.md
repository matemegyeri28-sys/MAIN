# Observability

Aurora Automate exposes Prometheus-compatible metrics and includes structured logging to support production monitoring.

## Metrics

* **Endpoint:** `GET /metrics`
* **Format:** Prometheus text exposition
* **Default collectors:** Node.js process metrics via `prom-client` (CPU, memory, event loop)
* **Custom metrics:**
  * `http_request_duration_seconds` – Histogram labeled with `method`, `route`, `status_code`
  * `background_job_duration_seconds` – Histogram labeled with `job`, `status`
  * `scheduled_posts_total` – Counter labeled with `channel`, `status`

### Integration example

```yaml
- job_name: "aurora-api"
  metrics_path: /metrics
  static_configs:
    - targets: ["api:4000"]
```

## Logging

* Express errors bubble to `errorHandler` with stack traces.
* Successful API calls log via `morgan` (switches between `dev` and `combined` formats based on `NODE_ENV`).

## Health checks

* `GET /health` returns `{ "status": "ok" }`. Use this for container readiness probes.

## Alerting ideas

* Trigger alerts when `scheduled_posts_total{status="failed"}` increases rapidly.
* Watch 95th percentile of `http_request_duration_seconds` for latency regressions.
* Monitor job duration histogram for the `rescrapeJob` to detect extraction issues.

## Dashboards

* Suggested widgets:
  * API latency heatmap (from `http_request_duration_seconds`)
  * Creative generation throughput (# of generated assets per campaign)
  * Subscription status distribution (active vs. trialing vs. past_due)

## Tracing (future work)

* OpenTelemetry instrumentation can be layered in via `@opentelemetry/sdk-node` with minimal changes. Start from Express instrumentation and propagate trace headers to downstream AI/social providers when implemented.

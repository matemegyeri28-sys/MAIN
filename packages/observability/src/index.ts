import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;

const register = new client.Registry();
collectDefaultMetrics({ register });

const httpRequestDurationSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration histogram",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5]
});

register.registerMetric(httpRequestDurationSeconds);

const backgroundJobDurationSeconds = new client.Histogram({
  name: "background_job_duration_seconds",
  help: "Background job duration",
  labelNames: ["job", "status"],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

register.registerMetric(backgroundJobDurationSeconds);

export const metrics = {
  register,
  httpRequestDurationSeconds,
  backgroundJobDurationSeconds,
  counter: (name: string, help: string, labelNames: string[] = []) => {
    const counter = new client.Counter({ name, help, labelNames });
    register.registerMetric(counter);
    return counter;
  }
};

export const getMetrics = async () => register.metrics();

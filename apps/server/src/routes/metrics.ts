import { Router } from "express";
import { getMetrics } from "@main/observability";

export const metricsRouter = Router();

metricsRouter.get("/", async (_req, res) => {
  const metrics = await getMetrics();
  res.set("Content-Type", "text/plain");
  res.send(metrics);
});

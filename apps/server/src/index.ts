import "express-async-errors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "@main/config";
import { metrics } from "@main/observability";
import { router } from "./routes/index.js";
import { errorHandler } from "./lib/error-handler.js";
import { metricsRouter } from "./routes/metrics.js";
import "./jobs/rescrape.js";
import { createServer } from "http";

const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(helmet());
app.use(morgan(env.isDevelopment ? "dev" : "combined"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", router);
app.use("/metrics", metricsRouter);
app.use(errorHandler);

const server = createServer(app);

server.listen(env.PORT, () => {
  console.log(`API server listening on port ${env.PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Received SIGINT, shutting down gracefully");
  await metrics.register.metrics();
  server.close(() => {
    process.exit(0);
  });
});

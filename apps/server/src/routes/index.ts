import { Router } from "express";
import { extractionRouter } from "./extraction.js";
import { creativeRouter } from "./creatives.js";
import { campaignRouter } from "./campaigns.js";
import { postingRouter } from "./posting.js";
import { subscriptionRouter } from "./subscriptions.js";

export const router = Router();

router.use((req, _res, next) => {
  const userId = req.header("x-user-id") ?? "seed-user";
  const workspaceId = req.header("x-workspace-id") ?? "seed-workspace";
  (req as any).context = {
    userId,
    workspaceId
  };
  next();
});

router.use("/extraction", extractionRouter);
router.use("/creatives", creativeRouter);
router.use("/campaigns", campaignRouter);
router.use("/posting", postingRouter);
router.use("/subscriptions", subscriptionRouter);

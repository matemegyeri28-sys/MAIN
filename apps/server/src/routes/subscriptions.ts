import { Router } from "express";
import { prisma } from "../services/prisma.js";
import { z } from "zod";
import { WorkspacePlanSchema } from "@main/shared";

const UpdateSubscriptionSchema = z.object({
  plan: WorkspacePlanSchema,
  status: z.enum(["trialing", "active", "past_due", "canceled"]).default("active")
});

export const subscriptionRouter = Router();

subscriptionRouter.get("/", async (req, res) => {
  const workspaceId = (req as any).context.workspaceId as string;
  const subscriptions = await prisma.subscription.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" }
  });
  res.json({ subscriptions });
});

subscriptionRouter.post("/", async (req, res) => {
  const workspaceId = (req as any).context.workspaceId as string;
  const parsed = UpdateSubscriptionSchema.parse(req.body);

  const subscription = await prisma.subscription.create({
    data: {
      workspaceId,
      plan: parsed.plan,
      status: parsed.status
    }
  });

  res.status(201).json({ subscription });
});

subscriptionRouter.put("/:id", async (req, res) => {
  const parsed = UpdateSubscriptionSchema.parse(req.body);
  const subscription = await prisma.subscription.update({
    where: { id: req.params.id },
    data: {
      plan: parsed.plan,
      status: parsed.status
    }
  });
  res.json({ subscription });
});

import { Router } from "express";
import { schedulePost } from "../services/social-poster.js";
import { prisma } from "../services/prisma.js";
import { ensurePlanCapacity } from "../services/subscription.js";
import { z } from "zod";
import { SocialChannelSchema } from "@main/shared";

const ScheduleSchema = z.object({
  creativeId: z.string(),
  channel: SocialChannelSchema,
  scheduledAt: z.string().transform((val) => new Date(val))
});

export const postingRouter = Router();

postingRouter.post("/schedule", async (req, res) => {
  const workspaceId = (req as any).context.workspaceId as string;
  const userId = (req as any).context.userId as string;

  const parsed = ScheduleSchema.parse(req.body);

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId }
  });

  if (!workspace) {
    throw Object.assign(new Error("Workspace not found"), { status: 404 });
  }

  await ensurePlanCapacity(workspaceId, workspace.plan, 1);

  const scheduled = await schedulePost({
    creativeId: parsed.creativeId,
    channel: parsed.channel,
    scheduledAt: parsed.scheduledAt,
    workspaceId,
    userId
  });

  res.status(201).json({ scheduled });
});

postingRouter.get("/", async (req, res) => {
  const workspaceId = (req as any).context.workspaceId as string;
  const posts = await prisma.scheduledPost.findMany({
    where: { socialAccount: { workspaceId } },
    include: { creative: true, socialAccount: true },
    orderBy: { scheduledAt: "desc" }
  });
  res.json({ posts });
});

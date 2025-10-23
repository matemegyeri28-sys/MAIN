import { Router } from "express";
import { prisma } from "../services/prisma.js";
import { z } from "zod";

const CreateCampaignSchema = z.object({
  name: z.string().min(3),
  goal: z.string().min(3)
});

export const campaignRouter = Router();

campaignRouter.get("/", async (req, res) => {
  const workspaceId = (req as any).context.workspaceId as string;
  const campaigns = await prisma.campaign.findMany({
    where: { workspaceId },
    include: {
      generatedAssets: true,
      scheduledPosts: true,
      extractedAssets: true
    },
    orderBy: { createdAt: "desc" }
  });

  res.json({ campaigns });
});

campaignRouter.post("/", async (req, res) => {
  const workspaceId = (req as any).context.workspaceId as string;
  const parsed = CreateCampaignSchema.parse(req.body);

  const campaign = await prisma.campaign.create({
    data: {
      name: parsed.name,
      goal: parsed.goal,
      workspaceId
    }
  });

  res.status(201).json({ campaign });
});

campaignRouter.get("/:id", async (req, res) => {
  const campaign = await prisma.campaign.findUnique({
    where: { id: req.params.id },
    include: {
      generatedAssets: true,
      scheduledPosts: { include: { creative: true, socialAccount: true } },
      extractedAssets: true
    }
  });

  if (!campaign) {
    throw Object.assign(new Error("Campaign not found"), { status: 404 });
  }

  res.json({ campaign });
});

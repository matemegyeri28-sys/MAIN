import { Router } from "express";
import { ExtractRequestSchema } from "@main/shared";
import { extractFromUrl } from "../services/content-extractor.js";
import { prisma } from "../services/prisma.js";
import { metrics } from "@main/observability";

export const extractionRouter = Router();

extractionRouter.post("/", async (req, res) => {
  const parsed = ExtractRequestSchema.parse({
    ...req.body,
    userId: (req as any).context.userId,
    workspaceId: (req as any).context.workspaceId
  });

  const timer = metrics.httpRequestDurationSeconds.startTimer({
    method: req.method,
    route: req.route?.path ?? "/extraction",
    status_code: "pending"
  });

  try {
    const content = await extractFromUrl(parsed.url);

    const campaign = parsed.campaignId
      ? await prisma.campaign.findUnique({ where: { id: parsed.campaignId } })
      : await prisma.campaign.findFirst({
          where: { workspaceId: parsed.workspaceId },
          orderBy: { createdAt: "desc" }
        });

    if (!campaign) {
      throw Object.assign(new Error("No campaign found to attach extracted asset"), {
        status: 400
      });
    }

    const asset = await prisma.extractedAsset.create({
      data: {
        url: parsed.url,
        title: content.title,
        description: content.description,
        body: content.body,
        images: content.images,
        videos: content.videos,
        tags: parsed.tags ?? [],
        campaignId: campaign.id
      }
    });

    timer({ status_code: "201" });

    res.status(201).json({ asset });
  } catch (error: any) {
    timer({ status_code: String(error.status ?? 500) });
    throw error;
  }
});

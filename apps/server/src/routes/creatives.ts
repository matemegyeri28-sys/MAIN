import { Router } from "express";
import { CreativeRequestSchema } from "@main/shared";
import { generateCreatives } from "../services/ai-generator.js";
import { prisma } from "../services/prisma.js";

export const creativeRouter = Router();

creativeRouter.post("/generate", async (req, res) => {
  const parsed = CreativeRequestSchema.parse({
    ...req.body,
    userId: (req as any).context.userId,
    workspaceId: (req as any).context.workspaceId
  });

  const asset = await prisma.extractedAsset.findUnique({ where: { id: parsed.extractedAssetId } });
  if (!asset) {
    throw Object.assign(new Error("Extracted asset not found"), { status: 404 });
  }

  const generated = await generateCreatives(parsed, asset);

  const saved = await Promise.all(
    generated.map((creative) =>
      prisma.generatedCreative.create({
        data: {
          campaignId: parsed.campaignId,
          type: creative.type,
          title: creative.title,
          content: creative.content,
          callToAction: creative.callToAction,
          tone: creative.tone,
          targetAudience: creative.targetAudience,
          extractedAssetId: asset.id
        }
      })
    )
  );

  res.status(201).json({ creatives: saved });
});

creativeRouter.get("/campaign/:campaignId", async (req, res) => {
  const creatives = await prisma.generatedCreative.findMany({
    where: { campaignId: req.params.campaignId },
    orderBy: { createdAt: "desc" }
  });
  res.json({ creatives });
});

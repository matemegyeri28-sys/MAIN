import { env } from "@main/config";
import { prisma } from "../services/prisma.js";
import { extractFromUrl } from "../services/content-extractor.js";

export const rescrapeJob = async () => {
  const assets = await prisma.extractedAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });

  for (const asset of assets) {
    try {
      const refreshed = await extractFromUrl(asset.url);
      await prisma.extractedAsset.update({
        where: { id: asset.id },
        data: {
          body: refreshed.body,
          images: refreshed.images,
          videos: refreshed.videos,
          title: refreshed.title,
          description: refreshed.description
        }
      });
    } catch (error) {
      console.warn(`Failed to refresh asset ${asset.id}:`, error);
    }
  }
};

if (env.isDevelopment) {
  const interval = env.RESCRAPE_INTERVAL_MINUTES * 60 * 1000;
  setInterval(rescrapeJob, interval).unref();
}

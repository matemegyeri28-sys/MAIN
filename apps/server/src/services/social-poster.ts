import { prisma } from "./prisma.js";
import { metrics } from "@main/observability";

const postCounter = metrics.counter("scheduled_posts_total", "Total number of posts scheduled", [
  "channel",
  "status"
]);

export interface PostPayload {
  creativeId: string;
  channel: string;
  scheduledAt: Date;
  workspaceId: string;
  userId: string;
}

const simulateNetworkDelay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const schedulePost = async (payload: PostPayload) => {
  const start = Date.now();
  try {
    const account = await prisma.socialAccount.findFirst({
      where: {
        workspaceId: payload.workspaceId,
        provider: payload.channel as any
      }
    });

    if (!account) {
      throw Object.assign(new Error(`No social account connected for ${payload.channel}`), {
        status: 400
      });
    }

    await simulateNetworkDelay();

    const scheduled = await prisma.scheduledPost.create({
      data: {
        channel: payload.channel as any,
        scheduledAt: payload.scheduledAt,
        creativeId: payload.creativeId,
        socialAccountId: account.id,
        status: payload.scheduledAt <= new Date() ? "published" : "pending",
        publishedAt: payload.scheduledAt <= new Date() ? new Date() : null
      }
    });

    postCounter.labels(payload.channel, scheduled.status).inc();

    metrics.backgroundJobDurationSeconds.observe(
      { job: "schedulePost", status: "success" },
      (Date.now() - start) / 1000
    );

    return scheduled;
  } catch (error) {
    metrics.backgroundJobDurationSeconds.observe(
      { job: "schedulePost", status: "error" },
      (Date.now() - start) / 1000
    );
    postCounter.labels(payload.channel, "failed").inc();
    throw error;
  }
};

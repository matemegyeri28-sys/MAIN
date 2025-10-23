import { prisma } from "./prisma.js";
import { PLAN_LIMITS, type WorkspacePlan } from "@main/shared";

export const ensurePlanCapacity = async (
  workspaceId: string,
  plan: WorkspacePlan,
  requestedPosts: number
) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: { subscriptions: true }
  });

  if (!workspace) {
    throw Object.assign(new Error("Workspace not found"), { status: 404 });
  }

  const activeSubscription = workspace.subscriptions.find((sub) => sub.status === "active");
  if (!activeSubscription) {
    throw Object.assign(new Error("No active subscription"), { status: 402 });
  }

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const postsThisMonth = await prisma.scheduledPost.count({
    where: {
      createdAt: { gte: monthStart },
      socialAccount: { workspaceId }
    }
  });

  if (postsThisMonth + requestedPosts > PLAN_LIMITS[plan].postsPerMonth) {
    throw Object.assign(new Error("Plan limit exceeded"), { status: 403 });
  }
};

export const upsertSubscription = async (
  workspaceId: string,
  plan: WorkspacePlan,
  status: "trialing" | "active" | "past_due" | "canceled"
) => {
  return prisma.subscription.upsert({
    where: { workspaceId_plan: { workspaceId, plan } },
    create: { workspaceId, plan, status },
    update: { status }
  });
};

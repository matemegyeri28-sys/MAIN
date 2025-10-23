import { z } from "zod";

export const ExtractRequestSchema = z.object({
  url: z.string().url(),
  workspaceId: z.string().min(1),
  campaignId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  userId: z.string().min(1)
});

export type ExtractRequest = z.infer<typeof ExtractRequestSchema>;

export const ExtractedAssetSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  title: z.string().optional(),
  description: z.string().optional(),
  body: z.string(),
  images: z.array(z.string().url()).default([]),
  videos: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([])
});

export type ExtractedAsset = z.infer<typeof ExtractedAssetSchema>;

export const CreativeRequestSchema = z.object({
  workspaceId: z.string(),
  campaignId: z.string(),
  extractedAssetId: z.string(),
  userId: z.string(),
  formats: z.array(z.enum(["text", "image", "video"])).default(["text", "image"])
});

export type CreativeRequest = z.infer<typeof CreativeRequestSchema>;

export const GeneratedCreativeSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "image", "video"]),
  title: z.string(),
  content: z.string(),
  callToAction: z.string(),
  targetAudience: z.string().optional(),
  tone: z.string().optional()
});

export type GeneratedCreative = z.infer<typeof GeneratedCreativeSchema>;

export const SocialChannelSchema = z.enum([
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "tiktok"
]);

export type SocialChannel = z.infer<typeof SocialChannelSchema>;

export const PostScheduleSchema = z.object({
  creativeId: z.string(),
  channel: SocialChannelSchema,
  scheduledAt: z.date(),
  timezone: z.string().default("UTC")
});

export type PostSchedule = z.infer<typeof PostScheduleSchema>;

export const WorkspacePlanSchema = z.enum(["starter", "growth", "scale"]);

export type WorkspacePlan = z.infer<typeof WorkspacePlanSchema>;

export const SubscriptionStatusSchema = z.enum([
  "trialing",
  "active",
  "past_due",
  "canceled"
]);

export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;

export const ApiErrorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  details: z.any().optional()
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const isWorkspacePlan = (value: string): value is WorkspacePlan =>
  WorkspacePlanSchema.safeParse(value).success;

export const AVAILABLE_CHANNELS: SocialChannel[] = [
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "tiktok"
];

export const PLAN_LIMITS: Record<WorkspacePlan, { campaigns: number; postsPerMonth: number }> = {
  starter: { campaigns: 5, postsPerMonth: 30 },
  growth: { campaigns: 25, postsPerMonth: 150 },
  scale: { campaigns: 100, postsPerMonth: 500 }
};

export const FEATURE_FLAGS = {
  aiImageUpscaling: false,
  aiVideoVoiceOver: true,
  autoHashtagGeneration: true
};

export type WorkspacePlan = "starter" | "growth" | "scale";
export type MemberRole = "owner" | "admin" | "member";
export type SocialProvider = "facebook" | "instagram" | "twitter" | "linkedin" | "tiktok";
export type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled";
export type CreativeType = "text" | "image" | "video";
export type PostStatus = "pending" | "published" | "failed";

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  plan: WorkspacePlan;
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  goal: string;
  workspaceId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExtractedAsset {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  body: string;
  images: string[];
  videos: string[];
  tags: string[];
  campaignId: string;
  createdAt: Date;
}

export interface GeneratedCreative {
  id: string;
  campaignId: string;
  type: CreativeType;
  title: string;
  content: string;
  callToAction: string;
  tone: string | null;
  targetAudience: string | null;
  extractedAssetId: string | null;
  createdAt: Date;
}

export interface SocialAccount {
  id: string;
  provider: SocialProvider;
  accountName: string;
  accessToken: string;
  workspaceId: string;
  createdAt: Date;
}

export interface ScheduledPost {
  id: string;
  status: PostStatus;
  scheduledAt: Date;
  publishedAt: Date | null;
  channel: SocialProvider;
  creativeId: string;
  socialAccountId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  workspaceId: string;
  plan: WorkspacePlan;
  status: SubscriptionStatus;
  trialEndsAt: Date | null;
  renewsAt: Date | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class PrismaClient {
  user: {
    findUnique(args: { where: Partial<Record<"id" | "email", string>> }): Promise<User | null>;
    create(args: { data: Partial<User> & { email: string } }): Promise<User>;
  };
  workspace: {
    findUnique(args: { where: Partial<Record<"id", string>>; include?: { subscriptions?: boolean } }): Promise<Workspace & { subscriptions?: Subscription[] } | null>;
    create(args: { data: any }): Promise<Workspace>;
  };
  campaign: {
    findMany(args?: { where?: any; include?: any; orderBy?: Record<string, "asc" | "desc"> }): Promise<any[]>;
    create(args: { data: any }): Promise<Campaign>;
    findUnique(args: { where: { id: string }; include?: any }): Promise<any | null>;
    findFirst(args?: { where?: any; orderBy?: Record<string, "asc" | "desc"> }): Promise<Campaign | null>;
  };
  extractedAsset: {
    create(args: { data: any }): Promise<ExtractedAsset>;
    findUnique(args: { where: { id: string } }): Promise<ExtractedAsset | null>;
  };
  generatedCreative: {
    create(args: { data: any }): Promise<GeneratedCreative>;
    createMany(args: { data: any[] }): Promise<{ count: number }>;
    findMany(args?: { where?: any; orderBy?: Record<string, "asc" | "desc"> }): Promise<GeneratedCreative[]>;
  };
  socialAccount: {
    findFirst(args: { where: any }): Promise<SocialAccount | null>;
  };
  scheduledPost: {
    create(args: { data: any }): Promise<ScheduledPost>;
    findMany(args?: { where?: any; include?: any; orderBy?: Record<string, "asc" | "desc"> }): Promise<any[]>;
    count(args?: { where?: any }): Promise<number>;
  };
  subscription: {
    findMany(args?: { where?: any; orderBy?: Record<string, "asc" | "desc"> }): Promise<Subscription[]>;
    create(args: { data: any }): Promise<Subscription>;
    update(args: { where: { id: string }; data: any }): Promise<Subscription>;
    upsert(args: { where: { workspaceId_plan: { workspaceId: string; plan: WorkspacePlan } }; create: any; update: any }): Promise<Subscription>;
  };
  $disconnect(): Promise<void>;
}

export default PrismaClient;

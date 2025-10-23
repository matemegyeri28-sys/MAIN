const structuredCloneFn: <T>(value: T) => T =
  typeof globalThis.structuredClone === "function"
    ? globalThis.structuredClone
    : <T>(value: T) => JSON.parse(JSON.stringify(value));

type WorkspacePlan = "starter" | "growth" | "scale";
type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled";
type SocialProvider = "facebook" | "instagram" | "twitter" | "linkedin" | "tiktok";
type CreativeType = "text" | "image" | "video";
type PostStatus = "pending" | "published" | "failed";

type OrderDirection = "asc" | "desc";

type IncludeArg<T> = boolean | T | undefined;

interface Workspace {
  id: string;
  name: string;
  plan: WorkspacePlan;
  createdAt: Date;
  updatedAt: Date;
}

interface Subscription {
  id: string;
  workspaceId: string;
  plan: WorkspacePlan;
  status: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface Campaign {
  id: string;
  workspaceId: string;
  name: string;
  goal: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ExtractedAsset {
  id: string;
  workspaceId: string;
  campaignId: string | null;
  url: string;
  title: string | null;
  description: string | null;
  body: string;
  images: string[];
  videos: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface GeneratedCreative {
  id: string;
  workspaceId: string;
  campaignId: string | null;
  extractedAssetId: string | null;
  type: CreativeType;
  title: string;
  content: string;
  callToAction: string;
  tone?: string | null;
  targetAudience?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SocialAccount {
  id: string;
  workspaceId: string;
  provider: SocialProvider;
  handle: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ScheduledPost {
  id: string;
  workspaceId: string;
  socialAccountId: string;
  creativeId: string;
  channel: SocialProvider;
  scheduledAt: Date;
  status: PostStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const clone = <T>(value: T): T => structuredCloneFn(value);

const randomId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

const sortByDate = <T extends { createdAt: Date }>(items: T[], direction: OrderDirection = "desc") => {
  const copy = [...items];
  copy.sort((a, b) => {
    const diff = a.createdAt.getTime() - b.createdAt.getTime();
    return direction === "asc" ? diff : -diff;
  });
  return copy;
};

export class PrismaClient {
  private workspaces: Workspace[] = [];
  private subscriptions: Subscription[] = [];
  private campaigns: Campaign[] = [];
  private extractedAssets: ExtractedAsset[] = [];
  private generatedCreatives: GeneratedCreative[] = [];
  private socialAccounts: SocialAccount[] = [];
  private scheduledPosts: ScheduledPost[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    const now = new Date();
    const workspace: Workspace = {
      id: "seed-workspace",
      name: "Acme Growth Studio",
      plan: "growth",
      createdAt: now,
      updatedAt: now
    };

    const subscription: Subscription = {
      id: "sub_seed",
      workspaceId: workspace.id,
      plan: "growth",
      status: "active",
      createdAt: now,
      updatedAt: now
    };

    const campaign: Campaign = {
      id: "camp_seed",
      workspaceId: workspace.id,
      name: "Spring Launch",
      goal: "Drive qualified leads",
      createdAt: now,
      updatedAt: now
    };

    const asset: ExtractedAsset = {
      id: "asset_seed",
      workspaceId: workspace.id,
      campaignId: campaign.id,
      url: "https://example.com/blog/launch",
      title: "Launch Playbook",
      description: "Comprehensive launch strategy",
      body: "Maximise your campaign impact with our launch checklist...",
      images: ["https://images.example.com/launch-cover.jpg"],
      videos: [],
      tags: ["launch", "checklist"],
      createdAt: now,
      updatedAt: now
    };

    const creative: GeneratedCreative = {
      id: "creative_seed",
      workspaceId: workspace.id,
      campaignId: campaign.id,
      extractedAssetId: asset.id,
      type: "text",
      title: "Ready for lift-off?",
      content: "Turn your launch into a momentum machine with Acme's automation suite.",
      callToAction: "Start your trial",
      tone: "upbeat",
      targetAudience: "Marketing teams",
      createdAt: now,
      updatedAt: now
    };

    const account: SocialAccount = {
      id: "account_seed",
      workspaceId: workspace.id,
      provider: "twitter",
      handle: "@acme_marketing",
      createdAt: now,
      updatedAt: now
    };

    const post: ScheduledPost = {
      id: "post_seed",
      workspaceId: workspace.id,
      socialAccountId: account.id,
      creativeId: creative.id,
      channel: account.provider,
      scheduledAt: now,
      status: "published",
      publishedAt: now,
      createdAt: now,
      updatedAt: now
    };

    this.workspaces = [workspace];
    this.subscriptions = [subscription];
    this.campaigns = [campaign];
    this.extractedAssets = [asset];
    this.generatedCreatives = [creative];
    this.socialAccounts = [account];
    this.scheduledPosts = [post];
  }

  private withWorkspaceInclude(workspace: Workspace, include?: { subscriptions?: IncludeArg<true> }) {
    const result: any = clone(workspace);
    if (include?.subscriptions) {
      result.subscriptions = this.subscriptions
        .filter((sub) => sub.workspaceId === workspace.id)
        .map(clone);
    }
    return result;
  }

  private withCampaignInclude(campaign: Campaign, include?: {
    generatedAssets?: IncludeArg<true>;
    scheduledPosts?: IncludeArg<{ include?: { creative?: IncludeArg<true>; socialAccount?: IncludeArg<true> } }>;
    extractedAssets?: IncludeArg<true>;
  }) {
    const result: any = clone(campaign);
    if (!include) {
      return result;
    }

    if (include.generatedAssets) {
      result.generatedAssets = this.generatedCreatives
        .filter((creative) => creative.campaignId === campaign.id)
        .map(clone);
    }

    if (include.extractedAssets) {
      result.extractedAssets = this.extractedAssets
        .filter((asset) => asset.campaignId === campaign.id)
        .map(clone);
    }

    if (include.scheduledPosts) {
      const creativeIds = new Set(
        this.generatedCreatives.filter((creative) => creative.campaignId === campaign.id).map((creative) => creative.id)
      );
      let posts = this.scheduledPosts.filter((post) => creativeIds.has(post.creativeId));
      const spec = include.scheduledPosts === true ? {} : include.scheduledPosts ?? {};
      posts = posts.map((post) => this.withScheduledPostInclude(post, spec.include ?? spec));
      result.scheduledPosts = posts;
    }

    return result;
  }

  private withScheduledPostInclude(post: ScheduledPost, include?: { creative?: IncludeArg<true>; socialAccount?: IncludeArg<true> }) {
    const result: any = clone(post);
    if (!include) {
      return result;
    }

    if (include.creative) {
      const creative = this.generatedCreatives.find((item) => item.id === post.creativeId);
      result.creative = creative ? clone(creative) : null;
    }

    if (include.socialAccount) {
      const account = this.socialAccounts.find((item) => item.id === post.socialAccountId);
      result.socialAccount = account ? clone(account) : null;
    }

    return result;
  }

  workspace = {
    findUnique: async (args: { where: { id: string }; include?: { subscriptions?: IncludeArg<true> } }) => {
      const workspace = this.workspaces.find((item) => item.id === args.where.id);
      if (!workspace) {
        return null;
      }
      return this.withWorkspaceInclude(workspace, args.include);
    }
  };

  subscription = {
    findMany: async (args: { where?: { workspaceId?: string }; orderBy?: { createdAt?: OrderDirection } } = {}) => {
      let items = this.subscriptions;
      if (args.where?.workspaceId) {
        items = items.filter((sub) => sub.workspaceId === args.where?.workspaceId);
      }
      if (args.orderBy?.createdAt) {
        items = sortByDate(items, args.orderBy.createdAt);
      }
      return items.map(clone);
    },
    create: async (args: { data: { workspaceId: string; plan: WorkspacePlan; status: SubscriptionStatus } }) => {
      const now = new Date();
      const subscription: Subscription = {
        id: randomId("sub"),
        workspaceId: args.data.workspaceId,
        plan: args.data.plan,
        status: args.data.status,
        createdAt: now,
        updatedAt: now
      };
      this.subscriptions.push(subscription);
      return clone(subscription);
    },
    update: async (args: { where: { id: string }; data: Partial<{ plan: WorkspacePlan; status: SubscriptionStatus }> }) => {
      const subscription = this.subscriptions.find((item) => item.id === args.where.id);
      if (!subscription) {
        throw new Error(`Subscription ${args.where.id} not found`);
      }
      Object.assign(subscription, args.data, { updatedAt: new Date() });
      return clone(subscription);
    },
    upsert: async (args: {
      where: { workspaceId_plan: { workspaceId: string; plan: WorkspacePlan } };
      create: { workspaceId: string; plan: WorkspacePlan; status: SubscriptionStatus };
      update: { status: SubscriptionStatus };
    }) => {
      const existing = this.subscriptions.find(
        (item) =>
          item.workspaceId === args.where.workspaceId_plan.workspaceId &&
          item.plan === args.where.workspaceId_plan.plan
      );
      if (existing) {
        Object.assign(existing, { status: args.update.status, updatedAt: new Date() });
        return clone(existing);
      }
      return this.subscription.create({ data: args.create });
    }
  };

  campaign = {
    findMany: async (args: {
      where?: { workspaceId?: string };
      include?: Parameters<typeof this.withCampaignInclude>[1];
      orderBy?: { createdAt?: OrderDirection };
    } = {}) => {
      let items = this.campaigns;
      if (args.where?.workspaceId) {
        items = items.filter((campaign) => campaign.workspaceId === args.where?.workspaceId);
      }
      if (args.orderBy?.createdAt) {
        items = sortByDate(items, args.orderBy.createdAt);
      }
      return items.map((item) => this.withCampaignInclude(item, args.include));
    },
    findUnique: async (args: { where: { id: string }; include?: Parameters<typeof this.withCampaignInclude>[1] }) => {
      const campaign = this.campaigns.find((item) => item.id === args.where.id);
      if (!campaign) {
        return null;
      }
      return this.withCampaignInclude(campaign, args.include);
    },
    findFirst: async (args: {
      where?: { workspaceId?: string };
      orderBy?: { createdAt?: OrderDirection };
    }) => {
      const items = await this.campaign.findMany(args);
      return items.length > 0 ? items[0] : null;
    },
    create: async (args: { data: { workspaceId: string; name: string; goal: string } }) => {
      const now = new Date();
      const campaign: Campaign = {
        id: randomId("camp"),
        workspaceId: args.data.workspaceId,
        name: args.data.name,
        goal: args.data.goal,
        createdAt: now,
        updatedAt: now
      };
      this.campaigns.push(campaign);
      return clone(campaign);
    }
  };

  extractedAsset = {
    findMany: async (args: {
      where?: { campaignId?: string };
      orderBy?: { createdAt?: OrderDirection };
      take?: number;
    } = {}) => {
      let items = this.extractedAssets;
      if (args.where?.campaignId) {
        items = items.filter((asset) => asset.campaignId === args.where?.campaignId);
      }
      if (args.orderBy?.createdAt) {
        items = sortByDate(items, args.orderBy.createdAt);
      }
      if (typeof args.take === "number") {
        items = items.slice(0, args.take);
      }
      return items.map(clone);
    },
    findUnique: async (args: { where: { id: string } }) => {
      const asset = this.extractedAssets.find((item) => item.id === args.where.id);
      return asset ? clone(asset) : null;
    },
    create: async (args: {
      data: {
        campaignId?: string | null;
        workspaceId?: string;
        url: string;
        title?: string | null;
        description?: string | null;
        body: string;
        images?: string[];
        videos?: string[];
        tags?: string[];
      };
    }) => {
      const campaign = args.data.campaignId
        ? this.campaigns.find((item) => item.id === args.data.campaignId)
        : undefined;
      const workspaceId = args.data.workspaceId ?? campaign?.workspaceId;
      if (!workspaceId) {
        throw new Error("workspaceId is required to create an extracted asset");
      }
      const now = new Date();
      const asset: ExtractedAsset = {
        id: randomId("asset"),
        workspaceId,
        campaignId: args.data.campaignId ?? null,
        url: args.data.url,
        title: args.data.title ?? null,
        description: args.data.description ?? null,
        body: args.data.body,
        images: args.data.images ?? [],
        videos: args.data.videos ?? [],
        tags: args.data.tags ?? [],
        createdAt: now,
        updatedAt: now
      };
      this.extractedAssets.push(asset);
      return clone(asset);
    },
    update: async (args: {
      where: { id: string };
      data: Partial<Omit<ExtractedAsset, "id" | "workspaceId" | "campaignId" | "createdAt">>;
    }) => {
      const asset = this.extractedAssets.find((item) => item.id === args.where.id);
      if (!asset) {
        throw new Error(`Extracted asset ${args.where.id} not found`);
      }
      Object.assign(asset, args.data, { updatedAt: new Date() });
      return clone(asset);
    }
  };

  generatedCreative = {
    findMany: async (args: {
      where?: { campaignId?: string | null };
      orderBy?: { createdAt?: OrderDirection };
    } = {}) => {
      let items = this.generatedCreatives;
      if (args.where?.campaignId) {
        items = items.filter((creative) => creative.campaignId === args.where?.campaignId);
      }
      if (args.orderBy?.createdAt) {
        items = sortByDate(items, args.orderBy.createdAt);
      }
      return items.map(clone);
    },
    create: async (args: {
      data: {
        campaignId?: string | null;
        extractedAssetId?: string | null;
        type: CreativeType;
        title: string;
        content: string;
        callToAction: string;
        tone?: string | null;
        targetAudience?: string | null;
      };
    }) => {
      const asset = args.data.extractedAssetId
        ? this.extractedAssets.find((item) => item.id === args.data.extractedAssetId)
        : undefined;
      const campaign = args.data.campaignId
        ? this.campaigns.find((item) => item.id === args.data.campaignId)
        : undefined;
      const workspaceId = asset?.workspaceId ?? campaign?.workspaceId;
      if (!workspaceId) {
        throw new Error("Unable to resolve workspace for generated creative");
      }
      const now = new Date();
      const creative: GeneratedCreative = {
        id: randomId("creative"),
        workspaceId,
        campaignId: args.data.campaignId ?? null,
        extractedAssetId: args.data.extractedAssetId ?? null,
        type: args.data.type,
        title: args.data.title,
        content: args.data.content,
        callToAction: args.data.callToAction,
        tone: args.data.tone ?? null,
        targetAudience: args.data.targetAudience ?? null,
        createdAt: now,
        updatedAt: now
      };
      this.generatedCreatives.push(creative);
      return clone(creative);
    }
  };

  socialAccount = {
    findFirst: async (args: { where?: { workspaceId?: string; provider?: SocialProvider } } = {}) => {
      const account = this.socialAccounts.find((item) => {
        if (args.where?.workspaceId && item.workspaceId !== args.where.workspaceId) {
          return false;
        }
        if (args.where?.provider && item.provider !== args.where.provider) {
          return false;
        }
        return true;
      });
      return account ? clone(account) : null;
    }
  };

  scheduledPost = {
    create: async (args: {
      data: {
        channel: SocialProvider;
        scheduledAt: Date;
        creativeId: string;
        socialAccountId: string;
        status: PostStatus;
        publishedAt: Date | null;
      };
    }) => {
      const account = this.socialAccounts.find((item) => item.id === args.data.socialAccountId);
      if (!account) {
        throw new Error(`Social account ${args.data.socialAccountId} not found`);
      }
      const now = new Date();
      const post: ScheduledPost = {
        id: randomId("post"),
        workspaceId: account.workspaceId,
        socialAccountId: account.id,
        creativeId: args.data.creativeId,
        channel: args.data.channel,
        scheduledAt: args.data.scheduledAt,
        status: args.data.status,
        publishedAt: args.data.publishedAt ?? null,
        createdAt: now,
        updatedAt: now
      };
      this.scheduledPosts.push(post);
      return clone(post);
    },
    findMany: async (args: {
      where?: { socialAccount?: { workspaceId?: string } };
      include?: { creative?: IncludeArg<true>; socialAccount?: IncludeArg<true> };
      orderBy?: { scheduledAt?: OrderDirection };
    } = {}) => {
      let items = this.scheduledPosts;
      const workspaceId = args.where?.socialAccount?.workspaceId;
      if (workspaceId) {
        items = items.filter((post) => post.workspaceId === workspaceId);
      }
      if (args.orderBy?.scheduledAt) {
        const copy = [...items];
        copy.sort((a, b) => {
          const diff = a.scheduledAt.getTime() - b.scheduledAt.getTime();
          return args.orderBy?.scheduledAt === "asc" ? diff : -diff;
        });
        items = copy;
      }
      return items.map((item) => this.withScheduledPostInclude(item, args.include));
    },
    count: async (args: {
      where?: { createdAt?: { gte?: Date }; socialAccount?: { workspaceId?: string } };
    } = {}) => {
      return this.scheduledPosts.filter((post) => {
        if (args.where?.socialAccount?.workspaceId && post.workspaceId !== args.where.socialAccount.workspaceId) {
          return false;
        }
        if (args.where?.createdAt?.gte && post.createdAt < args.where.createdAt.gte) {
          return false;
        }
        return true;
      }).length;
    }
  };

  async $disconnect() {
    return;
  }
}

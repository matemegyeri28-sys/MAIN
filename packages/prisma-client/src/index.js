import { randomUUID } from "crypto";

export const WorkspacePlan = Object.freeze({
  starter: "starter",
  growth: "growth",
  scale: "scale"
});

export const MemberRole = Object.freeze({
  owner: "owner",
  admin: "admin",
  member: "member"
});

export const SocialProvider = Object.freeze({
  facebook: "facebook",
  instagram: "instagram",
  twitter: "twitter",
  linkedin: "linkedin",
  tiktok: "tiktok"
});

export const SubscriptionStatus = Object.freeze({
  trialing: "trialing",
  active: "active",
  past_due: "past_due",
  canceled: "canceled"
});

export const CreativeType = Object.freeze({
  text: "text",
  image: "image",
  video: "video"
});

export const PostStatus = Object.freeze({
  pending: "pending",
  published: "published",
  failed: "failed"
});

const clone = (value) => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const now = () => new Date();

const db = {
  users: [],
  workspaces: [],
  workspaceMembers: [],
  campaigns: [],
  extractedAssets: [],
  generatedCreatives: [],
  socialAccounts: [],
  scheduledPosts: [],
  subscriptions: []
};

declareSeedData();

function declareSeedData() {
  if (db.users.length > 0) {
    return;
  }

  const userId = randomUUID();
  const workspaceId = randomUUID();
  const campaignId = randomUUID();
  const extractedAssetId = randomUUID();

  const user = {
    id: userId,
    email: "founder@example.com",
    name: "Founding Marketer",
    createdAt: now(),
    updatedAt: now()
  };

  const workspace = {
    id: workspaceId,
    name: "Aurora Labs",
    plan: WorkspacePlan.growth,
    createdAt: now(),
    updatedAt: now()
  };

  const workspaceMember = {
    id: randomUUID(),
    role: MemberRole.owner,
    workspaceId,
    userId,
    createdAt: now()
  };

  const subscription = {
    id: randomUUID(),
    workspaceId,
    plan: WorkspacePlan.growth,
    status: SubscriptionStatus.active,
    renewsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    createdAt: now(),
    updatedAt: now()
  };

  const linkedinAccount = {
    id: randomUUID(),
    provider: SocialProvider.linkedin,
    accountName: "Aurora Labs LinkedIn",
    accessToken: "stub-token-linkedin",
    workspaceId,
    createdAt: now()
  };

  const twitterAccount = {
    id: randomUUID(),
    provider: SocialProvider.twitter,
    accountName: "Aurora Labs Twitter",
    accessToken: "stub-token-twitter",
    workspaceId,
    createdAt: now()
  };

  const campaign = {
    id: campaignId,
    name: "Launch of Aurora Automation",
    goal: "Drive demo signups",
    workspaceId,
    status: "active",
    createdAt: now(),
    updatedAt: now()
  };

  const extractedAsset = {
    id: extractedAssetId,
    url: "https://example.com/aurora-automation",
    title: "Aurora Automation Platform",
    description: "Revolutionize your marketing operations",
    body: "Aurora Automation helps modern marketing teams orchestrate campaigns with AI.",
    images: ["https://picsum.photos/seed/aurora/800/600"],
    videos: [],
    tags: ["automation", "ai"],
    campaignId,
    createdAt: now()
  };

  const creativeText = {
    id: randomUUID(),
    campaignId,
    type: CreativeType.text,
    title: "Transform marketing with Aurora",
    content: "Experience Aurora Automation and give your marketing team superpowers.",
    callToAction: "Book a live demo",
    tone: "Confident",
    targetAudience: "Marketing leaders",
    extractedAssetId,
    createdAt: now()
  };

  const creativeImage = {
    id: randomUUID(),
    campaignId,
    type: CreativeType.image,
    title: "Aurora Automation Visual",
    content: "https://picsum.photos/seed/aurora-image/1024/768",
    callToAction: "Start your trial",
    tone: "Inspiring",
    targetAudience: "Demand generation teams",
    extractedAssetId,
    createdAt: now()
  };

  db.users.push(user);
  db.workspaces.push(workspace);
  db.workspaceMembers.push(workspaceMember);
  db.subscriptions.push(subscription);
  db.socialAccounts.push(linkedinAccount, twitterAccount);
  db.campaigns.push(campaign);
  db.extractedAssets.push(extractedAsset);
  db.generatedCreatives.push(creativeText, creativeImage);
}

const matchWhere = (record, where) => {
  if (!where) return true;
  return Object.entries(where).every(([key, value]) => {
    if (value === undefined || value === null) {
      return true;
    }

    if (key === "createdAt" && typeof value === "object") {
      if (value.gte) {
        return new Date(record.createdAt) >= new Date(value.gte);
      }
      if (value.lte) {
        return new Date(record.createdAt) <= new Date(value.lte);
      }
      return true;
    }

    if (key === "socialAccount") {
      const account = db.socialAccounts.find((a) => a.id === record.socialAccountId);
      return account ? matchWhere(account, value) : false;
    }

    if (key === "workspaceId_plan" && typeof value === "object") {
      return record.workspaceId === value.workspaceId && record.plan === value.plan;
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      return record[key] === value;
    }

    return record[key] === value;
  });
};

const orderByHandler = (items, orderBy) => {
  if (!orderBy) return items;
  const [[field, direction]] = Object.entries(orderBy);
  const sorted = [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (aVal === undefined || bVal === undefined) return 0;
    const aTime = aVal instanceof Date ? aVal.getTime() : aVal;
    const bTime = bVal instanceof Date ? bVal.getTime() : bVal;
    if (aTime < bTime) return direction === "desc" ? 1 : -1;
    if (aTime > bTime) return direction === "desc" ? -1 : 1;
    return 0;
  });
  return sorted;
};

const withCampaignIncludes = (campaign, include) => {
  if (!include) return clone(campaign);
  const result = clone(campaign);
  if (include.generatedAssets) {
    result.generatedAssets = db.generatedCreatives
      .filter((creative) => creative.campaignId === campaign.id)
      .map(clone);
  }
  if (include.extractedAssets) {
    result.extractedAssets = db.extractedAssets
      .filter((asset) => asset.campaignId === campaign.id)
      .map(clone);
  }
  if (include.scheduledPosts) {
    const scheduledInclude = include.scheduledPosts.include ?? {};
    const campaignCreativeIds = new Set(
      db.generatedCreatives
        .filter((creative) => creative.campaignId === campaign.id)
        .map((creative) => creative.id)
    );
    result.scheduledPosts = db.scheduledPosts
      .filter((post) => campaignCreativeIds.has(post.creativeId))
      .map((post) => withScheduledPostIncludes(post, scheduledInclude));
  }
  return result;
};

const withScheduledPostIncludes = (post, include) => {
  const result = clone(post);
  if (include?.creative) {
    const creative = db.generatedCreatives.find((item) => item.id === post.creativeId);
    result.creative = creative ? clone(creative) : null;
  }
  if (include?.socialAccount) {
    const account = db.socialAccounts.find((item) => item.id === post.socialAccountId);
    result.socialAccount = account ? clone(account) : null;
  }
  return result;
};

export class PrismaClient {
  constructor() {
    declareSeedData();
    this.user = {
      findUnique: async ({ where }) => {
        const keys = Object.keys(where ?? {});
        const record = db.users.find((item) => keys.some((key) => item[key] === where[key]));
        return record ? clone(record) : null;
      },
      create: async ({ data }) => {
        const record = {
          id: data.id ?? randomUUID(),
          email: data.email,
          name: data.name ?? null,
          createdAt: now(),
          updatedAt: now()
        };
        db.users.push(record);
        return clone(record);
      }
    };

    this.workspace = {
      findUnique: async ({ where, include }) => {
        const keys = Object.keys(where ?? {});
        const workspace = db.workspaces.find((item) => keys.some((key) => item[key] === where[key]));
        if (!workspace) return null;
        const result = clone(workspace);
        if (include?.subscriptions) {
          result.subscriptions = db.subscriptions
            .filter((sub) => sub.workspaceId === workspace.id)
            .map(clone);
        }
        return result;
      },
      create: async ({ data }) => {
        const workspace = {
          id: data.id ?? randomUUID(),
          name: data.name,
          plan: data.plan ?? WorkspacePlan.starter,
          createdAt: now(),
          updatedAt: now()
        };
        db.workspaces.push(workspace);

        if (data.members?.create) {
          const members = Array.isArray(data.members.create)
            ? data.members.create
            : [data.members.create];
          for (const member of members) {
            db.workspaceMembers.push({
              id: member.id ?? randomUUID(),
              role: member.role ?? MemberRole.member,
              workspaceId: workspace.id,
              userId: member.userId,
              createdAt: now()
            });
          }
        }

        if (data.socialAccounts?.create) {
          const accounts = Array.isArray(data.socialAccounts.create)
            ? data.socialAccounts.create
            : [data.socialAccounts.create];
          for (const account of accounts) {
            db.socialAccounts.push({
              id: account.id ?? randomUUID(),
              provider: account.provider,
              accountName: account.accountName,
              accessToken: account.accessToken,
              workspaceId: workspace.id,
              createdAt: now()
            });
          }
        }

        if (data.subscriptions?.create) {
          const subscriptions = Array.isArray(data.subscriptions.create)
            ? data.subscriptions.create
            : [data.subscriptions.create];
          for (const subscription of subscriptions) {
            db.subscriptions.push({
              id: subscription.id ?? randomUUID(),
              workspaceId: workspace.id,
              plan: subscription.plan ?? workspace.plan,
              status: subscription.status ?? SubscriptionStatus.trialing,
              trialEndsAt: subscription.trialEndsAt ?? null,
              renewsAt: subscription.renewsAt ?? null,
              stripeCustomerId: subscription.stripeCustomerId ?? null,
              stripeSubscriptionId: subscription.stripeSubscriptionId ?? null,
              createdAt: now(),
              updatedAt: now()
            });
          }
        }

        return clone(workspace);
      }
    };

    this.campaign = {
      findMany: async ({ where, include, orderBy } = {}) => {
        let items = db.campaigns.filter((item) => matchWhere(item, where));
        items = orderByHandler(items, orderBy);
        return items.map((item) => withCampaignIncludes(item, include));
      },
      create: async ({ data }) => {
        const campaign = {
          id: data.id ?? randomUUID(),
          name: data.name,
          goal: data.goal,
          workspaceId: data.workspaceId,
          status: data.status ?? "draft",
          createdAt: now(),
          updatedAt: now()
        };
        db.campaigns.push(campaign);
        return clone(campaign);
      },
      findUnique: async ({ where, include }) => {
        const campaign = db.campaigns.find((item) => item.id === where.id);
        return campaign ? withCampaignIncludes(campaign, include) : null;
      },
      findFirst: async ({ where, orderBy } = {}) => {
        let items = db.campaigns.filter((item) => matchWhere(item, where));
        items = orderByHandler(items, orderBy);
        return items.length > 0 ? clone(items[0]) : null;
      }
    };

    this.extractedAsset = {
      create: async ({ data }) => {
        const asset = {
          id: data.id ?? randomUUID(),
          url: data.url,
          title: data.title ?? null,
          description: data.description ?? null,
          body: data.body,
          images: data.images ?? [],
          videos: data.videos ?? [],
          tags: data.tags ?? [],
          campaignId: data.campaignId,
          createdAt: now()
        };
        db.extractedAssets.push(asset);
        return clone(asset);
      },
      findUnique: async ({ where }) => {
        const asset = db.extractedAssets.find((item) => item.id === where.id);
        return asset ? clone(asset) : null;
      }
    };

    this.generatedCreative = {
      create: async ({ data }) => {
        const creative = {
          id: data.id ?? randomUUID(),
          campaignId: data.campaignId,
          type: data.type,
          title: data.title,
          content: data.content,
          callToAction: data.callToAction,
          tone: data.tone ?? null,
          targetAudience: data.targetAudience ?? null,
          extractedAssetId: data.extractedAssetId ?? null,
          createdAt: now()
        };
        db.generatedCreatives.push(creative);
        return clone(creative);
      },
      createMany: async ({ data }) => {
        const entries = Array.isArray(data) ? data : [data];
        for (const entry of entries) {
          await this.generatedCreative.create({ data: entry });
        }
        return { count: entries.length };
      },
      findMany: async ({ where, orderBy } = {}) => {
        let items = db.generatedCreatives.filter((item) => matchWhere(item, where));
        items = orderByHandler(items, orderBy);
        return items.map(clone);
      }
    };

    this.socialAccount = {
      findFirst: async ({ where }) => {
        const accounts = db.socialAccounts.filter((account) => matchWhere(account, where));
        return accounts.length > 0 ? clone(accounts[0]) : null;
      }
    };

    this.scheduledPost = {
      create: async ({ data }) => {
        const post = {
          id: data.id ?? randomUUID(),
          status: data.status ?? PostStatus.pending,
          scheduledAt: data.scheduledAt,
          publishedAt: data.publishedAt ?? null,
          channel: data.channel,
          creativeId: data.creativeId,
          socialAccountId: data.socialAccountId,
          createdAt: now(),
          updatedAt: now()
        };
        db.scheduledPosts.push(post);
        return clone(post);
      },
      findMany: async ({ where, include, orderBy } = {}) => {
        let items = db.scheduledPosts.filter((item) => matchWhere(item, where));
        items = orderByHandler(items, orderBy);
        return items.map((item) => withScheduledPostIncludes(item, include?.include ?? include));
      },
      count: async ({ where } = {}) => {
        const items = db.scheduledPosts.filter((item) => matchWhere(item, where));
        return items.length;
      }
    };

    this.subscription = {
      findMany: async ({ where, orderBy } = {}) => {
        let items = db.subscriptions.filter((item) => matchWhere(item, where));
        items = orderByHandler(items, orderBy);
        return items.map(clone);
      },
      create: async ({ data }) => {
        const subscription = {
          id: data.id ?? randomUUID(),
          workspaceId: data.workspaceId,
          plan: data.plan,
          status: data.status ?? SubscriptionStatus.trialing,
          trialEndsAt: data.trialEndsAt ?? null,
          renewsAt: data.renewsAt ?? null,
          stripeCustomerId: data.stripeCustomerId ?? null,
          stripeSubscriptionId: data.stripeSubscriptionId ?? null,
          createdAt: now(),
          updatedAt: now()
        };
        db.subscriptions.push(subscription);
        return clone(subscription);
      },
      update: async ({ where, data }) => {
        const subscription = db.subscriptions.find((item) => item.id === where.id);
        if (!subscription) {
          throw new Error("Subscription not found");
        }
        Object.assign(
          subscription,
          {
            ...data,
            stripeCustomerId: data.stripeCustomerId ?? subscription.stripeCustomerId ?? null,
            stripeSubscriptionId: data.stripeSubscriptionId ?? subscription.stripeSubscriptionId ?? null
          },
          { updatedAt: now() }
        );
        return clone(subscription);
      },
      upsert: async ({ where, create, update }) => {
        const existing = db.subscriptions.find((item) =>
          item.workspaceId === where.workspaceId_plan.workspaceId && item.plan === where.workspaceId_plan.plan
        );
        if (existing) {
          Object.assign(existing, update, { updatedAt: now() });
          return clone(existing);
        }
        return this.subscription.create({
          data: {
            workspaceId: where.workspaceId_plan.workspaceId,
            plan: where.workspaceId_plan.plan,
            ...create
          }
        });
      }
    };
  }

  async $disconnect() {
    return;
  }
}

export default PrismaClient;

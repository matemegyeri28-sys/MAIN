import {
  PrismaClient,
  WorkspacePlan,
  MemberRole,
  SocialProvider,
  SubscriptionStatus,
  CreativeType
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: "founder@example.com" } });

  if (existing) {
    console.log("Seed data already exists");
    return;
  }

  const user = await prisma.user.create({
    data: {
      email: "founder@example.com",
      name: "Founding Marketer"
    }
  });

  const workspace = await prisma.workspace.create({
    data: {
      name: "Aurora Labs",
      plan: WorkspacePlan.growth,
      members: {
        create: {
          userId: user.id,
          role: MemberRole.owner
        }
      },
      socialAccounts: {
        create: [
          {
            provider: SocialProvider.linkedin,
            accountName: "Aurora Labs LinkedIn",
            accessToken: "stub-token-linkedin"
          },
          {
            provider: SocialProvider.twitter,
            accountName: "Aurora Labs Twitter",
            accessToken: "stub-token-twitter"
          }
        ]
      },
      subscriptions: {
        create: {
          plan: WorkspacePlan.growth,
          status: SubscriptionStatus.active,
          renewsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        }
      }
    }
  });

  const campaign = await prisma.campaign.create({
    data: {
      name: "Launch of Aurora Automation",
      goal: "Drive demo signups",
      workspaceId: workspace.id,
      status: "active"
    }
  });

  const extracted = await prisma.extractedAsset.create({
    data: {
      url: "https://example.com/aurora-automation",
      title: "Aurora Automation Platform",
      description: "Revolutionize your marketing operations",
      body: "Aurora Automation helps modern marketing teams orchestrate campaigns with AI.",
      images: ["https://picsum.photos/seed/aurora/800/600"],
      videos: [],
      tags: ["automation", "ai"],
      campaignId: campaign.id
    }
  });

  await prisma.generatedCreative.createMany({
    data: [
      {
        campaignId: campaign.id,
        type: CreativeType.text,
        title: "Transform marketing with Aurora",
        content: "Experience Aurora Automation and give your marketing team superpowers.",
        callToAction: "Book a live demo",
        tone: "Confident",
        targetAudience: "Marketing leaders",
        extractedAssetId: extracted.id
      },
      {
        campaignId: campaign.id,
        type: CreativeType.image,
        title: "Aurora Automation Visual",
        content: "https://picsum.photos/seed/aurora-image/1024/768",
        callToAction: "Start your trial",
        tone: "Inspiring",
        targetAudience: "Demand generation teams",
        extractedAssetId: extracted.id
      }
    ]
  });

  console.log("Seed data created");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { DashboardShell } from "../../components/dashboard-shell";
import { MetricCard } from "../../components/metric-card";
import { CampaignCard } from "../../components/campaign-card";
import { PipelineTimeline } from "../../components/pipeline-timeline";
import { ExtractionForm } from "../../components/extraction-form";
import { CreativeGrid } from "../../components/creative-grid";
import { PostingSchedule } from "../../components/posting-schedule";
import { BarChart3, Gauge, Layers, Sparkles } from "lucide-react";

const fetchDashboard = async () => {
  const [campaignsRes, postsRes] = await Promise.all([
    api.get("/campaigns"),
    api.get("/posting")
  ]);
  return {
    campaigns: campaignsRes.data.campaigns,
    posts: postsRes.data.posts
  };
};

export default function DashboardPage() {
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: fetchDashboard });

  const latestCampaign = data?.campaigns?.[0];
  const creatives = latestCampaign?.generatedAssets ?? [];
  const posts = data?.posts ?? [];

  if (!data?.campaigns?.length) {
    return (
      <DashboardShell>
        <div className="rounded-3xl border border-dashed border-primary-500/40 bg-white/60 p-12 text-center shadow-inner shadow-primary-500/10 dark:border-primary-500/30 dark:bg-white/5">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Create your first campaign</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Kickstart automation by launching a campaign. Add a source URL and Aurora will do the rest.
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          title="Campaign Velocity"
          value="12 min"
          delta="+32% faster vs. last month"
          icon={<Gauge className="h-5 w-5" />}
        />
        <MetricCard
          title="Generated Creatives"
          value={`${creatives?.length ?? 0}`}
          delta="38 assets auto-refreshed this week"
          icon={<Sparkles className="h-5 w-5" />}
        />
        <MetricCard
          title="Scheduled Posts"
          value={`${posts?.length ?? 0}`}
          delta="98% publish success rate"
          icon={<Layers className="h-5 w-5" />}
        />
        <MetricCard
          title="CTR Lift"
          value="3.8x"
          delta="AI-optimized messaging vs. manual baseline"
          icon={<BarChart3 className="h-5 w-5" />}
        />
      </div>

      {latestCampaign && <ExtractionForm campaignId={latestCampaign.id} />}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Active campaigns</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {data?.campaigns?.map((campaign: any) => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  name={campaign.name}
                  status={campaign.status}
                  goal={campaign.goal}
                  creatives={campaign.generatedAssets.length}
                  posts={campaign.scheduledPosts.length}
                />
              ))}
            </div>
          </div>
          {creatives.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Latest AI creatives
              </h2>
              <CreativeGrid creatives={creatives} />
            </div>
          )}
        </div>
        <div className="space-y-6">
          <PipelineTimeline />
          <PostingSchedule posts={posts} />
        </div>
      </div>
    </DashboardShell>
  );
}

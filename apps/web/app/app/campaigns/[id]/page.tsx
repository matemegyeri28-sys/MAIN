"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../lib/api";
import { DashboardShell } from "../../../../components/dashboard-shell";
import { CreativeGrid } from "../../../../components/creative-grid";
import { ExtractionForm } from "../../../../components/extraction-form";
import { PostingSchedule } from "../../../../components/posting-schedule";
import { Sparkles, Share2 } from "lucide-react";
import { useState } from "react";

const fetchCampaign = async (id: string) => {
  const response = await api.get(`/campaigns/${id}`);
  return response.data.campaign;
};

export default function CampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const campaignId = params?.id ?? "";
  const queryClient = useQueryClient();

  const { data: campaign } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: () => fetchCampaign(campaignId),
    enabled: Boolean(campaignId)
  });

  const [channel, setChannel] = useState("linkedin");
  const [selectedCreative, setSelectedCreative] = useState<string | null>(null);
  const [scheduledAt, setScheduledAt] = useState(new Date().toISOString().slice(0, 16));

  const scheduleMutation = useMutation({
    mutationFn: async () => {
      if (!selectedCreative) throw new Error("Select a creative to schedule");
      const response = await api.post("/posting/schedule", {
        creativeId: selectedCreative,
        channel,
        scheduledAt
      });
      return response.data.scheduled;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });

  return (
    <DashboardShell>
      {campaign && (
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-xl shadow-primary-500/10 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.3em] text-primary-500">{campaign.status}</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{campaign.name}</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{campaign.goal}</p>
          </div>

          <ExtractionForm campaignId={campaign.id} />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Generated creatives</h2>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">
                  <Sparkles className="h-4 w-4" /> {campaign.generatedAssets.length} ready
                </span>
              </div>
              <CreativeGrid creatives={campaign.generatedAssets} />
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-xl shadow-primary-500/10 dark:border-white/10 dark:bg-white/5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Schedule distribution
                </h3>
                <div className="mt-4 space-y-4">
                  <select
                    value={selectedCreative ?? ""}
                    onChange={(event) => setSelectedCreative(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-inner shadow-white/20 focus:border-primary-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
                  >
                    <option value="">Select creative</option>
                    {campaign.generatedAssets.map((creative: any) => (
                      <option key={creative.id} value={creative.id}>
                        {creative.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={channel}
                    onChange={(event) => setChannel(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-inner shadow-white/20 focus:border-primary-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(event) => setScheduledAt(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-inner shadow-white/20 focus:border-primary-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
                  />
                  <button
                    onClick={() => scheduleMutation.mutate()}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition disabled:opacity-60"
                    disabled={scheduleMutation.isPending}
                  >
                    <Share2 className="h-4 w-4" />
                    {scheduleMutation.isPending ? "Scheduling" : "Schedule post"}
                  </button>
                  {scheduleMutation.isError && (
                    <p className="text-sm text-rose-500">{(scheduleMutation.error as any)?.message ?? "Failed"}</p>
                  )}
                  {scheduleMutation.isSuccess && (
                    <p className="text-sm text-emerald-500">Post scheduled successfully!</p>
                  )}
                </div>
              </div>
              <PostingSchedule posts={campaign.scheduledPosts} />
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

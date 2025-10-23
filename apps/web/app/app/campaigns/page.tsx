"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { DashboardShell } from "../../../components/dashboard-shell";
import { CampaignCard } from "../../../components/campaign-card";
import { PlusCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchCampaigns = async () => {
  const response = await api.get("/campaigns");
  return response.data.campaigns;
};

export default function CampaignsPage() {
  const queryClient = useQueryClient();
  const { data: campaigns } = useQuery({ queryKey: ["campaigns"], queryFn: fetchCampaigns });
  const [name, setName] = useState("Q3 Launch");
  const [goal, setGoal] = useState("Increase product qualified leads by 35%");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/campaigns", { name, goal });
      return response.data.campaign;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-xl shadow-primary-500/10 dark:border-white/10 dark:bg-white/5">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Campaign library</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Launch new initiatives, orchestrate automations, and connect content sources in seconds.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              mutation.mutate();
            }}
            className="mt-6 grid gap-4 md:grid-cols-[1fr,1fr,auto]"
          >
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-inner shadow-white/20 focus:border-primary-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
              placeholder="Campaign name"
            />
            <input
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-inner shadow-white/20 focus:border-primary-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
              placeholder="Goal"
            />
            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition disabled:opacity-60"
            >
              <PlusCircle className="h-4 w-4" />
              {mutation.isPending ? "Creating" : "Create campaign"}
            </button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {campaigns?.map((campaign: any) => (
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
    </DashboardShell>
  );
}

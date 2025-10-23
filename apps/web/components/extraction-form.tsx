"use client";

import { FormEvent, useState } from "react";
import { api } from "../lib/api";
import { Sparkles } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function ExtractionForm({ campaignId }: { campaignId: string }) {
  const [url, setUrl] = useState("https://marketing.example.com/blog/product-launch");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: { url: string }) => {
      const response = await api.post("/extraction", {
        url: payload.url,
        campaignId
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ url });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/20 bg-gradient-to-br from-white via-white/70 to-slate-100 p-6 shadow-xl shadow-primary-500/10 dark:border-white/10 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            Source URL
          </label>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-inner shadow-white/30 focus:border-primary-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
            placeholder="https://your-site.com/latest-launch"
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles className="h-4 w-4" />
          {mutation.isPending ? "Extracting..." : "Extract & Generate"}
        </button>
      </div>
      {mutation.isError && (
        <p className="mt-3 text-sm text-rose-500">{(mutation.error as any)?.message ?? "Failed to extract"}</p>
      )}
      {mutation.isSuccess && (
        <p className="mt-3 text-sm text-emerald-500">Content extracted successfully. Check your campaign assets.</p>
      )}
    </form>
  );
}

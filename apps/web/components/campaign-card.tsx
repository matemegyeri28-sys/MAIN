import { ChevronRight, Clock, Sparkles, Share2 } from "lucide-react";
import Link from "next/link";

interface CampaignCardProps {
  id: string;
  name: string;
  status: string;
  goal: string;
  creatives: number;
  posts: number;
}

export function CampaignCard({ id, name, status, goal, creatives, posts }: CampaignCardProps) {
  return (
    <Link
      href={`/app/campaigns/${id}`}
      className="group relative flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/20 dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary-500">{status}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{name}</h3>
        </div>
        <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{goal}</p>
      <div className="flex gap-4 text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
        <span className="flex items-center gap-2 text-primary-500">
          <Sparkles className="h-4 w-4" /> {creatives} creatives
        </span>
        <span className="flex items-center gap-2 text-emerald-500">
          <Share2 className="h-4 w-4" /> {posts} posts
        </span>
        <span className="flex items-center gap-2 text-slate-400">
          <Clock className="h-4 w-4" /> Updated moments ago
        </span>
      </div>
    </Link>
  );
}

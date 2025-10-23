import Image from "next/image";
import { Sparkles, Share2, PlayCircle } from "lucide-react";

interface Creative {
  id: string;
  type: "text" | "image" | "video";
  title: string;
  content: string;
  callToAction: string;
  tone?: string;
  targetAudience?: string;
}

export function CreativeGrid({ creatives }: { creatives: Creative[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {creatives.map((creative) => (
        <div
          key={creative.id}
          className="group relative flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/80 p-5 shadow-lg shadow-primary-500/10 transition hover:-translate-y-1 hover:shadow-primary-500/30 dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            <span className="flex items-center gap-2 text-primary-500">
              <Sparkles className="h-4 w-4" /> {creative.type}
            </span>
            <span className="text-slate-400">{creative.tone}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{creative.title}</h3>
          {creative.type === "text" && (
            <p className="text-sm text-slate-600 dark:text-slate-300">{creative.content}</p>
          )}
          {creative.type === "image" && (
            <div className="relative h-48 overflow-hidden rounded-2xl">
              <Image src={creative.content} alt={creative.title} fill className="object-cover" />
            </div>
          )}
          {creative.type === "video" && (
            <div className="flex h-48 items-center justify-center rounded-2xl bg-slate-900/60 text-white">
              <PlayCircle className="h-12 w-12" />
              <span className="ml-3 text-sm">Storyboard ready · {creative.callToAction}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>{creative.targetAudience}</span>
            <span className="flex items-center gap-2 text-emerald-500">
              <Share2 className="h-4 w-4" /> {creative.callToAction}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

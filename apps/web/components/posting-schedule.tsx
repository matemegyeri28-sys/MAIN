import { CalendarClock, CheckCircle2, XCircle } from "lucide-react";

interface ScheduledPost {
  id: string;
  status: string;
  scheduledAt: string;
  channel: string;
  creative: {
    title: string;
    callToAction: string;
  };
}

export function PostingSchedule({ posts }: { posts: ScheduledPost[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/70 p-6 shadow-xl shadow-primary-500/10 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Publishing</p>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Upcoming schedule</h2>
        </div>
        <CalendarClock className="h-5 w-5 text-primary-500" />
      </div>
      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/60 px-4 py-3 text-sm shadow-inner shadow-white/20 dark:border-white/10 dark:bg-white/5"
          >
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{post.creative.title}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{post.channel}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span>{new Date(post.scheduledAt).toLocaleString()}</span>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
                {post.status === "published" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-500">Published</span>
                  </>
                ) : post.status === "failed" ? (
                  <>
                    <XCircle className="h-4 w-4 text-rose-500" />
                    <span className="text-rose-500">Failed</span>
                  </>
                ) : (
                  <>
                    <CalendarClock className="h-4 w-4 text-primary-500" />
                    <span className="text-primary-500">Scheduled</span>
                  </>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

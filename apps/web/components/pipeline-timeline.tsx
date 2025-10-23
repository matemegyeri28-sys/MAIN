import { CheckCircle2, Link2, Sparkles, Share2, MonitorPlay } from "lucide-react";

const steps = [
  {
    title: "URL Intelligence",
    description: "Content, imagery, and metadata extracted with automated QA.",
    icon: Link2
  },
  {
    title: "AI Creative Studio",
    description: "Copy, image prompts, and video storyboards generated + versioned.",
    icon: Sparkles
  },
  {
    title: "Publishing Automation",
    description: "Smart scheduling across social, ads, and community channels.",
    icon: Share2
  },
  {
    title: "Performance Intelligence",
    description: "Continuous learning loops feed next campaign recommendations.",
    icon: MonitorPlay
  }
];

export function PipelineTimeline() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 p-8 shadow-xl shadow-primary-500/10 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Live automation pipeline</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Every campaign moves from source URL to multi-channel distribution in under 12 minutes on average.
      </p>
      <div className="mt-8 space-y-6">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-500/40 bg-primary-500/10 text-primary-600 shadow-inner shadow-primary-500/20 dark:text-primary-200">
              <step.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Step {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
            </div>
            <CheckCircle2 className="ml-auto h-6 w-6 text-emerald-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

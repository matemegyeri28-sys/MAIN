'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const stressQuestions = [
  {
    id: 'sleep-quality',
    prompt: 'How restorative has your sleep been over the past 3 nights?',
    category: 'Recovery'
  },
  {
    id: 'focus-swings',
    prompt: 'How often do you feel sudden drops in focus or motivation during the day?',
    category: 'Load'
  },
  {
    id: 'body-cues',
    prompt: 'How clearly do you notice physical cues of stress (heart rate, breath)?',
    category: 'Awareness'
  },
  {
    id: 'emotion-flex',
    prompt: 'How quickly can you shift from a tense state into calm or play?',
    category: 'Recovery'
  },
  {
    id: 'dopamine-habits',
    prompt: 'How intentional are you with stimulating habits (caffeine, scrolling, novelty)?',
    category: 'Load'
  }
] as const;

const categoryRecommendations: Record<
  (typeof stressQuestions)[number]['category'],
  {
    high: string;
    medium: string;
    low: string;
  }
> = {
  Recovery: {
    high: 'Recovery systems are robust. Continue pairing evening light reduction with slow exhale work to lock in Walker’s sleep hygiene findings.',
    medium: 'Solid base, but extend nightly wind-down to 45 minutes with Kabat-Zinn inspired body scans twice a week.',
    low: 'Prioritise sleep anchors, non-sleep deep rest, and parasympathetic breathwork (4-7-8) to raise vagal tone as recommended by Walker (2017).'
  },
  Load: {
    high: 'Load is well-managed. Maintain your intentional dopamine budgeting so sympathetic bursts stay purposeful.',
    medium: 'Notice afternoon dips and slot in 10-minute movement breaks to prevent the allostatic creep described by McEwen.',
    low: 'Your system is taking on more than it can recover from. Cap high-intensity blocks at 90 minutes and follow with Huberman-style sunlight walks.'
  },
  Awareness: {
    high: 'You detect signals early—keep journaling sensory cues so they remain actionable intel.',
    medium: 'Build two daily interoceptive check-ins to sharpen body awareness, following Critchley & Harrison’s research on signal detection.',
    low: 'Develop awareness capacity with short somatic tracking exercises after meetings; label breath, pulse, and muscle tension before shifting state.'
  }
};

type StressResponse = Record<(typeof stressQuestions)[number]['id'], number>;

type DopamineTask = {
  id: string;
  activity: string;
  effort: number;
  reward: number;
};

const breathingPresets = [
  {
    id: 'box',
    name: 'Box Breathing (4-4-4-4)',
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdEnd: 4,
    description: 'Navy-tested reset that balances sympathetic and parasympathetic tone for steady focus.'
  },
  {
    id: '478',
    name: '4-7-8 Reset',
    inhale: 4,
    hold: 7,
    exhale: 8,
    holdEnd: 0,
    description: 'Extends the exhale to engage vagal pathways and accelerate downshifting before sleep.'
  },
  {
    id: 'coherent',
    name: 'Coherent 5-5',
    inhale: 5,
    hold: 0,
    exhale: 5,
    holdEnd: 0,
    description: 'Smooth, even cadence shown to raise heart-rate variability and emotional regulation capacity.'
  }
] as const;

export default function InteractivePage() {
  return (
    <div className="section-padding">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <header className="space-y-4">
          <h1 className="font-display text-4xl text-brand-dark">Interactive labs to translate insight into practice.</h1>
          <p className="text-base text-muted">
            Use diagnostics, planners, and guided breathing to design your day around healthy dopamine and cortisol rhythms. Each tool is rooted in peer-reviewed research and saves locally so you can iterate over time.
          </p>
        </header>

        <StressSelfCheck />
        <DopamineBudgetPlanner />
        <BreathingCoach />
      </div>
    </div>
  );
}

function StressSelfCheck() {
  const [responses, setResponses] = useState<StressResponse>(() => {
    if (typeof window === 'undefined') return {} as StressResponse;
    const stored = window.localStorage.getItem('stress-self-check');
    return stored ? (JSON.parse(stored) as StressResponse) : ({} as StressResponse);
  });
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('stress-self-check', JSON.stringify(responses));
  }, [responses]);

  const categoryScores = useMemo(() => {
    const map = new Map<string, number[]>();
    stressQuestions.forEach((question) => {
      const value = responses[question.id];
      if (value == null) return;
      const arr = map.get(question.category) ?? [];
      arr.push(value);
      map.set(question.category, arr);
    });
    return Array.from(map.entries()).map(([category, values]) => ({
      category,
      score: Math.round(values.reduce((acc, value) => acc + value, 0) / values.length)
    }));
  }, [responses]);

  const categoryInsights = useMemo(() => {
    return categoryScores.map((entry) => {
      const range = entry.score >= 4 ? 'high' : entry.score >= 3 ? 'medium' : 'low';
      const guidance = categoryRecommendations[entry.category as keyof typeof categoryRecommendations][
        range as 'high' | 'medium' | 'low'
      ];
      return { ...entry, guidance };
    });
  }, [categoryScores]);

  return (
    <section className="card space-y-6 p-8" aria-labelledby="stress-self-check-heading">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="stress-self-check-heading" className="font-display text-3xl text-brand-dark">
            Stress Self-Check
          </h2>
          <p className="mt-2 text-sm text-muted">
            Rate each item from 1 (rarely) to 5 (consistently). The prompts mirror validated autonomic check-ins so you receive a profile with targeted recommendations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setResponses({} as StressResponse);
            setCompleted(false);
            if (typeof window !== 'undefined') {
              window.localStorage.removeItem('stress-self-check');
            }
          }}
          className="focus-ring inline-flex items-center justify-center rounded-full border border-brand px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand"
        >
          Reset
        </button>
      </div>
      <form
        className="grid gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          setCompleted(true);
        }}
      >
        {stressQuestions.map((question) => (
          <div key={question.id} className="rounded-2xl border border-brand-light/60 bg-white/80 p-6">
            <label className="font-semibold text-brand-dark" htmlFor={question.id}>
              {question.prompt}
            </label>
            <p className="text-xs uppercase tracking-widest text-muted">Category: {question.category}</p>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-labelledby={`${question.id}-label`}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setResponses((prev) => ({ ...prev, [question.id]: value }))}
                  className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                    responses[question.id] === value
                      ? 'border-brand bg-brand text-white shadow-soft'
                      : 'border-brand-light bg-white text-brand hover:border-brand'
                  }`}
                  aria-pressed={responses[question.id] === value}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="focus-ring inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-soft"
        >
          Generate my recommendations
        </button>
      </form>

      {completed && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-brand-light/60 bg-white/90 p-6">
            <h3 className="font-display text-xl text-brand-dark">Your nervous system profile</h3>
            <p className="mt-2 text-sm text-muted">
              Scores closer to 5 indicate stronger capacity. Notice where you can add small interventions first.
            </p>
            <div className="mt-6 space-y-4">
              {categoryScores.map((entry) => (
                <div key={entry.category}>
                  <div className="flex items-center justify-between text-sm font-semibold text-brand-dark">
                    <span>{entry.category}</span>
                    <span>{entry.score}/5</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-brand-light">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${(entry.score / 5) * 100}%` }}
                      aria-hidden
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="key-takeaway">
            <h3 className="font-display text-xl text-brand-dark">Recommendations</h3>
            <p className="mt-2 text-xs uppercase tracking-widest text-brand-dark/70">Personalised guidance</p>
            <ul className="mt-3 space-y-3 text-sm text-brand-dark/90">
              {categoryInsights.map((entry) => (
                <li key={entry.category}>
                  <span className="font-semibold text-brand-dark">{entry.category}:</span> {entry.guidance}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-brand-dark/70">
              Revisit weekly—scores track how protocols from the course shift your autonomic balance over time.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function DopamineBudgetPlanner() {
  const [tasks, setTasks] = useState<DopamineTask[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = window.localStorage.getItem('dopamine-budget');
    return stored ? (JSON.parse(stored) as DopamineTask[]) : [];
  });
  const [activity, setActivity] = useState('');
  const [effort, setEffort] = useState(3);
  const [reward, setReward] = useState(3);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('dopamine-budget', JSON.stringify(tasks));
  }, [tasks]);

  const totals = useMemo(() => {
    if (tasks.length === 0) return { effort: 0, reward: 0 };
    return tasks.reduce(
      (acc, task) => ({ effort: acc.effort + task.effort, reward: acc.reward + task.reward }),
      { effort: 0, reward: 0 }
    );
  }, [tasks]);

  const budgetInsight = useMemo(() => {
    if (tasks.length === 0) {
      return 'Add three to five activities to reveal your effort/reward wave. Huberman & Gazzaley recommend alternating cognitive load with restorative rewards.';
    }
    const delta = totals.reward - totals.effort;
    if (delta <= -3) {
      return 'Effort outweighs reward. Insert dopamine-neutral breaks (sunlight walks, hydration, mindful breaths) to protect prefrontal performance (Arnsten, 2015).';
    }
    if (delta >= 3) {
      return 'Rewards exceed effort. Keep novelty purposeful and plan one stretch task to stay engaged without overstimulation.';
    }
    return 'Great wave. Maintain 90-minute focus blocks followed by 10–15 minutes of recovery to respect ultradian rhythms.';
  }, [tasks, totals]);

  return (
    <section className="card space-y-6 p-8" aria-labelledby="dopamine-planner-heading">
      <div>
        <h2 id="dopamine-planner-heading" className="font-display text-3xl text-brand-dark">
          Dopamine Budget Planner
        </h2>
        <p className="mt-2 text-sm text-muted">
          Map today’s activities by effort vs reward. Aim for a gentle wave: challenging work after regulation, restorative tasks
          before sleep.
        </p>
      </div>

      <form
        className="grid gap-4 rounded-2xl border border-brand-light/60 bg-white/80 p-6 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] md:items-center"
        onSubmit={(event) => {
          event.preventDefault();
          if (!activity.trim()) return;
          setTasks((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              activity: activity.trim(),
              effort,
              reward
            }
          ]);
          setActivity('');
        }}
      >
        <label className="md:col-span-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">Activity</span>
          <input
            type="text"
            required
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
            placeholder="Deep work sprint"
            className="focus-ring mt-2 w-full rounded-xl border border-brand-light bg-white px-4 py-2 text-sm"
          />
        </label>
        <RangeField label="Effort" value={effort} onChange={setEffort} />
        <RangeField label="Reward" value={reward} onChange={setReward} />
        <div className="flex items-end md:justify-end">
          <button
            type="submit"
            className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white md:w-auto"
          >
            Add to planner
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-brand-light/60 text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted">
              <th className="px-4 py-3">Activity</th>
              <th className="px-4 py-3">Effort</th>
              <th className="px-4 py-3">Reward</th>
              <th className="px-4 py-3">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-light/40">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-4 py-3 font-medium text-brand-dark">{task.activity}</td>
                <td className="px-4 py-3">
                  <Meter value={task.effort} label="Effort" accent="bg-accent" />
                </td>
                <td className="px-4 py-3">
                  <Meter value={task.reward} label="Reward" accent="bg-brand" />
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setTasks((prev) => prev.filter((item) => item.id !== task.id))}
                    className="focus-ring text-xs font-semibold uppercase tracking-widest text-muted hover:text-brand"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-muted">
                  Add your first activity to visualize your nervous system budget.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 rounded-2xl border border-brand-light/60 bg-white/80 p-6 md:grid-cols-2">
        <div>
          <h3 className="font-display text-xl text-brand-dark">Effort vs Reward summary</h3>
          <p className="mt-2 text-sm text-muted">
            Healthy plans oscillate between exertion and meaningful rewards. If effort dwarfs reward, you risk dopamine depletion.
          </p>
          <p className="mt-3 text-xs text-brand-dark/70">{budgetInsight}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-muted">Total effort</p>
            <div className="mt-1 h-3 rounded-full bg-brand-light">
              <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(100, totals.effort * 10)}%` }} />
            </div>
            <p className="mt-1 text-sm text-brand-dark">{totals.effort}</p>
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-muted">Total reward</p>
            <div className="mt-1 h-3 rounded-full bg-brand-light">
              <div className="h-full rounded-full bg-brand" style={{ width: `${Math.min(100, totals.reward * 10)}%` }} />
            </div>
            <p className="mt-1 text-sm text-brand-dark">{totals.reward}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RangeField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="md:flex md:flex-col">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</span>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-light"
      />
      <span className="mt-2 inline-flex w-fit rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand">{value}</span>
    </label>
  );
}

function Meter({ value, label, accent }: { value: number; label: string; accent: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-brand-light">
        <div className={`h-full rounded-full ${accent}`} style={{ width: `${(value / 10) * 100}%` }} aria-hidden />
      </div>
    </div>
  );
}

function BreathingCoach() {
  const [presetId, setPresetId] = useState(() => {
    if (typeof window === 'undefined') return 'box';
    return window.localStorage.getItem('breathing-preset') ?? 'box';
  });
  const preset = breathingPresets.find((item) => item.id === presetId) ?? breathingPresets[0];

  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdEnd'>('inhale');
  const phaseRef = useRef(phase);
  const [secondsLeft, setSecondsLeft] = useState(preset.inhale);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('breathing-preset', presetId);
  }, [presetId]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    setSecondsLeft(preset.inhale);
    setPhase('inhale');
    phaseRef.current = 'inhale';
    setIsRunning(false);
  }, [preset]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        const currentPhase = phaseRef.current;
        let nextPhase: typeof phase = 'inhale';
        let nextDuration = preset.inhale;

        if (currentPhase === 'inhale') {
          if (preset.hold > 0) {
            nextPhase = 'hold';
            nextDuration = preset.hold;
          } else {
            nextPhase = 'exhale';
            nextDuration = preset.exhale;
          }
        } else if (currentPhase === 'hold') {
          nextPhase = 'exhale';
          nextDuration = preset.exhale;
        } else if (currentPhase === 'exhale') {
          if (preset.holdEnd > 0) {
            nextPhase = 'holdEnd';
            nextDuration = preset.holdEnd;
          } else {
            nextPhase = 'inhale';
            nextDuration = preset.inhale;
          }
        } else {
          nextPhase = 'inhale';
          nextDuration = preset.inhale;
        }

        phaseRef.current = nextPhase;
        setPhase(nextPhase);
        return nextDuration;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, preset.hold, preset.holdEnd, preset.exhale, preset.inhale]);

  const phaseLabel = {
    inhale: 'Inhale softly',
    hold: 'Hold with ease',
    exhale: 'Exhale slowly',
    holdEnd: 'Rest empty'
  }[phase];

  const maxSeconds = Math.max(preset.inhale, preset.hold, preset.exhale, preset.holdEnd);
  const progress = maxSeconds ? (secondsLeft / maxSeconds) * 100 : 0;

  return (
    <section className="card space-y-6 p-8" aria-labelledby="breathing-coach-heading">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="breathing-coach-heading" className="font-display text-3xl text-brand-dark">
            Breathing Coach
          </h2>
          <p className="mt-2 text-sm text-muted">
            Follow the visual timer for box, 4-7-8, or coherent breathing. Evidence from Kabat-Zinn and HRV studies suggests daily practice expands vagal tone and emotional regulation.
          </p>
        </div>
        <label className="md:w-60">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">Preset</span>
          <select
            value={presetId}
            onChange={(event) => setPresetId(event.target.value)}
            className="focus-ring mt-2 w-full rounded-full border border-brand-light bg-white px-4 py-2 text-sm"
          >
            {breathingPresets.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-muted">{preset.description}</p>
        </label>
      </div>

      <div className="relative flex flex-col items-center gap-6 rounded-3xl border border-brand-light/60 bg-white/80 p-10 text-center">
        <div className="relative flex h-48 w-48 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-brand-light/70" aria-hidden />
          <div
            className="absolute inset-0 rounded-full bg-brand-light/60"
            style={{ transform: `scale(${0.6 + progress / 160})`, transition: 'transform 0.8s ease-in-out' }}
            aria-hidden
          />
          <span className="relative z-10 font-display text-4xl text-brand-dark">{secondsLeft}</span>
        </div>
        <p className="text-lg font-semibold text-brand-dark">{phaseLabel}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-widest text-muted">
          <span>Inhale {preset.inhale}s</span>
          {preset.hold > 0 && <span>Hold {preset.hold}s</span>}
          <span>Exhale {preset.exhale}s</span>
          {preset.holdEnd > 0 && <span>Hold {preset.holdEnd}s</span>}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsRunning((prev) => !prev)}
            className="focus-ring inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRunning(false);
              setPhase('inhale');
              phaseRef.current = 'inhale';
              setSecondsLeft(preset.inhale);
            }}
            className="focus-ring inline-flex items-center justify-center rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="key-takeaway">
        <h3 className="font-display text-xl text-brand-dark">Key takeaway</h3>
        <p className="mt-2 text-sm text-brand-dark/85">
          Longer exhales signal safety. Practice at least two rounds daily—before focus work and before sleep—to shift your
          autonomic baseline.
        </p>
      </div>
    </section>
  );
}

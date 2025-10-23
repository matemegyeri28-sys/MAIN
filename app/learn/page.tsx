'use client';

import { useMemo, useState } from 'react';
import { articles, type Article } from '@/data/articles';

const topics: Article['topic'][] = ['Neurobiology', 'Stress', 'Sleep', 'Habit', 'Breath'];
const levels: Article['level'][] = ['Beginner', 'Intermediate', 'Advanced'];

const studyTracks = [
  {
    title: 'Reset & recover',
    summary: 'Stabilise sleep, breath, and baseline awareness before tackling heavier loads.',
    idealFor: 'Beginners, founders coming back from burnout, healthcare professionals between rotations',
    modules: ['Sleep Pressure, Adenosine, and Resetting the Loop', 'Why Breath Is the Fastest Lever on State', 'Light, Movement, and Reflection Stacks']
  },
  {
    title: 'Peak performance with protection',
    summary: 'Pair high-output weeks with deliberate recovery architecture to avoid allostatic overload.',
    idealFor: 'Leaders scaling teams, creators in launch cycles, advanced learners with data trackers',
    modules: ['Dopamine Cycles & Sustainable Motivation', 'Micro-Stress Dosing for Resilience', 'Building a Personal Resilience Dashboard']
  },
  {
    title: 'Coach & clinician toolkit',
    summary: 'Translate the science into client programmes and cross-disciplinary conversations.',
    idealFor: 'Therapists, coaches, learning designers supporting groups or teams',
    modules: ['Habit Plasticity: Training Your Autonomic Baseline', 'Somatic Tracking & Interoceptive Accuracy', 'The Cortisol Arc: Understanding Daily Peaks']
  }
];

export default function LearnPage() {
  const [topic, setTopic] = useState<Article['topic'] | 'All'>('All');
  const [level, setLevel] = useState<Article['level'] | 'All'>('All');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesTopic = topic === 'All' || article.topic === topic;
      const matchesLevel = level === 'All' || article.level === level;
      return matchesTopic && matchesLevel;
    });
  }, [topic, level]);

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        <header className="max-w-3xl space-y-4">
          <p className="font-display text-4xl text-brand-dark">Learn the neuroscience of stress at your pace.</p>
          <p className="text-base text-muted">
            Explore modular primers, protocols, and deep dives. Choose your focus and difficulty to build a curriculum that fits
            your current season.
          </p>
          <div className="key-takeaway">
            <h2 className="font-display text-xl text-brand-dark">Key takeaway</h2>
            <p className="mt-2 text-sm text-brand-dark/80">
              Start with the physiology of stress, then layer habits that create recovery buffers. The library adapts as your
              capacity grows.
            </p>
          </div>
        </header>

        <section className="mt-12 space-y-8">
          <div className="flex flex-wrap gap-4">
            <fieldset className="flex flex-wrap gap-2" aria-label="Filter by topic">
              <legend className="sr-only">Topic filter</legend>
              <FilterChip label="All" isActive={topic === 'All'} onClick={() => setTopic('All')} />
              {topics.map((value) => (
                <FilterChip key={value} label={value} isActive={topic === value} onClick={() => setTopic(value)} />
              ))}
            </fieldset>
            <fieldset className="flex flex-wrap gap-2" aria-label="Filter by level">
              <legend className="sr-only">Level filter</legend>
              <FilterChip label="All" isActive={level === 'All'} onClick={() => setLevel('All')} />
              {levels.map((value) => (
                <FilterChip key={value} label={value} isActive={level === value} onClick={() => setLevel(value)} />
              ))}
            </fieldset>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredArticles.map((article) => (
              <article key={article.id} className="card group flex flex-col p-6" aria-label={article.title}>
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted">
                  <span>{article.topic}</span>
                  <span>{article.level}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-brand-dark transition group-hover:text-brand">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{article.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wider text-muted">
                  <span className="rounded-full bg-brand-light/80 px-3 py-1 text-brand">{article.readingTime}</span>
                  {article.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-brand-light/60 px-3 py-1 text-brand-dark">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand"
                >
                  Read overview
                  <span aria-hidden>→</span>
                </button>
              </article>
            ))}
            {filteredArticles.length === 0 && (
              <p className="rounded-2xl border border-dashed border-brand-light p-8 text-center text-sm text-muted">
                No articles match these filters yet. Try resetting your selection.
              </p>
            )}
          </div>
        </section>

        <section className="section-padding">
          <h2 className="font-display text-3xl text-brand-dark">Curated study tracks</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Choose a playlist to match your current season. Each track pairs foundational primers with labs and key takeaways so you can act within 48 hours.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {studyTracks.map((track) => (
              <div key={track.title} className="card flex flex-col gap-4 p-6">
                <div className="text-xs uppercase tracking-widest text-brand">{track.title}</div>
                <p className="text-sm text-muted">{track.summary}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark/70">Ideal for</p>
                <p className="text-sm text-muted">{track.idealFor}</p>
                <div className="rounded-2xl border border-brand-light/70 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-widest text-brand">Key lessons</p>
                  <ul className="mt-2 space-y-2 text-sm text-muted">
                    {track.modules.map((module) => (
                      <li key={module}>• {module}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FilterChip({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
        isActive ? 'border-brand bg-brand text-white shadow-soft' : 'border-brand-light bg-white text-brand hover:border-brand'
      }`}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}

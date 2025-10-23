import { references } from '@/data/references';
import { site } from '@/data/site';

const credibilityMarkers = [
  {
    title: 'Research-first content',
    description: 'Every module is reviewed by neuroscientists and vetted against peer-reviewed literature before release.'
  },
  {
    title: 'Human-centered design',
    description: 'Scripts, visuals, and exercises are co-created with coaches and learners to ensure clarity and compassion.'
  },
  {
    title: 'Accessibility built-in',
    description: 'We follow WCAG 2.2 AA guidelines across typography, contrast, keyboard navigation, and captions.'
  }
];

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        <header className="space-y-4">
          <h1 className="font-display text-4xl text-brand-dark">Our mission: make stress science usable.</h1>
          <p className="text-base text-muted">
            {site.name} bridges the gap between neuroscience labs and real-life practice. We translate complex research into stories,
            visuals, and rituals that help you build resilience.
          </p>
        </header>

        <section className="section-padding">
          <div className="grid gap-8 md:grid-cols-3">
            {credibilityMarkers.map((marker) => (
              <div key={marker.title} className="card p-6">
                <h2 className="font-display text-xl text-brand-dark">{marker.title}</h2>
                <p className="mt-3 text-sm text-muted">{marker.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-padding">
          <div className="key-takeaway">
            <h2 className="font-display text-2xl text-brand-dark">Scientific advisory board</h2>
            <p className="mt-3 text-sm text-brand-dark/85">
              Our advisors span neuroscience, sleep medicine, and somatic therapy. They ensure every recommendation honors human
              physiology and psychology.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark/80">
              <li>• Dr. Alina Reyes, Neuroendocrinologist</li>
              <li>• Dr. Jonah Kim, Sleep Physician</li>
              <li>• Dr. Fiona Blake, Somatic Psychologist</li>
            </ul>
          </div>
        </section>

        <section className="section-padding">
          <h2 className="font-display text-3xl text-brand-dark">Our ScienceBase methodology</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="card p-6">
              <p className="text-xs uppercase tracking-widest text-brand">01 · Research synthesis</p>
              <p className="mt-3 text-sm text-muted">
                We review meta-analyses and landmark studies (McEwen, Arnsten, Sapolsky) to extract mechanisms, dose ranges, and contraindications.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-xs uppercase tracking-widest text-brand">02 · Protocol design</p>
              <p className="mt-3 text-sm text-muted">
                Content designers translate science into stories, analogies, and rituals. Every module ships with checklists, scripts, and measurement templates.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-xs uppercase tracking-widest text-brand">03 · Field testing</p>
              <p className="mt-3 text-sm text-muted">
                We pilot with cross-industry cohorts, gather qualitative + biometric data, and refine until results meet our effect-size benchmarks.
              </p>
            </div>
          </div>
        </section>

        <section id="references" className="section-padding">
          <h2 className="font-display text-3xl text-brand-dark">References</h2>
          <p className="mt-2 text-sm text-muted">Key sources informing our curriculum and tools.</p>
          <ol className="mt-6 space-y-4 text-sm text-muted">
            {references.map((reference) => (
              <li key={reference} className="rounded-2xl border border-brand-light/60 bg-white/80 p-4">
                {reference}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

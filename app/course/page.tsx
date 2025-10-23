import Link from 'next/link';

const modules = [
  {
    title: 'Module 1 · Stress, demystified',
    description: 'The nervous system tour: brain regions, hormones, and the autonomic loop. Includes visual maps and analogies.'
  },
  {
    title: 'Module 2 · Dopamine, focus, and reward design',
    description: 'Structure your week using dopamine cycles, effort/reward ratios, and sustainable motivation practices.'
  },
  {
    title: 'Module 3 · Cortisol choreography',
    description: 'Time stress intentionally. Learn activation protocols, recovery dosing, and evening wind-downs.'
  },
  {
    title: 'Module 4 · Recovery as a skill set',
    description: 'Breath, sleep, and somatic practices that expand your window of tolerance and restore baseline faster.'
  },
  {
    title: 'Module 5 · Integration & experimentation',
    description: 'Design, test, and iterate your stress playbook with feedback from coaches and peers.'
  }
];

const pricingTiers = [
  {
    name: 'Self-paced',
    price: '$649',
    description: 'Complete curriculum with lifetime updates and community Q&A sessions.',
    features: ['All video lessons', 'Downloadable workbooks', 'Interactive lab bundle', 'Community forum access']
  },
  {
    name: 'Coaching cohort',
    price: '$1,490',
    description: 'Everything in Self-paced plus small-group coaching and personalized lab reviews.',
    features: ['Weekly live labs', 'Personal nervous system audit', 'Accountability pod', 'Priority support']
  }
];

const faqs = [
  {
    question: 'How long do I have access to the material?',
    answer: 'Lifetime. You can revisit new lessons and updated protocols anytime to match your next growth season.'
  },
  {
    question: 'Is this right for me if I am already working with a therapist?',
    answer:
      'Yes. The course complements therapy by giving you daily practices rooted in physiology, habits, and data tracking.'
  },
  {
    question: 'What is the time commitment each week?',
    answer: 'Expect 3–4 hours including lessons, lab practice, and guided reflections. Cohort learners have one 60-minute live call.'
  }
];

export default function CoursePage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        <header className="space-y-4">
          <p className="font-display text-4xl text-brand-dark">The Flagship Course: Mastering Stress Neurobiology</p>
          <p className="text-base text-muted">
            A premium, cohort-tested curriculum weaving neuroscience, storytelling, and guided practice. Build a stress playbook
            that honors your biology.
          </p>
          <div className="key-takeaway">
            <h2 className="font-display text-xl text-brand-dark">Outcomes</h2>
            <ul className="mt-2 space-y-2 text-sm text-brand-dark/85">
              <li>• Design a nervous system budget you can manage in 15 minutes daily.</li>
              <li>• Spot early warning cues and deploy regulation tools in under 90 seconds.</li>
              <li>• Build habits around light, movement, breath, and reflection that lock in resilience.</li>
            </ul>
          </div>
          <Link
            href="/contact"
            className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 sm:w-auto"
          >
            Secure checkout ↗
          </Link>
        </header>

        <section className="section-padding">
          <h2 className="font-display text-3xl text-brand-dark">Curriculum snapshot</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {modules.map((module) => (
              <div key={module.title} className="card p-6">
                <h3 className="font-display text-xl text-brand-dark">{module.title}</h3>
                <p className="mt-3 text-sm text-muted">{module.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-padding">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-brand-dark">Meet your guide</h2>
              <p className="text-sm text-muted">
                Dr. Maya Collins is a neuroscientist and former high-performance coach. She has helped founders, medical
                residents, and creative leaders design protocols that balance ambition with nervous system health.
              </p>
              <div className="rounded-3xl border border-brand-light/60 bg-white/80 p-6">
                <p className="font-display text-xl text-brand-dark">Credentials</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li>• PhD in Systems Neuroscience, Stanford University</li>
                  <li>• Certified Breathwork Facilitator & Somatic Coach</li>
                  <li>• Published author on stress adaptation and habit design</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-brand-dark">Pricing</h2>
              <div className="grid gap-6">
                {pricingTiers.map((tier) => (
                  <div key={tier.name} className="card p-6">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-2xl text-brand-dark">{tier.name}</h3>
                      <span className="text-3xl font-semibold text-brand">{tier.price}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted">{tier.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {tier.features.map((feature) => (
                        <li key={feature}>• {feature}</li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="focus-ring mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
                    >
                      Enroll now
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <h2 className="font-display text-3xl text-brand-dark">FAQ</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card group">
                <summary className="cursor-pointer list-none rounded-2xl p-6 text-lg font-semibold text-brand-dark">
                  {faq.question}
                </summary>
                <p className="px-6 pb-6 text-sm text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { CheckoutButton } from '@/components/CheckoutButton';

type Module = {
  title: string;
  duration: string;
  summary: string;
  lessons: string[];
  evidence: string;
};

const modules: Module[] = [
  {
    title: 'Module 1 · Neural foundations of stress',
    duration: 'Week 1',
    summary:
      'Trace signals from perception to physiology. Understand how the amygdala, hypothalamus, and autonomic branches co-ordinate rapid responses.',
    lessons: [
      'Guided neural tour with cinematic schematics of limbic–prefrontal circuits',
      'Lab: map your personal stress signatures using a validated 7-day observation grid',
      'Office hours on interpreting autonomic markers without jargon'
    ],
    evidence: 'Grounded in McEwen (2017) and Sapolsky (2015) on allostasis and individual variability.'
  },
  {
    title: 'Module 2 · Dopamine architecture & motivation design',
    duration: 'Week 2',
    summary:
      'Design work and recovery blocks that respect phasic dopamine signalling so you can sustain focus without burnout.',
    lessons: [
      'Lesson: reward prediction errors and how to harness them for habit loops',
      'Template: the Dopamine Budget Planner with effort/reward ratios',
      'Case study: building incentives that avoid over-reliance on stimulants'
    ],
    evidence: 'Synthesises Huberman & Gazzaley (2023) with Arnsten (2015) on prefrontal resilience.'
  },
  {
    title: 'Module 3 · Cortisol choreography & load management',
    duration: 'Week 3',
    summary:
      'Align cortisol pulses with task selection, then buffer the aftermath with micro-recovery sessions and strategic wind-downs.',
    lessons: [
      'Chronobiology primer: morning surge, ultradian dips, and evening taper',
      'Protocol builder: pair sympathetic activators with deliberate downshifts',
      'Worksheet: assess your allostatic load using a science-backed checklist'
    ],
    evidence: 'Translates McEwen’s stress load frameworks into daily scheduling heuristics.'
  },
  {
    title: 'Module 4 · Recovery architecture',
    duration: 'Week 4',
    summary:
      'Stack breath, sleep, and somatic practices so recovery becomes a trained, measurable skill rather than an afterthought.',
    lessons: [
      'Breath lab: 4-7-8, box breathing, and physiological sigh variations with HRV tracking',
      'Sleep systems: adenosine, light, and temperature levers for deep rest',
      'Somatic practice: body scans and mindful movement inspired by Kabat-Zinn'
    ],
    evidence: 'Anchored in Walker (2017) on sleep and Kabat-Zinn (2013) on mindfulness-based stress reduction.'
  },
  {
    title: 'Module 5 · Interoception, awareness, and habit stacking',
    duration: 'Week 5',
    summary:
      'Upgrade awareness to action. Practise somatic tracking and habit stacking to widen your window of tolerance.',
    lessons: [
      'Interoceptive drills to sharpen signal detection before cognitive overload',
      'Habit architecture: anchor regulation tools to existing routines',
      'Peer review: share habit stacks, receive coach feedback'
    ],
    evidence: 'Based on Critchley & Harrison (2013) and Arnsten (2015) on how awareness stabilises executive function.'
  },
  {
    title: 'Module 6 · Integration, experimentation, and performance',
    duration: 'Week 6',
    summary:
      'Translate knowledge into a living playbook. Build experiments, gather data, and iterate with coach support.',
    lessons: [
      'Capstone: design a 28-day regulation experiment with measurable endpoints',
      'Coaching lab: interpret HRV, mood, and workload data with a neuroscientist',
      'Implementation sprint: secure accountability and relapse-proof your plan'
    ],
    evidence: 'Combines Sapolsky’s variability lens with Huberman & Gazzaley’s behavioural protocols.'
  }
];

const pricingTiers = [
  {
    name: 'Membership',
    price: '$5 / month',
    description: 'Full access to the learn library, live tools, and monthly regulation salons with our neuroscience team.',
    features: [
      'New ScienceBase articles every week with implementation blueprints',
      'Unlimited use of interactive labs with saved progress',
      'Monthly live salon with Q&A and guided nervous system resets',
      'Foundations module from the flagship course + community prompts'
    ],
    cta: 'subscribe' as const,
    badge: 'New – best for rapid wins'
  },
  {
    name: 'Self-paced',
    price: '$649',
    description: 'Complete curriculum with lifetime updates, lab library, and quarterly group clinics.',
    features: [
      '36 HD lessons with transcripts & captions',
      'Interactive lab bundle with dopamine & breathing tools',
      'Downloadable ScienceBase handbook (200+ pages)',
      'Quarterly live group clinic + Q&A replays'
    ],
    badge: 'Lifetime access'
  },
  {
    name: 'Coaching cohort',
    price: '$1,490',
    description: 'Everything in Self-paced plus intimate coaching pods and personalised physiological assessments.',
    features: [
      'Weekly live labs with neuroscientist facilitators',
      'Personal nervous system audit & HRV interpretation',
      'Private Slack pod with daily coach feedback',
      'Priority support within 12 business hours'
    ],
    badge: 'High-touch cohort'
  }
];

const resourceKits = [
  {
    title: 'ScienceBase handbook',
    description: 'Evidence summaries, infographics, and citations for every protocol so you can brief teams or clients with confidence.'
  },
  {
    title: 'Protocol playbooks',
    description: 'Editable Notion + PDF templates covering sleep audits, breathwork sequences, dopamine budgeting, and recovery stacks.'
  },
  {
    title: 'Data dashboards',
    description: 'Plug-and-play Airtable base that visualises subjective stress, HRV, workload, and recovery ratios.'
  }
];

const cohortTimeline = [
  {
    week: 'Weeks 1–2',
    focus: 'Foundations, diagnostics, and data baselining'
  },
  {
    week: 'Weeks 3–4',
    focus: 'Implementation of activation + recovery cycles with weekly lab reviews'
  },
  {
    week: 'Weeks 5–6',
    focus: 'Capstone experiments, measurement, and playbook refinement'
  }
];

const faqs = [
  {
    question: 'How long do I have access to the material?',
    answer:
      'Lifetime. Every update to videos, handbooks, and lab tools is included so you always operate with the latest research-backed practices.'
  },
  {
    question: 'Is this right for me if I am already working with a therapist?',
    answer:
      'Absolutely. Therapists address deeper narratives; we provide physiology-first practices, data literacy, and experiments you can bring back to therapy for integration.'
  },
  {
    question: 'What is the time commitment each week?',
    answer:
      'Allocate 3–4 hours for lessons and labs. Coaching cohorts add a 60-minute live lab and optional 30-minute pod huddle for accountability.'
  },
  {
    question: 'Do I need wearables or lab equipment?',
    answer:
      'No. We teach protocols you can implement with or without wearables. Optional integrations cover HRV trackers, Oura, WHOOP, and Garmin if you have them.'
  }
];

export default function CoursePage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        <header className="space-y-4">
          <p className="font-display text-4xl text-brand-dark">The Flagship Course: Mastering Stress Neurobiology</p>
          <p className="text-base text-muted">
            A six-week, cohort-tested curriculum that translates elite neuroscience into rituals, dashboards, and conversations you can use immediately.
            Build a stress playbook that honors your biology and your ambition.
          </p>
          <div className="key-takeaway">
            <h2 className="font-display text-xl text-brand-dark">Outcomes</h2>
            <ul className="mt-2 space-y-2 text-sm text-brand-dark/85">
              <li>• Design a nervous system budget you can manage in 15 minutes daily, complete with effort/recovery ratios.</li>
              <li>• Spot early warning cues with interoceptive check-ins and intervene before cognitive performance drops.</li>
              <li>• Build habits around light, movement, breath, and reflection that expand your window of tolerance.</li>
              <li>• Translate evidence into team rituals, client programmes, or personal leadership cadences.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CheckoutButton className="sm:w-auto" analyticsLabel="course-hero">
              Start your $5 membership
            </CheckoutButton>
            <Link
              href="/contact"
              className="focus-ring inline-flex items-center justify-center rounded-full border border-white/70 bg-white/70 px-6 py-3 text-sm font-semibold text-brand-dark transition hover:border-accent hover:text-accent dark:border-white/20 dark:bg-white/10"
            >
              Talk to our team
            </Link>
          </div>
        </header>

        <section className="section-padding">
          <h2 className="font-display text-3xl text-brand-dark">Curriculum snapshot</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {modules.map((module) => (
              <div key={module.title} className="card flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted">
                  <span>{module.duration}</span>
                  <span>Live + async</span>
                </div>
                <h3 className="font-display text-xl text-brand-dark">{module.title}</h3>
                <p className="text-sm text-muted">{module.summary}</p>
                <ul className="space-y-2 text-sm text-muted">
                  {module.lessons.map((lesson) => (
                    <li key={lesson}>• {lesson}</li>
                  ))}
                </ul>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">{module.evidence}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-padding">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-brand-dark">Meet your guide</h2>
              <p className="text-sm text-muted">
                Dr. Maya Collins is a neuroscientist and former high-performance coach. She has helped founders, medical residents, and creative leaders design protocols that balance ambition with nervous system health.
              </p>
              <p className="text-sm text-muted">
                Her ScienceBase is built on two decades of research at Stanford, peer-reviewed publications on stress adaptation, and real-world implementation inside scale-ups and hospitals.
              </p>
              <div className="rounded-3xl border border-brand-light/60 bg-white/80 p-6">
                <p className="font-display text-xl text-brand-dark">Credentials</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li>• PhD in Systems Neuroscience, Stanford University</li>
                  <li>• Certified Breathwork Facilitator & Somatic Coach</li>
                  <li>• Published author on stress adaptation and habit design</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-dashed border-brand-light/80 bg-white/70 p-6">
                <p className="font-display text-xl text-brand-dark">Cohort rhythm</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {cohortTimeline.map((entry) => (
                    <li key={entry.week}>
                      <span className="font-semibold text-brand-dark">{entry.week}:</span> {entry.focus}
                    </li>
                  ))}
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
                    {tier.badge && (
                      <span className="mt-3 inline-flex items-center rounded-full border border-white/60 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-dark/70 dark:border-white/20 dark:bg-white/10">
                        {tier.badge}
                      </span>
                    )}
                    <p className="mt-3 text-sm text-muted">{tier.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {tier.features.map((feature) => (
                        <li key={feature}>• {feature}</li>
                      ))}
                    </ul>
                    {tier.cta === 'subscribe' ? (
                      <CheckoutButton className="mt-6" analyticsLabel="course-pricing">
                        Join the membership
                      </CheckoutButton>
                    ) : (
                      <Link
                        href="/contact"
                        className="focus-ring mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
                      >
                        Enroll now
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-4">
              <h2 className="font-display text-3xl text-brand-dark">What you receive</h2>
              <p className="text-sm text-muted">
                Every cohort seat includes a premium suite of materials so you can brief stakeholders, track your data, and deploy protocols without reinventing the wheel.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {resourceKits.map((kit) => (
                  <div key={kit.title} className="rounded-3xl border border-brand-light/70 bg-white/80 p-5">
                    <p className="text-xs uppercase tracking-widest text-brand">{kit.title}</p>
                    <p className="mt-2 text-sm text-muted">{kit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="key-takeaway">
              <h3 className="font-display text-2xl text-brand-dark">Implementation guarantee</h3>
              <p className="mt-3 text-sm text-brand-dark/85">
                Submit your 28-day playbook within two weeks of graduation. If you are not seeing measurable improvements in perceived stress or recovery markers, we provide a complimentary 1:1 lab tune-up.
              </p>
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

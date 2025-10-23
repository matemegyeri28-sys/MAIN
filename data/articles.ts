export type Article = {
  id: string;
  title: string;
  description: string;
  topic: 'Neurobiology' | 'Stress' | 'Sleep' | 'Habit' | 'Breath';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: string;
  tags: string[];
};

export const articles: Article[] = [
  {
    id: 'dopamine-cycles',
    title: 'Dopamine Cycles & Sustainable Motivation',
    description:
      'Map mesolimbic peaks and troughs so you can schedule deep work, novelty, and rest using the reward science highlighted by Huberman & Gazzaley.',
    topic: 'Neurobiology',
    level: 'Intermediate',
    readingTime: '9 min',
    tags: ['Dopamine', 'Motivation', 'Habits']
  },
  {
    id: 'cortisol-arc',
    title: 'The Cortisol Arc: Understanding Daily Peaks',
    description:
      'Learn how cortisol ebbs and flows during your day and use it to time focused work, reflection, and rest, applying McEwen’s allostatic load model.',
    topic: 'Stress',
    level: 'Beginner',
    readingTime: '7 min',
    tags: ['Cortisol', 'Circadian Rhythm']
  },
  {
    id: 'sleep-pressure',
    title: 'Sleep Pressure, Adenosine, and Resetting the Loop',
    description:
      'Translate Matthew Walker’s sleep drive research into actionable evening and morning routines that protect synaptic homeostasis.',
    topic: 'Sleep',
    level: 'Beginner',
    readingTime: '6 min',
    tags: ['Sleep Hygiene', 'Recovery']
  },
  {
    id: 'habit-plasticity',
    title: 'Habit Plasticity: Training Your Autonomic Baseline',
    description:
      'Use micro-habits to gradually recalibrate sympathetic and parasympathetic tone, guided by Critchley & Harrison’s findings on interoception.',
    topic: 'Habit',
    level: 'Advanced',
    readingTime: '12 min',
    tags: ['Neuroplasticity', 'Behavior Design']
  },
  {
    id: 'breathwork-neuro',
    title: 'Why Breath Is the Fastest Lever on State',
    description:
      'Understand how diaphragmatic breathing influences vagal tone, heart rate variability, and stress recovery through baroreflex modulation.',
    topic: 'Breath',
    level: 'Intermediate',
    readingTime: '8 min',
    tags: ['Breathwork', 'Vagus Nerve']
  },
  {
    id: 'microstress-dosing',
    title: 'Micro-Stress Dosing for Resilience',
    description:
      'Intentionally introduce low-dose hormetic challenges—cold, heat, novelty—to expand your window of tolerance without overshooting recovery, respecting McEwen’s allostatic load guardrails.',
    topic: 'Stress',
    level: 'Advanced',
    readingTime: '10 min',
    tags: ['Hormesis', 'Training']
  },
  {
    id: 'somatic-tracking',
    title: 'Somatic Tracking & Interoceptive Accuracy',
    description:
      'Build the interoceptive awareness skills described by Critchley & Harrison to catch stress cues early and intervene skillfully.',
    topic: 'Stress',
    level: 'Intermediate',
    readingTime: '11 min',
    tags: ['Interoception', 'Awareness']
  },
  {
    id: 'habit-stack',
    title: 'Light, Movement, and Reflection Stacks',
    description:
      'Combine circadian light anchors, non-sleep deep rest, and journaling prompts into reliable morning and evening stacks.',
    topic: 'Habit',
    level: 'Beginner',
    readingTime: '8 min',
    tags: ['Routines', 'Circadian Health']
  },
  {
    id: 'resilience-dashboard',
    title: 'Building a Personal Resilience Dashboard',
    description:
      'Learn to log HRV, mood, and workload signals, then translate them into weekly adjustments grounded in allostasis research.',
    topic: 'Neurobiology',
    level: 'Advanced',
    readingTime: '13 min',
    tags: ['HRV', 'Data Tracking']
  }
];

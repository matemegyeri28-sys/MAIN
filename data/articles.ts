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
      'Decode your reward system and structure high-value tasks without triggering burnout or boredom.',
    topic: 'Neurobiology',
    level: 'Intermediate',
    readingTime: '9 min',
    tags: ['Dopamine', 'Motivation', 'Habits']
  },
  {
    id: 'cortisol-arc',
    title: 'The Cortisol Arc: Understanding Daily Peaks',
    description:
      'Learn how cortisol ebbs and flows during your day and use it to time focused work, reflection, and rest.',
    topic: 'Stress',
    level: 'Beginner',
    readingTime: '7 min',
    tags: ['Cortisol', 'Circadian Rhythm']
  },
  {
    id: 'sleep-pressure',
    title: 'Sleep Pressure, Adenosine, and Resetting the Loop',
    description: 'Translate the science of sleep drive into actionable evening and morning routines.',
    topic: 'Sleep',
    level: 'Beginner',
    readingTime: '6 min',
    tags: ['Sleep Hygiene', 'Recovery']
  },
  {
    id: 'habit-plasticity',
    title: 'Habit Plasticity: Training Your Autonomic Baseline',
    description: 'Use micro-habits to gradually rewire the autonomic balance between sympathetic and parasympathetic modes.',
    topic: 'Habit',
    level: 'Advanced',
    readingTime: '12 min',
    tags: ['Neuroplasticity', 'Behavior Design']
  },
  {
    id: 'breathwork-neuro',
    title: 'Why Breath Is the Fastest Lever on State',
    description: 'Understand how diaphragmatic breathing influences vagal tone, heart rate variability, and stress recovery.',
    topic: 'Breath',
    level: 'Intermediate',
    readingTime: '8 min',
    tags: ['Breathwork', 'Vagus Nerve']
  },
  {
    id: 'microstress-dosing',
    title: 'Micro-Stress Dosing for Resilience',
    description:
      'Intentionally introduce low-dose challenges to expand your window of tolerance and prevent overwhelm.',
    topic: 'Stress',
    level: 'Advanced',
    readingTime: '10 min',
    tags: ['Hormesis', 'Training']
  }
];

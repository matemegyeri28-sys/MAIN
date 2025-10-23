export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 'founder-lena',
    name: 'Lena Ortiz',
    role: 'Founder, Ritual Labs',
    quote:
      'The tools made stress science finally click for me. Our team uses the dopamine planner every Monday to design sprints that leave energy for our lives.'
  },
  {
    id: 'coach-rahul',
    name: 'Rahul Patel',
    role: 'Performance Coach',
    quote:
      'Clear, compassionate, and actionable. My clients now understand their nervous system and can intervene before stress becomes a crisis.'
  },
  {
    id: 'creator-amy',
    name: 'Amy Chen',
    role: 'Creator & Neuroscience Student',
    quote:
      'The course distills complex neurobiology into narratives and visuals that stay with you. It is the most premium learning experience I have taken online.'
  }
];

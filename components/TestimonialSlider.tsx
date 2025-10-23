'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';

const SLIDE_DURATION = 9000;

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/90 p-8 shadow-soft transition-colors dark:bg-white/10">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={testimonials[index].id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-lg text-brand-dark"
        >
          “{testimonials[index].quote}”
          <footer className="mt-6 flex flex-col text-sm text-muted">
            <span className="font-semibold text-brand-dark">{testimonials[index].name}</span>
            <span>{testimonials[index].role}</span>
          </footer>
        </motion.blockquote>
      </AnimatePresence>
      <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Testimonials">
        {testimonials.map((testimonial, idx) => (
          <button
            key={testimonial.id}
            type="button"
            role="tab"
            aria-selected={idx === index}
            aria-controls={`testimonial-${testimonial.id}`}
            onClick={() => setIndex(idx)}
            className={`h-2.5 flex-1 rounded-full transition ${
              idx === index ? 'bg-accent' : 'bg-brand-light hover:bg-accent/50 dark:bg-white/15'
            }`}
          >
            <span className="sr-only">Show testimonial from {testimonial.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

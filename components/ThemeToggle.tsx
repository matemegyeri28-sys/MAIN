'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const iconVariants = {
  initial: { opacity: 0, scale: 0.9, rotate: -10 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.9, rotate: 10 }
};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`focus-ring relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/60 bg-white/70 text-brand-dark shadow-soft transition hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:border-white/20 dark:bg-white/10 dark:text-brand-dark ${className ?? ''}`}
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <AnimatePresence mode="wait" initial={false}>
        {mounted && theme === 'dark' ? (
          <motion.span key="moon" variants={iconVariants} initial="initial" animate="animate" exit="exit">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        ) : (
          <motion.span key="sun" variants={iconVariants} initial="initial" animate="animate" exit="exit">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" strokeLinecap="round" />
              <path d="M12 20v2" strokeLinecap="round" />
              <path d="m4.93 4.93 1.41 1.41" strokeLinecap="round" />
              <path d="m17.66 17.66 1.41 1.41" strokeLinecap="round" />
              <path d="M2 12h2" strokeLinecap="round" />
              <path d="M20 12h2" strokeLinecap="round" />
              <path d="m6.34 17.66-1.41 1.41" strokeLinecap="round" />
              <path d="m19.07 4.93-1.41 1.41" strokeLinecap="round" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

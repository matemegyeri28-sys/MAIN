'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { site } from '@/data/site';

const links = [
  { href: '/', label: 'Home' },
  { href: '/learn', label: 'Learn' },
  { href: '/interactive', label: 'Interactive' },
  { href: '/course', label: 'Course' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/50 shadow-[0_15px_45px_rgba(10,16,26,0.08)] backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-surface-floating/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="focus-ring group flex items-center gap-3 text-lg font-semibold tracking-tight text-brand-dark"
        >
          <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent via-accent/70 to-emerald-300 text-white shadow-glow">
            <span className="shine-line" aria-hidden />
            <span className="font-display text-base font-bold">{site.brandInitials}</span>
          </span>
          <span className="font-display text-xl md:text-2xl">
            {site.name}
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold tracking-wide transition focus-ring ${
                  isActive ? 'text-brand-dark' : 'text-muted hover:text-brand-dark'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/course"
            className="focus-ring inline-flex items-center justify-center rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-dark transition hover:border-accent hover:text-accent dark:border-white/20 dark:bg-white/10"
          >
            View course
          </Link>
          <Link
            href="/contact"
            className="focus-ring inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
          >
            Talk to us
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-brand-dark transition dark:border-white/20 dark:bg-white/10 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden"
          >
            <ul className="space-y-1 border-t border-white/50 bg-white/70 px-6 py-4 text-sm backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-3 py-3 font-medium focus-ring ${
                      pathname === link.href
                        ? 'bg-white/80 text-brand-dark shadow-soft dark:bg-white/10'
                        : 'text-muted hover:bg-white/80 hover:text-brand-dark dark:hover:bg-white/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex justify-between gap-3 px-3 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Mode</span>
                <ThemeToggle className="h-10 w-10" />
              </li>
              <li>
                <Link
                  href="/course"
                  className="focus-ring mt-2 block rounded-xl bg-accent px-3 py-3 text-center text-sm font-semibold text-white shadow-glow"
                  onClick={() => setIsOpen(false)}
                >
                  Explore the course
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

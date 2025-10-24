import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-primary-500 hover:text-primary-500 dark:border-slate-800 dark:text-slate-300 dark:hover:border-primary-400 dark:hover:text-primary-400"
    >
      {mounted && (isDark ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />)}
      <span>{mounted && (isDark ? 'Dark' : 'Light')}</span>
    </button>
  );
}

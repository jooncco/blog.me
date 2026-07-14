'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { MoonIcon, SunIcon } from '@/components/Icons';

/** Light/dark toggle (client; next-themes). Hydration-safe: renders a
 * placeholder until mounted so server/client markup match. */
export function ThemeButton() {
  const t = useTranslations('theme');
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    (theme === 'system' ? systemTheme : theme) === 'dark';

  if (!mounted) {
    // Reserve layout space; avoids a hydration mismatch on theme-dependent icon.
    return <div aria-hidden="true" className="h-9 w-9" data-testid="theme-toggle-placeholder" />;
  }

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      aria-label={t('toggle')}
      title={isDark ? t('light') : t('dark')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="rounded-sm p-2 text-text transition-colors hover:text-hud-cyan hover:bg-hud-cyan/10">
      {isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
}

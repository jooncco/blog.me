'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/types';
import { GlobeIcon } from '@/components/Icons';
import { buildLocaleOptions } from './localeOptions';

/**
 * EN/KO switch (client). Re-navigates to the current pathname under the chosen
 * locale, preserving the path (and hash, for section anchors). `usePathname`
 * from `@/i18n/navigation` returns the locale-less pathname, so the router can
 * re-apply the target locale prefix.
 */
export function LocaleSwitcher() {
  const t = useTranslations('locale');
  const current = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const options = buildLocaleOptions(current, routing.locales);

  const switchLocale = (next: Locale) => {
    if (next === current) return;
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t('switch')}
      data-testid="locale-switcher"
      className="flex items-center rounded-sm border border-hud-cyan/30">
      <GlobeIcon className="ml-1.5 mr-0.5 h-4 w-4 text-text/50" aria-hidden="true" />
      {options.map(({ locale, active }) => (
        <button
          key={locale}
          type="button"
          data-testid={`locale-option-${locale}`}
          aria-current={active ? 'true' : undefined}
          disabled={isPending}
          onClick={() => switchLocale(locale)}
          className={clsx(
            'px-2 py-1 font-mono text-xs uppercase tracking-wider transition-colors',
            active ? 'text-hud-cyan' : 'text-text/50 hover:text-hud-cyan',
          )}>
          {t(locale)}
        </button>
      ))}
    </div>
  );
}

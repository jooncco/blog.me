import { defineRouting } from 'next-intl/routing';
import { LOCALES, DEFAULT_LOCALE } from '@/types';

/**
 * next-intl routing config (Unit U3).
 *
 * - Locales: `en` (default) and `ko`.
 * - `localePrefix: 'as-needed'` → English lives at `/`, Korean at `/ko/...`.
 *   Each locale is independently routable for SEO.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
});

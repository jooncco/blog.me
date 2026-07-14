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

/**
 * Explicit IANA time zone shared by the server request config and the client
 * provider. next-intl keys its static-rendering environment check on the time
 * zone, so it must be set in both places — otherwise client components using
 * `useTranslations` log `ENVIRONMENT_FALLBACK` during static prerendering.
 */
export const TIME_ZONE = 'Asia/Seoul';

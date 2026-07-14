import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/**
 * Per-request next-intl config (Unit U3). Resolves the active locale from the
 * `[locale]` segment (falling back to the default) and loads its message
 * catalog from `messages/<locale>.json`.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && (routing.locales as readonly string[]).includes(requested)
      ? requested
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

import { getRequestConfig } from 'next-intl/server';
import { routing, TIME_ZONE } from './routing';

/**
 * Per-request next-intl config (Unit U3). Resolves the active locale from the
 * `[locale]` segment (falling back to the default) and loads its message
 * catalog. Messages are split across files so parallel units own disjoint files:
 *   - messages/<locale>.json          (shell: nav/common/footer/theme/locale)
 *   - messages/sections.<locale>.json (U4 home sections — namespace `sections`)
 *   - messages/blog.<locale>.json     (U6 blog — namespace `blog`)
 * Top-level namespaces don't overlap, so a shallow merge is sufficient.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && (routing.locales as readonly string[]).includes(requested)
      ? requested
      : routing.defaultLocale;

  const [base, sections, blog] = await Promise.all([
    import(`../messages/${locale}.json`),
    import(`../messages/sections.${locale}.json`).catch(() => ({ default: {} })),
    import(`../messages/blog.${locale}.json`).catch(() => ({ default: {} })),
  ]);

  return {
    locale,
    // Explicit time zone so static rendering is deterministic — without it
    // next-intl logs ENVIRONMENT_FALLBACK and would use the build machine's zone.
    timeZone: TIME_ZONE,
    messages: { ...base.default, ...sections.default, ...blog.default },
  };
});

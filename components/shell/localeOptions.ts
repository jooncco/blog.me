import type { Locale } from '@/types';

export type LocaleOption = {
  locale: Locale;
  active: boolean;
};

/**
 * Pure helper for `LocaleSwitcher` — builds the ordered option list from the
 * configured locales, flagging the currently active one. Extracted so the
 * switch logic is unit-testable without a DOM/router.
 */
export function buildLocaleOptions(current: string, locales: readonly Locale[]): LocaleOption[] {
  return locales.map((locale) => ({ locale, active: locale === current }));
}

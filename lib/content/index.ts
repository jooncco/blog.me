import 'server-only';
import type { Locale } from '@/types';
import { DEFAULT_LOCALE } from '@/types';

/**
 * Content-loader infrastructure for typed `data/*.ts` modules (FR-16).
 * Section units (U4) provide their own typed loaders that build on these helpers.
 */

/** A content record that may vary by locale. */
export type Localized<T> = Record<Locale, T> | T;

/** Resolve a possibly-localized content value for a locale, falling back to the default locale. */
export function resolveLocalized<T>(value: Localized<T>, locale: Locale): T {
  if (value && typeof value === 'object' && ('en' in (value as object) || 'ko' in (value as object))) {
    const map = value as Record<Locale, T>;
    return map[locale] ?? map[DEFAULT_LOCALE];
  }
  return value as T;
}

/** Identity helper giving `data/*.ts` authors type inference + a single import point. */
export function defineContent<T>(content: T): T {
  return content;
}

// Pure blog helpers — no filesystem, no `server-only`, so they are unit-testable
// in isolation and reusable by both the loader and the migration tooling.
import { LOCALES, type Locale, type PostMeta } from '@/types';

/** Hangul syllables + jamo ranges (primary-language detection). */
const HANGUL_RE = /[가-힣ᄀ-ᇿ㄰-㆏]/g;
const LATIN_RE = /[A-Za-z]/g;

/**
 * Detect a text's primary language via the ratio of Hangul to Latin letters.
 * Korean prose clears the low threshold decisively; English text has ~0 Hangul.
 */
export function detectPrimaryLocale(text: string): Locale {
  const stripped = text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ');
  const hangul = (stripped.match(HANGUL_RE) || []).length;
  if (hangul === 0) return 'en';
  const latin = (stripped.match(LATIN_RE) || []).length;
  return hangul / (hangul + latin) >= 0.15 ? 'ko' : 'en';
}

export type ParsedName = { slug: string; locale: Locale };

/** Parse a `<slug>.<locale>.mdx` filename. Returns `null` if it doesn't match. */
export function parseFilename(file: string): ParsedName | null {
  const m = file.match(/^(.+)\.(en|ko)\.mdx$/);
  if (!m) return null;
  return { slug: m[1], locale: m[2] as Locale };
}

/** Coerce raw front-matter (unknown shape) into a typed `PostMeta`. */
export function toPostMeta(
  data: Record<string, unknown>,
  slug: string,
  locale: Locale,
  availableLocales: Locale[],
): PostMeta {
  const tags = Array.isArray(data.tags)
    ? data.tags.map((t) => String(t)).filter(Boolean)
    : [];
  return {
    slug,
    locale,
    title: typeof data.title === 'string' && data.title ? data.title : slug,
    date: normalizeDate(data.date),
    lastModified: data.lastModified ? String(data.lastModified) : undefined,
    category: typeof data.category === 'string' && data.category ? data.category : 'etc',
    tags,
    teaser: data.teaser ? String(data.teaser) : undefined,
    ogImage: data.ogImage ? String(data.ogImage) : undefined,
    availableLocales: sortLocales(availableLocales),
  };
}

function normalizeDate(value: unknown): string {
  if (value == null) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

/** Deterministic locale ordering (`en` before `ko`). */
export function sortLocales(locales: Locale[]): Locale[] {
  const seen = new Set(locales);
  return LOCALES.filter((l) => seen.has(l));
}

/**
 * Pick which available locale to actually serve for a requested one:
 * the requested locale when present, otherwise the first available (fallback).
 */
export function resolveServedLocale(available: Locale[], requested: Locale): Locale | null {
  if (available.length === 0) return null;
  if (available.includes(requested)) return requested;
  return sortLocales(available)[0];
}

/** Newest-first comparator by `date` (ISO `YYYY-MM-DD`), tie-broken by slug. */
export function compareByDateDesc(a: PostMeta, b: PostMeta): number {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.slug < b.slug ? -1 : 1;
}

/** Sorted, de-duplicated category list from a set of posts. */
export function collectCategories(posts: PostMeta[]): string[] {
  return Array.from(new Set(posts.map((p) => p.category))).sort((a, b) => a.localeCompare(b));
}

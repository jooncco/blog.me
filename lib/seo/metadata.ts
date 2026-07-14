// SEO metadata builder (Unit U7 / NFR-1).
//
// Single source of truth for per-page <head> metadata: canonical URL, hreflang
// alternates for every locale, and OpenGraph + Twitter card tags. Every page's
// `generateMetadata` delegates here so social sharing and indexing behave
// consistently across the bilingual (en/ko) route tree.

import type { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/types';

/** Canonical production origin. Also used as `metadataBase`. */
export const SITE_URL = 'https://jooncco.me';
export const SITE_NAME = 'jooncco.me';

/**
 * Default social-share image (root-relative; `metadataBase` resolves it to an
 * absolute URL). Used whenever a page/post doesn't supply its own `ogImage`.
 * Next drops the file-based `opengraph-image` convention once `generateMetadata`
 * returns an `openGraph` object, so we set an explicit image here instead.
 */
export const DEFAULT_OG_IMAGE = '/preview_dark.png';

/** OpenGraph `og:locale` codes keyed by our locale. */
const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  ko: 'ko_KR',
};

/**
 * Build the absolute URL for a locale-independent path under a given locale.
 *
 * Routing uses `localePrefix: 'as-needed'` → English lives at the root and
 * Korean under `/ko`. `path` is the locale-less pathname beginning with `/`
 * (use `/` for the home page).
 */
export function localizedUrl(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const url = `${SITE_URL}${prefix}${clean}`;
  // Never emit a trailing slash except for the bare origin.
  return url === SITE_URL ? url : url.replace(/\/$/, '') || SITE_URL;
}

/** hreflang alternates map for a path across all locales (+ x-default). */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = localizedUrl(locale, path);
  }
  // x-default points at the default-locale variant.
  languages['x-default'] = localizedUrl(DEFAULT_LOCALE, path);
  return languages;
}

export type BuildMetadataInput = {
  title: string;
  description: string;
  /** Locale-less pathname beginning with `/` (`/` for home). */
  path: string;
  locale: Locale;
  /** Absolute or root-relative OG image; falls back to the site default. */
  ogImage?: string;
  /** OpenGraph type — `website` (default) or `article`. */
  type?: 'website' | 'article';
  /** Article-specific OG fields (only used when `type: 'article'`). */
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

/**
 * Produce a fully-formed `Metadata` object: title/description, canonical,
 * hreflang alternates, and OpenGraph + Twitter cards. When `ogImage` is omitted
 * the file-based `app/opengraph-image.jpg` convention supplies the default image
 * for every route, so we only set `images` explicitly for a custom one.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const { title, description, path, locale, type = 'website' } = input;
  const ogImage = input.ogImage ?? DEFAULT_OG_IMAGE;
  const canonical = localizedUrl(locale, path);
  const languages = languageAlternates(path);

  const images = [{ url: ogImage }];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      images,
      ...(type === 'article'
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            tags: input.tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

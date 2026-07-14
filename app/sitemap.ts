// Sitemap (Unit U7 / NFR-1).
//
// Enumerates every indexable URL across all locales: static pages, the blog
// index, each blog post, and each category page. Per-URL `alternates.languages`
// advertises the hreflang variants so search engines pair the en/ko versions.

import type { MetadataRoute } from 'next';
import { LOCALES, type Locale } from '@/types';
import { getAllPostsMeta, getAllCategories } from '@/lib/blog';
import { localizedUrl, languageAlternates } from '@/lib/seo';

/** Locale-less paths that exist for every locale. */
const STATIC_PATHS = ['/', '/blog', '/contact', '/now'] as const;

function entry(
  path: string,
  locale: Locale,
  lastModified?: string,
): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(locale, path),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    alternates: { languages: languageAlternates(path) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Blog structure is locale-independent (slugs/categories are shared across
  // locales with fallback), so read once from the default locale.
  const [posts, categories] = await Promise.all([
    getAllPostsMeta('en'),
    getAllCategories('en'),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push(entry(path, locale));
    }
    for (const post of posts) {
      entries.push(entry(`/blog/${post.slug}`, locale, post.lastModified ?? post.date));
    }
    for (const category of categories) {
      entries.push(entry(`/blog/category/${encodeURIComponent(category)}`, locale));
    }
  }

  return entries;
}

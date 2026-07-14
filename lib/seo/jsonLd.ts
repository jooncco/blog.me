// JSON-LD structured data builders (Unit U7 / NFR-1).
//
// Emitted inside a <script type="application/ld+json"> on the relevant pages:
//   - personJsonLd    → home page (Person / portfolio owner)
//   - articleJsonLd   → blog post pages (BlogPosting)
//   - breadcrumbJsonLd→ optional BreadcrumbList for nested pages
//
// Kept decoupled from React/component code so it is safe to import into any
// server component and to unit-test in isolation.

import type { Post, Locale } from '@/types';
import { SITE_URL, SITE_NAME, localizedUrl } from './metadata';

/** Canonical owner identity. Template users edit these to rebrand. */
export const PERSON = {
  // Matches the display name rendered in the About section (`sections.about.name`).
  name: 'Daniel',
  alternateName: 'jooncco',
  jobTitle: 'Solutions Architect / Full Stack Engineer',
  email: 'jooncco.g@gmail.com',
  /** Social / external profiles used for `sameAs`. */
  sameAs: [
    'https://github.com/jooncco',
    'https://leetcode.com/jooncco',
    'https://codeforces.com/profile/jooncco',
    'https://linkedin.com/in/jooncco',
    'https://instagram.com/jooncco',
    'https://facebook.com/jooncco',
  ],
} as const;

/** A serialisable JSON-LD node. */
export type JsonLd = Record<string, unknown>;

/** Person / portfolio-owner structured data for the home page. */
export function personJsonLd(locale: Locale, description: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON.name,
    alternateName: PERSON.alternateName,
    url: localizedUrl(locale, '/'),
    jobTitle: PERSON.jobTitle,
    email: `mailto:${PERSON.email}`,
    description,
    sameAs: [...PERSON.sameAs],
  };
}

/** WebSite structured data (enables sitelinks search box eligibility, naming). */
export function webSiteJsonLd(locale: Locale, description: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: localizedUrl(locale, '/'),
    inLanguage: locale,
    description,
    author: { '@type': 'Person', name: PERSON.name },
  };
}

/** BlogPosting structured data for a single post. */
export function articleJsonLd(post: Post): JsonLd {
  const { meta } = post;
  const url = localizedUrl(meta.locale, `/blog/${meta.slug}`);
  const image = meta.ogImage
    ? meta.ogImage.startsWith('http')
      ? meta.ogImage
      : `${SITE_URL}${meta.ogImage}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.teaser,
    datePublished: meta.date,
    dateModified: meta.lastModified ?? meta.date,
    inLanguage: meta.locale,
    ...(image ? { image } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    author: { '@type': 'Person', name: PERSON.name, url: SITE_URL },
    publisher: { '@type': 'Person', name: PERSON.name, url: SITE_URL },
    articleSection: meta.category,
    keywords: meta.tags.join(', '),
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList for nested pages (e.g. blog post → blog → home). */
export function breadcrumbJsonLd(locale: Locale, crumbs: Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: localizedUrl(locale, crumb.path),
    })),
  };
}

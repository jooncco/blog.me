import { describe, it, expect } from 'vitest';
import { personJsonLd, webSiteJsonLd, articleJsonLd, breadcrumbJsonLd } from './jsonLd';
import { SITE_URL } from './metadata';
import type { Post } from '@/types';

describe('personJsonLd', () => {
  it('builds a Person node with sameAs profiles', () => {
    const p = personJsonLd('en', 'A developer');
    expect(p['@type']).toBe('Person');
    expect(p.url).toBe(SITE_URL);
    expect(Array.isArray(p.sameAs)).toBe(true);
    expect((p.sameAs as string[]).some((u) => u.includes('github.com'))).toBe(true);
  });
});

describe('webSiteJsonLd', () => {
  it('builds a WebSite node for the locale', () => {
    const w = webSiteJsonLd('ko', 'desc');
    expect(w['@type']).toBe('WebSite');
    expect(w.url).toBe(`${SITE_URL}/ko`);
    expect(w.inLanguage).toBe('ko');
  });
});

describe('articleJsonLd', () => {
  const post: Post = {
    meta: {
      slug: 'hello',
      locale: 'en',
      title: 'Hello',
      date: '2024-02-03',
      lastModified: '2024-02-05',
      category: 'web',
      tags: ['x', 'y'],
      teaser: 'A teaser',
      ogImage: '/blog/images/hello.png',
      availableLocales: ['en'],
    },
    content: '# Hello',
  };

  it('builds a BlogPosting with absolute url + image and dates', () => {
    const a = articleJsonLd(post);
    expect(a['@type']).toBe('BlogPosting');
    expect(a.headline).toBe('Hello');
    expect(a.url).toBe(`${SITE_URL}/blog/hello`);
    expect(a.datePublished).toBe('2024-02-03');
    expect(a.dateModified).toBe('2024-02-05');
    expect(a.image).toBe(`${SITE_URL}/blog/images/hello.png`);
    expect(a.articleSection).toBe('web');
  });

  it('falls back dateModified to date and omits image when absent', () => {
    const a = articleJsonLd({
      ...post,
      meta: { ...post.meta, lastModified: undefined, ogImage: undefined },
    });
    expect(a.dateModified).toBe('2024-02-03');
    expect(a.image).toBeUndefined();
  });
});

describe('breadcrumbJsonLd', () => {
  it('builds a positioned BreadcrumbList', () => {
    const b = breadcrumbJsonLd('en', [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]);
    expect(b['@type']).toBe('BreadcrumbList');
    const items = b.itemListElement as Array<Record<string, unknown>>;
    expect(items[0].position).toBe(1);
    expect(items[1].item).toBe(`${SITE_URL}/blog`);
  });
});

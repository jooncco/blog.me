import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import { SITE_URL } from '@/lib/seo';

describe('sitemap', () => {
  it('lists static pages for both locales with hreflang alternates', async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    // Home + core static pages, both locales.
    expect(urls).toContain(SITE_URL); // en home
    expect(urls).toContain(`${SITE_URL}/ko`); // ko home
    expect(urls).toContain(`${SITE_URL}/blog`);
    expect(urls).toContain(`${SITE_URL}/ko/blog`);
    expect(urls).toContain(`${SITE_URL}/contact`);
    expect(urls).toContain(`${SITE_URL}/now`);

    // Every entry advertises hreflang alternates.
    for (const e of entries) {
      expect(e.alternates?.languages?.en).toBeTruthy();
      expect(e.alternates?.languages?.ko).toBeTruthy();
    }
  });

  it('includes migrated blog posts', async () => {
    const entries = await sitemap();
    const hasPost = entries.some((e) => e.url.includes('/blog/'));
    expect(hasPost).toBe(true);
  });
});

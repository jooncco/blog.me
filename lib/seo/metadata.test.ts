import { describe, it, expect } from 'vitest';
import {
  buildMetadata,
  localizedUrl,
  languageAlternates,
  SITE_URL,
} from './metadata';

describe('localizedUrl', () => {
  it('places the default locale (en) at the root', () => {
    expect(localizedUrl('en', '/')).toBe(SITE_URL);
    expect(localizedUrl('en', '/blog')).toBe(`${SITE_URL}/blog`);
  });

  it('prefixes non-default locales with /<locale>', () => {
    expect(localizedUrl('ko', '/')).toBe(`${SITE_URL}/ko`);
    expect(localizedUrl('ko', '/blog')).toBe(`${SITE_URL}/ko/blog`);
  });

  it('never emits a trailing slash except for the bare origin', () => {
    expect(localizedUrl('en', '/blog/')).toBe(`${SITE_URL}/blog`);
    expect(localizedUrl('en', '/')).toBe(SITE_URL);
  });
});

describe('languageAlternates', () => {
  it('includes every locale plus x-default pointing at en', () => {
    const alts = languageAlternates('/now');
    expect(alts.en).toBe(`${SITE_URL}/now`);
    expect(alts.ko).toBe(`${SITE_URL}/ko/now`);
    expect(alts['x-default']).toBe(`${SITE_URL}/now`);
  });
});

describe('buildMetadata', () => {
  it('sets canonical, hreflang, OG and Twitter for a website page', () => {
    const m = buildMetadata({
      title: 'Contact',
      description: 'Reach out',
      path: '/contact',
      locale: 'ko',
    });
    expect(m.alternates?.canonical).toBe(`${SITE_URL}/ko/contact`);
    expect(m.alternates?.languages?.en).toBe(`${SITE_URL}/contact`);
    expect(m.openGraph?.url).toBe(`${SITE_URL}/ko/contact`);
    expect((m.openGraph as { locale?: string })?.locale).toBe('ko_KR');
    expect((m.twitter as { card?: string })?.card).toBe('summary_large_image');
  });

  it('emits article OG fields with a custom image', () => {
    const m = buildMetadata({
      title: 'Post',
      description: 'A post',
      path: '/blog/x',
      locale: 'en',
      ogImage: '/blog/images/x.png',
      type: 'article',
      publishedTime: '2024-01-01',
      tags: ['a', 'b'],
    });
    const og = m.openGraph as { type?: string; publishedTime?: string };
    expect(og.type).toBe('article');
    expect(og.publishedTime).toBe('2024-01-01');
    expect(m.openGraph?.images).toEqual([{ url: '/blog/images/x.png' }]);
  });
});

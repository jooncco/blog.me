import { describe, it, expect } from 'vitest';
import { NAV_ITEMS, SOCIAL_LINKS } from './config';
import en from '@/messages/en.json';
import ko from '@/messages/ko.json';

describe('nav config', () => {
  it('has unique, stable ids', () => {
    const ids = NAV_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('anchor items link to a home hash, route items to a path', () => {
    for (const item of NAV_ITEMS) {
      if (item.kind === 'anchor') {
        expect(item.href.startsWith('/#')).toBe(true);
      } else {
        expect(item.href.startsWith('/')).toBe(true);
        expect(item.href.includes('#')).toBe(false);
      }
    }
  });

  it('maps the expected primary items', () => {
    expect(NAV_ITEMS.map((i) => i.id)).toEqual([
      'about',
      'projects',
      'skills',
      'portfolio',
      'experience',
      'contact',
      'blog',
      'now',
    ]);
    const byId = Object.fromEntries(NAV_ITEMS.map((i) => [i.id, i.href]));
    expect(byId.contact).toBe('/contact');
    expect(byId.blog).toBe('/blog');
    expect(byId.now).toBe('/now');
    expect(byId.about).toBe('/#about');
  });

  it('has a matching label in every locale catalog', () => {
    for (const item of NAV_ITEMS) {
      expect(en.nav[item.id as keyof typeof en.nav]).toBeTruthy();
      expect(ko.nav[item.id as keyof typeof ko.nav]).toBeTruthy();
    }
  });
});

describe('social config', () => {
  it('has unique ids and https hrefs with a renderable icon', () => {
    const ids = SOCIAL_LINKS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const link of SOCIAL_LINKS) {
      expect(link.href.startsWith('https://')).toBe(true);
      expect(typeof link.Icon).toBe('function');
      expect(link.label.length).toBeGreaterThan(0);
    }
  });
});

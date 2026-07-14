import { describe, expect, it } from 'vitest';
import type { PostMeta } from '@/types';
import {
  collectCategories,
  compareByDateDesc,
  detectPrimaryLocale,
  parseFilename,
  resolveServedLocale,
  sortLocales,
  toPostMeta,
} from './util';

describe('detectPrimaryLocale', () => {
  it('detects English prose', () => {
    expect(detectPrimaryLocale('Calculate the intimidation value for all indices.')).toBe('en');
  });

  it('detects Korean prose', () => {
    expect(detectPrimaryLocale('집합을 메모리 효율적으로 다루는 방법을 설명한다.')).toBe('ko');
  });

  it('treats pure code / no letters as English', () => {
    expect(detectPrimaryLocale('```cpp\nfor(int i=0;i<n;i++);\n```')).toBe('en');
  });

  it('ignores English inside fenced code when judging a Korean post', () => {
    const text = '이 문제는 다음과 같이 이진 탐색으로 해결한다.\n```cpp\nlower_bound(all(v), x);\n```\n따라서 시간복잡도는 로그이다.';
    expect(detectPrimaryLocale(text)).toBe('ko');
  });
});

describe('parseFilename', () => {
  it('parses slug + locale', () => {
    expect(parseFilename('leetcode-42.en.mdx')).toEqual({ slug: 'leetcode-42', locale: 'en' });
    expect(parseFilename('what-is-jpa.ko.mdx')).toEqual({ slug: 'what-is-jpa', locale: 'ko' });
  });

  it('rejects non-matching names', () => {
    expect(parseFilename('readme.md')).toBeNull();
    expect(parseFilename('post.fr.mdx')).toBeNull();
    expect(parseFilename('post.mdx')).toBeNull();
  });
});

describe('resolveServedLocale (fallback)', () => {
  it('serves the requested locale when available', () => {
    expect(resolveServedLocale(['en', 'ko'], 'ko')).toBe('ko');
  });

  it('falls back to the other locale when requested is missing', () => {
    expect(resolveServedLocale(['en'], 'ko')).toBe('en');
    expect(resolveServedLocale(['ko'], 'en')).toBe('ko');
  });

  it('returns null when nothing is available', () => {
    expect(resolveServedLocale([], 'en')).toBeNull();
  });
});

describe('compareByDateDesc (ordering)', () => {
  const mk = (slug: string, date: string): PostMeta => ({
    slug,
    locale: 'en',
    title: slug,
    date,
    category: 'etc',
    tags: [],
    availableLocales: ['en'],
  });

  it('sorts newest-first', () => {
    const sorted = [mk('a', '2021-01-01'), mk('b', '2023-05-05'), mk('c', '2022-02-02')].sort(
      compareByDateDesc,
    );
    expect(sorted.map((p) => p.slug)).toEqual(['b', 'c', 'a']);
  });
});

describe('collectCategories', () => {
  const mk = (category: string): PostMeta => ({
    slug: category,
    locale: 'en',
    title: category,
    date: '2021-01-01',
    category,
    tags: [],
    availableLocales: ['en'],
  });

  it('returns unique, sorted categories', () => {
    expect(collectCategories([mk('web'), mk('competitive-programming'), mk('web')])).toEqual([
      'competitive-programming',
      'web',
    ]);
  });
});

describe('sortLocales / toPostMeta', () => {
  it('orders en before ko', () => {
    expect(sortLocales(['ko', 'en'])).toEqual(['en', 'ko']);
  });

  it('coerces raw front-matter with defaults', () => {
    const meta = toPostMeta(
      { title: 'T', date: '2022-03-03', tags: ['a', 1], category: 'web' },
      'my-slug',
      'ko',
      ['ko'],
    );
    expect(meta).toMatchObject({
      slug: 'my-slug',
      locale: 'ko',
      title: 'T',
      date: '2022-03-03',
      category: 'web',
      tags: ['a', '1'],
      availableLocales: ['ko'],
    });
  });

  it('applies fallbacks for missing fields', () => {
    const meta = toPostMeta({}, 'bare', 'en', ['en']);
    expect(meta.title).toBe('bare');
    expect(meta.category).toBe('etc');
    expect(meta.tags).toEqual([]);
  });
});

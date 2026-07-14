import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  getAllCategories,
  getAllPostsMeta,
  getLatestPosts,
  getPost,
  getPostsByCategory,
} from './loader';

// The loader reads `process.env.BLOG_CONTENT_DIR` lazily, so we can point it at
// a throwaway fixtures directory built here.
let dir: string;

function write(name: string, frontMatter: string, body = 'body'): void {
  fs.writeFileSync(path.join(dir, name), `---\n${frontMatter}\n---\n\n${body}\n`, 'utf8');
}

beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-fixtures-'));
  process.env.BLOG_CONTENT_DIR = dir;

  // Bilingual post (exists in both locales).
  write('both.en.mdx', 'title: Both EN\ndate: "2023-01-01"\ncategory: web\ntags: [x]', 'english body');
  write('both.ko.mdx', 'title: Both KO\ndate: "2023-01-01"\ncategory: web\ntags: [x]', '한국어 본문');
  // Korean-only post (English must fall back to it).
  write('ko-only.ko.mdx', 'title: KO Only\ndate: "2022-06-01"\ncategory: competitive-programming\ntags: [algo]', '코딩');
  // English-only post (Korean must fall back to it).
  write('en-only.en.mdx', 'title: EN Only\ndate: "2024-03-15"\ncategory: etc\ntags: []', 'text');
  // Non-post files must be ignored.
  fs.writeFileSync(path.join(dir, 'README.md'), '# ignore me', 'utf8');
});

afterAll(() => {
  delete process.env.BLOG_CONTENT_DIR;
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('getAllPostsMeta', () => {
  it('lists every slug newest-first and ignores non-post files', async () => {
    const metas = await getAllPostsMeta('en');
    expect(metas.map((m) => m.slug)).toEqual(['en-only', 'both', 'ko-only']);
  });

  it('reports availableLocales for bilingual and single-locale posts', async () => {
    const metas = await getAllPostsMeta('en');
    const both = metas.find((m) => m.slug === 'both');
    const koOnly = metas.find((m) => m.slug === 'ko-only');
    expect(both?.availableLocales).toEqual(['en', 'ko']);
    expect(koOnly?.availableLocales).toEqual(['ko']);
  });
});

describe('getPost (locale fallback)', () => {
  it('serves the requested locale when present', async () => {
    const post = await getPost('both', 'ko');
    expect(post?.meta.locale).toBe('ko');
    expect(post?.meta.title).toBe('Both KO');
    expect(post?.content.trim()).toBe('한국어 본문');
  });

  it('falls back to the other locale when the requested one is missing', async () => {
    const post = await getPost('ko-only', 'en');
    expect(post).not.toBeNull();
    expect(post?.meta.locale).toBe('ko'); // served locale reflects the fallback
    expect(post?.meta.availableLocales).toEqual(['ko']);
  });

  it('returns null for unknown slugs', async () => {
    expect(await getPost('does-not-exist', 'en')).toBeNull();
  });
});

describe('getPostsByCategory', () => {
  it('filters by category', async () => {
    const web = await getPostsByCategory('web', 'en');
    expect(web.map((m) => m.slug)).toEqual(['both']);
    const cp = await getPostsByCategory('competitive-programming', 'en');
    expect(cp.map((m) => m.slug)).toEqual(['ko-only']);
  });
});

describe('getLatestPosts (ordering)', () => {
  it('returns the n most recent, newest-first', async () => {
    const latest = await getLatestPosts('en', 2);
    expect(latest.map((m) => m.slug)).toEqual(['en-only', 'both']);
  });

  it('clamps n and never throws', async () => {
    expect(await getLatestPosts('en', 0)).toEqual([]);
    expect((await getLatestPosts('en', 100)).length).toBe(3);
  });
});

describe('getAllCategories', () => {
  it('returns sorted unique categories', async () => {
    expect(await getAllCategories('en')).toEqual(['competitive-programming', 'etc', 'web']);
  });
});

describe('missing content directory', () => {
  it('returns empty results instead of throwing', async () => {
    const prev = process.env.BLOG_CONTENT_DIR;
    process.env.BLOG_CONTENT_DIR = path.join(os.tmpdir(), 'definitely-not-here-xyz');
    expect(await getAllPostsMeta('en')).toEqual([]);
    expect(await getAllCategories('ko')).toEqual([]);
    process.env.BLOG_CONTENT_DIR = prev;
  });
});

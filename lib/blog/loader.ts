import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { LOCALES, type Locale, type Post, type PostMeta } from '@/types';
import {
  collectCategories,
  compareByDateDesc,
  parseFilename,
  resolveServedLocale,
  sortLocales,
  toPostMeta,
} from './util';

/**
 * Blog content loader (Unit U6).
 *
 * Reads `content/blog/<slug>.{en,ko}.mdx`, parses front-matter with gray-matter,
 * and resolves a locale with fallback to the other translation (populating
 * `availableLocales`). Server-only so content never ships to the client.
 *
 * All functions are defensive: filesystem/parse errors are swallowed and a safe
 * empty result is returned rather than thrown, so a bad file can never break a
 * render.
 */

/** Resolve the content directory lazily so tests can override it via env. */
function contentDir(): string {
  return process.env.BLOG_CONTENT_DIR
    ? path.resolve(process.env.BLOG_CONTENT_DIR)
    : path.join(process.cwd(), 'content', 'blog');
}

type Entry = { data: Record<string, unknown>; content: string };
type SlugGroup = { slug: string; byLocale: Partial<Record<Locale, Entry>> };

/** Read + group every post file by slug. Never throws. */
function readGroups(): Map<string, SlugGroup> {
  const groups = new Map<string, SlugGroup>();
  const dir = contentDir();
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return groups;
  }
  for (const file of files) {
    const parsed = parseFilename(file);
    if (!parsed) continue;
    try {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      const group =
        groups.get(parsed.slug) ?? { slug: parsed.slug, byLocale: {} };
      group.byLocale[parsed.locale] = { data: data as Record<string, unknown>, content };
      groups.set(parsed.slug, group);
    } catch {
      // Skip unreadable / malformed files rather than failing the whole load.
    }
  }
  return groups;
}

function availableLocalesOf(group: SlugGroup): Locale[] {
  return sortLocales(LOCALES.filter((l) => group.byLocale[l] !== undefined));
}

/** Build a `PostMeta` for a slug resolved to `requested` (or its fallback). */
function metaFor(group: SlugGroup, requested: Locale): PostMeta | null {
  const available = availableLocalesOf(group);
  const served = resolveServedLocale(available, requested);
  if (!served) return null;
  const entry = group.byLocale[served];
  if (!entry) return null;
  return toPostMeta(entry.data, group.slug, served, available);
}

/** All posts resolved for `locale` (with fallback), sorted newest-first. */
export async function getAllPostsMeta(locale: Locale): Promise<PostMeta[]> {
  const metas: PostMeta[] = [];
  for (const group of readGroups().values()) {
    const meta = metaFor(group, locale);
    if (meta) metas.push(meta);
  }
  return metas.sort(compareByDateDesc);
}

/**
 * Load a single post for `locale`. Falls back to the other translation when the
 * requested locale is missing (the returned `meta.locale` reflects what was
 * actually served; `meta.availableLocales` lists every existing translation).
 * Returns `null` when no translation exists.
 */
export async function getPost(slug: string, locale: Locale): Promise<Post | null> {
  const group = readGroups().get(slug);
  if (!group) return null;
  const available = availableLocalesOf(group);
  const served = resolveServedLocale(available, locale);
  if (!served) return null;
  const entry = group.byLocale[served];
  if (!entry) return null;
  return {
    meta: toPostMeta(entry.data, slug, served, available),
    content: entry.content,
  };
}

/** Posts in a category, resolved for `locale`, newest-first. */
export async function getPostsByCategory(
  category: string,
  locale: Locale,
): Promise<PostMeta[]> {
  const all = await getAllPostsMeta(locale);
  return all.filter((p) => p.category === category);
}

/** The `n` most recent posts for `locale` (used by home `BlogHighlights`). */
export async function getLatestPosts(locale: Locale, n: number): Promise<PostMeta[]> {
  const all = await getAllPostsMeta(locale);
  return all.slice(0, Math.max(0, n));
}

/** Sorted list of every category present for `locale`. */
export async function getAllCategories(locale: Locale): Promise<string[]> {
  return collectCategories(await getAllPostsMeta(locale));
}

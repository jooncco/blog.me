import 'katex/dist/katex.min.css';
import './blog.css';

import GithubSlugger from 'github-slugger';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale, Post } from '@/types';
import { Chip } from '@/components/hud';
import { MdxComponents } from './MdxComponents';
import { renderMdx } from './renderMdx';

export type PostViewProps = { post: Post };

/** Rough reading-time estimate (Latin words + CJK chars at ~2 chars/word). */
function readingMinutes(content: string): number {
  const text = content.replace(/```[\s\S]*?```/g, ' ');
  const words = (text.match(/[A-Za-z0-9]+/g) || []).length;
  const cjk = (text.match(/[㐀-鿿가-힣]/g) || []).length;
  return Math.max(1, Math.round((words + cjk / 2) / 200));
}

type TocItem = { id: string; text: string; level: 2 | 3 };

/** Build an in-page TOC from H2/H3 headings, matching rehype-slug ids. */
function buildToc(content: string): TocItem[] {
  const withoutCode = content.replace(/```[\s\S]*?```/g, '');
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  for (const line of withoutCode.split('\n')) {
    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const level = (m[1].length === 2 ? 2 : 3) as 2 | 3;
    const text = m[2]
      .replace(/`([^`]*)`/g, '$1')
      .replace(/\*\*([^*]*)\*\*/g, '$1')
      .replace(/\*([^*]*)\*/g, '$1')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\$[^$]*\$/g, '')
      .trim();
    if (!text) continue;
    items.push({ id: slugger.slug(text), text, level });
  }
  return items;
}

function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

/**
 * Rendered MDX post (Unit U6): HUD meta header (category, date, reading time,
 * available languages), an optional table of contents, and the MDX body.
 */
export async function PostView({ post }: PostViewProps) {
  const t = await getTranslations('blog');
  const uiLocale = (await getLocale()) as Locale;
  const { meta, content } = post;
  const toc = buildToc(content);
  const minutes = readingMinutes(content);
  const mdx = await renderMdx(content, MdxComponents);

  return (
    <article data-testid="post-view" className="w-full">
      <header className="mb-8 border-b border-hud-cyan/20 pb-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-xs text-text/60">
          <Chip label={meta.category} tone="cyan" />
          <span>{formatDate(meta.date, uiLocale)}</span>
          <span aria-hidden="true">·</span>
          <span>{t('readingTime', { minutes })}</span>
        </div>
        <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide text-text sm:text-4xl">
          {meta.title}
        </h1>
        {meta.lastModified ? (
          <p className="mt-3 font-mono text-xs text-text/50">
            {t('updated')}: {formatDate(meta.lastModified, uiLocale)}
          </p>
        ) : null}
        {meta.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <Chip key={tag} label={tag} tone="neutral" />
            ))}
          </div>
        ) : null}
        <div className="mt-4 flex items-center gap-2 font-mono text-xs text-text/50">
          <span>{t('availableIn')}:</span>
          {meta.availableLocales.map((l) => (
            <span key={l} className="uppercase text-hud-cyan/80">
              {l}
            </span>
          ))}
        </div>
      </header>

      {toc.length > 2 ? (
        <nav
          data-testid="post-toc"
          aria-label={t('contents')}
          className="mb-8 rounded-sm border border-hud-cyan/20 bg-neutral2/30 p-4">
          <p className="mb-2 font-display text-xs uppercase tracking-widest text-hud-cyan">
            {t('contents')}
          </p>
          <ul className="space-y-1 text-sm">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                <a
                  href={`#${item.id}`}
                  className="text-text/70 transition-colors hover:text-hud-cyan">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <div className="blog-prose max-w-none">
        {mdx}
      </div>
    </article>
  );
}

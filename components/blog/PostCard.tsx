import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale, PostMeta } from '@/types';
import { Chip, HudFrame } from '@/components/hud';

export type PostCardProps = { post: PostMeta };

function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

/** Post summary card for the blog index (Unit U6). */
export async function PostCard({ post }: PostCardProps) {
  const t = await getTranslations('blog');
  const uiLocale = (await getLocale()) as Locale;

  return (
    <HudFrame
      as="article"
      variant="panel"
      className="hud-scanline group flex h-full flex-col p-5 transition-shadow hover:shadow-glow-cyan"
      data-testid="post-card">
      <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs text-text/55">
        <Chip label={post.category} tone="cyan" />
        <span>{formatDate(post.date, uiLocale)}</span>
      </div>

      <h3 className="font-display text-lg font-semibold uppercase leading-snug tracking-wide text-text">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-hud-cyan">
          {post.title}
        </Link>
      </h3>

      {post.teaser ? (
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-text/70">{post.teaser}</p>
      ) : null}

      {post.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <Chip key={tag} label={tag} tone="neutral" />
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between pt-4 font-mono text-xs">
        <span className="text-hud-cyan/90 transition-colors group-hover:text-hud-cyan">
          {t('readMore')} →
        </span>
        <span className="flex items-center gap-1 text-text/45">
          {post.availableLocales.map((l) => (
            <span key={l} className="uppercase">
              {l}
            </span>
          ))}
        </span>
      </div>
    </HudFrame>
  );
}

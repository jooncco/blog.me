import { useLocale, useTranslations } from 'next-intl';
import { Chip, HudButton, HudFrame } from '@/components/hud';
import { Link } from '@/i18n/navigation';
import { Section } from './Section';
import type { PostMeta } from '@/types';

export type BlogHighlightsProps = { posts: PostMeta[] };

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(d);
}

/** Latest N blog posts surfaced on the home page. */
export function BlogHighlights({ posts }: BlogHighlightsProps) {
  const t = useTranslations('sections');
  const locale = useLocale();

  return (
    <Section id="blog" kicker={t('blog.kicker')} title={t('blog.title')}>
      {posts.length === 0 ? (
        <p className="font-mono text-sm text-text/60" data-testid="blog-empty">
          {t('blog.empty')}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" data-testid="blog-highlights">
          {posts.map((post) => (
            <HudFrame
              as="article"
              key={`${post.slug}-${post.locale}`}
              variant="panel"
              className="hud-scanline transition-all duration-200 hover:shadow-glow-cyan">
              <div
                className="flex h-full flex-col gap-3 p-5"
                data-testid={`blog-post-${post.slug}`}>
              <div className="flex items-center justify-between gap-2">
                <Chip label={post.category} tone="cyan" />
                <span className="font-mono text-xs text-text/50">
                  {formatDate(post.date, locale)}
                </span>
              </div>
              <h3 className="font-display text-base font-semibold uppercase tracking-wide text-text">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-hud-cyan"
                  data-testid={`blog-link-${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              {post.teaser && (
                <p className="line-clamp-3 font-sans text-sm text-text/70">{post.teaser}</p>
              )}
              <div className="mt-auto pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-mono text-xs uppercase tracking-wider text-hud-cyan hover:text-hud-gold">
                  {t('blog.readMore')} ↗
                </Link>
              </div>
              </div>
            </HudFrame>
          ))}
        </div>
      )}

      <div className="mt-8">
        <HudButton href="/blog" variant="outline" size="md">
          {t('blog.viewAll')}
        </HudButton>
      </div>
    </Section>
  );
}

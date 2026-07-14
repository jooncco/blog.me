import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale, PostMeta } from '@/types';
import { SectionHeading } from '@/components/hud';
import { CategoryNav } from './CategoryNav';
import { BlogPostsView } from './BlogPostsView';
import type { BlogListPost } from './PostTile';

export type BlogIndexProps = {
  posts: PostMeta[];
  categories: string[];
  activeCategory?: string;
};

function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

/** Blog listing: heading, category filter, and a card/list toggle of posts. */
export async function BlogIndex({ posts, categories, activeCategory }: BlogIndexProps) {
  const t = await getTranslations('blog');
  const locale = (await getLocale()) as Locale;

  // Format dates on the server (avoids client/server timezone hydration drift).
  const enriched: BlogListPost[] = posts.map((post) => ({
    ...post,
    dateLabel: formatDate(post.date, locale),
  }));

  return (
    <section data-testid="blog-index" className="w-full px-4 py-10 sm:px-6">
      <SectionHeading kicker={t('kicker')} title={t('title')} id="blog-heading" />
      <p className="mt-3 max-w-2xl text-sm text-text/70">{t('subtitle')}</p>

      <div className="mt-8 flex flex-col gap-4">
        <CategoryNav categories={categories} active={activeCategory} />
        <p className="font-mono text-xs text-text/50" data-testid="blog-count">
          {t('postsCount', { count: posts.length })}
        </p>
      </div>

      {enriched.length === 0 ? (
        <p className="mt-10 text-text/60">{t('noPosts')}</p>
      ) : (
        <div className="mt-6">
          <BlogPostsView
            posts={enriched}
            labels={{
              readMore: t('readMore'),
              viewCard: t('viewCard'),
              viewList: t('viewList'),
            }}
          />
        </div>
      )}
    </section>
  );
}

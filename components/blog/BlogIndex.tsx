import { getTranslations } from 'next-intl/server';
import type { PostMeta } from '@/types';
import { SectionHeading } from '@/components/hud';
import { CategoryNav } from './CategoryNav';
import { PostCard } from './PostCard';

export type BlogIndexProps = {
  posts: PostMeta[];
  categories: string[];
  activeCategory?: string;
};

/** Blog listing: heading, category filter, and a responsive grid of cards. */
export async function BlogIndex({ posts, categories, activeCategory }: BlogIndexProps) {
  const t = await getTranslations('blog');

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

      {posts.length === 0 ? (
        <p className="mt-10 text-text/60">{t('noPosts')}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={`${post.slug}-${post.locale}`} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

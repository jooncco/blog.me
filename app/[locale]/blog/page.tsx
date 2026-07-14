import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllCategories, getAllPostsMeta } from '@/lib/blog';
import { BlogIndex } from '@/components/blog';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/blog',
    locale: locale as Locale,
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const [posts, categories] = await Promise.all([getAllPostsMeta(l), getAllCategories(l)]);

  return <BlogIndex posts={posts} categories={categories} />;
}

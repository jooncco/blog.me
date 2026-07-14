import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllCategories, getPostsByCategory } from '@/lib/blog';
import { BlogIndex } from '@/components/blog';
import type { Locale } from '@/types';

type Props = { params: Promise<{ locale: string; category: string }> };

export async function generateStaticParams() {
  const categories = await getAllCategories('en');
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: `${decodeURIComponent(category)} · ${t('title')}` };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const cat = decodeURIComponent(category);

  const [posts, categories] = await Promise.all([
    getPostsByCategory(cat, l),
    getAllCategories(l),
  ]);

  return <BlogIndex posts={posts} categories={categories} activeCategory={cat} />;
}

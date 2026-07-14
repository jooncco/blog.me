import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPostsMeta, getPost } from '@/lib/blog';
import { LangDisclaimerBanner, PostView } from '@/components/blog';
import { buildMetadata, articleJsonLd, JsonLdScript } from '@/lib/seo';
import type { Locale } from '@/types';

type Props = { params: Promise<{ locale: string; slug: string }> };

/**
 * Every slug is routable in every locale — the loader falls back to the other
 * translation (with a disclaimer banner) when the requested one is missing.
 */
export async function generateStaticParams() {
  const metas = await getAllPostsMeta('en');
  return metas.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const post = await getPost(slug, l);
  if (!post) return {};
  const { title, teaser, ogImage, date, lastModified, tags } = post.meta;
  return buildMetadata({
    title,
    description: teaser ?? title,
    path: `/blog/${slug}`,
    locale: l,
    ogImage,
    type: 'article',
    publishedTime: date,
    modifiedTime: lastModified ?? date,
    tags,
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const post = await getPost(slug, l);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const isFallback = !post.meta.availableLocales.includes(l);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Link
          href="/blog"
          className="font-mono text-xs uppercase tracking-wide text-hud-cyan/80 transition-colors hover:text-hud-cyan">
          ← {t('backToIndex')}
        </Link>
      </div>

      {isFallback ? <LangDisclaimerBanner available={post.meta.availableLocales} /> : null}

      <JsonLdScript data={articleJsonLd(post)} />
      <PostView post={post} />
    </div>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Now } from '@/components/sections';
import { NOW } from '@/data/now';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sections' });
  return buildMetadata({
    title: t('now.title'),
    description: t('now.intro'),
    path: '/now',
    locale: locale as Locale,
  });
}

export default async function NowPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <Now data={NOW} />
    </div>
  );
}

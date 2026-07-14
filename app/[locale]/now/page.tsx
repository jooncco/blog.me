import { setRequestLocale } from 'next-intl/server';
import { Now } from '@/components/sections';
import { NOW } from '@/data/now';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NowPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <Now data={NOW} />
    </div>
  );
}

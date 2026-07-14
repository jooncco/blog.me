import { setRequestLocale } from 'next-intl/server';
import { Contact } from '@/components/sections';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <Contact />
    </div>
  );
}

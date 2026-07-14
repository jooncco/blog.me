import { setRequestLocale } from 'next-intl/server';
import Contact from '@/components/Contact/Contact';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col rounded-2xl bg-neutral px-0 drop-shadow-lg sm:px-8">
      <Contact />
    </div>
  );
}

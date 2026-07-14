import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

// Catch-all for unknown localized paths → renders the localized `not-found.tsx`
// within the locale layout. Establishing the active locale first gives the
// surrounding shell (and the localized 404) a valid next-intl request context.
export default async function CatchAllPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}

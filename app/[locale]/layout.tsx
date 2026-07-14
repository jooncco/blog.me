import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import { AppProviders } from '@/providers/AppProviders';
import { Header } from '@/components/shell/Header';
import { Footer } from '@/components/shell/Footer';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jooncco.me/'),
  title: {
    default: 'jooncco.me',
    template: '%s | jooncco.me',
  },
  description: 'This cool nerd never stops.',
  keywords: ['jooncco', 'developer', 'web', 'portfolio'],
};

/** Statically render all configured locales. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Next 15: params is a Promise.
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body className="bg-base text-text font-sans">
        <AppProviders locale={locale} messages={messages}>
          <Header />
          <main className="mx-auto mt-[4.5rem] flex min-w-0 max-w-6xl flex-col">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

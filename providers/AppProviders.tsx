'use client';

import type { ReactNode } from 'react';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { TIME_ZONE } from '@/i18n/routing';
import { AlertProvider } from './AlertProvider';
import { AlertHost } from './AlertHost';

export type AppProvidersProps = {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Composes the global client providers (Unit U3):
 *  - `NextIntlClientProvider` — client-side translations (messages from layout)
 *  - next-themes `ThemeProvider` — light/dark class toggle
 *  - `AlertProvider` (+ `AlertHost`) — global HUD alert context
 */
export function AppProviders({ locale, messages, children }: AppProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={TIME_ZONE}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AlertProvider>
          {children}
          <AlertHost />
        </AlertProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

export default AppProviders;

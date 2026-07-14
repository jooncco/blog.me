import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Root layout — required because a root `app/not-found.tsx` exists. It only
// passes children through; the real <html>/<body> shell lives in
// `app/[locale]/layout.tsx` (localized) and `app/not-found.tsx` (global 404).
export const metadata: Metadata = {
  metadataBase: new URL('https://jooncco.me/'),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

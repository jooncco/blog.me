import Link from 'next/link';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

/**
 * Global (non-localized) 404 for paths outside the `[locale]` routing scope.
 * It has no next-intl request context, so copy is static English and it renders
 * its own <html>/<body> (there is no root layout above it).
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="bg-page text-text font-sans">
        <main className="flex min-h-screen items-center justify-center px-4 text-center">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-hud-red">404</p>
            <h1 className="mt-3 font-display-alt text-2xl font-bold uppercase tracking-wider">
              Signal lost
            </h1>
            <p className="mt-3 text-text/80">
              The coordinates you requested don&apos;t map to any page.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-sm border border-hud-cyan/60 px-4 py-2 font-display text-sm uppercase tracking-wider text-hud-cyan transition-colors hover:bg-hud-cyan/10">
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

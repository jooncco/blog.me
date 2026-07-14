import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// next-intl locale negotiation + routing (Unit U3).
// U7: security headers (CSP/HSTS/etc.) are layered on top of this response here.
export default createMiddleware(routing);

export const config = {
  // Run on every pathname except:
  // - API routes (/api)
  // - Next.js internals (/_next) and Vercel internals (/_vercel)
  // - files with an extension (static assets, favicon.ico, icon.png,
  //   apple-icon.png, opengraph-image.jpg, sitemap.xml, robots.txt, …)
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};

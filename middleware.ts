import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// next-intl locale negotiation + routing (Unit U3), composed with the HTTP
// security response headers required by the Security Baseline (SR-2 / SECURITY-04).
//
// We run the intl middleware first (it performs locale detection / redirects and
// produces the response), then layer the security headers onto whatever response
// it returns so both concerns apply on every HTML navigation.

const intlMiddleware = createMiddleware(routing);

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Content-Security-Policy.
 *
 * Justification for the allowances below (SECURITY-04 requires documenting any
 * `unsafe-inline` / `unsafe-eval`):
 *  - `script-src 'unsafe-inline'`: Next.js injects small inline bootstrap
 *    scripts (RSC flight data / hydration). `'unsafe-eval'` is added ONLY in
 *    development because the React refresh/dev runtime relies on eval; it is
 *    never emitted in production builds.
 *  - `style-src 'unsafe-inline'`: Material Tailwind and KaTeX inject inline
 *    `style=""` attributes / <style> tags at runtime that cannot be nonce'd, so
 *    inline styles must be permitted. Styles carry no script-execution risk.
 *  - `connect-src`: the CP snapshot refresh route and the client email form talk
 *    to EmailJS / LeetCode / Codeforces; those origins are explicitly allowlisted.
 *  - `img-src data: blob:`: HUD canvases and inlined icons use data/blob URIs.
 *  - `frame-ancestors 'none'` + `object-src 'none'` + `base-uri 'self'` lock down
 *    clickjacking, plugin, and base-tag injection vectors.
 */
function buildCsp(): string {
  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : "'self' 'unsafe-inline'";
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.emailjs.com https://leetcode.com https://codeforces.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ');
}

const CSP = buildCsp();

function applySecurityHeaders(headers: Headers): void {
  headers.set('Content-Security-Policy', CSP);
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-DNS-Prefetch-Control', 'on');
}

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  applySecurityHeaders(response.headers);
  return response;
}

export const config = {
  // Run on every pathname except:
  // - API routes (/api)
  // - Next.js internals (/_next) and Vercel internals (/_vercel)
  // - files with an extension (static assets, favicon.ico, icon.png,
  //   apple-icon.png, opengraph-image.jpg, sitemap.xml, robots.txt, …)
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};

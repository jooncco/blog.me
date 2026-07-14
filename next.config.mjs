import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Security headers (CSP etc.) are enforced in middleware.ts (Unit U7 / SR-2).
};

export default withNextIntl(nextConfig);

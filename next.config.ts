// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    // Define all the locales you want to support
    locales: ['en', 'he'],
    // Set the default locale to English
    defaultLocale: 'en',
    // Set this to false to prevent automatic redirection to locale-specific URLs
    localeDetection: false,
    // This will make sure the user stays on the current URL path even when changing languages
    domains: [],
  },
  // Other Next.js config options...
};

module.exports = nextConfig;
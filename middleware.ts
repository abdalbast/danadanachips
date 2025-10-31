import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

// Middleware is skipped during static export (output: 'export')
// This only runs in development or when deployed with a server
export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches - Kurdish is default
  defaultLocale: 'ckb',

  // Always use locale prefix
  localePrefix: 'always',
  
  // Disable locale detection for static export compatibility
  localeDetection: false,
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};


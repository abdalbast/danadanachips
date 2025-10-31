import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'ar', 'ckb'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  ckb: 'کوردی',
};

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
  ckb: 'rtl',
};

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // During static generation (build time), requestLocale might be undefined
  // In that case, we'll use the locale from params via generateStaticParams()
  // For runtime, validate that the incoming `locale` parameter is valid
  if (locale && !locales.includes(locale as Locale)) {
    return notFound();
  }

  // If no locale is provided (during static generation), use default
  // This should not happen if generateStaticParams() is working correctly
  if (!locale) {
    locale = 'ckb'; // Default locale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});


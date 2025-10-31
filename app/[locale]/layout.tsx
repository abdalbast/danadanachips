import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeDirections, type Locale } from '@/i18n';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';

// Dynamic rendering: Required for development (next-intl uses headers())
// For static export (GitHub Pages), Next.js will use generateStaticParams() to pre-generate routes
// During static generation, locale comes from params, not headers
export const dynamic = process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS === 'true' 
  ? 'force-static' 
  : 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dana Dana Chips - Taste the Pop. Love the Crunch.',
  description:
    'Light, airy puffs bursting with flavour—made for sharing, perfect for snacking. Discover Dana Dana Chips from Kurdistan.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const direction = localeDirections[locale as Locale];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.setAttribute('lang', '${locale}');
            document.documentElement.setAttribute('dir', '${direction}');
          `,
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <div className="flex min-h-screen flex-col">
          <Navigation locale={locale as Locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as Locale} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}


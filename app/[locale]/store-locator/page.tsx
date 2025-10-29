import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getAllRetailers } from '@/lib/sanity.queries';
import StoreLocatorMap from '@/components/ui/organisms/store-locator-map';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'storeLocator' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function StoreLocatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const retailers = await getAllRetailers();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-flame-red to-zesty-orange py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Find Dana Dana Near You
          </h1>
          <p className="text-lg md:text-xl text-center max-w-2xl mx-auto">
            Discover where to buy your favourite puff snacks at stores near you or order online
          </p>
        </div>
      </section>

      {/* Store Locator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <StoreLocatorMap retailers={retailers} locale={locale} />
        </div>
      </section>
    </div>
  );
}


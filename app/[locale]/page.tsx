import { getTranslations } from 'next-intl/server';
import { HeroPuffBurst } from '@/components/ui/organisms/hero-puff-burst';
import { ProductCard } from '@/components/ui/molecules/product-card';
import { UGCWall } from '@/components/ui/organisms/ugc-wall';
import { NewsletterForm } from '@/components/ui/molecules/newsletter-form';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts, getActiveUGC } from '@/lib/queries';
import type { Product, UGCContent } from '@/lib/types';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  // Fetch data from Sanity
  const featuredProducts = await getFeaturedProducts(locale);
  const ugcContent = await getActiveUGC(locale, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroPuffBurst
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaFindNearMe={t('hero.cta.buy')}
        ctaSample={t('hero.cta.sample')}
        locale={locale}
      />

      {/* Top Flavours Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12 space-y-3">
              <h2 className="font-display text-4xl md:text-5xl font-black text-ink">
                {t('topFlavours.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('topFlavours.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* UGC Reel Wall */}
      {ugcContent.length > 0 && (
        <UGCWall
          items={ugcContent}
          title={t('ugc.title')}
          subtitle={t('ugc.subtitle')}
        />
      )}

      {/* Brand Story Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-flame/10 via-zesty/10 to-corn/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="font-display text-4xl md:text-5xl font-black text-ink">
                {t('story.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('story.content')}
              </p>
              <Button asChild size="lg">
                <Link href={`/${locale}/about`}>{t('learnMore')}</Link>
              </Button>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/Brand Story.png"
                alt={t('story.title')}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Where to Buy Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-3">
            <h2 className="font-display text-4xl md:text-5xl font-black text-ink">
              {t('whereToBuy.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('whereToBuy.subtitle')}
            </p>
          </div>
          <Button asChild size="lg" className="mx-auto">
            <Link href={`/${locale}/store-locator`}>
              <MapPin className="mr-2 h-5 w-5" />
              {t('whereToBuy.cta')}
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="space-y-3">
              <h2 className="font-display text-3xl md:text-4xl font-black text-ink">
                {t('newsletter.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('newsletter.subtitle')}
              </p>
            </div>
            <div className="flex justify-center">
              <NewsletterForm
                placeholder={t('newsletter.placeholder')}
                buttonText={t('newsletter.cta')}
                successMessage={t('newsletter.success')}
                errorMessage={t('newsletter.error')}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeatChip } from '@/components/ui/atoms/heat-chip';
import { HalalBadge } from '@/components/ui/atoms/halal-badge';
import { ProductCard } from '@/components/ui/molecules/product-card';
import { MapPin, Share2 } from 'lucide-react';
import { getProductBySlug } from '@/lib/sanity.queries';

interface ProductDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('productDetail');

  // Fetch product from Sanity
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const mainImageUrl = product.images[0] || '/placeholder-product.jpg';

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image
              src={mainImageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <Image
                    src={image || '/placeholder-product.jpg'}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight">
                {product.name}
              </h1>
              <button
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <HeatChip level={product.heatLevel} showLabel />
              {product.isHalal && <HalalBadge />}
            </div>

            {product.flavour && (
              <div className="inline-block px-4 py-2 bg-muted rounded-full">
                <span className="text-sm font-medium">{product.flavour}</span>
              </div>
            )}
          </div>

          {product.description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Available Sizes:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 border rounded-lg text-sm font-medium"
                  >
                    {size.size}
                    {size.price && ` - ${size.price}`}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="flex-1">
              <Link href={`/${locale}/store-locator`}>
                <MapPin className="mr-2 h-5 w-5" />
                {t('cta.findNearMe')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs: Nutrition, Ingredients */}
      <div className="mb-16">
        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="nutrition">{t('tabs.nutrition')}</TabsTrigger>
            <TabsTrigger value="ingredients">{t('tabs.ingredients')}</TabsTrigger>
          </TabsList>
          <TabsContent value="nutrition" className="mt-6">
            {product.nutritionPer100g ? (
              <div className="max-w-2xl mx-auto">
                <h3 className="font-display text-2xl font-bold mb-4">
                  Nutrition Facts (per 100g)
                </h3>
                <div className="border rounded-lg divide-y">
                  {Object.entries(product.nutritionPer100g).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex justify-between p-4">
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Nutrition information coming soon
              </p>
            )}
          </TabsContent>
          <TabsContent value="ingredients" className="mt-6">
            {product.ingredients ? (
              <div className="max-w-2xl mx-auto">
                <h3 className="font-display text-2xl font-bold mb-4">
                  Ingredients
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Ingredients information coming soon
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="space-y-8">
          <h2 className="font-display text-3xl font-black text-ink text-center">
            {t('relatedProducts')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct._id}
                product={relatedProduct}
                locale={locale}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


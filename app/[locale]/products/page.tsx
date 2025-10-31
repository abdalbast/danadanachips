import { getTranslations } from 'next-intl/server';
import { ProductGrid } from '@/components/ui/organisms/product-grid';
import { getAllProducts } from '@/lib/queries';

export const dynamic = 'force-static';

interface ProductsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const t = await getTranslations('products');

  // Fetch all products from Sanity
  const products = await getAllProducts(locale);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-ink">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our full range of delicious puff flavours
          </p>
        </div>

        {/* Product Grid with Filters */}
        <ProductGrid products={products} locale={locale} showFilters={true} />
      </div>
    </div>
  );
}


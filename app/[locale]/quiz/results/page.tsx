import { Suspense } from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/molecules/product-card';
import { Sparkles, MapPin, ArrowLeft } from 'lucide-react';
import { getAllProducts } from '@/lib/sanity.queries';
import { calculateProductMatch, filterProductsByQuiz, getMoodMessage } from '@/lib/quiz-logic';
import type { QuizAnswers } from '@/lib/quiz-logic';

export const dynamic = 'force-static';

interface QuizResultsPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    crunch?: string;
    heat?: string;
    mood?: string;
  }>;
}

export default async function QuizResultsPage({
  params,
  searchParams,
}: QuizResultsPageProps) {
  const { locale } = await params;
  const queryParams = await searchParams;
  const t = await getTranslations('quiz.results');

  // Get quiz answers from URL
  const answers: QuizAnswers = {
    crunch: queryParams.crunch as any,
    heat: queryParams.heat as any,
    mood: queryParams.mood as any,
  };

  // Calculate product match
  const productMatch = calculateProductMatch(answers);
  const moodMessage = getMoodMessage(answers.mood);

  // Fetch all products and filter
  const allProducts = await getAllProducts(locale);
  const matchedProducts = filterProductsByQuiz(allProducts, productMatch);

  // If no exact matches, show similar products (same puff type OR same heat level)
  const similarProducts = matchedProducts.length === 0
    ? allProducts.filter(
        (p) =>
          p.puffType === productMatch.puffType || p.heatLevel === productMatch.heatLevel
      )
    : [];

  const productsToShow = matchedProducts.length > 0 ? matchedProducts : similarProducts;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-flame to-zesty text-white rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Quiz Complete!
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-ink">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-lg text-flame font-medium">{moodMessage}</p>
        </div>

        {/* Results */}
        {productsToShow.length > 0 ? (
          <div className="space-y-6">
            {matchedProducts.length === 0 && (
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">
                  We couldn't find an exact match, but here are some similar
                  flavours you might enjoy!
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsToShow.slice(0, 6).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              We're still expanding our flavours! Check back soon.
            </p>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-flame hover:bg-flame/90">
            <Link href={`/${locale}/store-locator`}>
              <MapPin className="mr-2 h-5 w-5" />
              {t('cta.findInStore')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`/${locale}/products`}>{t('cta.browseAll')}</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href={`/${locale}/quiz`}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t('cta.retake')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


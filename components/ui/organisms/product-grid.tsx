'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ProductCard } from '@/components/ui/molecules/product-card';
import { FilterBar } from '@/components/ui/molecules/filter-bar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Product } from '@/lib/types';

interface ProductGridProps {
  products: Product[];
  locale: string;
  showFilters?: boolean;
}

type SortOption = 'nameAsc' | 'nameDesc' | 'heatAsc' | 'heatDesc';

export function ProductGrid({
  products,
  locale,
  showFilters = true,
}: ProductGridProps) {
  const t = useTranslations('products');
  const [filters, setFilters] = useState<{
    puffType?: string;
    heatLevel?: string;
    size?: string;
    halalOnly?: boolean;
  }>({});

  const [sortBy, setSortBy] = useState<SortOption>('nameAsc');

  const handleFilterChange = (key: string, value: string | boolean | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (filters.puffType) {
      result = result.filter((p) => p.puffType === filters.puffType);
    }

    if (filters.heatLevel !== undefined) {
      const heatLevel = parseInt(filters.heatLevel);
      result = result.filter((p) => p.heatLevel === heatLevel);
    }

    if (filters.size) {
      result = result.filter((p) =>
        p.sizes?.some((s) => s.size === filters.size)
      );
    }

    if (filters.halalOnly) {
      result = result.filter((p) => p.isHalal);
    }

      // Apply sorting - use localized names for comparison
      switch (sortBy) {
        case 'nameAsc':
          result.sort((a, b) => {
            const nameA = typeof a.name === 'string' ? a.name : (a.name?.[locale as keyof typeof a.name] || a.name?.en || '');
            const nameB = typeof b.name === 'string' ? b.name : (b.name?.[locale as keyof typeof b.name] || b.name?.en || '');
            return nameA.localeCompare(nameB, locale === 'ckb' || locale === 'ar' ? 'ar' : 'en');
          });
          break;
        case 'nameDesc':
          result.sort((a, b) => {
            const nameA = typeof a.name === 'string' ? a.name : (a.name?.[locale as keyof typeof a.name] || a.name?.en || '');
            const nameB = typeof b.name === 'string' ? b.name : (b.name?.[locale as keyof typeof b.name] || b.name?.en || '');
            return nameB.localeCompare(nameA, locale === 'ckb' || locale === 'ar' ? 'ar' : 'en');
          });
          break;
        case 'heatAsc':
          result.sort((a, b) => a.heatLevel - b.heatLevel);
          break;
        case 'heatDesc':
          result.sort((a, b) => b.heatLevel - a.heatLevel);
          break;
      }

    return result;
  }, [products, filters, sortBy, locale]);

  return (
    <div className="space-y-8">
      {/* Filters and Sort */}
      {showFilters && (
        <div className="space-y-6">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? t('productFound') : t('productsFound')} {t('found')}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('sort.title')}:</span>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nameAsc">{t('sort.nameAsc')}</SelectItem>
                  <SelectItem value="nameDesc">{t('sort.nameDesc')}</SelectItem>
                  <SelectItem value="heatAsc">{t('sort.heatAsc')}</SelectItem>
                  <SelectItem value="heatDesc">{t('sort.heatDesc')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            {t('noResults')}
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-4 text-flame hover:underline font-medium"
          >
            {t('filters.clear')}
          </button>
        </div>
      )}
    </div>
  );
}


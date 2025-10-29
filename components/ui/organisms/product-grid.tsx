'use client';

import { useMemo, useState } from 'react';
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

    // Apply sorting
    switch (sortBy) {
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'heatAsc':
        result.sort((a, b) => a.heatLevel - b.heatLevel);
        break;
      case 'heatDesc':
        result.sort((a, b) => b.heatLevel - a.heatLevel);
        break;
    }

    return result;
  }, [products, filters, sortBy]);

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
              {filteredAndSortedProducts.length} product
              {filteredAndSortedProducts.length !== 1 && 's'} found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
                  <SelectItem value="nameDesc">Name (Z-A)</SelectItem>
                  <SelectItem value="heatAsc">Heat (Low to High)</SelectItem>
                  <SelectItem value="heatDesc">Heat (High to Low)</SelectItem>
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
            No products found matching your filters.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-4 text-flame hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeatChip } from '@/components/ui/atoms/heat-chip';
import { HalalBadge } from '@/components/ui/atoms/halal-badge';
import { urlFor } from '@/lib/sanity.queries';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const imageUrl = product.images[0]
    ? urlFor(product.images[0]).width(400).height(400).url()
    : '/placeholder-product.png';

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden h-full flex flex-col group">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {product.isHalal && (
            <div className="absolute top-3 right-3">
              <HalalBadge size="sm" />
            </div>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-lg font-bold leading-tight line-clamp-2">
                {product.name}
              </h3>
              <HeatChip level={product.heatLevel} />
            </div>
            {product.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full" variant="default">
            <Link href={`/${locale}/products/${product.slug}`}>
              View Details
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}


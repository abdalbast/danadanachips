'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import type { UGCContent } from '@/lib/types';

interface ReelCardProps {
  content: UGCContent;
  onClick?: () => void;
}

export function ReelCard({ content, onClick }: ReelCardProps) {
  const thumbnailUrl = content.thumbnailImage || content.mediaUrl || '/placeholder-product.jpg';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card
        className="relative overflow-hidden cursor-pointer group aspect-[9/16]"
        onClick={onClick}
      >
        <div className="relative w-full h-full">
          <Image
            src={thumbnailUrl}
            alt={content.caption || 'User generated content'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-flame fill-flame" />
            </div>
          </div>
          {/* Platform badge */}
          <div className="absolute top-3 left-3">
            <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              {content.platform}
            </div>
          </div>
          {/* Caption overlay */}
          {content.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-sm line-clamp-3">{content.caption}</p>
              {content.author && (
                <p className="text-white/80 text-xs mt-1">@{content.author}</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}


'use client';

import { useState } from 'react';
import { ReelCard } from '@/components/ui/molecules/reel-card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { UGCContent } from '@/lib/types';

interface UGCWallProps {
  items: UGCContent[];
  title?: string;
  subtitle?: string;
}

export function UGCWall({ items, title, subtitle }: UGCWallProps) {
  const [selectedContent, setSelectedContent] = useState<UGCContent | null>(null);

  const handleContentClick = (content: UGCContent) => {
    setSelectedContent(content);
  };

  const handleClose = () => {
    setSelectedContent(null);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12 space-y-3">
            {title && (
              <h2 className="font-display text-4xl md:text-5xl font-black text-ink">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {items.map((content) => (
            <ReelCard
              key={content._id}
              content={content}
              onClick={() => handleContentClick(content)}
            />
          ))}
        </div>

        {/* Lightbox dialog */}
        <Dialog open={!!selectedContent} onOpenChange={handleClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto p-0">
            {selectedContent && (
              <div className="space-y-4 p-6">
                {/* If embed code exists, use it */}
                {selectedContent.embedCode ? (
                  <div
                    className="w-full aspect-[9/16] max-h-[70vh]"
                    dangerouslySetInnerHTML={{ __html: selectedContent.embedCode }}
                  />
                ) : (
                  // Otherwise, show a link to the original content
                  <div className="space-y-4">
                    <div className="aspect-[9/16] bg-muted flex items-center justify-center rounded-lg">
                      <p className="text-muted-foreground">
                        Click the link below to view this content
                      </p>
                    </div>
                    <a
                      href={selectedContent.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-3 bg-flame text-white rounded-lg hover:bg-flame/90 transition-colors font-medium"
                    >
                      View on {selectedContent.platform}
                    </a>
                  </div>
                )}

                {/* Caption and details */}
                {selectedContent.caption && (
                  <div className="space-y-2">
                    <p className="text-foreground leading-relaxed">
                      {selectedContent.caption}
                    </p>
                    {selectedContent.author && (
                      <p className="text-sm text-muted-foreground">
                        by @{selectedContent.author}
                      </p>
                    )}
                  </div>
                )}

                {/* Featured product link */}
                {selectedContent.featuredProduct && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      Featured Product:
                    </p>
                    <a
                      href={`/products/${selectedContent.featuredProduct.slug}`}
                      className="font-medium text-flame hover:underline"
                    >
                      {selectedContent.featuredProduct.name}
                    </a>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}


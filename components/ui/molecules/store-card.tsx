import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import { urlFor } from '@/lib/sanity.queries';
import type { Retailer } from '@/lib/types';

interface StoreCardProps {
  retailer: Retailer;
  distance?: number;
  locale: string;
}

export function StoreCard({ retailer, distance, locale }: StoreCardProps) {
  const logoUrl = retailer.logo
    ? urlFor(retailer.logo).width(120).height(60).url()
    : null;

  const getDirectionsUrl = () => {
    if (retailer.geocode) {
      return `https://www.google.com/maps/dir/?api=1&destination=${retailer.geocode.lat},${retailer.geocode.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${retailer.name} ${retailer.address}`
    )}`;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with logo/name */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {logoUrl ? (
                <div className="relative w-24 h-12">
                  <Image
                    src={logoUrl}
                    alt={retailer.name}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                <h3 className="font-display font-bold text-lg">{retailer.name}</h3>
              )}
            </div>
            {distance !== undefined && (
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {distance.toFixed(1)} km
              </span>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
            <div>
              <p className="text-foreground">{retailer.address}</p>
              <p className="text-muted-foreground">
                {retailer.city}, {retailer.country}
              </p>
            </div>
          </div>

          {/* Hours */}
          {retailer.hours && (
            <div className="flex items-start gap-2 text-sm">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
              <p className="text-muted-foreground">{retailer.hours}</p>
            </div>
          )}

          {/* Phone */}
          {retailer.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <a
                href={`tel:${retailer.phone}`}
                className="text-foreground hover:text-flame transition-colors"
              >
                {retailer.phone}
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild size="sm" className="flex-1">
              <a
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Get Directions
              </a>
            </Button>
            {retailer.onlineUrl && (
              <Button asChild size="sm" variant="outline">
                <a
                  href={retailer.onlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Visit Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


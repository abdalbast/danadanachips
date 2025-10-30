'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import type { Retailer } from '@/lib/types';

interface MockMapProps {
  retailers: Retailer[];
  selectedRetailer?: Retailer | null;
  onRetailerClick?: (retailer: Retailer) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

export function MockMap({ 
  retailers, 
  selectedRetailer, 
  onRetailerClick,
  center = { lat: 36.1911, lng: 44.0094 }, // Default to Erbil
  zoom = 11
}: MockMapProps) {
  const [mapImage, setMapImage] = useState<string>('');

  // Generate a mock map image URL using Google Maps Static API style
  // For demo purposes, we'll use a placeholder with markers
  useEffect(() => {
    // Calculate bounds to center the map
    const lats = retailers
      .filter(r => r.geocode)
      .map(r => r.geocode!.lat);
    const lngs = retailers
      .filter(r => r.geocode)
      .map(r => r.geocode!.lng);

    if (lats.length === 0) {
      setMapImage('');
      return;
    }

    const centerLat = lats.reduce((a, b) => a + b, 0) / lats.length;
    const centerLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;

    // Create a simple SVG-based map for demo
    const svgContent = `
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="#E5E7EB"/>
        <text x="400" y="300" text-anchor="middle" fill="#6B7280" font-family="sans-serif" font-size="24">
          Map View (Demo)
        </text>
        <text x="400" y="330" text-anchor="middle" fill="#9CA3AF" font-family="sans-serif" font-size="14">
          ${retailers.length} stores located
        </text>
      </svg>
    `;
    
    // Use encodeURIComponent for safer encoding
    const encodedSvg = encodeURIComponent(svgContent);
    setMapImage(`data:image/svg+xml;charset=utf-8,${encodedSvg}`);
  }, [retailers]);

  // Calculate marker positions relative to map bounds
  const getMarkerPosition = (retailer: Retailer) => {
    if (!retailer.geocode) return null;
    
    // Simple positioning for demo (this would be calculated based on actual map bounds)
    const baseX = 400;
    const baseY = 300;
    const offsetX = ((retailer.geocode.lng - center.lng) * 10000) % 600;
    const offsetY = ((retailer.geocode.lat - center.lat) * 10000) % 400;
    
    return {
      x: baseX + offsetX,
      y: baseY + offsetY,
    };
  };

  return (
    <div className="relative w-full h-[600px] bg-muted rounded-lg overflow-hidden border border-border">
      {/* Map Image Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: mapImage ? `url(${mapImage})` : undefined,
          backgroundColor: '#E5E7EB'
        }}
      >
        {!mapImage && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-lg font-medium">Map View (Demo)</p>
              <p className="text-sm">{retailers.length} stores located</p>
            </div>
          </div>
        )}
      </div>

      {/* Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {retailers
          .filter(r => r.geocode)
          .map((retailer) => {
            const position = getMarkerPosition(retailer);
            if (!position) return null;

            const isSelected = selectedRetailer?._id === retailer._id;

            return (
              <div
                key={retailer._id}
                className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-full transition-all hover:scale-110"
                style={{
                  left: `${(position.x / 800) * 100}%`,
                  top: `${(position.y / 600) * 100}%`,
                }}
                onClick={() => onRetailerClick?.(retailer)}
              >
                <div
                  className={`relative ${
                    isSelected ? 'scale-125 z-10' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 ${
                      isSelected
                        ? 'bg-flame border-white shadow-lg'
                        : 'bg-white border-flame shadow-md'
                    } flex items-center justify-center transition-all`}
                  >
                    <MapPin
                      className={`h-4 w-4 ${
                        isSelected ? 'text-white' : 'text-flame'
                      }`}
                      fill={isSelected ? 'white' : '#E5322D'}
                    />
                  </div>
                  {isSelected && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-white rounded shadow-lg border border-border text-xs font-medium whitespace-nowrap">
                      {retailer.name}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-border">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-flame" />
          <span className="font-medium">{retailers.length} Stores</span>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="absolute top-4 right-4 bg-flame/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-flame/20">
        <p className="text-white text-xs font-medium">Demo Map</p>
      </div>
    </div>
  );
}

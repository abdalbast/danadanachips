'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { Retailer } from '@/lib/types';
import { StoreCard } from '../molecules/store-card';
import { Input } from '../input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { MapPin, Search } from 'lucide-react';

interface StoreLocatorMapProps {
  retailers: Retailer[];
  locale: string;
}

export default function StoreLocatorMap({ retailers, locale }: StoreLocatorMapProps) {
  const t = useTranslations('storeLocator');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<Retailer | null>(null);

  // Get unique countries
  const countries = useMemo(() => {
    const countrySet = new Set(retailers.map(r => r.country));
    return Array.from(countrySet).map(code => ({
      code,
      name: code === 'GB' 
        ? (locale === 'ckb' ? 'شانشینی یەکگرتوو' : locale === 'ar' ? 'المملكة المتحدة' : 'United Kingdom')
        : code === 'IQ' 
        ? (locale === 'ckb' ? 'عێراق (کوردستان)' : locale === 'ar' ? 'العراق (كردستان)' : 'Iraq (Kurdistan)')
        : code
    }));
  }, [retailers, locale]);

  // Filter retailers
  const filteredRetailers = useMemo(() => {
    return retailers.filter(retailer => {
      const matchesSearch = 
        retailer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        retailer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        retailer.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCountry = selectedCountry === 'all' || retailer.country === selectedCountry;
      
      return matchesSearch && matchesCountry;
    });
  }, [retailers, searchQuery, selectedCountry]);

  // Calculate map center based on filtered retailers
  const mapCenter = useMemo(() => {
    if (filteredRetailers.length === 0 || selectedCountry === 'all') {
      return { lat: 51.5074, lng: -0.1278 }; // Default to London
    }
    
    const retailersWithGeo = filteredRetailers.filter(r => r.geocode);
    if (retailersWithGeo.length === 0) {
      return { lat: 51.5074, lng: -0.1278 };
    }

    const avgLat = retailersWithGeo.reduce((sum, r) => sum + r.geocode!.lat, 0) / retailersWithGeo.length;
    const avgLng = retailersWithGeo.reduce((sum, r) => sum + r.geocode!.lng, 0) / retailersWithGeo.length;
    
    return { lat: avgLat, lng: avgLng };
  }, [filteredRetailers, selectedCountry]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Map Section */}
      <div className="order-2 lg:order-1">
        <div className="sticky top-24 bg-neutral-100 rounded-lg overflow-hidden shadow-lg" style={{ height: '600px' }}>
          {/* Mock Map */}
          <div className="relative w-full h-full bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50">
            {/* Map grid overlay */}
            <div className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: 'linear-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
            />
            
            {/* Map markers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {filteredRetailers.filter(r => r.geocode).map((retailer, index) => {
                  // Simple positioning based on geocode (mock)
                  const latPercent = ((retailer.geocode!.lat - mapCenter.lat + 5) / 10) * 100;
                  const lngPercent = ((retailer.geocode!.lng - mapCenter.lng + 5) / 10) * 100;
                  
                  return (
                    <button
                      key={retailer._id}
                      onClick={() => setSelectedStore(retailer)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125"
                      style={{
                        top: `${Math.max(10, Math.min(90, latPercent))}%`,
                        left: `${Math.max(10, Math.min(90, lngPercent))}%`,
                      }}
                      aria-label={`View ${retailer.name}`}
                    >
                      <div className={`relative ${selectedStore?._id === retailer._id ? 'z-10' : 'z-0'}`}>
                        <MapPin 
                          className={`w-8 h-8 ${selectedStore?._id === retailer._id ? 'text-flame-red' : 'text-zesty-orange'} drop-shadow-lg`}
                          fill="currentColor"
                        />
                        {selectedStore?._id === retailer._id && (
                          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 w-48 text-left">
                            <p className="font-bold text-sm text-ink-black">{retailer.name}</p>
                            <p className="text-xs text-neutral-600 mt-1">{retailer.city}</p>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Map attribution */}
            <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded text-xs text-neutral-600">
              {t('interactiveMap')}
            </div>
          </div>
        </div>
      </div>

      {/* Store List Section */}
      <div className="order-1 lg:order-2 space-y-6">
        {/* Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <Input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger>
              <SelectValue placeholder={t('searchPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allCountries')}</SelectItem>
              {countries.map(country => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="text-sm text-neutral-600">
          {filteredRetailers.length} {filteredRetailers.length === 1 ? t('results.title').split(' ')[0] : t('storesFound')} {t('found')}
        </div>

        {/* Store cards */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {filteredRetailers.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t('noResults')}</p>
              <p className="text-sm mt-2">{t('tryAdjusting')}</p>
            </div>
          ) : (
            filteredRetailers.map(retailer => (
              <StoreCard
                key={retailer._id}
                retailer={retailer}
                isSelected={selectedStore?._id === retailer._id}
                onClick={() => setSelectedStore(retailer)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}



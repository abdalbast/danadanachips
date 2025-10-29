import type { Product, Retailer, UGCContent, Promo, SiteSettings } from './types';
import { mockProducts, mockRetailers, mockUGC, mockPromos, mockSiteSettings } from './mock-data';

// Mock image URL helper (replaces Sanity's urlFor)
export function urlFor(source: string | undefined) {
  return {
    url: () => source || '/placeholder.jpg',
    width: (w: number) => ({ url: () => source || '/placeholder.jpg' }),
    height: (h: number) => ({ url: () => source || '/placeholder.jpg' }),
  };
}

// Product Queries
export async function getAllProducts(locale: string = 'en'): Promise<Product[]> {
  // Simulate async behaviour
  await new Promise(resolve => setTimeout(resolve, 10));
  return [...mockProducts].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getFeaturedProducts(locale: string = 'en'): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return mockProducts.filter(p => p.isFeatured).slice(0, 3);
}

export async function getProductBySlug(slug: string, locale: string = 'en'): Promise<Product | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const product = mockProducts.find(p => p.slug === slug);
  if (!product) return null;
  
  // Add related products
  return {
    ...product,
    relatedProducts: mockProducts
      .filter(p => p._id !== product._id && p.heatLevel === product.heatLevel)
      .slice(0, 3)
  };
}

// Retailer Queries
export async function getAllRetailers(): Promise<Retailer[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return [...mockRetailers].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getRetailersByCountry(countryCode: string): Promise<Retailer[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return mockRetailers
    .filter(r => r.country === countryCode)
    .sort((a, b) => a.city.localeCompare(b.city));
}

// UGC Queries
export async function getActiveUGC(locale: string = 'en', limit: number = 6): Promise<UGCContent[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return mockUGC.slice(0, limit);
}

// Promo Queries
export async function getActivePromos(locale: string = 'en'): Promise<Promo[]> {
  await new Promise(resolve => setTimeout(resolve, 10));
  const now = new Date();
  return mockPromos.filter(promo => {
    const start = new Date(promo.startDate);
    const end = new Date(promo.endDate);
    return start <= now && end >= now;
  });
}

export async function getPromoBySlug(slug: string, locale: string = 'en'): Promise<Promo | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return mockPromos.find(p => p.slug === slug) || null;
}

// Site Settings
export async function getSiteSettings(locale: string = 'en'): Promise<SiteSettings | null> {
  await new Promise(resolve => setTimeout(resolve, 10));
  return mockSiteSettings;
}


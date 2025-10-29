import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface LocalizedString {
  en?: string;
  ar?: string;
  ckb?: string;
}

export interface Product {
  _id: string;
  slug: string;
  name: string;
  flavour: string;
  heatLevel: 0 | 1 | 2 | 3;
  puffType: 'light' | 'big' | 'extra-puffy';
  sizes?: Array<{ size: string; price?: string }>;
  isHalal: boolean;
  isFeatured?: boolean;
  images: SanityImageSource[];
  description?: string;
  ingredients?: string;
  nutritionPer100g?: {
    energy?: string;
    fat?: string;
    saturatedFat?: string;
    carbohydrates?: string;
    sugars?: string;
    protein?: string;
    salt?: string;
  };
  relatedProducts?: Product[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface Retailer {
  _id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  geocode?: {
    lat: number;
    lng: number;
  };
  phone?: string;
  hours?: string;
  onlineUrl?: string;
  logo?: SanityImageSource;
}

export interface UGCContent {
  _id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'other';
  mediaUrl: string;
  embedCode?: string;
  thumbnailImage?: SanityImageSource;
  caption?: string;
  author?: string;
  featuredProduct?: {
    _id: string;
    slug: string;
    name: string;
  };
}

export interface Promo {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  image: SanityImageSource;
  startDate: string;
  endDate: string;
  ctaText?: string;
  ctaUrl?: string;
  terms?: string;
}

export interface SiteSettings {
  title: string;
  tagline?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
  };
  contactEmail?: string;
  wholesaleEmail?: string;
  halalCertification?: {
    certificateNumber?: string;
    issuingBody?: string;
    certificateImage?: SanityImageSource;
  };
  mediaKit?: {
    asset: {
      url: string;
    };
  };
  defaultSeo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
}


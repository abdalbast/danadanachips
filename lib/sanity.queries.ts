import { client } from './sanity.client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Product, Retailer, UGCContent, Promo, SiteSettings } from './types';

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Product Queries
export async function getAllProducts(locale: string = 'en'): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product"] | order(name.${locale} asc) {
      _id,
      "slug": slug.current,
      "name": name.${locale},
      flavour,
      heatLevel,
      puffType,
      sizes,
      isHalal,
      isFeatured,
      images,
      "description": description.${locale}
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getFeaturedProducts(locale: string = 'en'): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product" && isFeatured == true][0...3] {
      _id,
      "slug": slug.current,
      "name": name.${locale},
      flavour,
      heatLevel,
      puffType,
      isHalal,
      images,
      "description": description.${locale}
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getProductBySlug(slug: string, locale: string = 'en'): Promise<Product | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      "slug": slug.current,
      "name": name.${locale},
      flavour,
      heatLevel,
      puffType,
      sizes,
      isHalal,
      images,
      "description": description.${locale},
      "ingredients": ingredients.${locale},
      nutritionPer100g,
      "relatedProducts": relatedProducts[]-> {
        _id,
        "slug": slug.current,
        "name": name.${locale},
        heatLevel,
        isHalal,
        images
      },
      seo
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

// Retailer Queries
export async function getAllRetailers(): Promise<Retailer[]> {
  return client.fetch(
    `*[_type == "retailer" && isActive == true] | order(name asc) {
      _id,
      name,
      address,
      city,
      country,
      geocode,
      phone,
      hours,
      onlineUrl,
      logo
    }`,
    {},
    { next: { revalidate: 300 } }
  );
}

export async function getRetailersByCountry(countryCode: string): Promise<Retailer[]> {
  return client.fetch(
    `*[_type == "retailer" && isActive == true && country == $countryCode] | order(city asc) {
      _id,
      name,
      address,
      city,
      geocode,
      phone,
      hours,
      onlineUrl,
      logo
    }`,
    { countryCode },
    { next: { revalidate: 300 } }
  );
}

// UGC Queries
export async function getActiveUGC(locale: string = 'en', limit: number = 6): Promise<UGCContent[]> {
  return client.fetch(
    `*[_type == "ugcContent" && isActive == true] | order(displayOrder asc, _createdAt desc)[0...${limit}] {
      _id,
      platform,
      mediaUrl,
      embedCode,
      thumbnailImage,
      "caption": caption.${locale},
      author,
      "featuredProduct": featuredProduct-> {
        _id,
        "slug": slug.current,
        "name": name.${locale}
      }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

// Promo Queries
export async function getActivePromos(locale: string = 'en'): Promise<Promo[]> {
  const now = new Date().toISOString();
  return client.fetch(
    `*[_type == "promo" && isActive == true && startDate <= $now && endDate >= $now] | order(startDate desc) {
      _id,
      "slug": slug.current,
      "title": title.${locale},
      "description": description.${locale},
      image,
      startDate,
      endDate,
      "ctaText": ctaText.${locale},
      ctaUrl
    }`,
    { now },
    { next: { revalidate: 300 } }
  );
}

export async function getPromoBySlug(slug: string, locale: string = 'en'): Promise<Promo | null> {
  return client.fetch(
    `*[_type == "promo" && slug.current == $slug][0] {
      _id,
      "slug": slug.current,
      "title": title.${locale},
      "description": description.${locale},
      image,
      startDate,
      endDate,
      "ctaText": ctaText.${locale},
      ctaUrl,
      "terms": terms.${locale}
    }`,
    { slug },
    { next: { revalidate: 300 } }
  );
}

// Site Settings
export async function getSiteSettings(locale: string = 'en'): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      title,
      "tagline": tagline.${locale},
      socialMedia,
      contactEmail,
      wholesaleEmail,
      halalCertification,
      mediaKit,
      defaultSeo
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}


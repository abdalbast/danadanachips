import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.danadanachips.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [];
  
  // Add static routes for each locale
  locales.forEach((locale) => {
    const routes = [
      '',
      '/products',
      '/quiz',
      '/store-locator',
      '/about',
      '/promos',
      '/contact',
      '/wholesale',
    ];

    routes.forEach((route) => {
      staticRoutes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  // TODO: Add dynamic product routes once Sanity is configured
  // const products = await client.fetch<Array<{ slug: string }>>(
  //   `*[_type == "product"]{ "slug": slug.current }`
  // );
  // locales.forEach((locale) => {
  //   products.forEach((product) => {
  //     staticRoutes.push({
  //       url: `${baseUrl}/${locale}/products/${product.slug}`,
  //       lastModified: new Date(),
  //       changeFrequency: 'monthly',
  //       priority: 0.7,
  //     });
  //   });
  // });

  return staticRoutes;
}



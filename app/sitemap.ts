import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { isConfigured, getCollectionProducts } from '@/lib/fourthwall';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['', '/music', '/shows', '/about', '/merch'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  if (isConfigured()) {
    try {
      const collection = process.env.NEXT_PUBLIC_FW_COLLECTION ?? '';
      const products = await getCollectionProducts(collection);
      const productRoutes = products.map((product) => ({
        url: `${SITE_URL}/merch/${product.handle}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
      return [...routes, ...productRoutes];
    } catch {
      return routes;
    }
  }

  return routes;
}

import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/merch/ProductGrid';
import { isConfigured, getCollectionProducts } from '@/lib/fourthwall';

export const metadata: Metadata = {
  title: 'Merch',
  description: 'Official SWIM merchandise. Apparel, accessories, and more.',
};

export default async function MerchPage() {
  if (!isConfigured()) {
    return (
      <section className="py-24 md:py-32">
        <Container>
          <h1 className="text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl">
            Merch
          </h1>
          <p className="mt-8 text-lg text-white/60">
            Merch coming soon. Check back later.
          </p>
        </Container>
      </section>
    );
  }

  const collection = process.env.NEXT_PUBLIC_FW_COLLECTION ?? '';
  const products = await getCollectionProducts(collection);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <h1 className="mb-12 text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl">
          Merch
        </h1>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-lg text-white/60">No products available right now.</p>
        )}
      </Container>
    </section>
  );
}

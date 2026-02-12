import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ProductDetail } from '@/components/merch/ProductDetail';
import { isConfigured, getProduct } from '@/lib/fourthwall';
import { SITE_NAME } from '@/lib/constants';

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isConfigured()) return { title: 'Product' };
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.title,
    description: product.description.slice(0, 160) || `${product.title} - ${SITE_NAME} merch`,
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.featuredImage.url ? [{ url: product.featuredImage.url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  if (!isConfigured()) notFound();
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  return (
    <section className="py-24 md:py-32">
      <Container>
        <ProductDetail product={product} />
      </Container>
    </section>
  );
}

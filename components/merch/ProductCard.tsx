import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Price } from './Price';

export function ProductCard({ product }: { product: Product }) {
  const { featuredImage, title, handle, priceRange } = product;

  return (
    <Link href={`/merch/${handle}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-card">
        {featuredImage.url ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm uppercase tracking-widest text-white/20">{title}</span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <Price
          amount={priceRange.minVariantPrice.amount}
          currencyCode={priceRange.minVariantPrice.currencyCode}
          className="mt-1 text-sm text-muted"
        />
      </div>
    </Link>
  );
}

'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { AddToCart } from './AddToCart';
import { Price } from './Price';
import { VariantSelector } from './VariantSelector';

export function ProductDetail({ product }: { product: Product }) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedVariant = product.variants.find((v) =>
    v.selectedOptions.every(
      (so) => !so.value || selectedOptions[so.name] === so.value,
    ),
  );

  const handleOptionSelect = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      {/* Images */}
      <div>
        <div className="relative aspect-square overflow-hidden bg-card">
          {product.images[selectedImageIndex]?.url ? (
            <Image
              src={product.images[selectedImageIndex].url}
              alt={product.images[selectedImageIndex].altText || product.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-lg uppercase tracking-widest text-white/20">
                {product.title}
              </span>
            </div>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={img.url}
                onClick={() => setSelectedImageIndex(i)}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden border transition-colors ${
                  i === selectedImageIndex ? 'border-white' : 'border-border'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt={img.altText || `${product.title} thumbnail ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-3xl font-bold uppercase tracking-wider text-white">
          {product.title}
        </h1>
        <Price
          amount={selectedVariant?.price.amount ?? product.priceRange.minVariantPrice.amount}
          currencyCode={selectedVariant?.price.currencyCode ?? product.priceRange.minVariantPrice.currencyCode}
          className="mt-2 text-xl"
        />

        <div className="mt-8">
          <VariantSelector
            options={product.options}
            variants={product.variants}
            selectedOptions={selectedOptions}
            onSelect={handleOptionSelect}
          />
        </div>

        <div className="mt-8">
          <AddToCart product={product} variant={selectedVariant} />
        </div>

        {product.descriptionHtml && (
          <div
            className="prose prose-invert mt-8 text-sm text-white/70"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        )}
      </div>
    </div>
  );
}

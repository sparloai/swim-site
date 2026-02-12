'use client';

import { useActionState } from 'react';
import { useCart } from '@/components/cart/cart-context';
import { addItem } from '@/components/cart/actions';
import type { Product, ProductVariant } from '@/lib/types';
import { clsx } from 'clsx';

export function AddToCart({
  product,
  variant,
}: {
  product: Product;
  variant: ProductVariant | undefined;
}) {
  const { addCartItem, refreshCart } = useCart();
  const [message, formAction, isPending] = useActionState(
    async (_prevState: unknown) => {
      if (!variant) return 'Please select options';
      addCartItem(variant, product);
      const result = await addItem(null, variant.id);
      await refreshCart();
      return result;
    },
    null,
  );

  const isDisabled = !variant || !variant.availableForSale || isPending;

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={clsx(
          'w-full min-h-[44px] bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-black transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black',
          isDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'hover:bg-white/90',
        )}
      >
        {isPending
          ? 'Adding...'
          : !variant
            ? 'Select Options'
            : !variant.availableForSale
              ? 'Sold Out'
              : 'Add to Cart'}
      </button>
      {message && typeof message === 'string' && (
        <p className="mt-2 text-sm text-red-400" role="alert">{message}</p>
      )}
    </form>
  );
}

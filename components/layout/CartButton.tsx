'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart/cart-context';
import { CartDrawer } from '@/components/merch/CartDrawer';

export function CartButton() {
  const { cart } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const quantity = cart?.totalQuantity ?? 0;

  return (
    <>
      <button
        onClick={() => setDrawerOpen(true)}
        aria-label={`Cart (${quantity} items)`}
        className="relative flex min-h-[44px] min-w-[44px] items-center justify-center text-white transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {quantity > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
            {quantity}
          </span>
        )}
      </button>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import { useEffect } from 'react';
import { useCart } from '@/components/cart/cart-context';
import { removeItem, updateItemQuantity, redirectToCheckout } from '@/components/cart/actions';
import { Price } from './Price';

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, updateCartItem, refreshCart } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleRemove = async (merchandiseId: string) => {
    updateCartItem(merchandiseId, 'delete');
    await removeItem(null, merchandiseId);
    await refreshCart();
  };

  const handleQuantityChange = async (merchandiseId: string, quantity: number) => {
    const updateType = quantity > (cart?.lines.find((l) => l.merchandise.id === merchandiseId)?.quantity ?? 0) ? 'plus' : 'minus';
    updateCartItem(merchandiseId, updateType);
    await updateItemQuantity(null, { merchandiseId, quantity });
    await refreshCart();
  };

  const handleCheckout = async () => {
    await redirectToCheckout();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-[70] bg-black/60 transition-opacity',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={clsx(
          'fixed top-0 right-0 z-[80] flex h-full w-full max-w-md flex-col bg-black border-l border-border transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white">Cart</h2>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!cart?.lines.length ? (
            <p className="text-center text-sm text-muted">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {cart.lines.map((item) => (
                <li key={item.merchandise.id} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 bg-card">
                    {item.merchandise.product.featuredImage.url && (
                      <Image
                        src={item.merchandise.product.featuredImage.url}
                        alt={item.merchandise.product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-white">
                      {item.merchandise.product.title}
                    </h3>
                    <p className="text-xs text-muted">{item.merchandise.title}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.merchandise.id, item.quantity - 1)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-border text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-sm text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.merchandise.id, item.quantity + 1)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-border text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item.merchandise.id)}
                        className="ml-auto text-xs uppercase tracking-widest text-muted transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        aria-label={`Remove ${item.merchandise.product.title}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <Price
                    amount={item.cost.totalAmount.amount}
                    currencyCode={item.cost.totalAmount.currencyCode}
                    className="text-sm"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <Price
                amount={cart.cost.subtotalAmount.amount}
                currencyCode={cart.cost.subtotalAmount.currencyCode}
                className="font-semibold"
              />
            </div>
            <p className="mt-1 text-xs text-muted">Shipping calculated at checkout.</p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full min-h-[44px] bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

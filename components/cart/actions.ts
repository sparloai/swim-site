'use server';

import { TAGS } from '@/lib/constants';
import { addToCart, createCart, getCart, getCheckoutUrl, removeFromCart, updateCart } from '@/lib/fourthwall';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getCartId(): Promise<string | undefined> {
  const tokenHash = (process.env.NEXT_PUBLIC_FW_STOREFRONT_TOKEN ?? '').trim();
  const cookieStore = await cookies();
  return cookieStore.get(`${tokenHash}/cartId`)?.value;
}

async function setCartId(cartId: string) {
  const tokenHash = (process.env.NEXT_PUBLIC_FW_STOREFRONT_TOKEN ?? '').trim();
  const cookieStore = await cookies();
  cookieStore.set(`${tokenHash}/cartId`, cartId);
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
  await setCartId(cart.id!);
  return cart;
}

export async function fetchCart() {
  const cartId = await getCartId();
  if (!cartId) return undefined;
  return getCart(cartId);
}

export async function addItem(_prevState: unknown, selectedVariantId: string | undefined) {
  try {
    const cart = (await getCart(await getCartId())) ?? (await createCartAndSetCookie());
    if (!cart?.id || !selectedVariantId) return 'Error adding item to cart';
    await addToCart(cart.id, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch {
    return 'Error adding item to cart';
  }
}

export async function removeItem(_prevState: unknown, merchandiseId: string) {
  try {
    const cart = (await getCart(await getCartId())) ?? (await createCartAndSetCookie());
    if (!cart?.id) return 'Error fetching cart';
    const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId);
    if (lineItem?.id) {
      await removeFromCart(cart.id, [lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  _prevState: unknown,
  payload: { merchandiseId: string; quantity: number },
) {
  const { merchandiseId, quantity } = payload;
  try {
    const cart = (await getCart(await getCartId())) ?? (await createCartAndSetCookie());
    if (!cart?.id) return 'Error fetching cart';
    const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId);
    if (lineItem?.id) {
      if (quantity === 0) {
        await removeFromCart(cart.id, [lineItem.id]);
      } else {
        await updateCart(cart.id, [{ id: lineItem.id, merchandiseId, quantity }]);
      }
    } else if (quantity > 0) {
      await addToCart(cart.id, [{ merchandiseId, quantity }]);
    }
    revalidateTag(TAGS.cart);
  } catch {
    return 'Error updating item quantity';
  }
}

export async function redirectToCheckout() {
  const cartId = await getCartId();
  if (!cartId) return 'Missing cart ID';
  const cart = await getCart(cartId);
  if (!cart) return 'Error fetching cart';
  const checkoutUrl = await getCheckoutUrl();
  redirect(`${checkoutUrl}/checkout/?cartId=${cartId}&cartCurrency=USD`);
}

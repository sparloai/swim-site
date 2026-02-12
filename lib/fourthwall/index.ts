import type { Cart, Collection, Product } from '@/lib/types';
import { reshapeCart, reshapeProduct, reshapeProducts } from './reshape';
import type { FourthwallCart, FourthwallCollection, FourthwallProduct, FourthwallShop } from './types';

const API_URL = (process.env.NEXT_PUBLIC_FW_API_URL ?? 'https://storefront-api.fourthwall.com/v1').trim();
const STOREFRONT_TOKEN = (process.env.NEXT_PUBLIC_FW_STOREFRONT_TOKEN ?? '').trim();

class FourthwallError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function fourthwallGet<T>(
  url: string,
  query: Record<string, string | number | undefined>,
  options: RequestInit & { next?: NextFetchRequestConfig } = {},
): Promise<{ status: number; body: T }> {
  const constructed = new URL(url);
  for (const [key, val] of Object.entries(query)) {
    if (val !== undefined) constructed.searchParams.append(key, val.toString());
  }
  constructed.searchParams.append('storefront_token', STOREFRONT_TOKEN);

  const { next, ...fetchOptions } = options;
  const result = await fetch(constructed.toString(), {
    method: 'GET',
    ...fetchOptions,
    headers: { 'Content-Type': 'application/json', ...fetchOptions.headers },
    next,
  });

  const body = JSON.parse(await result.text());

  if (result.status !== 200) {
    throw new FourthwallError('Failed to fetch from Fourthwall', result.status);
  }

  return { status: result.status, body };
}

async function fourthwallPost<T>(
  url: string,
  data: unknown,
  options: RequestInit = {},
): Promise<{ status: number; body: T }> {
  const result = await fetch(`${url}?storefront_token=${STOREFRONT_TOKEN}`, {
    method: 'POST',
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    body: JSON.stringify(data),
  });

  return { status: result.status, body: JSON.parse(await result.text()) };
}

export function isConfigured(): boolean {
  return STOREFRONT_TOKEN.length > 0;
}

export async function getCollections(): Promise<Collection[]> {
  const res = await fourthwallGet<{ results: FourthwallCollection[] }>(
    `${API_URL}/collections`,
    {},
    { next: { revalidate: 3600 } },
  );
  return res.body.results.map((c) => ({
    handle: c.slug,
    title: c.name,
    description: c.description,
  }));
}

export async function getCollectionProducts(collection: string): Promise<Product[]> {
  try {
    const res = await fourthwallGet<{ results: FourthwallProduct[] }>(
      `${API_URL}/collections/${collection}/products`,
      { currency: 'USD' },
      { next: { revalidate: 3600, tags: [`collection-${collection}`] } },
    );
    if (!res.body.results) return [];
    return reshapeProducts(res.body.results);
  } catch {
    return [];
  }
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  try {
    const res = await fourthwallGet<FourthwallProduct>(
      `${API_URL}/products/${handle}`,
      { currency: 'USD' },
      { next: { revalidate: 3600, tags: [`product-${handle}`] } },
    );
    return reshapeProduct(res.body);
  } catch (e) {
    if (e instanceof FourthwallError && e.status === 404) return undefined;
    throw e;
  }
}

export async function getCart(cartId: string | undefined): Promise<Cart | undefined> {
  if (!cartId) return undefined;
  try {
    const res = await fourthwallGet<FourthwallCart>(
      `${API_URL}/carts/${cartId}`,
      { currency: 'USD' },
      { cache: 'no-store' },
    );
    return reshapeCart(res.body);
  } catch {
    return undefined;
  }
}

export async function createCart(): Promise<Cart> {
  const res = await fourthwallPost<FourthwallCart>(`${API_URL}/carts`, { items: [] });
  return reshapeCart(res.body);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const items = lines.map((l) => ({ variantId: l.merchandiseId, quantity: l.quantity }));
  const res = await fourthwallPost<FourthwallCart>(`${API_URL}/carts/${cartId}/add`, { items });
  return reshapeCart(res.body);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const items = lineIds.map((id) => ({ variantId: id }));
  const res = await fourthwallPost<FourthwallCart>(`${API_URL}/carts/${cartId}/remove`, { items });
  return reshapeCart(res.body);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const items = lines.map((l) => ({ variantId: l.merchandiseId, quantity: l.quantity }));
  const res = await fourthwallPost<FourthwallCart>(`${API_URL}/carts/${cartId}/change`, { items });
  return reshapeCart(res.body);
}

export async function getCheckoutUrl(): Promise<string> {
  const checkoutDomain = (process.env.NEXT_PUBLIC_FW_CHECKOUT ?? '').trim();
  if (checkoutDomain) return `https://${checkoutDomain}`;

  const res = await fourthwallGet<FourthwallShop>(
    `${API_URL}/shop`,
    {},
    { next: { revalidate: 3600 } },
  );
  const shop = res.body;
  return shop.publicDomain ? `https://${shop.publicDomain}` : `https://${shop.domain}.fourthwall.com`;
}

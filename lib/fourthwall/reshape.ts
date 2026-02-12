import type { Cart, CartItem, Image, Money, Product, ProductVariant } from '@/lib/types';
import type {
  FourthwallCart,
  FourthwallCartItem,
  FourthwallMoney,
  FourthwallProduct,
  FourthwallProductImage,
  FourthwallProductVariant,
} from './types';

const DEFAULT_IMAGE: Image = {
  url: '',
  transformedUrl: '',
  altText: '',
  width: 0,
  height: 0,
};

function reshapeMoney(money: FourthwallMoney): Money {
  return {
    amount: money.value.toString(),
    currencyCode: money.currency,
  };
}

function reshapeImages(images: FourthwallProductImage[], title: string): Image[] {
  return images.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      url: image.url,
      transformedUrl: image.transformedUrl,
      width: image.width,
      height: image.height,
      altText: `${title} - ${filename}`,
    };
  });
}

function reshapeVariants(variants: FourthwallProductVariant[]): ProductVariant[] {
  return variants.map((v) => ({
    id: v.id,
    title: v.name,
    availableForSale: v.stock.type === 'UNLIMITED' || (v.stock.inStock ?? 0) > 0,
    images: reshapeImages(v.images, v.name),
    selectedOptions: [
      { name: 'Size', value: v.attributes.size?.name },
      { name: 'Color', value: v.attributes.color?.name },
    ],
    price: reshapeMoney(v.unitPrice),
  }));
}

export function reshapeProduct(product: FourthwallProduct): Product | undefined {
  if (!product) return undefined;

  const { images, variants } = product;
  const minPrice = Math.min(...variants.map((v) => v.unitPrice.value));
  const maxPrice = Math.max(...variants.map((v) => v.unitPrice.value));
  const currencyCode = variants[0]?.unitPrice.currency ?? 'USD';
  const attributes = variants.map((v) => v.attributes);
  const sizes = new Set(attributes.filter((a) => !!a.size).map((v) => v.size?.name));
  const colors = new Set(attributes.filter((a) => !!a.color).map((v) => v.color?.name));
  const reshapedVariants = reshapeVariants(variants);

  return {
    id: product.id,
    handle: product.slug,
    title: product.name,
    description: product.description,
    descriptionHtml: product.description,
    images: reshapeImages(images, product.name),
    variants: reshapedVariants,
    priceRange: {
      minVariantPrice: { amount: minPrice.toString(), currencyCode },
      maxVariantPrice: { amount: maxPrice.toString(), currencyCode },
    },
    featuredImage: reshapeImages(images, product.name)[0] ?? DEFAULT_IMAGE,
    options: [
      { id: 'color', name: 'Color', values: [...colors].filter(Boolean) as string[] },
      { id: 'size', name: 'Size', values: [...sizes].filter(Boolean) as string[] },
    ],
    availableForSale: reshapedVariants.some((v) => v.availableForSale),
    tags: [],
    updatedAt: new Date().toISOString(),
  };
}

export function reshapeProducts(products: FourthwallProduct[]): Product[] {
  return products.filter(Boolean).map(reshapeProduct).filter(Boolean) as Product[];
}

function reshapeCartItem(item: FourthwallCartItem): CartItem {
  return {
    id: item.variant.id,
    quantity: item.quantity,
    cost: {
      totalAmount: reshapeMoney({
        value: item.variant.unitPrice.value * item.quantity,
        currency: item.variant.unitPrice.currency,
      }),
    },
    merchandise: {
      id: item.variant.id,
      title: item.variant.name,
      selectedOptions: [],
      product: {
        id: item.variant.product?.id ?? '',
        handle: item.variant.product?.slug ?? '',
        title: item.variant.product?.name ?? '',
        featuredImage: {
          url: item.variant.images[0]?.url ?? '',
          transformedUrl: item.variant.images[0]?.transformedUrl ?? '',
          altText: item.variant.product?.name ?? '',
          width: item.variant.images[0]?.width ?? 100,
          height: item.variant.images[0]?.height ?? 100,
        },
      },
    },
  };
}

export function reshapeCart(cart: FourthwallCart): Cart {
  const totalValue = cart.items
    .map((item) => item.quantity * item.variant.unitPrice.value)
    .reduce((a, b) => a + b, 0);
  const currencyCode = cart.items[0]?.variant.unitPrice.currency ?? 'USD';

  return {
    ...cart,
    cost: {
      totalAmount: { amount: totalValue.toString(), currencyCode },
      subtotalAmount: { amount: totalValue.toString(), currencyCode },
    },
    lines: cart.items.map(reshapeCartItem),
    currency: currencyCode,
    totalQuantity: cart.items.map((item) => item.quantity).reduce((a, b) => a + b, 0),
  };
}

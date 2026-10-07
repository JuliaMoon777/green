import {
  FAVA_BEANS_PRODUCTS,
  CHICKPEA_SNACKS_PRODUCTS,
  PROTEIN_COOKIES_PRODUCTS,
  PEANUTS_FAVA_PRODUCTS,
  GreenergyProduct,
} from '../data/flavors';

const decodedUrls = new Set<string>();
const inflightPromises = new Map<string, Promise<void>>();

export const ALL_COLLECTION_PRODUCTS: GreenergyProduct[] = [
  ...FAVA_BEANS_PRODUCTS,
  ...CHICKPEA_SNACKS_PRODUCTS,
  ...PROTEIN_COOKIES_PRODUCTS,
  ...PEANUTS_FAVA_PRODUCTS,
];

export const EDITORIAL_CLEAN_CAMPAIGN_BG =
  '/src/assets/images/greenergy_clean_campaign_backdrop_1791375708673.jpg';

/**
 * Preloads a single image and decodes it into memory for zero-jank rendering.
 */
export const preloadImage = (
  url: string,
  priority: 'high' | 'auto' | 'low' = 'auto'
): Promise<void> => {
  if (!url || decodedUrls.has(url)) return Promise.resolve();

  const existing = inflightPromises.get(url);
  if (existing) return existing;

  const promise = new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    if ('fetchPriority' in img) {
      (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = priority;
    }

    const markDone = () => {
      decodedUrls.add(url);
      inflightPromises.delete(url);
      resolve();
    };

    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(markDone).catch(markDone);
      } else {
        markDone();
      }
    };

    img.onerror = () => {
      markDone();
    };

    img.src = url;
  });

  inflightPromises.set(url, promise);
  return promise;
};

/**
 * Synchronous check whether an asset URL has already been decoded into memory.
 */
export const isAssetDecoded = (url: string): boolean => {
  return Boolean(url && decodedUrls.has(url));
};

/**
 * Helper to pick the active background URL for the current device orientation.
 */
const getViewportBackgroundUrl = (product: GreenergyProduct): string => {
  const isVertical =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || window.innerHeight > window.innerWidth * 1.05);
  return isVertical
    ? product.mobileBackgroundImage || product.backgroundImage
    : product.backgroundImage;
};

/**
 * Preload all 12 real GREENERGY product packshots and the clean editorial campaign
 * backdrop for the Collection Hero Scene.
 */
export const preloadIntroCollectionPackshots = (): Promise<void[]> => {
  const promises = ALL_COLLECTION_PRODUCTS.map((p, idx) =>
    preloadImage(p.productBoxImage, idx < 6 ? 'high' : 'auto')
  );

  // Preload the clean sunlit editorial campaign backdrop
  promises.push(preloadImage(EDITORIAL_CLEAN_CAMPAIGN_BG, 'high'));

  // Preload initial active product background for seamless transition into SnackHero
  const initialProduct = FAVA_BEANS_PRODUCTS[0];
  if (initialProduct) {
    promises.push(preloadImage(getViewportBackgroundUrl(initialProduct), 'high'));
  }

  return Promise.all(promises);
};

/**
 * Ensures the main product packshot and viewport-matching background
 * are decoded before transitioning to prevent any white flash or empty frame.
 */
export const preloadProduct = (
  product: GreenergyProduct,
  priority: 'high' | 'auto' | 'low' = 'auto'
): Promise<void[]> => {
  const promises: Promise<void>[] = [];

  if (product.productBoxImage) {
    promises.push(preloadImage(product.productBoxImage, priority));
  }

  const bgUrl = getViewportBackgroundUrl(product);
  if (bgUrl) {
    promises.push(preloadImage(bgUrl, priority));
  }

  return Promise.all(promises);
};

/**
 * Waits for the hero packshot of the target product to decode,
 * capped with a short safety timeout so interaction always feels instantaneous.
 */
export const ensureProductReady = async (product: GreenergyProduct): Promise<void> => {
  if (isAssetDecoded(product.productBoxImage)) {
    return;
  }

  const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 90));
  await Promise.race([
    preloadProduct(product, 'high').then(() => undefined),
    timeoutPromise,
  ]);
};

/**
 * Smart preloader:
 * 1. Immediately preloads & decodes all 12 real product packshots for the Collection Hero
 *    plus the clean editorial studio backdrop and the initial hero product's background.
 * 2. Preloads next and previous likely products in the active category.
 */
export const initializeImagePreloader = () => {
  const currentProduct = FAVA_BEANS_PRODUCTS[0];
  const nextProduct = FAVA_BEANS_PRODUCTS[1];
  const prevProduct = FAVA_BEANS_PRODUCTS[FAVA_BEANS_PRODUCTS.length - 1];

  Promise.all([
    preloadIntroCollectionPackshots(),
    preloadProduct(currentProduct, 'high'),
  ]).then(() => {
    if (nextProduct) preloadProduct(nextProduct, 'high');
    if (prevProduct && prevProduct.id !== nextProduct?.id) {
      preloadProduct(prevProduct, 'auto');
    }
  });
};

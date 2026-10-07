import {
  FAVA_BEANS_PRODUCTS,
  CHICKPEA_SNACKS_PRODUCTS,
  PROTEIN_COOKIES_PRODUCTS,
  PEANUTS_FAVA_PRODUCTS,
  GreenergyProduct
} from '../data/flavors';
import { getProductEffectsById } from '../data/product-effects';

const preloadedUrls = new Set<string>();

/**
 * Preloads a single image and decodes it in memory for instant 0ms rendering
 */
export const preloadImage = (url: string, priority: 'high' | 'auto' | 'low' = 'auto'): Promise<void> => {
  if (!url || preloadedUrls.has(url)) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();
    if ('fetchPriority' in img) {
      (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = priority;
    }
    img.src = url;
    
    // Once loaded, decode into memory/GPU
    img.onload = () => {
      preloadedUrls.add(url);
      if ('decode' in img) {
        img.decode().then(() => resolve()).catch(() => resolve());
      } else {
        resolve();
      }
    };
    img.onerror = () => {
      // Still mark to avoid repeat failing requests
      preloadedUrls.add(url);
      resolve();
    };
  });
};

/**
 * Preload all images for a specific product
 */
export const preloadProduct = (product: GreenergyProduct, priority: 'high' | 'auto' = 'auto'): Promise<void[]> => {
  const promises: Promise<void>[] = [];
  if (product.productBoxImage) {
    promises.push(preloadImage(product.productBoxImage, priority));
  }
  if (product.thumbImage && product.thumbImage !== product.productBoxImage) {
    promises.push(preloadImage(product.thumbImage, priority));
  }
  if (product.backgroundImage) {
    promises.push(preloadImage(product.backgroundImage, priority));
  }
  if (product.floatingItems) {
    product.floatingItems.forEach((item) => {
      if (item.image) {
        promises.push(preloadImage(item.image, priority));
      }
    });
  }
  const effectItems = getProductEffectsById(product.id);
  effectItems.forEach((item) => {
    if (item.asset) {
      promises.push(preloadImage(item.asset, priority));
    }
  });
  return Promise.all(promises);
};

/**
 * High-performance smart preloader that immediately loads initial view,
 * then rapidly cascades through all categories in memory.
 */
export const initializeImagePreloader = () => {
  // 1. Critical Priority: First 4 fava beans chips pouches (Active category)
  const initialSnacks = FAVA_BEANS_PRODUCTS;
  const initialPromises = initialSnacks.map((p) => preloadProduct(p, 'high'));

  Promise.all(initialPromises).then(() => {
    // 2. High Priority: Next categories
    const secondaryCategories = [CHICKPEA_SNACKS_PRODUCTS, PROTEIN_COOKIES_PRODUCTS, PEANUTS_FAVA_PRODUCTS];
    
    // Stagger slightly or load in idle
    const loadRemaining = () => {
      secondaryCategories.forEach((cat) => {
        cat.forEach((product) => {
          preloadProduct(product, 'auto');
        });
      });
    };

    const win = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (win.requestIdleCallback) {
      win.requestIdleCallback(loadRemaining, { timeout: 1000 });
    } else {
      setTimeout(loadRemaining, 100);
    }
  });
};

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import {
  FAVA_BEANS_PRODUCTS,
  CHICKPEA_SNACKS_PRODUCTS,
  PROTEIN_COOKIES_PRODUCTS,
  PEANUTS_FAVA_PRODUCTS,
  GreenergyProduct,
} from '../data/flavors';
import { GreenergyLogo } from './GreenergyLogo';
import { SocialLinks } from './SocialLinks';
import { ProductBackgroundScene } from './ProductBackgroundScene';
import { ProductInlineInfo } from './ProductInlineInfo';
import {
  initializeImagePreloader,
  preloadProduct,
  ensureProductReady,
  isAssetDecoded,
} from '../utils/imagePreloader';

interface SnackHeroProps {
  initialCategory?: ProductCategory;
  initialProductId?: string;
  isIntroActive?: boolean;
  onProductClick?: (flavor: GreenergyProduct) => void;
}

export type ProductCategory =
  | 'fava-beans'
  | 'chickpea-protein-snacks'
  | 'protein-cookies'
  | 'peanuts-fava';

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'fava-beans', label: 'FAVA BEANS' },
  { id: 'chickpea-protein-snacks', label: 'CHICKPEA SNACKS' },
  { id: 'protein-cookies', label: 'PROTEIN COOKIES' },
  { id: 'peanuts-fava', label: 'PEANUTS & FAVA' },
];

const CATEGORY_ORDER: ProductCategory[] = [
  'fava-beans',
  'chickpea-protein-snacks',
  'protein-cookies',
  'peanuts-fava',
];

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const getCategoryProducts = (cat: ProductCategory): GreenergyProduct[] => {
  switch (cat) {
    case 'fava-beans':
      return FAVA_BEANS_PRODUCTS;
    case 'chickpea-protein-snacks':
      return CHICKPEA_SNACKS_PRODUCTS;
    case 'protein-cookies':
      return PROTEIN_COOKIES_PRODUCTS;
    case 'peanuts-fava':
      return PEANUTS_FAVA_PRODUCTS;
    default:
      return FAVA_BEANS_PRODUCTS;
  }
};

export const SnackHero: React.FC<SnackHeroProps> = ({
  initialCategory = 'fava-beans',
  isIntroActive = false,
  onProductClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [categoryDirection, setCategoryDirection] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const productInfoRef = useRef<HTMLElement | null>(null);

  // Screen size & reduced motion detection using rAF-throttled passive listener
  useEffect(() => {
    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (typeof window === 'undefined') return;
        setIsMobile(window.innerWidth < 768);
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', handleResize);
        mediaQuery.removeEventListener('change', listener);
      };
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initialize smart preloader on mount
  useEffect(() => {
    initializeImagePreloader();
  }, []);

  const activeProductList = getCategoryProducts(activeCategory);
  const currentProduct = activeProductList[currentIndex % activeProductList.length];

  // Proactively preload current, next likely, and previous likely product assets in active category,
  // plus first product of adjacent categories for instant category arrow switching
  useEffect(() => {
    const list = activeProductList;
    const nextProduct = list[(currentIndex + 1) % list.length];
    const prevProduct = list[(currentIndex - 1 + list.length) % list.length];
    if (currentProduct) preloadProduct(currentProduct, 'high');
    if (nextProduct) preloadProduct(nextProduct, 'high');
    if (prevProduct && prevProduct.id !== nextProduct?.id) {
      preloadProduct(prevProduct, 'auto');
    }

    const catIdx = CATEGORY_ORDER.indexOf(activeCategory);
    const nextCatFirst = getCategoryProducts(
      CATEGORY_ORDER[(catIdx + 1) % CATEGORY_ORDER.length]
    )[0];
    const prevCatFirst = getCategoryProducts(
      CATEGORY_ORDER[(catIdx - 1 + CATEGORY_ORDER.length) % CATEGORY_ORDER.length]
    )[0];
    if (nextCatFirst) preloadProduct(nextCatFirst, 'auto');
    if (prevCatFirst) preloadProduct(prevCatFirst, 'auto');
  }, [activeCategory, currentIndex, activeProductList, currentProduct]);

  const triggerHaptic = useCallback(() => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
    } catch {
      // Ignored if unsupported
    }
  }, []);

  // Switch product only after main packshot is decoded in memory (instant 0ms if already preloaded)
  // Keeps page scroll position completely stable
  const commitProductSwitch = useCallback(
    (
      targetCategory: ProductCategory,
      targetIndex: number,
      newDirection: number,
      newCategoryDirection?: number
    ) => {
      const list = getCategoryProducts(targetCategory);
      const targetProduct = list[targetIndex % list.length];
      if (!targetProduct) return;

      const applySwitch = () => {
        setDirection(newDirection);
        if (typeof newCategoryDirection === 'number') {
          setCategoryDirection(newCategoryDirection);
        }
        if (targetCategory !== activeCategory) {
          setActiveCategory(targetCategory);
        }
        setCurrentIndex(targetIndex);
      };

      if (isAssetDecoded(targetProduct.productBoxImage)) {
        applySwitch();
      } else {
        ensureProductReady(targetProduct).then(applySwitch);
      }
    },
    [activeCategory]
  );

  // Switch category directly (Desktop tabs): automatically shows the FIRST product (index 0) from that category
  const handleCategorySwitch = useCallback(
    (category: ProductCategory) => {
      if (category === activeCategory) return;
      triggerHaptic();
      const prevIdx = CATEGORY_ORDER.indexOf(activeCategory);
      const nextIdx = CATEGORY_ORDER.indexOf(category);
      const catDir = nextIdx > prevIdx ? 1 : -1;
      commitProductSwitch(category, 0, catDir, catDir);
    },
    [activeCategory, commitProductSwitch, triggerHaptic]
  );

  // Looping Category Arrow Navigation (Mobile / Narrow Tablet Glass Control)
  const nextCategory = useCallback(() => {
    triggerHaptic();
    const currIdx = CATEGORY_ORDER.indexOf(activeCategory);
    const nextCat = CATEGORY_ORDER[(currIdx + 1) % CATEGORY_ORDER.length];
    commitProductSwitch(nextCat, 0, 1, 1);
  }, [activeCategory, commitProductSwitch, triggerHaptic]);

  const prevCategory = useCallback(() => {
    triggerHaptic();
    const currIdx = CATEGORY_ORDER.indexOf(activeCategory);
    const prevCat =
      CATEGORY_ORDER[(currIdx - 1 + CATEGORY_ORDER.length) % CATEGORY_ORDER.length];
    commitProductSwitch(prevCat, 0, -1, -1);
  }, [activeCategory, commitProductSwitch, triggerHaptic]);

  // Looping Product Arrow Navigation strictly within the active category
  const nextFlavor = useCallback(() => {
    triggerHaptic();
    const nextIdx = (currentIndex + 1) % activeProductList.length;
    commitProductSwitch(activeCategory, nextIdx, 1);
  }, [activeCategory, activeProductList.length, commitProductSwitch, currentIndex, triggerHaptic]);

  const prevFlavor = useCallback(() => {
    triggerHaptic();
    const prevIdx = (currentIndex - 1 + activeProductList.length) % activeProductList.length;
    commitProductSwitch(activeCategory, prevIdx, -1);
  }, [activeCategory, activeProductList.length, commitProductSwitch, currentIndex, triggerHaptic]);

  const selectFlavor = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      triggerHaptic();
      commitProductSwitch(activeCategory, index, index > currentIndex ? 1 : -1);
    },
    [activeCategory, commitProductSwitch, currentIndex, triggerHaptic]
  );

  // Touch swipe handling on the product visual area (horizontal swipe switches product, vertical swipe scrolls page naturally)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleStageTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleStageTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    const minDistance = deltaTime < 250 ? 28 : 38;

    // Intercept horizontal swipes for product switching while letting vertical swipes scroll naturally
    if (Math.abs(deltaX) > minDistance && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < -minDistance) {
        nextFlavor();
      } else if (deltaX > minDistance) {
        prevFlavor();
      }
    }
  };

  // Smoothly scroll to the inline product information section below the product
  const handleProductAction = useCallback(
    (product: GreenergyProduct) => {
      triggerHaptic();
      productInfoRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      if (onProductClick) {
        onProductClick(product);
      }
    },
    [onProductClick, prefersReducedMotion, triggerHaptic]
  );

  // Keyboard navigation support (Left/Right arrows switch flavours)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevFlavor();
      } else if (e.key === 'ArrowRight') {
        nextFlavor();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextFlavor, prevFlavor]);

  const adjacentProducts = [
    activeProductList[(currentIndex + 1) % activeProductList.length],
    activeProductList[(currentIndex - 1 + activeProductList.length) % activeProductList.length],
  ];

  const isDarkScene = currentProduct.id.includes('peanuts');
  const activeCategoryLabel =
    CATEGORY_TABS.find((t) => t.id === activeCategory)?.label || 'FAVA BEANS';

  return (
    <div
      id="hero-slider-container"
      className="relative w-full min-h-[100svh] overflow-x-clip select-none transition-colors duration-500 ease-out flex flex-col"
      style={{ backgroundColor: currentProduct.bgColor }}
    >
      {/* 1. DYNAMIC PRODUCT-SPECIFIC PHOTOGRAPHIC INGREDIENT BACKGROUND SCENE (fixed z-0) */}
      <ProductBackgroundScene
        currentProduct={currentProduct}
        adjacentProducts={adjacentProducts}
      />

      {/* INTERACTIVE PRODUCT PRESENTATION & INLINE INFO (Smoothly revealed as CollectionIntro finishes) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isIntroActive ? 0 : 1,
          y: isIntroActive ? 6 : 0,
        }}
        transition={{ duration: 0.58, ease: SMOOTH_EASE }}
        className={`relative z-10 w-full flex flex-col transform-gpu will-change-transform will-change-opacity ${
          isIntroActive ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        {/* FIRST-SCREEN HERO PRESENTATION */}
        <div className="relative z-10 w-full min-h-[75svh] sm:min-h-[82svh] lg:min-h-[100svh] flex flex-col justify-between pt-safe">
          {/* 2A. SIMPLIFIED MOBILE & NARROW TABLET HEADER + GLASS CATEGORY CONTROL (< 1024px) */}
          <header className="relative z-40 w-full lg:hidden pt-2 sm:pt-3.5 pb-1 flex flex-col items-center gap-2 flex-shrink-0">
            {/* Top Row: Consistent Top-Left GREENERGY Logo + Subtle Glass Social Icons */}
            <div className="w-full px-4 sm:px-6 pl-safe pr-safe flex items-center justify-between">
              <GreenergyLogo isDarkScene={isDarkScene} />

              <SocialLinks isDarkScene={isDarkScene} />
            </div>

            {/* ONE COMPACT FROSTED GLASS CATEGORY CONTROL: [ ← ]  FAVA BEANS  [ → ] */}
            <nav
              aria-label="Wybór kategorii produktów"
              className="w-full px-4 pl-safe pr-safe flex items-center justify-center"
            >
              <div
                style={{
                  backgroundColor: isDarkScene
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(255, 255, 255, 0.32)',
                  borderColor: isDarkScene
                    ? 'rgba(255, 255, 255, 0.24)'
                    : 'rgba(255, 255, 255, 0.62)',
                }}
                className="h-[52px] px-1.5 rounded-full backdrop-blur-md border shadow-[0_6px_24px_rgba(0,0,0,0.06)] inline-flex items-center justify-between gap-2"
              >
                {/* Left Arrow: Previous Category */}
                <button
                  type="button"
                  onClick={prevCategory}
                  aria-label="Poprzednia kategoria"
                  style={{
                    color: currentProduct.textColor,
                    backgroundColor: isDarkScene
                      ? 'rgba(255, 255, 255, 0.10)'
                      : 'rgba(255, 255, 255, 0.55)',
                    borderColor: isDarkScene
                      ? 'rgba(255, 255, 255, 0.18)'
                      : 'rgba(255, 255, 255, 0.75)',
                  }}
                  className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full border flex items-center justify-center active:scale-95 transition-transform duration-150 cursor-pointer flex-shrink-0"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5] opacity-85" />
                </button>

                {/* Animated Current Category Name */}
                <div className="relative min-w-[165px] xs:min-w-[185px] sm:min-w-[210px] h-full flex items-center justify-center overflow-hidden px-2">
                  <AnimatePresence mode="wait" custom={categoryDirection}>
                    <motion.span
                      key={activeCategory}
                      custom={categoryDirection}
                      initial={{
                        opacity: 0,
                        x: prefersReducedMotion ? 0 : categoryDirection * 18,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: prefersReducedMotion ? 0.18 : 0.36,
                          ease: SMOOTH_EASE,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        x: prefersReducedMotion ? 0 : -categoryDirection * 18,
                        transition: {
                          duration: prefersReducedMotion ? 0.14 : 0.22,
                          ease: SMOOTH_EASE,
                        },
                      }}
                      style={{ color: currentProduct.textColor }}
                      className="text-xs xs:text-[13px] font-black uppercase tracking-[0.12em] whitespace-nowrap text-center select-none transform-gpu will-change-transform will-change-opacity"
                    >
                      {activeCategoryLabel}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Right Arrow: Next Category */}
                <button
                  type="button"
                  onClick={nextCategory}
                  aria-label="Następna kategoria"
                  style={{
                    color: currentProduct.textColor,
                    backgroundColor: isDarkScene
                      ? 'rgba(255, 255, 255, 0.10)'
                      : 'rgba(255, 255, 255, 0.55)',
                    borderColor: isDarkScene
                      ? 'rgba(255, 255, 255, 0.18)'
                      : 'rgba(255, 255, 255, 0.75)',
                  }}
                  className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full border flex items-center justify-center active:scale-95 transition-transform duration-150 cursor-pointer flex-shrink-0"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5] opacity-85" />
                </button>
              </div>
            </nav>
          </header>

          {/* 2B. DESKTOP HEADER NAVBAR (>= 1024px) */}
          <header className="relative z-40 hidden lg:flex w-full px-10 py-5 items-center justify-between gap-4 flex-shrink-0 pl-safe pr-safe">
            {/* Left: Consistent Top-Left Official GREENERGY LET'S RAW Logo */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <GreenergyLogo isDarkScene={isDarkScene} />
            </div>

            {/* Center: Product Line Switcher (4 Categories) with Pure Transparent Glass Indicator */}
            <nav className="flex flex-col items-center justify-center gap-1.5">
              <div className="relative flex items-center gap-1 p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleCategorySwitch(tab.id)}
                      aria-label={`Kategoria: ${tab.label}`}
                      className="relative min-h-[44px] px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase whitespace-nowrap transition-colors duration-200 z-10 select-none cursor-pointer group flex items-center justify-center"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="pureTransparentGlassPill"
                          transition={{
                            duration: 0.36,
                            ease: SMOOTH_EASE,
                          }}
                          className="absolute inset-0 rounded-full bg-white/25 border border-white/60 shadow-[0_2px_10px_rgba(0,0,0,0.06)] z-[-1] transform-gpu will-change-transform"
                        />
                      )}

                      <span
                        style={{
                          color: currentProduct.textColor,
                          opacity: isActive ? 1 : 0.65,
                        }}
                        className="relative z-10 block transition-opacity duration-200 group-hover:opacity-100 drop-shadow-xs font-black"
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Flavor / Product Selector within Active Category (Desktop only) */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-xs border border-white/15">
                {activeProductList.map((prod, idx) => {
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => selectFlavor(idx)}
                      aria-label={`Wybierz smak: ${prod.name}`}
                      className={`relative min-h-[36px] px-3.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide transition-opacity duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center ${
                        isCurrent ? 'shadow-xs' : 'opacity-65 hover:opacity-100'
                      }`}
                      style={{
                        color: isCurrent ? prod.accentColor : currentProduct.textColor,
                        backgroundColor: isCurrent ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
                      }}
                    >
                      {prod.name}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Right: Social Circular Glass Buttons (Instagram & Facebook) */}
            <SocialLinks isDarkScene={isDarkScene} />
          </header>

          {/* 3. CLEAN HERO PRODUCT PRESENTATION STAGE: [ ← ]   PRODUCT   [ → ] */}
          <main
            onTouchStart={handleStageTouchStart}
            onTouchEnd={handleStageTouchEnd}
            className="relative flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-2.5 sm:px-6 py-2 sm:py-4 lg:py-0 my-auto min-h-0 pl-safe pr-safe"
          >
            {/* 3A. QUIET ATMOSPHERIC DEPTH HALO (No background text — clean negative space & subtle light separation) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center overflow-hidden z-10 pointer-events-none select-none"
            >
              <div
                className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[580px] lg:h-[580px] rounded-full transition-colors duration-500"
                style={{
                  background: isDarkScene
                    ? 'radial-gradient(circle, rgba(255, 250, 240, 0.08) 0%, rgba(255, 250, 240, 0.02) 48%, transparent 72%)'
                    : 'radial-gradient(circle, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.10) 48%, transparent 72%)',
                }}
              />
            </div>

            {/* 3B. CLEAN PRODUCT STAGE: HERO PRODUCT PACKAGING ONLY (No floating clutter) */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
              {/* Left Arrow: Previous Product inside current category */}
              <button
                type="button"
                onClick={prevFlavor}
                style={{
                  color: currentProduct.textColor,
                  backgroundColor: isDarkScene
                    ? 'rgba(255, 255, 255, 0.14)'
                    : 'rgba(255, 255, 255, 0.36)',
                  borderColor: isDarkScene
                    ? 'rgba(255, 255, 255, 0.24)'
                    : 'rgba(255, 255, 255, 0.65)',
                }}
                className="flex absolute left-0 sm:-left-10 md:-left-16 lg:-left-20 xl:-left-28 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full backdrop-blur-md items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] border hover:scale-105 active:scale-95 transition-transform duration-150 group cursor-pointer"
                aria-label="Poprzedni produkt"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] opacity-85 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Right Arrow: Next Product inside current category */}
              <button
                type="button"
                onClick={nextFlavor}
                style={{
                  color: currentProduct.textColor,
                  backgroundColor: isDarkScene
                    ? 'rgba(255, 255, 255, 0.14)'
                    : 'rgba(255, 255, 255, 0.36)',
                  borderColor: isDarkScene
                    ? 'rgba(255, 255, 255, 0.24)'
                    : 'rgba(255, 255, 255, 0.65)',
                }}
                className="flex absolute right-0 sm:-right-10 md:-right-16 lg:-right-20 xl:-right-28 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full backdrop-blur-md items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] border hover:scale-105 active:scale-95 transition-transform duration-150 group cursor-pointer"
                aria-label="Następny produkt"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] opacity-85 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* 3C. MAIN PRODUCT CENTERSTAGE (z-20)
                  Restrained, smooth fade + slight slide + subtle scale */}
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={currentProduct.id + '-package-wrapper'}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    scale: prefersReducedMotion ? 1 : 0.97,
                    x: prefersReducedMotion ? 0 : direction * 18,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    transition: {
                      duration: prefersReducedMotion ? 0.22 : 0.46,
                      ease: SMOOTH_EASE,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: prefersReducedMotion ? 1 : 0.97,
                    x: prefersReducedMotion ? 0 : -direction * 18,
                    transition: {
                      duration: prefersReducedMotion ? 0.16 : 0.26,
                      ease: SMOOTH_EASE,
                    },
                  }}
                  className="relative z-20 flex flex-col items-center justify-center touch-manipulation transform-gpu will-change-transform will-change-opacity"
                >
                  {/* VERY SUBTLE, RESTRAINED WEIGHTLESS BREATHING OF THE MAIN PRODUCT */}
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : isMobile
                        ? {
                            y: [-2, 2, -2],
                          }
                        : {
                            y: [-3, 3, -3],
                          }
                    }
                    transition={{
                      duration: 6.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    onClick={() => handleProductAction(currentProduct)}
                    aria-label={`Przejdź do opisu produktu: ${currentProduct.name}`}
                    className="relative flex flex-col items-center justify-center cursor-pointer group transform-gpu will-change-transform"
                  >
                    {/* Responsive Product Packaging Container:
                        - Mobile (<768px): ~24% larger dominant hero presence (clamp(288px, 76vw, 365px) × clamp(325px, 56svh, 420px))
                        - Desktop (>=768px): unchanged desktop hero dimensions */}
                    <div
                      className="relative flex items-center justify-center"
                      style={{
                        width: isMobile
                          ? 'clamp(288px, 76vw, 365px)'
                          : 'clamp(340px, 46vw, 505px)',
                        height: isMobile
                          ? 'clamp(325px, 56svh, 420px)'
                          : 'clamp(360px, 57dvh, 548px)',
                      }}
                    >
                      <img
                        src={currentProduct.productBoxImage}
                        alt={currentProduct.name}
                        width={505}
                        height={548}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-[0_22px_36px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out md:group-hover:scale-[1.03] select-none pointer-events-none"
                      />
                    </div>

                    {/* Soft diffused floor contact shadow beneath product */}
                    <div
                      className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 md:w-80 lg:w-96 h-7 sm:h-9 rounded-full pointer-events-none opacity-25 transition-colors duration-500"
                      style={{
                        background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${currentProduct.accentColor}66 0%, transparent 75%)`,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* 3D. SUBTITLE DESCRIPTION TEXT IN POLISH (Underneath the Product on Desktop) */}
              <div className="relative z-20 mt-2 sm:mt-3 hidden lg:block text-center max-w-md px-3">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentProduct.id + '-tagline'}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
                    transition={{ duration: 0.28, ease: SMOOTH_EASE }}
                    className="text-xs font-bold uppercase tracking-[0.12em] leading-snug transition-colors duration-500 drop-shadow-xs line-clamp-2 transform-gpu will-change-transform will-change-opacity"
                    style={{ color: currentProduct.textColor }}
                  >
                    {currentProduct.tagline}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </main>

          {/* 4. DESKTOP BOTTOM CTA BAR (z-40, Desktop only) */}
          <footer className="relative z-40 hidden lg:flex w-full px-12 py-4 items-center justify-center flex-shrink-0 pl-safe pr-safe">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleProductAction(currentProduct)}
                className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-white transition-transform duration-200 hover:scale-110 active:scale-95 shadow-lg flex-shrink-0 cursor-pointer"
                style={{ backgroundColor: currentProduct.accentColor }}
                aria-label="Dowiedz się więcej"
              >
                <ArrowUpRight className="w-6 h-6 stroke-[2.5] text-white" />
              </button>

              <button
                type="button"
                id="btn-learn-more"
                onClick={() => handleProductAction(currentProduct)}
                className="h-12 min-h-[44px] px-9 rounded-full text-white font-extrabold text-sm tracking-wider uppercase flex items-center gap-2 transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg group relative overflow-hidden cursor-pointer"
                style={{ backgroundColor: currentProduct.accentColor }}
                aria-label="Dowiedz się więcej"
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <span>DOWIEDZ SIĘ WIĘCEJ</span>
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>
          </footer>
        </div>

        {/* 5. INLINE PRODUCT INFORMATION SECTION (Immediately below the product presentation) */}
        <ProductInlineInfo
          product={currentProduct}
          sectionRef={productInfoRef}
        />
      </motion.div>
    </div>
  );
};

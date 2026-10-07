import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft,
  ChevronRight,
  ArrowUpRight, 
  Instagram
} from 'lucide-react';
import { 
  FAVA_BEANS_PRODUCTS, 
  CHICKPEA_SNACKS_PRODUCTS, 
  PROTEIN_COOKIES_PRODUCTS, 
  PEANUTS_FAVA_PRODUCTS, 
  GreenergyProduct 
} from '../data/flavors';
import { GreenergyLogo } from './GreenergyLogo';
import { ProductBackgroundScene } from './ProductBackgroundScene';
import { ProductDetailsPanel } from './ProductDetailsPanel';
import { ProductFlavorEffects } from './ProductFlavorEffects';
import { initializeImagePreloader, preloadProduct } from '../utils/imagePreloader';

interface SnackHeroProps {
  initialCategory?: ProductCategory;
  initialProductId?: string;
  onProductClick?: (flavor: GreenergyProduct) => void;
}

export type ProductCategory = 'fava-beans' | 'chickpea-protein-snacks' | 'protein-cookies' | 'peanuts-fava';

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'fava-beans', label: 'FAVA BEANS' },
  { id: 'chickpea-protein-snacks', label: 'CHICKPEA SNACKS' },
  { id: 'protein-cookies', label: 'PROTEIN COOKIES' },
  { id: 'peanuts-fava', label: 'PEANUTS & FAVA' },
];

export const SnackHero: React.FC<SnackHeroProps> = ({ 
  initialCategory = 'fava-beans',
  initialProductId,
  onProductClick 
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Screen size & reduced motion detection
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => {
        window.removeEventListener('resize', handleResize);
        mediaQuery.removeEventListener('change', listener);
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize global preloader on mount to buffer all images into browser memory
  useEffect(() => {
    initializeImagePreloader();
  }, []);

  // Active product list based on current line
  const getCategoryProducts = (cat: ProductCategory): GreenergyProduct[] => {
    switch (cat) {
      case 'fava-beans': return FAVA_BEANS_PRODUCTS;
      case 'chickpea-protein-snacks': return CHICKPEA_SNACKS_PRODUCTS;
      case 'protein-cookies': return PROTEIN_COOKIES_PRODUCTS;
      case 'peanuts-fava': return PEANUTS_FAVA_PRODUCTS;
      default: return FAVA_BEANS_PRODUCTS;
    }
  };

  const activeProductList = getCategoryProducts(activeCategory);
  const currentProduct = activeProductList[currentIndex % activeProductList.length];

  // Proactively preload adjacent products whenever category or flavor index changes
  useEffect(() => {
    const list = activeProductList;
    const nextProduct = list[(currentIndex + 1) % list.length];
    const prevProduct = list[(currentIndex - 1 + list.length) % list.length];
    if (nextProduct) preloadProduct(nextProduct, 'high');
    if (prevProduct) preloadProduct(prevProduct, 'high');
  }, [activeCategory, currentIndex, activeProductList]);

  // Haptic feedback vibration for mobile touch interactions
  const triggerHaptic = () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(12);
      }
    } catch {
      // Ignored if unsupported
    }
  };

  const CATEGORY_ORDER: ProductCategory[] = ['fava-beans', 'chickpea-protein-snacks', 'protein-cookies', 'peanuts-fava'];

  // Switch category
  const handleCategorySwitch = (category: ProductCategory) => {
    if (category === activeCategory) return;
    triggerHaptic();
    const prevIdx = CATEGORY_ORDER.indexOf(activeCategory);
    const nextIdx = CATEGORY_ORDER.indexOf(category);
    setDirection(nextIdx > prevIdx ? 1 : -1);
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  // Touch swipe handling for iOS / Android / tablets
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isDetailsOpen || e.touches.length === 0) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isDetailsOpen || !touchStartRef.current || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    const minDistance = deltaTime < 250 ? 25 : 35;

    if (Math.abs(deltaX) > minDistance || Math.abs(deltaY) > minDistance) {
      triggerHaptic();
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < -minDistance) {
          nextFlavor();
        } else if (deltaX > minDistance) {
          prevFlavor();
        }
      } else {
        if (deltaY < -minDistance) {
          nextFlavor();
        } else if (deltaY > minDistance) {
          prevFlavor();
        }
      }
    }
  };

  // Slide transition functions strictly within the active category
  const nextFlavor = () => {
    triggerHaptic();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeProductList.length);
  };

  const prevFlavor = () => {
    triggerHaptic();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeProductList.length) % activeProductList.length);
  };

  const selectFlavor = (index: number) => {
    if (index === currentIndex) return;
    triggerHaptic();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Open product details panel
  const handleProductAction = (product: GreenergyProduct) => {
    triggerHaptic();
    setIsDetailsOpen(true);
    if (onProductClick) {
      onProductClick(product);
    }
  };

  // Mouse wheel and trackpad scroll navigation
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isDetailsOpen) return;
      if (Math.abs(e.deltaY) < 10 && Math.abs(e.deltaX) < 10) return;
      if (isScrollingRef.current) return;

      isScrollingRef.current = true;
      if (e.deltaY > 0 || e.deltaX > 0) {
        nextFlavor();
      } else if (e.deltaY < 0 || e.deltaX < 0) {
        prevFlavor();
      }

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 550);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeCategory, activeProductList.length, isDetailsOpen]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDetailsOpen) return;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevFlavor();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextFlavor();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCategory, activeProductList.length, isDetailsOpen]);

  // High-precision smooth transition timing curve [cubic-bezier(0.22, 1, 0.36, 1)], 680ms duration
  const sceneTransitionTiming = {
    duration: 0.68,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
  };

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      id="hero-slider-container"
      className="relative w-full h-screen h-[100dvh] min-h-[580px] max-h-[1080px] overflow-hidden select-none transition-colors duration-700 ease-out flex flex-col justify-between pt-safe pb-safe pl-safe pr-safe"
      style={{ backgroundColor: currentProduct.bgColor }}
    >
      {/* 1. DYNAMIC PRODUCT-SPECIFIC PHOTOGRAPHIC INGREDIENT BACKGROUND SCENE */}
      <ProductBackgroundScene 
        currentProduct={currentProduct}
        adjacentProducts={activeProductList}
      />

      {/* 2. TOP HEADER NAVBAR */}
      <header className="relative z-40 w-full px-4 sm:px-8 md:px-12 py-3 sm:py-5 md:py-6 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Official GREENERGY LET'S RAW Logo */}
        <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
          <GreenergyLogo className="h-10 xs:h-11 sm:h-12 md:h-14 lg:h-16 xl:h-[68px] w-auto" />
        </div>

        {/* Center: Product Line Switcher (4 Categories) with Pure Transparent Glass Indicator */}
        <nav className="order-3 lg:order-2 w-full lg:w-auto flex flex-col items-center justify-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <div className="relative flex items-center gap-1 p-1 sm:p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm max-w-full overflow-x-auto scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategorySwitch(tab.id)}
                  aria-label={`Kategoria: ${tab.label}`}
                  className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] xs:text-[10px] sm:text-xs font-black tracking-wider uppercase whitespace-nowrap transition-colors duration-200 z-10 select-none cursor-pointer group"
                >
                  {/* Pure Transparent Glass Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="pureTransparentGlassPill"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 28,
                        mass: 0.8
                      }}
                      className="absolute inset-0 rounded-full bg-white/25 backdrop-blur-sm border border-white/60 shadow-[0_2px_12px_rgba(0,0,0,0.06)] z-[-1]"
                    />
                  )}
                  
                  <span 
                    style={{
                      color: currentProduct.textColor,
                      opacity: isActive ? 1 : 0.65
                    }}
                    className="relative z-10 block transition-opacity duration-200 group-hover:opacity-100 drop-shadow-sm font-black"
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Flavor / Product Selector within Active Category */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-white/15 max-w-full overflow-x-auto scrollbar-none">
            {activeProductList.map((prod, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={prod.id}
                  onClick={() => selectFlavor(idx)}
                  aria-label={`Wybierz smak: ${prod.name}`}
                  className={`relative px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isCurrent ? 'shadow-sm' : 'opacity-60 hover:opacity-100'
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

        {/* Right: Social Circular Buttons */}
        <div className="order-2 lg:order-3 flex items-center gap-2 sm:gap-2.5 ml-auto lg:ml-0">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm border border-white/20 hover:border-white/50 group cursor-pointer"
            style={{ color: currentProduct.textColor }}
            aria-label="Instagram @greenergy"
          >
            <Instagram className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 opacity-75 group-hover:opacity-100" />
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm font-black text-xs sm:text-sm border border-white/20 hover:border-white/50 group cursor-pointer"
            style={{ color: currentProduct.textColor }}
            aria-label="TikTok @greenergy"
          >
            <span className="transition-transform group-hover:scale-110 opacity-75 group-hover:opacity-100">tt</span>
          </a>
        </div>
      </header>

      {/* 3. MAIN HERO STAGE */}
      <main className="relative flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-3 sm:px-6 my-auto min-h-0">
        
        {/* 3A. HUGE SOFT ATMOSPHERIC BACKGROUND WORD */}
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden z-10 pointer-events-none select-none"
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentProduct.id + '-bigtext'}
              custom={direction}
              initial={{ 
                opacity: 0, 
                scale: 0.98, 
                x: direction * 15
              }}
              animate={{ 
                opacity: 0.18, 
                scale: 1, 
                x: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 1.015, 
                x: -direction * 15
              }}
              transition={sceneTransitionTiming}
              className="relative flex items-center justify-center select-none w-full h-full transform-gpu will-change-transform will-change-opacity"
            >
              <h1 
                className="text-[26vw] sm:text-[28vw] md:text-[30vw] lg:text-[32vw] font-black leading-none uppercase tracking-tighter font-condensed whitespace-nowrap text-center select-none transition-colors duration-500 transform-gpu filter blur-[3px]"
                style={{ 
                  color: currentProduct.textColor
                }}
              >
                {currentProduct.bigText}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3B. 3D PRODUCT STAGE: HERO PRODUCT PACKAGING */}
        <div 
          className="relative z-20 flex flex-col items-center justify-center w-full max-w-lg sm:max-w-xl"
          style={{
            perspective: '1500px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Side Navigation Arrow: Previous Flavor (Left) */}
          <button
            onClick={prevFlavor}
            className="flex absolute -left-2 sm:-left-12 md:-left-16 lg:-left-24 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md items-center justify-center shadow-md border border-white/20 hover:border-white/50 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
            style={{ color: currentProduct.textColor }}
            aria-label="Poprzedni produkt"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] opacity-75 group-hover:opacity-100 group-hover:-translate-x-0.5 transition-all" />
          </button>

          {/* Side Navigation Arrow: Next Flavor (Right) */}
          <button
            onClick={nextFlavor}
            className="flex absolute -right-2 sm:-right-12 md:-right-16 lg:-right-24 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md items-center justify-center shadow-md border border-white/20 hover:border-white/50 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
            style={{ color: currentProduct.textColor }}
            aria-label="Następny produkt"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* 3B-EFFECTS. PRODUCT-SPECIFIC DECORATIVE INGREDIENT ANIMATIONS */}
          <ProductFlavorEffects productId={currentProduct.id} />

          {/* 3C. MAIN PRODUCT CENTERSTAGE WITH SUBTLE 3D ZERO-GRAVITY FLOATING */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentProduct.id + '-package-wrapper'}
              custom={direction}
              initial={{ 
                opacity: 0, 
                scale: 0.97, 
                x: direction * 22
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.97, 
                x: -direction * 22
              }}
              transition={sceneTransitionTiming}
              className="relative z-20 flex flex-col items-center justify-center touch-manipulation transform-gpu will-change-transform will-change-opacity"
              style={{
                perspective: '1500px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* ZERO GRAVITY CONTINUOUS FLOATING 3D INNER CONTAINER */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : isMobile
                    ? {
                        y: [-3, 3, -3],
                        x: [-1, 1, -1],
                        rotate: [-0.25, 0.25, -0.25]
                      }
                    : {
                        y: [-5, 5, -5],
                        x: [-1.5, 1.5, -1.5],
                        rotateZ: [-0.5, 0.5, -0.5],
                        rotateY: [-0.8, 0.8, -0.8]
                      }
                }
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                onClick={() => handleProductAction(currentProduct)}
                aria-label={`Przejdź do produktu: ${currentProduct.name}`}
                className="relative flex flex-col items-center justify-center cursor-pointer group transform-gpu will-change-transform"
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Product Packaging Container - Centered, Responsive Viewport Height */}
                <div className="relative w-56 h-64 xs:w-64 xs:h-72 sm:w-[320px] sm:h-[370px] md:w-[380px] md:h-[430px] lg:w-[420px] lg:h-[470px] max-h-[46vh] sm:max-h-[50vh] flex items-center justify-center">
                  <img 
                    src={currentProduct.productBoxImage} 
                    alt={currentProduct.name} 
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="max-h-full max-w-full w-auto h-auto object-contain filter drop-shadow-[0_20px_32px_rgba(0,0,0,0.30)] transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
                  />
                  
                  {/* Weight pill badge */}
                  <div 
                    className="absolute bottom-1 right-1 sm:bottom-3 sm:right-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white text-[9px] sm:text-xs font-black tracking-wider uppercase shadow-xl border border-white/40"
                    style={{ backgroundColor: currentProduct.accentColor }}
                  >
                    {currentProduct.weight}
                  </div>
                </div>

                {/* Soft diffused floor contact shadow beneath product */}
                <motion.div 
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: [0.95, 1.05, 0.95],
                          opacity: [0.20, 0.28, 0.20]
                        }
                  }
                  transition={{
                    duration: 5.8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 md:w-80 h-6 sm:h-8 rounded-full filter blur-xl transition-colors duration-500 pointer-events-none"
                  style={{ backgroundColor: currentProduct.accentColor }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* 3D. SUBTITLE DESCRIPTION TEXT IN POLISH (Underneath the Product) */}
          <div className="relative z-20 mt-2 sm:mt-3 text-center max-w-md px-3">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentProduct.id + '-tagline'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.10em] sm:tracking-[0.12em] leading-snug transition-colors duration-500 drop-shadow-sm line-clamp-2"
                style={{ color: currentProduct.textColor }}
              >
                {currentProduct.tagline}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* 4. BOTTOM CTA BAR */}
      <footer className="relative z-40 w-full px-4 sm:px-10 md:px-12 py-3 sm:py-5 flex items-center justify-center">
        {/* Center: DOWIEDZ SIĘ WIĘCEJ Button in Polish + Arrow Icon Pill Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => handleProductAction(currentProduct)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg flex-shrink-0 cursor-pointer"
            style={{ backgroundColor: currentProduct.accentColor }}
            aria-label="Dowiedz się więcej"
          >
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white" />
          </button>

          <button
            type="button"
            id="btn-learn-more"
            onClick={() => handleProductAction(currentProduct)}
            className="h-10 sm:h-12 px-6 sm:px-9 rounded-full text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg group relative overflow-hidden cursor-pointer"
            style={{ backgroundColor: currentProduct.accentColor }}
            aria-label="Dowiedz się więcej"
          >
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-white">
              <span>DOWIEDZ SIĘ WIĘCEJ</span>
            </span>

            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </footer>

      {/* 5. PRODUCT DETAILS PANEL */}
      <ProductDetailsPanel
        product={currentProduct}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

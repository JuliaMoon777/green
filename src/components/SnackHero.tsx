import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft,
  ChevronRight,
  ArrowUpRight, 
  Instagram,
  Sparkles,
  Zap
} from 'lucide-react';
import { 
  GREENERGY_PRODUCTS, 
  RAW_BALLS_PRODUCTS, 
  PROTEIN_COOKIES_PRODUCTS, 
  PRE_WORKOUT_PRODUCTS, 
  GreenergyProduct 
} from '../data/flavors';
import { GreenergyLogo } from './GreenergyLogo';
import { initializeImagePreloader, preloadProduct } from '../utils/imagePreloader';

interface SnackHeroProps {
  onProductClick?: (flavor: GreenergyProduct) => void;
}

export type ProductCategory = 'crunchy-fava' | 'raw-balls' | 'protein-cookies' | 'pre-workout';

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'crunchy-fava', label: 'CRUNCHY SNACKS' },
  { id: 'raw-balls', label: 'RAW BALLS' },
  { id: 'protein-cookies', label: 'PROTEIN COOKIES' },
  { id: 'pre-workout', label: 'PRE-WORKOUT' },
];

export const SnackHero: React.FC<SnackHeroProps> = ({ 
  onProductClick 
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('crunchy-fava');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [screenScale, setScreenScale] = useState(1);

  // Dynamic responsive scale factor for floating elements across mobile, tablet, and desktop
  useEffect(() => {
    const updateScale = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w < 480) {
        setScreenScale(Math.max(w / 520, 0.62));
      } else if (w < 768) {
        setScreenScale(0.82);
      } else if (w < 1024) {
        setScreenScale(0.92);
      } else {
        setScreenScale(1);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale, { passive: true });
    window.addEventListener('orientationchange', updateScale, { passive: true });
    return () => {
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
    };
  }, []);

  // Initialize global preloader on mount to buffer all images into browser memory
  useEffect(() => {
    initializeImagePreloader();
  }, []);

  // Proactively preload adjacent products whenever category or flavor index changes
  useEffect(() => {
    const list = getCategoryProducts(activeCategory);
    const nextProduct = list[(currentIndex + 1) % list.length];
    const prevProduct = list[(currentIndex - 1 + list.length) % list.length];
    if (nextProduct) preloadProduct(nextProduct, 'high');
    if (prevProduct) preloadProduct(prevProduct, 'high');
  }, [activeCategory, currentIndex]);

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

  // Active product list based on current line
  const getCategoryProducts = (cat: ProductCategory): GreenergyProduct[] => {
    switch (cat) {
      case 'crunchy-fava': return GREENERGY_PRODUCTS;
      case 'raw-balls': return RAW_BALLS_PRODUCTS;
      case 'protein-cookies': return PROTEIN_COOKIES_PRODUCTS;
      case 'pre-workout': return PRE_WORKOUT_PRODUCTS;
      default: return GREENERGY_PRODUCTS;
    }
  };

  const activeProductList = getCategoryProducts(activeCategory);
  const currentProduct = activeProductList[currentIndex % activeProductList.length];

  const CATEGORY_ORDER: ProductCategory[] = ['crunchy-fava', 'raw-balls', 'protein-cookies', 'pre-workout'];

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

  // Mouse move parallax calculation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Touch handlers for mobile parallax and swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    // Threshold for swipe detection (35px or quick gesture)
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

  // Slide transition functions with seamless category forwarding
  const nextFlavor = () => {
    triggerHaptic();
    setDirection(1);
    setCurrentIndex((prev) => {
      if (prev + 1 >= activeProductList.length) {
        // Cascade to next product category
        const currentCatIdx = CATEGORY_ORDER.indexOf(activeCategory);
        const nextCat = CATEGORY_ORDER[(currentCatIdx + 1) % CATEGORY_ORDER.length];
        setActiveCategory(nextCat);
        return 0;
      }
      return prev + 1;
    });
  };

  const prevFlavor = () => {
    triggerHaptic();
    setDirection(-1);
    setCurrentIndex((prev) => {
      if (prev - 1 < 0) {
        // Cascade backward to previous product category
        const currentCatIdx = CATEGORY_ORDER.indexOf(activeCategory);
        const prevCat = CATEGORY_ORDER[(currentCatIdx - 1 + CATEGORY_ORDER.length) % CATEGORY_ORDER.length];
        const prevCatList = getCategoryProducts(prevCat);
        setActiveCategory(prevCat);
        return prevCatList.length - 1;
      }
      return prev - 1;
    });
  };

  const selectFlavor = (index: number) => {
    if (index === currentIndex) return;
    triggerHaptic();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Direct product navigation to new tab/link
  const handleProductAction = (product: GreenergyProduct) => {
    triggerHaptic();
    if (onProductClick) {
      onProductClick(product);
    } else {
      // Default: przejście do nowej karty ze stroną produktu
      if (product.targetUrl) {
        window.open(product.targetUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // Mouse wheel and trackpad scroll navigation (Global window event)
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Ignore tiny jitter
      if (Math.abs(e.deltaY) < 10 && Math.abs(e.deltaX) < 10) return;

      if (isScrollingRef.current) return;

      isScrollingRef.current = true;
      if (e.deltaY > 0 || e.deltaX > 0) {
        nextFlavor();
      } else if (e.deltaY < 0 || e.deltaX < 0) {
        prevFlavor();
      }

      // Cooldown to ensure smooth individual flavor switching
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
  }, [activeCategory, activeProductList.length]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevFlavor();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextFlavor();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCategory, activeProductList.length]);

  // High-precision smooth transition timing curve [cubic-bezier(0.16, 1, 0.3, 1)]
  const transitionTiming = {
    duration: 0.95,
    ease: [0.16, 1, 0.3, 1]
  };

  // Localized cursor blur spotlight coordinates on typography
  const [textSpotlight, setTextSpotlight] = useState<{ x: number; y: number; isHovering: boolean }>({
    x: 0,
    y: 0,
    isHovering: false
  });

  const handleTextAreaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTextSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true
    });
  };

  const handleTextAreaMouseLeave = () => {
    setTextSpotlight(prev => ({ ...prev, isHovering: false }));
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      id="hero-slider-container"
      className="relative w-full h-screen h-[100dvh] min-h-[580px] max-h-[1080px] overflow-hidden select-none transition-colors duration-700 ease-out flex flex-col justify-between pt-safe pb-safe pl-safe pr-safe"
      style={{ backgroundColor: currentProduct.bgColor }}
    >
      {/* 1. LAYER 1: AMBIENT DEPTH-OF-FIELD BLUR ORBS */}
      <motion.div 
        animate={{
          x: mousePos.x * -70,
          y: mousePos.y * -70,
          scale: [1, 1.12, 1],
        }}
        transition={{
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          x: { type: 'spring', damping: 25 },
          y: { type: 'spring', damping: 25 }
        }}
        className="absolute -bottom-28 -left-28 w-72 h-72 sm:w-[520px] sm:h-[520px] rounded-full pointer-events-none z-10 filter blur-[70px] sm:blur-[80px] opacity-80 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${currentProduct.blurOrbColor} 0%, rgba(255,255,255,0) 70%)`
        }}
      />

      <motion.div 
        animate={{
          x: mousePos.x * 60,
          y: mousePos.y * 60,
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          scale: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          x: { type: 'spring', damping: 25 },
          y: { type: 'spring', damping: 25 }
        }}
        className="absolute top-1/4 -right-24 w-64 h-64 sm:w-[480px] sm:h-[480px] rounded-full pointer-events-none z-5 filter blur-[75px] sm:blur-[90px] opacity-75 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${currentProduct.blurOrbColor} 0%, rgba(255,255,255,0) 75%)`
        }}
      />

      {/* 2. TOP HEADER NAVBAR */}
      <header className="relative z-40 w-full px-3 sm:px-8 md:px-12 py-2.5 sm:py-5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Left: Official GREENERGY LET'S RAW Logo */}
        <div className="flex items-center gap-2 sm:gap-6">
          <GreenergyLogo color={currentProduct.accentColor} className="h-8 sm:h-12 w-auto" />
        </div>

        {/* Center: Product Line Switcher (4 Categories) with Pure Transparent Glass Indicator */}
        <nav className="order-3 lg:order-2 w-full lg:w-auto flex items-center justify-center overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <div className="relative flex items-center gap-1 p-1 sm:p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm max-w-full overflow-x-auto scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategorySwitch(tab.id)}
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
        </nav>

        {/* Right: Social Circular Buttons (Pure Transparent Glass Style) */}
        <div className="order-2 lg:order-3 flex items-center gap-2 sm:gap-2.5 ml-auto lg:ml-0">
          {/* Instagram Glass Button */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm border border-white/20 hover:border-white/50 group cursor-pointer"
            style={{ color: currentProduct.textColor }}
            title="Instagram @greenergy"
            aria-label="Instagram"
          >
            <Instagram className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 opacity-75 group-hover:opacity-100" />
          </a>

          {/* TikTok Glass Button */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm font-black text-xs sm:text-sm border border-white/20 hover:border-white/50 group cursor-pointer"
            style={{ color: currentProduct.textColor }}
            title="TikTok @greenergy"
            aria-label="TikTok"
          >
            <span className="transition-transform group-hover:scale-110 opacity-75 group-hover:opacity-100">tt</span>
          </a>
        </div>
      </header>

      {/* 3. MAIN HERO STAGE */}
      <main className="relative flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-3 sm:px-6 py-1 sm:py-4">
        
        {/* 3A. GIANT BACKGROUND TEXT WITH LOCALIZED CURSOR SPOTLIGHT BLUR */}
        <div 
          onMouseMove={handleTextAreaMouseMove}
          onMouseEnter={handleTextAreaMouseMove}
          onMouseLeave={handleTextAreaMouseLeave}
          className="absolute inset-0 flex items-center justify-center overflow-hidden z-10 cursor-crosshair pointer-events-auto"
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentProduct.id + '-bigtext'}
              custom={direction}
              initial={{ 
                opacity: 0, 
                scale: 0.88, 
                y: direction * 80, 
                filter: 'blur(12px)'
              }}
              animate={{ 
                opacity: 0.96, 
                scale: 1, 
                y: 0,
                filter: 'blur(0px)'
              }}
              exit={{ 
                opacity: 0, 
                scale: 1.1, 
                y: -direction * 80,
                filter: 'blur(12px)'
              }}
              transition={transitionTiming}
              className="relative flex items-center justify-center select-none w-full h-full"
            >
              {/* Layer 1: Crisp Sharp Base Text */}
              <h1 
                className="text-[19vw] sm:text-[21vw] md:text-[23vw] font-black leading-none uppercase tracking-tight font-condensed whitespace-nowrap text-center select-none transition-colors duration-500"
                style={{ 
                  color: currentProduct.textColor,
                }}
              >
                {currentProduct.bigText}
              </h1>

              {/* Layer 2: Blurred Overlay Revealed Only in a Circular Spot Right Under Cursor */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
                style={{
                  opacity: textSpotlight.isHovering ? 1 : 0,
                  WebkitMaskImage: `radial-gradient(circle 110px at ${textSpotlight.x}px ${textSpotlight.y}px, black 0%, rgba(0,0,0,0.8) 45%, transparent 75%)`,
                  maskImage: `radial-gradient(circle 110px at ${textSpotlight.x}px ${textSpotlight.y}px, black 0%, rgba(0,0,0,0.8) 45%, transparent 75%)`,
                }}
              >
                <h1 
                  className="text-[19vw] sm:text-[21vw] md:text-[23vw] font-black leading-none uppercase tracking-tight font-condensed whitespace-nowrap text-center select-none will-change-[filter] transition-colors duration-500"
                  style={{ 
                    color: currentProduct.textColor,
                    filter: 'blur(16px)',
                  }}
                >
                  {currentProduct.bigText}
                </h1>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3B. 3D PRODUCT STAGE: FLOATING INGREDIENTS + CENTRAL PRODUCT */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-lg min-h-[300px] sm:min-h-[420px]">
          
          {/* Side Navigation Arrow: Previous Flavor (Left) */}
          <button
            onClick={prevFlavor}
            className="flex absolute -left-2 sm:-left-12 md:-left-20 lg:-left-28 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md items-center justify-center shadow-md border border-white/20 hover:border-white/50 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
            style={{ color: currentProduct.textColor }}
            title="Poprzedni produkt (w lewo)"
            aria-label="Poprzedni produkt"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] opacity-75 group-hover:opacity-100 group-hover:-translate-x-0.5 transition-all" />
          </button>

          {/* Side Navigation Arrow: Next Flavor (Right) */}
          <button
            onClick={nextFlavor}
            className="flex absolute -right-2 sm:-right-12 md:-right-20 lg:-right-28 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md items-center justify-center shadow-md border border-white/20 hover:border-white/50 transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
            style={{ color: currentProduct.textColor }}
            title="Następny produkt (w prawo)"
            aria-label="Następny produkt"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* INGREDIENT FLOATING ITEMS: RENDERED FOR PRODUCTS WITH INGREDIENTS (CRUNCHY SNACKS & RAW BALLS) */}
          {currentProduct.floatingItems && currentProduct.floatingItems.length > 0 && (
            <AnimatePresence mode="popLayout" custom={direction}>
              <div key={currentProduct.id + '-floating-ingredients-' + activeCategory} className="absolute inset-0 pointer-events-none">
                {currentProduct.floatingItems.map((item, idx) => {
                  // Subtle gentle parallax response to mouse
                  const pX = mousePos.x * (item.x > 0 ? 10 : -10);
                  const pY = mousePos.y * (item.y > 0 ? 10 : -10);

                  // On mobile and tablet screens, bring floating ingredient images closer to the central pouch
                  const xClosenessFactor = screenScale < 0.7 ? 0.60 : screenScale < 0.85 ? 0.72 : screenScale < 1 ? 0.85 : 1;
                  const yClosenessFactor = screenScale < 0.7 ? 0.75 : screenScale < 0.85 ? 0.85 : 1;

                  const scaledX = item.x * screenScale * xClosenessFactor;
                  const scaledY = item.y * screenScale * yClosenessFactor;
                  const scaledSize = item.size * screenScale;

                  // Distinct transition styles tailored to each product line:
                  // 1. RawBalls: Organic radial swirl burst & elastic pop
                  // 2. Crunchy Snacks: Directional crisp slide & snap
                  const getInitialVariants = () => {
                    if (activeCategory === 'raw-balls') {
                      return {
                        opacity: 0,
                        scale: 0.12,
                        x: 0,
                        y: 0,
                        rotate: (idx === 0 ? -90 : 90) * direction,
                        filter: 'blur(10px)'
                      };
                    }
                    return {
                      opacity: 0,
                      scale: 0.5,
                      x: scaledX + (scaledX > 0 ? 50 : -50),
                      y: scaledY + direction * 110,
                      rotate: direction * (scaledX > 0 ? 25 : -25),
                      filter: 'blur(0px)'
                    };
                  };

                  const getExitVariants = () => {
                    if (activeCategory === 'raw-balls') {
                      return {
                        opacity: 0,
                        scale: 1.45,
                        x: scaledX * 1.4,
                        y: scaledY * 1.4,
                        rotate: (idx === 0 ? 60 : -60) * direction,
                        filter: 'blur(12px)',
                        transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] }
                      };
                    }
                    return {
                      opacity: 0,
                      scale: 0.6,
                      x: scaledX + (scaledX > 0 ? -40 : 40),
                      y: scaledY - direction * 90,
                      rotate: -direction * 20,
                      filter: 'blur(0px)',
                      transition: { duration: 0.38, ease: 'easeIn' }
                    };
                  };

                  const getSpringTransition = () => {
                    if (activeCategory === 'raw-balls') {
                      return {
                        type: 'spring' as const,
                        damping: 12,
                        stiffness: 85,
                        mass: 1.1,
                        delay: idx * 0.12
                      };
                    }
                    return {
                      type: 'spring' as const,
                      damping: 19,
                      stiffness: 130,
                      mass: 0.85,
                      delay: idx * 0.08
                    };
                  };

                  const getIdleAnimation = () => {
                    if (activeCategory === 'raw-balls') {
                      return {
                        y: [-6, 6, -6],
                        rotate: [-5, 5, -5],
                        scale: [1, 1.05, 1],
                      };
                    }
                    return {
                      y: [-4, 4, -4],
                      rotate: [-1, 1, -1],
                      scale: [1, 1.02, 1],
                    };
                  };

                  return (
                    <motion.div
                      key={item.id}
                      custom={direction}
                      initial={getInitialVariants()}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: scaledX + pX,
                        y: scaledY + pY,
                        rotate: 0,
                        filter: 'blur(0px)',
                      }}
                      exit={getExitVariants()}
                      transition={getSpringTransition()}
                      style={{
                        width: scaledSize,
                        height: scaledSize,
                        zIndex: item.zIndex,
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-auto"
                      title={item.name}
                    >
                      {/* Continuous Idle Ambient Motion */}
                      <motion.div
                        animate={getIdleAnimation()}
                        transition={{
                          duration: item.floatSpeed || 5.0,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: item.floatDelay || 0
                        }}
                        className="w-full h-full relative flex items-center justify-center"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          loading="eager"
                          decoding="async"
                          className="w-full h-full object-contain filter drop-shadow-2xl pointer-events-auto transition-transform duration-300 hover:scale-[1.08]"
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
          )}

          {/* 3C. MAIN PRODUCT CENTERSTAGE */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentProduct.id + '-package'}
              custom={direction}
              initial={{ 
                opacity: 0, 
                scale: 0.84, 
                y: direction * 48, 
                rotate: direction * 3.5,
                filter: 'blur(4px)'
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: mousePos.y * -14, 
                rotate: mousePos.x * 3,
                filter: 'blur(0px)'
              }}
              exit={{ 
                opacity: 0, 
                scale: 1.1, 
                y: -direction * 48, 
                rotate: -direction * 3.5,
                filter: 'blur(4px)'
              }}
              transition={transitionTiming}
              onClick={() => handleProductAction(currentProduct)}
              className="relative z-30 flex flex-col items-center justify-center cursor-pointer group touch-manipulation"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
              title={`Kliknij, aby przejść do ${currentProduct.name}`}
            >
              {/* Product Pouch Cutout with 3D Depth */}
              <div className="relative w-56 h-72 sm:w-80 sm:h-[390px] md:w-96 md:h-[450px] flex items-center justify-center">
                <img 
                  src={currentProduct.productBoxImage} 
                  alt={currentProduct.name} 
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-contain filter drop-shadow-[0_24px_34px_rgba(0,0,0,0.38)] transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                />
                
                {/* Weight pill badge */}
                <div 
                  className="absolute bottom-2 right-2 sm:bottom-3 sm:right-6 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-white text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-xl border border-white/40"
                  style={{ backgroundColor: currentProduct.accentColor }}
                >
                  {currentProduct.weight}
                </div>
              </div>

              {/* Realistic floor shadow beneath product */}
              <div 
                className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 w-44 sm:w-68 h-7 sm:h-8 rounded-full filter blur-xl opacity-35 transition-colors duration-500"
                style={{ backgroundColor: currentProduct.accentColor }}
              />
            </motion.div>
          </AnimatePresence>

          {/* 3D. SUBTITLE DESCRIPTION TEXT IN POLISH (Underneath the Product) */}
          <div className="relative z-20 mt-3 sm:mt-8 text-center max-w-lg px-3">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentProduct.id + '-tagline'}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45 }}
                className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] leading-relaxed transition-colors duration-500 drop-shadow-sm line-clamp-2 sm:line-clamp-none"
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
        {/* Center: BUY NOW Button in Polish + Arrow Icon Pill Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => handleProductAction(currentProduct)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg flex-shrink-0"
            style={{ backgroundColor: currentProduct.accentColor }}
            title={`Otwórz stronę produktu ${currentProduct.name}`}
            aria-label="Przejdź do produktu"
          >
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] text-white" />
          </button>

          <button
            id="btn-buy-now"
            onClick={() => handleProductAction(currentProduct)}
            className="h-10 sm:h-12 px-6 sm:px-9 rounded-full text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg group relative overflow-hidden"
            style={{ backgroundColor: currentProduct.accentColor }}
            title={`Otwórz stronę ${currentProduct.name} w nowej karcie`}
          >
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-white">
              <span>KUP TERAZ</span>
              <span className="opacity-80 font-medium">| {currentProduct.price}</span>
            </span>

            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </footer>
    </div>
  );
};

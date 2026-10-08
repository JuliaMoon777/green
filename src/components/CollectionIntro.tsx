import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { GreenergyLogo } from './GreenergyLogo';
import {
  preloadIntroCollectionPackshots,
  EDITORIAL_CLEAN_CAMPAIGN_BG,
  EDITORIAL_CLEAN_CAMPAIGN_BG_FALLBACK,
} from '../utils/imagePreloader';

interface CollectionIntroProps {
  onTransitionStart?: () => void;
  onComplete: () => void;
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface StillLifePlacement {
  /** Horizontal offset from center in px */
  x: number;
  /** Vertical offset from stage center in px */
  y: number;
  /** Scale relative to base packshot frame */
  scale: number;
  /** Subtle natural resting angle in degrees */
  rotate: number;
}

interface StillLifeProductItem {
  id: string;
  name: string;
  image: string;
  tier: 'foreground-hero' | 'midground' | 'back-row';
  isPrimaryCenterHero?: boolean;
  zIndex: number;
  revealDelay: number;
  desktop: StillLifePlacement;
  mobile: StillLifePlacement;
  hideOnMobile?: boolean;
}

/**
 * Pure Luxury Editorial Campaign Composition of the Complete GREENERGY Range.
 * - Uses ONLY the real, untouched GREENERGY product packshots from the repository.
 * - Zero glass tabs, zero UI panels, zero decorative bars/trays/holders, zero floating sticker cutouts.
 * - Larger, stronger product presence with balanced layered depth, natural spacing, and generous negative space.
 */
const STILL_LIFE_FAMILY_ITEMS: StillLifeProductItem[] = [
  // ================= FOREGROUND HERO TRIO (In Front, Larger & Dominant) =================
  {
    id: 'fava-beans-chili-lemon',
    name: 'Fava Beans Chili & Lemon',
    image: '/products/fava-beans/fava-beans-chips-chili-lemon.webp',
    tier: 'foreground-hero',
    isPrimaryCenterHero: true,
    zIndex: 42,
    revealDelay: 0.04,
    desktop: { x: 0, y: 46, scale: 1.12, rotate: 0 },
    mobile: { x: 0, y: 38, scale: 1.06, rotate: 0 },
  },
  {
    id: 'chickpea-lemon-pepper',
    name: 'Chickpea Lemon & Pepper',
    image: '/products/chickpea-protein-snacks/chickpea-protein-snack-lemon-pepper.webp',
    tier: 'foreground-hero',
    zIndex: 38,
    revealDelay: 0.09,
    desktop: { x: -168, y: 54, scale: 0.98, rotate: -1.8 },
    mobile: { x: -84, y: 46, scale: 0.88, rotate: -1.8 },
  },
  {
    id: 'protein-cookies-apple-cinnamon',
    name: 'Protein Cookies Apple & Cinnamon',
    image: '/products/protein-cookies/protein-cookies-apple-cinnamon.webp',
    tier: 'foreground-hero',
    zIndex: 37,
    revealDelay: 0.11,
    desktop: { x: 168, y: 54, scale: 0.98, rotate: 1.8 },
    mobile: { x: 84, y: 46, scale: 0.88, rotate: 1.8 },
  },

  // ================= MIDGROUND FAMILY GROUPING (Slightly Behind with Elegant Overlap) =================
  {
    id: 'fava-beans-tomato-basil',
    name: 'Fava Beans Tomato & Basil',
    image: '/products/fava-beans/fava-beans-chips-tomato-basil.webp',
    tier: 'midground',
    zIndex: 28,
    revealDelay: 0.15,
    desktop: { x: -306, y: 18, scale: 0.89, rotate: -2.5 },
    mobile: { x: -124, y: 8, scale: 0.76, rotate: -2.4 },
  },
  {
    id: 'fava-beans-sweet-herbs-olives',
    name: 'Fava Beans Sweet Herbs & Olives',
    image: '/products/fava-beans/fava-beans-chips-sweet-herbs-olives.webp',
    tier: 'midground',
    zIndex: 28,
    revealDelay: 0.17,
    desktop: { x: 306, y: 18, scale: 0.89, rotate: 2.5 },
    mobile: { x: 124, y: 8, scale: 0.76, rotate: 2.4 },
  },
  {
    id: 'peanuts-fava-red-thai',
    name: 'Red Thai Peanuts & Fava',
    image: '/products/peanuts-fava/peanuts-fava-beans-red-thai.webp',
    tier: 'midground',
    zIndex: 24,
    revealDelay: 0.20,
    desktop: { x: -432, y: 28, scale: 0.82, rotate: -3.2 },
    mobile: { x: -98, y: -38, scale: 0.70, rotate: -2.0 },
  },
  {
    id: 'peanuts-fava-sweet-mustard',
    name: 'Sweet Mustard Peanuts & Fava',
    image: '/products/peanuts-fava/peanuts-fava-beans-sweet-mustard.webp',
    tier: 'midground',
    zIndex: 24,
    revealDelay: 0.22,
    desktop: { x: 432, y: 28, scale: 0.82, rotate: 3.2 },
    mobile: { x: 98, y: -38, scale: 0.70, rotate: 2.0 },
  },

  // ================= BACK-ROW FAMILY GROUPING (Depth & Breathing Room) =================
  {
    id: 'protein-cookies-display-box',
    name: 'Protein Cookies Display Box',
    image: '/products/protein-cookies/protein-cookies-display-box.webp',
    tier: 'back-row',
    zIndex: 16,
    revealDelay: 0.19,
    desktop: { x: 0, y: -62, scale: 0.92, rotate: 0 },
    mobile: { x: 0, y: -58, scale: 0.80, rotate: 0 },
  },
  {
    id: 'protein-cookies-double-chocolate',
    name: 'Protein Cookies Double Chocolate',
    image: '/products/protein-cookies/protein-cookies-double-chocolate.webp',
    tier: 'back-row',
    zIndex: 18,
    revealDelay: 0.23,
    desktop: { x: -126, y: -34, scale: 0.81, rotate: -1.4 },
    mobile: { x: 0, y: 0, scale: 0.65, rotate: 0 },
    hideOnMobile: true,
  },
  {
    id: 'protein-cookies-creamy-butter-graham',
    name: 'Protein Cookies Creamy Butter + Graham',
    image: '/products/protein-cookies/protein-cookies-creamy-butter-graham.webp',
    tier: 'back-row',
    zIndex: 18,
    revealDelay: 0.25,
    desktop: { x: 126, y: -34, scale: 0.81, rotate: 1.4 },
    mobile: { x: 0, y: 0, scale: 0.65, rotate: 0 },
    hideOnMobile: true,
  },
  {
    id: 'fava-beans-honey-mustard',
    name: 'Fava Beans Honey & Mustard',
    image: '/products/fava-beans/fava-beans-chips-honey-mustard.webp',
    tier: 'back-row',
    zIndex: 14,
    revealDelay: 0.27,
    desktop: { x: -244, y: -26, scale: 0.77, rotate: -2.0 },
    mobile: { x: 0, y: 0, scale: 0.62, rotate: 0 },
    hideOnMobile: true,
  },
  {
    id: 'chickpea-salted',
    name: 'Chickpea Sea Salted',
    image: '/products/chickpea-protein-snacks/chickpea-protein-snack-salted.webp',
    tier: 'back-row',
    zIndex: 14,
    revealDelay: 0.29,
    desktop: { x: 244, y: -26, scale: 0.77, rotate: 2.0 },
    mobile: { x: 0, y: 0, scale: 0.62, rotate: 0 },
    hideOnMobile: true,
  },
];

export const CollectionIntro: React.FC<CollectionIntroProps> = ({
  onTransitionStart,
  onComplete,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [assetsReady, setAssetsReady] = useState(false);
  const [phase, setPhase] = useState<'showcase' | 'transitioning'>('showcase');
  const [backdropSrc, setBackdropSrc] = useState<string>(EDITORIAL_CLEAN_CAMPAIGN_BG);

  const completedRef = useRef(false);
  const transitionStartedRef = useRef(false);

  const beginTransition = useCallback(() => {
    if (!transitionStartedRef.current) {
      transitionStartedRef.current = true;
      setPhase('transitioning');
      onTransitionStart?.();
    }
  }, [onTransitionStart]);

  const finishIntro = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Responsive viewport detection
  useEffect(() => {
    let rafId: number | null = null;
    const onResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (typeof window === 'undefined') return;
        setIsMobile(window.innerWidth < 768);
      });
    };
    window.addEventListener('resize', onResize, { passive: true });

    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', onChange);
      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        mq.removeEventListener('change', onChange);
      };
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Ensure product packshots and editorial backdrop are decoded before revealing the hero scene
  useEffect(() => {
    let cancelled = false;
    const safetyTimer = setTimeout(() => {
      if (!cancelled) setAssetsReady(true);
    }, 190);

    preloadIntroCollectionPackshots().then(() => {
      clearTimeout(safetyTimer);
      if (!cancelled) setAssetsReady(true);
    });

    return () => {
      cancelled = true;
      clearTimeout(safetyTimer);
    };
  }, []);

  // Editorial Campaign Showcase Timeline:
  // 0.00–3.20s: Calm, clean editorial still-life showcase of the complete GREENERGY product family
  // 3.20–3.95s: Surrounding family softly dissolves while the center-front hero glides into the active product stage
  useEffect(() => {
    if (!assetsReady) return;

    if (prefersReducedMotion) {
      const reducedTimer = setTimeout(() => {
        beginTransition();
        setTimeout(finishIntro, 320);
      }, 1300);
      return () => clearTimeout(reducedTimer);
    }

    const transitionTimer = setTimeout(() => {
      beginTransition();
    }, 3200);

    const completeTimer = setTimeout(() => {
      finishIntro();
    }, 3950);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(completeTimer);
    };
  }, [assetsReady, beginTransition, finishIntro, prefersReducedMotion]);

  const handleSceneClick = () => {
    if (phase === 'transitioning') {
      finishIntro();
      return;
    }
    beginTransition();
    setTimeout(finishIntro, 450);
  };

  const visibleProducts = isMobile
    ? STILL_LIFE_FAMILY_ITEMS.filter((item) => !item.hideOnMobile)
    : STILL_LIFE_FAMILY_ITEMS;

  const itemWidth = isMobile ? 'clamp(175px, 42vw, 235px)' : 'clamp(240px, 25vw, 360px)';
  const itemHeight = isMobile ? 'clamp(195px, 38dvh, 265px)' : 'clamp(270px, 41dvh, 405px)';

  return (
    <motion.div
      key="greenergy-clean-editorial-campaign-hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'transitioning' ? 0 : 1 }}
      transition={{
        duration: phase === 'transitioning' ? 0.72 : 0.6,
        delay: phase === 'transitioning' ? 0.08 : 0,
        ease: SMOOTH_EASE,
      }}
      onClick={handleSceneClick}
      className="fixed inset-0 z-40 flex flex-col items-center justify-between overflow-hidden select-none pt-safe pb-safe cursor-pointer transform-gpu will-change-opacity"
      style={{
        backgroundColor: '#F5EFE4',
      }}
    >
      {/* 1. CLEAN NATURAL EDITORIAL STUDIO ENVIRONMENT (Warm Daylight, Soft Stone & Linen, Subtle Blurred Organic Depth) */}
      <motion.div
        initial={{ scale: prefersReducedMotion ? 1 : 1.025, opacity: 0 }}
        animate={{
          scale: 1.0,
          opacity: phase === 'transitioning' ? 0 : 1,
        }}
        transition={{
          scale: { duration: 3.6, ease: SMOOTH_EASE },
          opacity: { duration: phase === 'transitioning' ? 0.55 : 0.65, ease: SMOOTH_EASE },
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden transform-gpu will-change-transform will-change-opacity"
      >
        <img
          src={backdropSrc}
          alt="Warm sunlit natural stone and linen editorial backdrop"
          decoding="async"
          loading="eager"
          onError={() => {
            if (backdropSrc !== EDITORIAL_CLEAN_CAMPAIGN_BG_FALLBACK) {
              setBackdropSrc(EDITORIAL_CLEAN_CAMPAIGN_BG_FALLBACK);
            }
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Soft Golden Morning Daylight & Calm Central Negative Space */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 58% at 50% 48%, rgba(253, 250, 244, 0.32) 0%, rgba(246, 239, 227, 0.12) 64%, rgba(42, 30, 16, 0.08) 100%)',
          }}
        />
      </motion.div>

      {/* 2. MINIMAL BRAND LOGO ONLY (No glass tabs, no top banners, no UI pills) */}
      <motion.header
        initial={{ opacity: 0, y: -4 }}
        animate={{
          opacity: phase === 'transitioning' ? 0 : 1,
          y: phase === 'transitioning' ? -4 : 0,
        }}
        transition={{ duration: 0.55, ease: SMOOTH_EASE }}
        className="relative z-40 w-full px-4 sm:px-6 lg:px-10 pt-2.5 sm:pt-4 lg:pt-5 pl-safe pr-safe flex items-center justify-start flex-shrink-0 pointer-events-none"
      >
        <GreenergyLogo withGlassBadge={false} />
      </motion.header>

      {/* 3. PURE LAYERED PRODUCT FAMILY HERO COMPOSITION (No bars, no trays, no floating stickers) */}
      <motion.div
        initial={{ scale: prefersReducedMotion ? 1 : 1.02, y: prefersReducedMotion ? 0 : 4 }}
        animate={{
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 3.3,
          ease: SMOOTH_EASE,
        }}
        className="relative z-30 flex-1 w-full max-w-6xl mx-auto flex items-center justify-center transform-gpu will-change-transform"
      >
        {assetsReady &&
          visibleProducts.map((item) => {
            const coords = isMobile ? item.mobile : item.desktop;
            const isCenterHero = Boolean(item.isPrimaryCenterHero);

            // During 'transitioning':
            // - Center hero product (Fava Beans Chili & Lemon) glides smoothly into the active product stage
            // - Surrounding product family softly dissolves out
            const targetAnimate =
              phase === 'transitioning'
                ? isCenterHero
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: isMobile ? 1.12 : 1.24,
                      rotate: 0,
                    }
                  : {
                      opacity: 0,
                      x: coords.x * 0.97,
                      y: coords.y + 8,
                      scale: coords.scale * 0.96,
                      rotate: coords.rotate,
                    }
                : {
                    opacity: 1,
                    x: coords.x,
                    y: coords.y,
                    scale: coords.scale,
                    rotate: coords.rotate,
                  };

            const itemTransition =
              phase === 'transitioning'
                ? {
                    duration: isCenterHero ? 0.68 : 0.48,
                    ease: SMOOTH_EASE,
                  }
                : {
                    duration: prefersReducedMotion ? 0.25 : 0.68,
                    delay: prefersReducedMotion ? 0 : item.revealDelay,
                    ease: SMOOTH_EASE,
                  };

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: coords.x,
                  y: prefersReducedMotion ? coords.y : coords.y + 10,
                  scale: prefersReducedMotion ? coords.scale : coords.scale * 0.97,
                  rotate: coords.rotate,
                }}
                animate={targetAnimate}
                transition={itemTransition}
                style={{
                  zIndex: item.zIndex,
                  width: itemWidth,
                  height: itemHeight,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none select-none transform-gpu will-change-transform will-change-opacity"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Soft Directional Sunlight Cast Shadow on the Natural Stone/Linen Surface */}
                  <div
                    className="absolute -bottom-2.5 left-[54%] -translate-x-1/2 w-[76%] h-5 rounded-full pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse 52% 48% at 50% 50%, rgba(44, 30, 14, 0.24) 0%, rgba(44, 30, 14, 0.08) 52%, rgba(44, 30, 14, 0) 78%)',
                    }}
                  />

                  {/* Tight Tabletop Contact Shadow directly beneath each resting package */}
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[62%] h-3 rounded-full pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(34, 22, 10, 0.36) 0%, rgba(34, 22, 10, 0) 74%)',
                    }}
                  />

                  <img
                    src={item.image}
                    alt={item.name}
                    width={360}
                    height={405}
                    decoding="async"
                    loading="eager"
                    className={`relative z-10 max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none ${
                      item.tier === 'foreground-hero'
                        ? 'drop-shadow-[5px_16px_26px_rgba(38,26,12,0.24)]'
                        : item.tier === 'midground'
                        ? 'drop-shadow-[4px_14px_22px_rgba(38,26,12,0.19)]'
                        : 'drop-shadow-[3px_10px_18px_rgba(38,26,12,0.15)] opacity-[0.98]'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
      </motion.div>

      {/* Clean bottom breathing space (no lower category bars, no ingredient strips, no CTA buttons) */}
      <div className="h-4 sm:h-6 flex-shrink-0 pointer-events-none" />
    </motion.div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GreenergyProduct } from '../data/flavors';
import { preloadImage } from '../utils/imagePreloader';

interface ProductBackgroundSceneProps {
  currentProduct: GreenergyProduct;
  adjacentProducts?: GreenergyProduct[];
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ProductBackgroundScene: React.FC<ProductBackgroundSceneProps> = React.memo(
  ({ currentProduct, adjacentProducts = [] }) => {
    const [isVerticalViewport, setIsVerticalViewport] = useState<boolean>(() => {
      if (typeof window === 'undefined') return false;
      return window.innerWidth < 768 || window.innerHeight > window.innerWidth * 1.05;
    });

    useEffect(() => {
      let rafId: number | null = null;
      const onResize = () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (typeof window === 'undefined') return;
          setIsVerticalViewport(
            window.innerWidth < 768 || window.innerHeight > window.innerWidth * 1.05
          );
        });
      };
      window.addEventListener('resize', onResize, { passive: true });
      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
      };
    }, []);

    const activeBackgroundUrl = isVerticalViewport
      ? currentProduct.mobileBackgroundImage || currentProduct.backgroundImage
      : currentProduct.backgroundImage;

    // Preload current and adjacent background scene images matching the active viewport orientation
    useEffect(() => {
      if (activeBackgroundUrl) {
        preloadImage(activeBackgroundUrl, 'high');
      }
      if (!adjacentProducts || adjacentProducts.length === 0) return;
      adjacentProducts.forEach((prod) => {
        if (!prod) return;
        const adjUrl = isVerticalViewport
          ? prod.mobileBackgroundImage || prod.backgroundImage
          : prod.backgroundImage;
        if (adjUrl) {
          preloadImage(adjUrl, 'auto');
        }
      });
    }, [activeBackgroundUrl, adjacentProducts, isVerticalViewport]);

    const isDarkScene = currentProduct.id.includes('peanuts');

    return (
      <div
        className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
        style={{ backgroundColor: currentProduct.bgColor }}
        aria-hidden="true"
      >
        {/* 1. DYNAMIC PHOTOGRAPHIC INGREDIENT BACKGROUND SCENE (16:9 Desktop / 9:16 Mobile) */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${currentProduct.id}-${isVerticalViewport ? 'mobile-bg' : 'desktop-bg'}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{
              duration: 0.56,
              ease: SMOOTH_EASE,
            }}
            className="absolute inset-0 w-full h-full transform-gpu will-change-transform will-change-opacity"
          >
            <img
              src={activeBackgroundUrl}
              alt=""
              width={isVerticalViewport ? 1080 : 1920}
              height={isVerticalViewport ? 1920 : 1080}
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover object-center opacity-[0.82] select-none pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* 2. GENTLE DEPTH OF FIELD VIGNETTE KEEPING CENTRAL PRODUCT ZONE CLEAN */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
          style={{
            background: isDarkScene
              ? 'radial-gradient(ellipse 68% 58% at 50% 50%, rgba(28, 20, 16, 0.28) 0%, rgba(18, 12, 10, 0.14) 58%, rgba(0, 0, 0, 0.32) 100%)'
              : 'radial-gradient(ellipse 66% 56% at 50% 50%, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.08) 58%, rgba(0, 0, 0, 0.05) 100%)',
          }}
        />

        {/* 3. TACTILE MICRO-MATTE GRAIN OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
    );
  }
);
ProductBackgroundScene.displayName = 'ProductBackgroundScene';

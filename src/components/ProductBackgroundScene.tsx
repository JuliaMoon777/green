import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GreenergyProduct } from '../data/flavors';

interface ProductBackgroundSceneProps {
  currentProduct: GreenergyProduct;
  adjacentProducts?: GreenergyProduct[];
}

export const ProductBackgroundScene: React.FC<ProductBackgroundSceneProps> = ({
  currentProduct,
  adjacentProducts = []
}) => {
  // Preload adjacent background scene images for instant 0ms switching
  useEffect(() => {
    if (!adjacentProducts || adjacentProducts.length === 0) return;
    adjacentProducts.forEach((prod) => {
      if (prod.backgroundImage) {
        const img = new Image();
        img.src = prod.backgroundImage;
      }
    });
  }, [adjacentProducts]);

  const isDarkScene = currentProduct.id.includes('peanuts');

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. DYNAMIC PHOTOGRAPHIC INGREDIENT BACKGROUND SCENE */}
      {/* High-end FMCG natural food photography, 75-85% clear visibility */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentProduct.id + '-bg-scene'}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier, no bounce
          }}
          className="absolute inset-0 w-full h-full transform-gpu will-change-transform will-change-opacity"
        >
          <img
            src={currentProduct.backgroundImage}
            alt=""
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center transform-gpu filter blur-[1px] sm:blur-[1.5px] opacity-[0.80]"
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. GENTLE DEPTH OF FIELD VIGNETTE */}
      {/* Light natural gradient keeping 75-85% scene clarity */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-700 ease-out"
        style={{
          background: isDarkScene
            ? 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.08) 65%, rgba(0,0,0,0.25) 100%)'
            : 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 65%, rgba(0,0,0,0.04) 100%)',
        }}
      />

      {/* 3. TACTILE MICRO-MATTE GRAIN OVERLAY */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]" 
      />
    </div>
  );
};

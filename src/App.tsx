import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Preloader } from './components/Preloader';
import { SnackHero } from './components/SnackHero';

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);

  return (
    <div className="h-screen w-full relative bg-[#FAF7F0] text-[#1B2D1F] overflow-hidden font-sans select-none">
      {/* 1. Gourmet Bitten-Cookie & Chocolate Preloader */}
      <AnimatePresence mode="wait">
        {isPreloading && (
          <Preloader 
            key="cookie-preloader" 
            onComplete={() => setIsPreloading(false)} 
            minDuration={1600} 
          />
        )}
      </AnimatePresence>

      {/* 2. Custom GREENERGY Product Presentation Stage (Directly Revealed After Preloader) */}
      {!isPreloading && (
        <motion.div
          key="product-presentation-stage"
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full absolute inset-0"
        >
          <SnackHero />
        </motion.div>
      )}
    </div>
  );
}

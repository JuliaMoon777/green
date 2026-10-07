import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getProductEffectsById, ProductEffectItem } from '../data/product-effects';

interface ProductFlavorEffectsProps {
  productId: string;
}

interface RandomizedVariation {
  startJitterX: number;
  startJitterY: number;
  endJitterX: number;
  endJitterY: number;
  rotateJitter: number;
  scaleFactor: number;
  delayOffset: number;
  durationOffset: number;
  floatDurationFactor: number;
  floatXDir: number;
  floatYDir: number;
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ProductFlavorEffects: React.FC<ProductFlavorEffectsProps> = ({ productId }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lastProductIdRef = useRef<string>(productId);
  const revealCountRef = useRef<number>(0);

  if (lastProductIdRef.current !== productId) {
    lastProductIdRef.current = productId;
    revealCountRef.current += 1;
  }

  const revealGeneration = revealCountRef.current;

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });

    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', onChange);
      return () => {
        window.removeEventListener('resize', updateViewport);
        mq.removeEventListener('change', onChange);
      };
    }

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const allItems = getProductEffectsById(productId);
  const visibleItems = isMobile
    ? allItems.filter((item) => !item.hideOnMobile)
    : allItems;

  // Generate art-directed organic randomization synchronously on each product switch
  const variationMap = useMemo(() => {
    const map: Record<string, RandomizedVariation> = {};
    allItems.forEach((item) => {
      // Push radial jitter slightly outward from the package center so packaging text is never covered
      const xSign = item.targetX >= 0 ? 1 : -1;
      const ySign = item.targetY >= 0 ? 1 : -1;

      map[item.id] = {
        startJitterX: (Math.random() - 0.5) * 30,
        startJitterY: (Math.random() - 0.5) * 30,
        endJitterX: xSign * (Math.random() * 16 - 3),
        endJitterY: ySign * (Math.random() * 18 - 4),
        rotateJitter: (Math.random() - 0.5) * 22,
        scaleFactor: 0.93 + Math.random() * 0.14,
        delayOffset: Math.random() * 0.045,
        durationOffset: (Math.random() - 0.5) * 0.12,
        floatDurationFactor: 0.88 + Math.random() * 0.26,
        floatXDir: Math.random() > 0.5 ? 1 : -1,
        floatYDir: Math.random() > 0.5 ? 1 : -1,
      };
    });
    return map;
  }, [productId, revealGeneration, allItems]);

  const behindItems = visibleItems.filter((item) => item.layer === 'behind');
  const foregroundItems = visibleItems.filter(
    (item) => item.layer === 'beside' || item.layer === 'front'
  );

  // Keep composition compact on mobile so ingredients stay close to the product
  const distanceFactor = isMobile ? 0.61 : 1;

  const renderEffectGroup = (items: ProductEffectItem[], groupKey: string) => (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={`${groupKey}-${productId}-${revealGeneration}`}
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.58,
            ease: SMOOTH_EASE,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          transition: {
            duration: 0.26,
            ease: SMOOTH_EASE,
          },
        }}
        className="relative w-0 h-0 flex items-center justify-center pointer-events-none select-none"
      >
        {items.map((item, idx) => {
          const v = variationMap[item.id] || {
            startJitterX: 0,
            startJitterY: 0,
            endJitterX: 0,
            endJitterY: 0,
            rotateJitter: 0,
            scaleFactor: 1,
            delayOffset: 0,
            durationOffset: 0,
            floatDurationFactor: 1,
            floatXDir: 1,
            floatYDir: 1,
          };

          const itemSize = isMobile ? item.mobileSize : item.size;
          const startX = Math.round((item.initialX + v.startJitterX) * distanceFactor);
          const startY = Math.round((item.initialY + v.startJitterY) * distanceFactor) + 12;
          const endX = Math.round((item.targetX + v.endJitterX) * distanceFactor);
          const endY = Math.round((item.targetY + v.endJitterY) * distanceFactor);

          const finalRotate = Math.round(item.targetRotate + v.rotateJitter);
          const finalScale = Number((item.targetScale * v.scaleFactor).toFixed(2));
          const finalDelay = Number((item.delay + v.delayOffset).toFixed(3));
          const finalDuration = Number(
            Math.max(0.72, item.duration + v.durationOffset).toFixed(3)
          );

          const hasMidpoint =
            !prefersReducedMotion &&
            typeof item.midX === 'number' &&
            typeof item.midY === 'number';

          const midX = hasMidpoint
            ? Math.round(((item.midX as number) + v.endJitterX * 0.5) * distanceFactor)
            : undefined;
          const midY = hasMidpoint
            ? Math.round(((item.midY as number) + v.endJitterY * 0.5) * distanceFactor)
            : undefined;

          if (prefersReducedMotion) {
            if (idx > 1) return null;
            return (
              <div
                key={item.id}
                className="absolute pointer-events-none select-none"
                style={{
                  width: `${itemSize}px`,
                  height: `${itemSize}px`,
                  transform: `translate3d(${endX}px, ${endY}px, 0) rotate(${finalRotate}deg) scale(${finalScale})`,
                  opacity: Math.min(item.targetOpacity, 0.8),
                }}
              >
                <img
                  src={item.asset}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  className={`w-full h-full object-contain select-none pointer-events-none ${
                    item.flipX ? '-scale-x-100' : ''
                  }`}
                />
              </div>
            );
          }

          const floatX = (item.floatX ?? 2.6) * v.floatXDir;
          const floatY = item.floatY * v.floatYDir;
          const floatRot = item.floatRotate * v.floatXDir;

          return (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                x: startX,
                y: startY,
                scale: item.initialScale,
                rotate: item.initialRotate,
              }}
              animate={{
                opacity: item.targetOpacity,
                x: hasMidpoint && midX !== undefined ? [startX, midX, endX] : endX,
                y: hasMidpoint && midY !== undefined ? [startY, midY, endY] : endY,
                scale:
                  hasMidpoint && item.midScale !== undefined
                    ? [item.initialScale, item.midScale, finalScale]
                    : finalScale,
                rotate:
                  hasMidpoint && item.midRotate !== undefined
                    ? [item.initialRotate, item.midRotate, finalRotate]
                    : finalRotate,
              }}
              transition={{
                duration: finalDuration,
                delay: finalDelay,
                ease: SMOOTH_EASE,
              }}
              className="absolute pointer-events-none select-none transform-gpu will-change-transform will-change-opacity"
              style={{
                width: `${itemSize}px`,
                height: `${itemSize}px`,
              }}
            >
              {/* Multi-axis organic post-entrance floating loop */}
              <motion.div
                animate={{
                  x: isMobile
                    ? [0, floatX * 0.5, 0]
                    : [0, floatX, -floatX * 0.65, 0],
                  y: isMobile
                    ? [0, -Math.min(Math.abs(floatY), 3.5), 0]
                    : [0, -floatY, floatY * 0.55, 0],
                  rotate: isMobile
                    ? [0, floatRot * 0.65, 0]
                    : [0, floatRot, -floatRot * 0.75, 0],
                }}
                transition={{
                  duration: Number((item.floatDuration * v.floatDurationFactor).toFixed(2)),
                  delay: finalDelay + finalDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-full transform-gpu will-change-transform"
              >
                <img
                  src={item.asset}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  style={
                    !isMobile && item.depthBlur
                      ? { filter: `blur(${item.depthBlur}px) drop-shadow(0 10px 18px rgba(0,0,0,0.16))` }
                      : undefined
                  }
                  className={`w-full h-full object-contain select-none pointer-events-none ${
                    item.flipX ? '-scale-x-100 ' : ''
                  }${
                    isMobile
                      ? ''
                      : item.layer === 'front'
                      ? 'drop-shadow-[0_14px_22px_rgba(0,0,0,0.22)]'
                      : 'drop-shadow-[0_8px_15px_rgba(0,0,0,0.15)]'
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      {/* Depth Layer 1: Behind the product packaging (z-10) */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-visible"
        aria-hidden="true"
      >
        {renderEffectGroup(behindItems, 'effects-behind')}
      </div>

      {/* Depth Layer 2: Beside / perimeter in front of the product plane (z-30, never covering packaging center/text) */}
      <div
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none select-none overflow-visible"
        aria-hidden="true"
      >
        {renderEffectGroup(foregroundItems, 'effects-foreground')}
      </div>
    </>
  );
};

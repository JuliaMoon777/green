import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GreenergyLogo } from './GreenergyLogo';

interface PreloaderProps {
  onComplete: () => void;
  minDuration?: number; // ms
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  minDuration = 1500,
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [biteIndex, setBiteIndex] = useState(0);

  const lastProgressRef = useRef(0);
  const lastBiteIndexRef = useRef(0);

  useEffect(() => {
    const img = new Image();
    img.decoding = 'async';
    img.src = '/cookie-realistic.webp';
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let frameId: number;
    let exitTimer: ReturnType<typeof setTimeout>;
    let completeTimer: ReturnType<typeof setTimeout>;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));

      if (pct !== lastProgressRef.current) {
        lastProgressRef.current = pct;
        setProgress(pct);
      }

      let currentBite = 0;
      if (pct >= 95) currentBite = 5;
      else if (pct >= 82) currentBite = 4;
      else if (pct >= 62) currentBite = 3;
      else if (pct >= 38) currentBite = 2;
      else if (pct >= 18) currentBite = 1;

      if (currentBite !== lastBiteIndexRef.current) {
        lastBiteIndexRef.current = currentBite;
        setBiteIndex(currentBite);
      }

      if (pct < 100) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        exitTimer = setTimeout(() => {
          setIsExiting(true);
          completeTimer = setTimeout(() => {
            document.body.style.overflow = originalOverflow;
            onComplete();
          }, 520);
        }, 160);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="greenergy-realistic-cookie-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.01,
            transition: { duration: 0.55, ease: SMOOTH_EASE },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#FAF6ED] text-[#2C1810] select-none overflow-hidden pt-safe pb-safe transform-gpu will-change-transform will-change-opacity"
        >
          {/* Ambient Warm Natural Studio Light Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle 340px at 50% 50%, rgba(234, 218, 194, 0.50) 0%, rgba(250, 246, 237, 0) 100%)',
            }}
          />

          {/* Consistent Top-Left Brand-Safe Logo Placement */}
          <header className="relative z-20 w-full px-4 sm:px-6 lg:px-10 pt-2.5 sm:pt-4 lg:pt-5 pl-safe pr-safe flex items-center justify-start flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, ease: SMOOTH_EASE }}
            >
              <GreenergyLogo />
            </motion.div>
          </header>

          {/* Center Cookie & Progress Bar */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
            {/* CLEAN REALISTIC COOKIE WITH SUBTLE BITE PROGRESSION */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-6">
              <motion.div
                key={biteIndex}
                animate={
                  biteIndex > 0
                    ? {
                        scale: [1, 0.97, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.18, ease: SMOOTH_EASE }}
                className="w-full h-full flex items-center justify-center transform-gpu will-change-transform"
              >
                <svg
                  viewBox="0 0 200 200"
                  width={160}
                  height={160}
                  className="w-full h-full drop-shadow-[0_12px_22px_rgba(44,24,16,0.18)] select-none pointer-events-none"
                >
                  <defs>
                    <mask
                      id="cookieRealisticBiteMask"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="200"
                      height="200"
                    >
                      <rect x="0" y="0" width="200" height="200" fill="white" />

                      {biteIndex >= 1 && (
                        <g fill="black">
                          <circle cx="100" cy="195" r="38" />
                          <circle cx="75" cy="188" r="28" />
                          <circle cx="125" cy="188" r="28" />
                          <circle cx="55" cy="198" r="22" />
                          <circle cx="145" cy="198" r="22" />
                          <circle cx="88" cy="168" r="16" />
                          <circle cx="112" cy="168" r="16" />
                          <circle cx="68" cy="172" r="14" />
                          <circle cx="132" cy="172" r="14" />
                        </g>
                      )}

                      {biteIndex >= 2 && (
                        <g fill="black">
                          <circle cx="68" cy="148" r="42" />
                          <circle cx="38" cy="165" r="36" />
                          <circle cx="105" cy="145" r="38" />
                          <circle cx="52" cy="128" r="26" />
                          <circle cx="88" cy="124" r="28" />
                          <circle cx="128" cy="155" r="32" />
                          <circle cx="145" cy="175" r="28" />
                        </g>
                      )}

                      {biteIndex >= 3 && (
                        <g fill="black">
                          <circle cx="100" cy="100" r="46" />
                          <circle cx="62" cy="98" r="38" />
                          <circle cx="138" cy="112" r="40" />
                          <circle cx="85" cy="74" r="28" />
                          <circle cx="115" cy="74" r="28" />
                          <circle cx="158" cy="132" r="34" />
                          <circle cx="42" cy="102" r="30" />
                        </g>
                      )}

                      {biteIndex >= 4 && (
                        <g fill="black">
                          <circle cx="75" cy="55" r="48" />
                          <circle cx="118" cy="52" r="44" />
                          <circle cx="42" cy="68" r="36" />
                          <circle cx="92" cy="34" r="32" />
                          <circle cx="148" cy="68" r="38" />
                          <circle cx="165" cy="92" r="34" />
                        </g>
                      )}

                      {biteIndex >= 5 && (
                        <rect x="0" y="0" width="200" height="200" fill="black" />
                      )}
                    </mask>
                  </defs>

                  <g mask="url(#cookieRealisticBiteMask)">
                    <circle cx="100" cy="100" r="92" fill="#DCA158" />
                    <circle cx="100" cy="100" r="90" fill="#C4863E" />
                  </g>

                  <image
                    href="/cookie-realistic.webp"
                    x="0"
                    y="0"
                    width="200"
                    height="200"
                    preserveAspectRatio="xMidYMid meet"
                    mask="url(#cookieRealisticBiteMask)"
                  />
                </svg>
              </motion.div>
            </div>

            {/* CHOCOLATE LOADING PROGRESS BAR */}
            <div className="flex flex-col items-center w-full max-w-[200px] sm:max-w-[230px] px-2">
              <div className="w-full h-[6px] sm:h-[7px] bg-[#E6DED2] rounded-full overflow-hidden relative shadow-inner p-[1px] border border-[#D8CFC0]">
                <div
                  className="w-full h-full rounded-full bg-gradient-to-r from-[#2A150C] via-[#4A2615] to-[#6E3C22] relative origin-left transform-gpu will-change-transform transition-transform duration-75 ease-out"
                  style={{ transform: `scaleX(${progress / 100})` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/25 rounded-full" />
                </div>
              </div>

              <div className="mt-3 text-[11px] sm:text-xs font-mono text-[#4A2615] font-bold tracking-widest select-none">
                {progress}%
              </div>
            </div>
          </div>

          {/* Bottom spacer to balance vertical centering */}
          <div className="h-12 flex-shrink-0" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

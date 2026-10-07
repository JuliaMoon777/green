import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GreenergyLogo } from './GreenergyLogo';

interface PreloaderProps {
  onComplete: () => void;
  minDuration?: number; // ms
}

interface CrumbParticle {
  id: number;
  x: number; // percentage relative to cookie container
  y: number; // percentage relative to cookie container
  size: number;
  color: string;
  vx: number; // velocity X
  vy: number; // velocity Y (gravity)
  rotation: number;
  rotSpeed: number;
  opacity: number;
  isChocolate?: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ 
  onComplete,
  minDuration = 1900 
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [crumbs, setCrumbs] = useState<CrumbParticle[]>([]);
  const [biteIndex, setBiteIndex] = useState(0); // 0 = whole, 1 = bite 1, 2 = bite 2, 3 = bite 3, 4 = bite 4, 5 = eaten
  const [crunchJolt, setCrunchJolt] = useState(0); // Trigger micro-shake on bite

  const lastBiteIndexRef = useRef(0);
  const nextParticleIdRef = useRef(1);

  // Preload cookie image to guarantee instant display
  useEffect(() => {
    const img = new Image();
    img.src = '/cookie-realistic.webp';
  }, []);

  // Spawn realistic crumbs at specific bite focal point
  const spawnBiteCrumbs = (biteCenterX: number, biteCenterY: number, count = 8) => {
    const newCrumbs: CrumbParticle[] = [];
    const doughColors = [
      '#D49B55', // Golden crust
      '#C28338', // Toasted dough
      '#A86824', // Baked edge
      '#E8B878', // Light biscuit flake
      '#3D1E11', // Dark chocolate chunk
      '#261007', // Deep cocoa
      '#8C4D1D'  // Crisp crumb
    ];

    for (let i = 0; i < count; i++) {
      const isChoc = Math.random() > 0.55;
      newCrumbs.push({
        id: nextParticleIdRef.current++,
        x: biteCenterX + (Math.random() - 0.5) * 36,
        y: biteCenterY + (Math.random() - 0.5) * 16,
        size: isChoc ? 2.5 + Math.random() * 4 : 1.5 + Math.random() * 4.5,
        color: isChoc ? '#2B1206' : doughColors[Math.floor(Math.random() * doughColors.length)],
        vx: (Math.random() - 0.5) * 3.4, // outward explosion
        vy: 1.0 + Math.random() * 4.2,   // downward gravity
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 22,
        opacity: 0.98,
        isChocolate: isChoc
      });
    }

    setCrumbs(prev => [...prev.slice(-36), ...newCrumbs]);
  };

  // Main animation timer and progress loop
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();

    const updateProgress = () => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));
      setProgress(pct);

      // Determine discrete bite index based on progress:
      // 0: 0% - 17% (Whole cookie)
      // 1: 18% - 37% (First bite from bottom)
      // 2: 38% - 61% (Second bite deeper)
      // 3: 62% - 81% (Third bite through center)
      // 4: 82% - 94% (Fourth bite leaving top edge)
      // 5: 95% - 100% (Final crunch)
      let currentBite = 0;
      if (pct >= 95) currentBite = 5;
      else if (pct >= 82) currentBite = 4;
      else if (pct >= 62) currentBite = 3;
      else if (pct >= 38) currentBite = 2;
      else if (pct >= 18) currentBite = 1;

      if (currentBite !== lastBiteIndexRef.current) {
        lastBiteIndexRef.current = currentBite;
        setBiteIndex(currentBite);
        setCrunchJolt(Date.now()); // trigger physical crunch reaction

        // Spawn realistic crumbs at bite locations
        if (currentBite === 1) spawnBiteCrumbs(50, 85, 8);
        else if (currentBite === 2) spawnBiteCrumbs(40, 68, 10);
        else if (currentBite === 3) spawnBiteCrumbs(55, 48, 11);
        else if (currentBite === 4) spawnBiteCrumbs(65, 30, 9);
        else if (currentBite === 5) spawnBiteCrumbs(50, 20, 12);
      }

      if (pct < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            document.body.style.overflow = originalOverflow;
            onComplete();
          }, 650);
        }, 250);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = originalOverflow;
    };
  }, [minDuration, onComplete]);

  // Particle gravity and decay loop
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setCrumbs(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.18, // gravity
            rotation: p.rotation + p.rotSpeed,
            opacity: p.opacity - 0.03
          }))
          .filter(p => p.opacity > 0.05 && p.y < 165)
      );
    }, 25);

    return () => clearInterval(particleInterval);
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="greenergy-realistic-cookie-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF7F0] text-[#2C1810] select-none overflow-hidden"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Ambient Warm Bakery Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[520px] h-[520px] rounded-full bg-[#EAD8C2]/45 blur-[130px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Minimal GREENERGY Brand Mark */}
            <motion.div 
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-7"
            >
              <GreenergyLogo className="h-8 sm:h-9 w-auto" />
            </motion.div>

            {/* REALISTIC COOKIE CONTAINER WITH CRUNCH JOLT AND BOTTOM-UP BITES */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-6">
              
              {/* Active Falling / Flying Crumbs */}
              {crumbs.map(crumb => (
                <div
                  key={crumb.id}
                  className="absolute pointer-events-none shadow-sm"
                  style={{
                    left: `${crumb.x}%`,
                    top: `${crumb.y}%`,
                    width: `${crumb.size}px`,
                    height: `${crumb.isChocolate ? crumb.size * 0.85 : crumb.size}px`,
                    backgroundColor: crumb.color,
                    borderRadius: crumb.isChocolate ? '2px' : '50%',
                    transform: `rotate(${crumb.rotation}deg)`,
                    opacity: crumb.opacity,
                    zIndex: 20
                  }}
                />
              ))}

              {/* Physical Crunch Jolt Wrapper */}
              <motion.div
                key={crunchJolt}
                animate={
                  crunchJolt > 0
                    ? {
                        scale: [1, 0.94, 1.03, 1],
                        rotate: [0, (biteIndex % 2 === 0 ? 1.8 : -1.8), 0],
                        y: [0, 2, -1, 0]
                      }
                    : {}
                }
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="w-full h-full flex items-center justify-center"
              >
                {/* Native SVG Masked High-Resolution Photorealistic Cookie */}
                <svg 
                  viewBox="0 0 200 200" 
                  className="w-full h-full drop-shadow-[0_14px_28px_rgba(44,24,16,0.22)] select-none pointer-events-none"
                >
                  <defs>
                    {/* Realistic Human Teeth Bite Cutouts */}
                    <mask id="cookieRealisticBiteMask" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
                      {/* White base keeps the intact cookie visible */}
                      <rect x="0" y="0" width="200" height="200" fill="white" />
                      
                      {/* BITE 1 (>= 18%): Crisp bottom crescent bite with tooth scallops */}
                      {biteIndex >= 1 && (
                        <g fill="black">
                          {/* Main lower bite arc */}
                          <circle cx="100" cy="195" r="38" />
                          <circle cx="75" cy="188" r="28" />
                          <circle cx="125" cy="188" r="28" />
                          <circle cx="55" cy="198" r="22" />
                          <circle cx="145" cy="198" r="22" />
                          {/* Teeth micro-scallops */}
                          <circle cx="88" cy="168" r="16" />
                          <circle cx="112" cy="168" r="16" />
                          <circle cx="68" cy="172" r="14" />
                          <circle cx="132" cy="172" r="14" />
                        </g>
                      )}

                      {/* BITE 2 (>= 38%): Deeper hearty bite eating the lower-left & center */}
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

                      {/* BITE 3 (>= 62%): Third big bite taking through the center */}
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

                      {/* BITE 4 (>= 82%): Fourth bite leaving only top corner */}
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

                      {/* BITE 5 (>= 95%): Final crunch, fully eaten */}
                      {biteIndex >= 5 && (
                        <rect x="0" y="0" width="200" height="200" fill="black" />
                      )}
                    </mask>
                  </defs>

                  {/* Baked Cookie Underlay Base */}
                  <g mask="url(#cookieRealisticBiteMask)">
                    <circle cx="100" cy="100" r="92" fill="#DCA158" />
                    <circle cx="100" cy="100" r="90" fill="#C4863E" />
                  </g>

                  {/* Real High-Resolution Photorealistic Artisan Chocolate Chip Cookie */}
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
              {/* Premium Chocolate Bar Container */}
              <div className="w-full h-[6px] sm:h-[7px] bg-[#E6DED2] rounded-full overflow-hidden relative shadow-inner p-[1px] border border-[#D8CFC0]">
                {/* Melted Dark & Milk Chocolate Progress Fill */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#2A150C] via-[#4A2615] to-[#6E3C22] relative transition-all duration-75 ease-out shadow-sm"
                  style={{ width: `${progress}%` }}
                >
                  {/* Glossy sheen line highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/25 rounded-full" />
                </div>
              </div>

              {/* Clean Minimalist Percentage Readout */}
              <div className="mt-3 text-[11px] sm:text-xs font-mono text-[#4A2615] font-bold tracking-widest select-none">
                {progress}%
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

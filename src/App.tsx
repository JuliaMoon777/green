import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Preloader } from './components/Preloader';
import { CollectionIntro } from './components/CollectionIntro';
import { SnackHero } from './components/SnackHero';
import { initializeImagePreloader } from './utils/imagePreloader';

type ExperienceStage = 'preloader' | 'intro' | 'ready';

export default function App() {
  const [stage, setStage] = useState<ExperienceStage>('preloader');
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);

  // Begin preloading & decoding all 12 collection packshots and initial hero assets immediately on mount
  useEffect(() => {
    initializeImagePreloader();
  }, []);

  return (
    <div className="min-h-[100svh] w-full relative bg-[#FAF6ED] text-[#1B2D1F] overflow-x-clip font-sans select-none">
      {/* 1. Gourmet Bitten-Cookie & Chocolate Preloader */}
      <AnimatePresence>
        {stage === 'preloader' && (
          <Preloader
            key="cookie-preloader"
            onComplete={() => setStage('intro')}
            minDuration={1550}
          />
        )}
      </AnimatePresence>

      {/* 2. Cinematic GREENERGY Collection Intro (Plays once right after preloader) */}
      <AnimatePresence>
        {stage === 'intro' && (
          <CollectionIntro
            key="greenergy-collection-intro"
            onTransitionStart={() => setIsHeroRevealed(true)}
            onComplete={() => {
              setIsHeroRevealed(true);
              setStage('ready');
            }}
          />
        )}
      </AnimatePresence>

      {/* 3. Main Interactive GREENERGY Product Presentation & Inline Product Information */}
      {/* Mounted seamlessly underneath so background scene and first product transition with 0ms flash */}
      {stage !== 'preloader' && (
        <SnackHero isIntroActive={stage === 'intro' && !isHeroRevealed} />
      )}
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Preloader } from './components/Preloader';
import { CollectionIntro } from './components/CollectionIntro';
import { SnackHero, ProductCategory } from './components/SnackHero';
import { AboutUsPage } from './components/AboutUsPage';
import { initializeImagePreloader } from './utils/imagePreloader';

type ExperienceStage = 'preloader' | 'intro' | 'ready';
type ActivePage = 'home' | 'about-us';

const resolvePageFromPath = (pathname: string): ActivePage => {
  const normalized = pathname.replace(/\/+$/, '').toLowerCase();
  if (normalized === '/about-us') {
    return 'about-us';
  }
  return 'home';
};

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    if (typeof window === 'undefined') return 'home';
    return resolvePageFromPath(window.location.pathname);
  });

  // Only play the initial cookie preloader + intro when first arriving on the homepage.
  // Directly opening /about-us or navigating between pages skips the preloader.
  const [stage, setStage] = useState<ExperienceStage>(() => {
    if (typeof window !== 'undefined' && resolvePageFromPath(window.location.pathname) === 'about-us') {
      return 'ready';
    }
    return 'preloader';
  });
  const [isHeroRevealed, setIsHeroRevealed] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && resolvePageFromPath(window.location.pathname) === 'about-us') {
      return true;
    }
    return false;
  });
  const [externalCategoryRequest, setExternalCategoryRequest] = useState<{
    category: ProductCategory;
    requestId: number;
  } | null>(null);

  // Begin preloading & decoding all 12 collection packshots and initial hero assets immediately on mount
  useEffect(() => {
    initializeImagePreloader();
  }, []);

  // Listen to browser back/forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const nextPage = resolvePageFromPath(window.location.pathname);
      setActivePage(nextPage);
      // Never replay preloader or collection intro on back/forward navigation
      setStage('ready');
      setIsHeroRevealed(true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAboutUs = useCallback(() => {
    if (typeof window !== 'undefined' && resolvePageFromPath(window.location.pathname) !== 'about-us') {
      window.history.pushState({ page: 'about-us' }, '', '/about-us');
    }
    setStage('ready');
    setIsHeroRevealed(true);
    setActivePage('about-us');
  }, []);

  const navigateToHome = useCallback(() => {
    if (typeof window !== 'undefined' && resolvePageFromPath(window.location.pathname) !== 'home') {
      window.history.pushState({ page: 'home' }, '', '/');
    }
    setStage('ready');
    setIsHeroRevealed(true);
    setActivePage('home');
  }, []);

  const navigateToCategoryFromFooter = useCallback((category: ProductCategory) => {
    if (typeof window !== 'undefined' && resolvePageFromPath(window.location.pathname) !== 'home') {
      window.history.pushState({ page: 'home', category }, '', '/');
    }
    setStage('ready');
    setIsHeroRevealed(true);
    setActivePage('home');
    setExternalCategoryRequest({ category, requestId: Date.now() });
  }, []);

  return (
    <div className="min-h-[100svh] w-full relative bg-[#FAF6ED] text-[#1B2D1F] overflow-x-clip font-sans select-none">
      {/* 1. Gourmet Bitten-Cookie & Chocolate Preloader (Initial homepage load only) */}
      <AnimatePresence>
        {activePage === 'home' && stage === 'preloader' && (
          <Preloader
            key="cookie-preloader"
            onComplete={() => setStage('intro')}
            minDuration={1550}
          />
        )}
      </AnimatePresence>

      {/* 2. Cinematic GREENERGY Collection Intro (Plays once right after preloader) */}
      <AnimatePresence>
        {activePage === 'home' && stage === 'intro' && (
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
      {/* Kept mounted once ready so returning from /about-us preserves the exact product & category state */}
      {stage !== 'preloader' && (
        <div
          className={activePage === 'home' ? 'block w-full' : 'hidden'}
          aria-hidden={activePage !== 'home'}
        >
          <SnackHero
            isIntroActive={activePage === 'home' && stage === 'intro' && !isHeroRevealed}
            onNavigateAboutUs={navigateToAboutUs}
            onNavigateHome={navigateToHome}
            externalCategoryRequest={externalCategoryRequest}
          />
        </div>
      )}

      {/* 4. Dedicated About Us Page (/about-us) */}
      {activePage === 'about-us' && (
        <AboutUsPage
          onNavigateHome={navigateToHome}
          onNavigateAboutUs={navigateToAboutUs}
          onSelectCategory={navigateToCategoryFromFooter}
        />
      )}
    </div>
  );
}

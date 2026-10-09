import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GreenergyLogo } from './GreenergyLogo';
import { SocialLinks } from './SocialLinks';
import { Footer } from './Footer';
import type { ProductCategory } from './SnackHero';
import {
  EDITORIAL_CLEAN_CAMPAIGN_BG,
  EDITORIAL_CLEAN_CAMPAIGN_BG_JPG,
  EDITORIAL_CLEAN_CAMPAIGN_BG_SVG,
  EDITORIAL_CLEAN_CAMPAIGN_BG_FALLBACK,
} from '../utils/imagePreloader';

interface AboutUsPageProps {
  onNavigateHome: () => void;
  onNavigateAboutUs?: () => void;
  onSelectCategory?: (category: ProductCategory) => void;
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateHome,
  onNavigateAboutUs,
  onSelectCategory,
}) => {
  const [backdropSrc, setBackdropSrc] = useState<string>(EDITORIAL_CLEAN_CAMPAIGN_BG);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Scroll to top when opening the About Us page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  const revealMotion = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0.2 : 0.56,
      delay: prefersReducedMotion ? 0 : delay,
      ease: SMOOTH_EASE,
    },
  });

  const handleReturnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigateHome();
  };

  return (
    <div
      lang="en"
      className="relative min-h-[100svh] w-full bg-[#F5EFE4] text-[#1B2D1F] overflow-x-clip select-text"
    >
      {/* 1. FIXED WARM SUNLIT NATURAL STONE & LINEN EDITORIAL BACKDROP */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
        style={{
          background:
            'linear-gradient(165deg, #FBF7EE 0%, #F4ECE0 46%, #E8D9C5 100%)',
        }}
      >
        <img
          src={backdropSrc}
          alt=""
          decoding="async"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={() => {
            if (backdropSrc === EDITORIAL_CLEAN_CAMPAIGN_BG) {
              setBackdropSrc(EDITORIAL_CLEAN_CAMPAIGN_BG_FALLBACK);
            } else if (backdropSrc === EDITORIAL_CLEAN_CAMPAIGN_BG_FALLBACK) {
              setBackdropSrc(EDITORIAL_CLEAN_CAMPAIGN_BG_JPG);
            } else if (backdropSrc !== EDITORIAL_CLEAN_CAMPAIGN_BG_SVG) {
              setBackdropSrc(EDITORIAL_CLEAN_CAMPAIGN_BG_SVG);
            }
          }}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />

        {/* Soft organic golden daylight diffusion */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 50% 32%, rgba(254, 251, 245, 0.58) 0%, rgba(246, 239, 227, 0.28) 62%, rgba(42, 30, 16, 0.06) 100%)',
          }}
        />
      </div>

      {/* 2. CONSISTENT TOP HEADER NAVIGATION */}
      <header className="relative z-40 w-full pt-safe">
        <div className="w-full max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 pt-2 sm:pt-3.5 lg:pt-5 pb-2 pl-safe pr-safe flex items-center justify-between gap-3">
          {/* Left: Official GREENERGY Logo (returns to homepage) */}
          <GreenergyLogo
            isDarkScene={false}
            onClick={onNavigateHome}
            href="/"
          />

          {/* Right: Instagram + Facebook + ABOUT US */}
          <SocialLinks
            isDarkScene={false}
            isAboutUsActive={true}
            onAboutUsClick={onNavigateAboutUs}
          />
        </div>
      </header>

      {/* 3. MAIN EDITORIAL CONTENT CONTAINER */}
      <main className="relative z-20 w-full max-w-[1140px] 2xl:max-w-[1260px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-24 lg:pb-28 pl-safe pr-safe pb-safe flex flex-col gap-6 sm:gap-8 lg:gap-10">
        {/* Primary Semantic H1 for the About Us Page */}
        <h1 className="sr-only">
          About GREENERGY — Natural Snacks, Great Taste
        </h1>

        {/* SECTION 1 — HERO INTRODUCTION (Editorial Glass Showcase) */}
        <motion.section
          {...revealMotion(0.04)}
          className="relative overflow-hidden rounded-3xl sm:rounded-[34px] px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-14 backdrop-blur-xl bg-white/80 sm:bg-white/76 border border-white/85 shadow-[0_18px_48px_rgba(27,45,31,0.08)]"
        >
          {/* Subtle top specular highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl sm:rounded-[34px]"
            style={{
              background:
                'radial-gradient(ellipse 85% 70% at 50% 0%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0) 75%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Editorial Copy Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-[#2D6A3E] mb-3 sm:mb-4">
                ABOUT GREENERGY
              </span>

              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight text-[#1B2D1F] leading-[1.08] [text-wrap:balance]">
                Why Wait for Healthier Snacks?
              </h2>

              <p className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-bold text-[#2D6A3E] tracking-tight leading-snug">
                Snack Green. Live Clean.
              </p>

              <div className="w-16 h-px bg-[#1B2D1F]/15 my-5 sm:my-6" />

              <div className="flex flex-col gap-4 text-[15px] sm:text-base md:text-[17px] text-[#1B2D1F]/85 leading-relaxed max-w-[65ch]">
                <p>
                  At Greenergy, we create snacks that make everyday choices simpler,
                  cleaner, and more enjoyable.
                </p>
                <p>
                  We believe that better snacking should never feel like a compromise. That
                  is why we combine carefully selected plant-based ingredients, modern
                  nutritional thinking, and bold, satisfying flavors in products designed
                  for contemporary lifestyles.
                </p>
              </div>
            </div>

            {/* Official GREENERGY Brand Logo Visual Block */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[420px] min-h-[200px] xs:min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] aspect-[16/10] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl bg-[#FAF6ED]/82 border border-white/85 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_8px_28px_rgba(27,45,31,0.05)] flex items-center justify-center px-7 py-8 sm:px-10 sm:py-10 lg:px-11 lg:py-12 overflow-hidden">
                {/* Subtle warm radial studio highlight */}
                <div
                  aria-hidden="true"
                  className="absolute inset-3 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255, 255, 255, 0.92) 0%, rgba(250, 246, 237, 0.45) 62%, transparent 100%)',
                  }}
                />

                {/* Single Centered Official GREENERGY Logo */}
                <img
                  src="/products/brand/greenergy-logo.png"
                  alt="GREENERGY"
                  decoding="async"
                  loading="eager"
                  className="relative z-10 w-[76%] sm:w-[78%] lg:w-[82%] max-w-[240px] xs:max-w-[260px] sm:max-w-[290px] lg:max-w-[310px] h-auto max-h-[72%] object-contain object-center select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2 & SECTION 3 — OUR PHILOSOPHY & WHAT WE CREATE (Editorial Two-Column Grid on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* SECTION 2 — OUR PHILOSOPHY */}
          <motion.section
            {...revealMotion(0.1)}
            className="lg:col-span-6 relative overflow-hidden rounded-3xl sm:rounded-[32px] px-6 py-7 sm:px-10 sm:py-10 backdrop-blur-xl bg-white/78 sm:bg-white/74 border border-white/85 shadow-[0_16px_44px_rgba(27,45,31,0.07)] flex flex-col justify-between"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl sm:rounded-[32px]"
              style={{
                background:
                  'radial-gradient(ellipse 85% 75% at 50% 0%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 75%)',
              }}
            />

            <div className="relative z-10 flex flex-col">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.15em] text-[#2D6A3E] mb-2">
                01 · PHILOSOPHY
              </span>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1B2D1F] leading-tight">
                Our Philosophy
              </h2>

              <div className="w-full h-px bg-[#1B2D1F]/12 my-5" />

              <div className="flex flex-col gap-4 text-[15px] sm:text-base text-[#1B2D1F]/85 leading-relaxed max-w-[65ch]">
                <p>
                  Modern life moves fast, and the food we reach for every day matters.
                </p>
                <p>
                  Greenergy was created with a clear ambition: to offer snacks that bring
                  together natural character, functional value, and genuine taste. From
                  crunchy legume-based snacks to protein-forward treats, every product is
                  developed with attention to quality, texture, and flavor balance.
                </p>
                <p>
                  We focus on recipes that feel honest, contemporary, and naturally
                  rewarding.
                </p>
              </div>
            </div>
          </motion.section>

          {/* SECTION 3 — WHAT WE CREATE */}
          <motion.section
            {...revealMotion(0.14)}
            className="lg:col-span-6 relative overflow-hidden rounded-3xl sm:rounded-[32px] px-6 py-7 sm:px-10 sm:py-10 backdrop-blur-xl bg-white/78 sm:bg-white/74 border border-white/85 shadow-[0_16px_44px_rgba(27,45,31,0.07)] flex flex-col justify-between"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl sm:rounded-[32px]"
              style={{
                background:
                  'radial-gradient(ellipse 85% 75% at 50% 0%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 75%)',
              }}
            />

            <div className="relative z-10 flex flex-col">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.15em] text-[#2D6A3E] mb-2">
                02 · CRAFT & RANGE
              </span>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1B2D1F] leading-tight">
                What We Create
              </h2>

              <div className="w-full h-px bg-[#1B2D1F]/12 my-5" />

              <div className="flex flex-col gap-4 text-[15px] sm:text-base text-[#1B2D1F]/85 leading-relaxed max-w-[65ch]">
                <p>
                  Our range explores the versatility of plant-based ingredients through
                  distinctive snack lines:
                </p>

                <ul className="flex flex-col gap-2.5 my-1 pl-1">
                  {[
                    'Fava Beans Chips',
                    'Chickpea Protein Snacks',
                    'Protein Cookies',
                    'Peanuts in a Crispy Fava Bean Coating',
                  ].map((lineItem) => (
                    <li
                      key={lineItem}
                      className="flex items-center gap-3 text-[15px] sm:text-base font-bold text-[#1B2D1F]"
                    >
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-[#2D6A3E] flex-shrink-0"
                      />
                      <span>{lineItem}</span>
                    </li>
                  ))}
                </ul>

                <p>
                  Each line has its own personality — from bright, Mediterranean-inspired
                  seasonings and warm spice blends to rich, comforting sweet flavors —
                  while staying true to the same Greenergy standard of quality.
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* SECTION 4 — WHY GREENERGY */}
        <motion.section
          {...revealMotion(0.18)}
          className="relative overflow-hidden rounded-3xl sm:rounded-[32px] px-6 py-8 sm:px-10 sm:py-11 md:px-12 md:py-12 backdrop-blur-xl bg-white/80 sm:bg-white/74 border border-white/85 shadow-[0_16px_44px_rgba(27,45,31,0.08)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl sm:rounded-[32px]"
            style={{
              background:
                'radial-gradient(ellipse 85% 75% at 50% 0%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 75%)',
            }}
          />

          <div className="relative z-10 flex flex-col">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.15em] text-[#2D6A3E] mb-2">
              03 · STANDARDS
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#1B2D1F] leading-tight">
              Why Greenergy
            </h2>

            <div className="w-full h-px bg-[#1B2D1F]/12 my-6 sm:my-7" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Pillar 1 */}
              <article className="flex flex-col gap-2.5 md:pr-4">
                <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2D6A3E]">
                  01
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#1B2D1F] tracking-tight leading-snug">
                  Thoughtfully Selected Ingredients
                </h3>
                <p className="text-sm sm:text-[15px] text-[#1B2D1F]/80 leading-relaxed">
                  We build our products around ingredients valued for their natural taste,
                  texture, and nutritional character.
                </p>
              </article>

              {/* Pillar 2 */}
              <article className="flex flex-col gap-2.5 pt-5 md:pt-0 border-t md:border-t-0 md:border-l border-[#1B2D1F]/12 md:pl-6 lg:pl-8 md:pr-2">
                <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2D6A3E]">
                  02
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#1B2D1F] tracking-tight leading-snug">
                  Flavor First
                </h3>
                <p className="text-sm sm:text-[15px] text-[#1B2D1F]/80 leading-relaxed">
                  Healthy snacking should be exciting. Every recipe is crafted to deliver a
                  distinctive, memorable taste profile.
                </p>
              </article>

              {/* Pillar 3 */}
              <article className="flex flex-col gap-2.5 pt-5 md:pt-0 border-t md:border-t-0 md:border-l border-[#1B2D1F]/12 md:pl-6 lg:pl-8">
                <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2D6A3E]">
                  03
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#1B2D1F] tracking-tight leading-snug">
                  Made for Everyday Moments
                </h3>
                <p className="text-sm sm:text-[15px] text-[#1B2D1F]/80 leading-relaxed">
                  Whether at work, on the move, after training, or during a quiet break,
                  Greenergy fits naturally into your day.
                </p>
              </article>
            </div>
          </div>
        </motion.section>

        {/* SECTION 5 — CLOSING BRAND STATEMENT + RETURN TO PRODUCTS */}
        <motion.section
          {...revealMotion(0.22)}
          className="relative overflow-hidden rounded-3xl sm:rounded-[32px] px-6 py-9 sm:px-12 sm:py-12 md:px-16 md:py-14 backdrop-blur-xl bg-white/82 sm:bg-white/76 border border-white/85 shadow-[0_18px_48px_rgba(27,45,31,0.08)] text-center flex flex-col items-center"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl sm:rounded-[32px]"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0) 75%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-[#2D6A3E] mb-3">
              LET&apos;S RAW
            </span>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tight text-[#1B2D1F] leading-tight [text-wrap:balance]">
              Better Snacking Starts Here
            </h2>

            <p className="mt-4 text-[15px] sm:text-base md:text-[17px] text-[#1B2D1F]/85 leading-relaxed max-w-[60ch]">
              Greenergy stands for a fresh approach to snacking — natural in spirit, bold in
              flavor, and created for people who expect more from everyday food.
            </p>

            {/* Elegant Return to Products CTA Button */}
            <div className="mt-7 sm:mt-8">
              <a
                href="/"
                onClick={handleReturnClick}
                className="greenergy-about-green-glass-btn h-11 sm:h-12 min-h-[44px] px-8 sm:px-10 rounded-full text-white font-extrabold text-xs sm:text-[13px] tracking-[0.14em] uppercase inline-flex items-center justify-center relative overflow-hidden cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A3E]/60"
              >
                {/* Soft top glass highlight */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-85"
                />

                <span className="relative z-10 text-white whitespace-nowrap text-center">
                  EXPLORE PRODUCTS
                </span>
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* 4. WEBSITE FOOTER */}
      <Footer
        activePage="about-us"
        onNavigateHome={onNavigateHome}
        onNavigateAboutUs={() => {
          if (onNavigateAboutUs) onNavigateAboutUs();
        }}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
};

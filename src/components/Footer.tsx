import React from 'react';
import type { ProductCategory } from './SnackHero';

interface FooterProps {
  activePage?: 'home' | 'about-us';
  activeCategory?: ProductCategory;
  onNavigateHome: () => void;
  onNavigateAboutUs: () => void;
  onSelectCategory?: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({
  activePage = 'home',
  onNavigateHome,
  onNavigateAboutUs,
}) => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    }
  };

  const handleProductsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigateHome();
    scrollToTop();
  };

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigateAboutUs();
    scrollToTop();
  };

  return (
    <footer
      lang="en"
      aria-label="GREENERGY Footer"
      className="relative z-30 w-full mt-auto px-4 sm:px-8 md:px-12 pt-2 pb-6 sm:pb-10 pl-safe pr-safe pb-safe select-text"
    >
      <div className="w-full max-w-[1240px] mx-auto">
        {/* Single Unified Translucent Frosted-Glass Footer Surface */}
        <div
          className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 text-[#1B2D1F] backdrop-blur-xl transition-colors duration-300"
          style={{
            backgroundColor: 'rgba(255, 250, 242, 0.68)',
            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            backdropFilter: 'blur(18px) saturate(140%)',
            border: '1px solid rgba(255, 255, 255, 0.62)',
            boxShadow:
              '0 14px 38px rgba(27, 45, 31, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.75)',
          }}
        >
          {/* Subtle top specular light reflection for authentic glass depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[30px]"
            style={{
              background:
                'radial-gradient(ellipse 80% 65% at 50% 0%, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0) 75%)',
            }}
          />

          {/* Main Footer Content: 3 Balanced Groups (LEFT: Brand | CENTER: Navigation | RIGHT: Cohesive Contact Block) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-6 lg:gap-8 items-start md:items-center">
            {/* 1. LEFT — BRAND LOGO */}
            <div className="md:col-span-3 lg:col-span-3 flex items-center justify-start">
              <a
                href="/"
                onClick={handleProductsClick}
                aria-label="GREENERGY — Return to homepage"
                className="inline-flex items-center rounded-xl py-0.5 transition-opacity duration-200 hover:opacity-85 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A3E]/50"
              >
                <img
                  src="/products/brand/greenergy-logo.png"
                  alt="GREENERGY"
                  decoding="async"
                  loading="lazy"
                  className="h-10 sm:h-11 md:h-11 lg:h-[50px] w-auto object-contain select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(27,45,31,0.06)]"
                />
              </a>
            </div>

            {/* 2. CENTER — NAVIGATION (About us | Our products) */}
            <nav
              aria-label="Footer navigation"
              className="md:col-span-4 lg:col-span-4 flex flex-wrap items-center justify-start md:justify-center gap-x-3 sm:gap-x-4 lg:gap-x-5 gap-y-1"
            >
              <a
                href="/about-us"
                onClick={handleAboutClick}
                aria-current={activePage === 'about-us' ? 'page' : undefined}
                className={`min-h-[36px] inline-flex items-center text-[13.5px] sm:text-sm lg:text-[15px] tracking-[0.01em] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:underline ${
                  activePage === 'about-us'
                    ? 'font-bold text-[#1B2D1F]'
                    : 'font-semibold text-[#1B2D1F]/85 hover:text-[#2D6A3E]'
                }`}
              >
                About us
              </a>

              <span
                aria-hidden="true"
                className="text-[#1B2D1F]/25 text-xs select-none"
              >
                |
              </span>

              <a
                href="/#products"
                onClick={handleProductsClick}
                aria-current={activePage === 'home' ? 'page' : undefined}
                className={`min-h-[36px] inline-flex items-center text-[13.5px] sm:text-sm lg:text-[15px] tracking-[0.01em] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:underline ${
                  activePage === 'home'
                    ? 'font-bold text-[#1B2D1F]'
                    : 'font-semibold text-[#1B2D1F]/85 hover:text-[#2D6A3E]'
                }`}
              >
                Our products
              </a>
            </nav>

            {/* 3. RIGHT — COHESIVE CONTACT INFORMATION BLOCK (BLUEMOOR) */}
            <address className="md:col-span-5 lg:col-span-5 not-italic flex flex-col items-start md:items-end text-left md:text-right gap-1 text-xs sm:text-[13px] leading-relaxed text-[#1B2D1F]/85">
              <div className="flex flex-wrap items-baseline md:justify-end gap-x-1.5 gap-y-0.5">
                <span className="font-extrabold tracking-[0.05em] text-[#1B2D1F]">
                  BLUEMOOR
                </span>
                <span aria-hidden="true" className="text-[#1B2D1F]/35">
                  ·
                </span>
                <span className="font-medium text-[#1B2D1F]/85">
                  <span lang="pl">Rynek Główny 6, 32-600 Oświęcim</span>, Poland
                </span>
              </div>

              <div className="flex flex-wrap items-center md:justify-end gap-x-3 sm:gap-x-3.5 gap-y-0.5">
                <a
                  href="tel:+48504061879"
                  className="min-h-[30px] inline-flex items-center font-semibold text-[#1B2D1F]/90 hover:text-[#2D6A3E] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:underline"
                >
                  +48 504 061 879
                </a>
                <span
                  aria-hidden="true"
                  className="text-[#1B2D1F]/30 select-none"
                >
                  ·
                </span>
                <a
                  href="mailto:info@bluemoor.com.pl"
                  className="min-h-[30px] inline-flex items-center font-semibold text-[#1B2D1F]/90 hover:text-[#2D6A3E] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:underline"
                >
                  info@bluemoor.com.pl
                </a>
              </div>
            </address>
          </div>

          {/* Subtle Divider */}
          <div className="relative z-10 w-full h-px bg-[#1B2D1F]/12 my-4 sm:my-5" />

          {/* Slim Copyright & Credit Bar */}
          <div className="relative z-10 flex flex-col min-[460px]:flex-row items-start min-[460px]:items-center justify-between gap-1.5 text-[11px] sm:text-xs font-medium text-[#1B2D1F]/70">
            <p>© Copyright 2026 greenergy.eu. All rights reserved.</p>
            <p className="text-[#1B2D1F]/65">Powered by Artur Creative</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

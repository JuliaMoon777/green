import React from 'react';
import { ArrowUp } from 'lucide-react';
import type { ProductCategory } from './SnackHero';

interface FooterProps {
  activePage?: 'home' | 'about-us';
  activeCategory?: ProductCategory;
  onNavigateHome: () => void;
  onNavigateAboutUs: () => void;
  onSelectCategory?: (category: ProductCategory) => void;
}

const INSTAGRAM_SVG_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.25" stroke="#1B2D1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="4.25" stroke="#1B2D1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="17.35" cy="6.65" r="1.25" fill="#1B2D1F"/></svg>'
  );

const FACEBOOK_SVG_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V6.65c0-1.05.29-1.73 1.76-1.73Z" fill="#1B2D1F"/></svg>'
  );

const metaEnv = (
  import.meta as unknown as { env?: Record<string, string | undefined> }
).env;

const INSTAGRAM_URL =
  metaEnv?.VITE_INSTAGRAM_URL || 'https://www.instagram.com';

const FACEBOOK_URL =
  metaEnv?.VITE_FACEBOOK_URL || 'https://www.facebook.com';

const FOOTER_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'fava-beans', label: 'Fava Beans' },
  { id: 'chickpea-protein-snacks', label: 'Chickpea Snacks' },
  { id: 'protein-cookies', label: 'Protein Cookies' },
  { id: 'peanuts-fava', label: 'Peanuts & Fava' },
];

const SOCIAL_LINKS = [
  {
    id: 'instagram',
    name: 'Instagram',
    ariaLabel: 'Instagram @greenergy',
    href: INSTAGRAM_URL,
    iconSrc: '/social/instagram.svg',
    fallbackSrc: INSTAGRAM_SVG_FALLBACK,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    ariaLabel: 'Facebook @greenergy',
    href: FACEBOOK_URL,
    iconSrc: '/social/facebook.svg',
    fallbackSrc: FACEBOOK_SVG_FALLBACK,
  },
] as const;

export const Footer: React.FC<FooterProps> = ({
  activePage = 'home',
  activeCategory,
  onNavigateHome,
  onNavigateAboutUs,
  onSelectCategory,
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

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    category: ProductCategory
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(category);
    } else {
      onNavigateHome();
    }
    scrollToTop();
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="GREENERGY Footer"
      className="relative z-30 w-full mt-auto pt-6 sm:pt-10 pb-6 sm:pb-10 px-4 sm:px-6 md:px-10 lg:px-12 pl-safe pr-safe pb-safe select-text"
    >
      <div className="w-full max-w-[1140px] 2xl:max-w-[1260px] mx-auto">
        {/* Warm Frosted-Glass Botanical Container */}
        <div
          className="relative overflow-hidden rounded-3xl sm:rounded-[34px] px-6 py-8 sm:px-10 sm:py-11 md:px-12 md:py-12 backdrop-blur-xl bg-[#FAF6ED]/88 sm:bg-[#FAF6ED]/84 border border-white/85 shadow-[0_16px_44px_rgba(27,45,31,0.08)] text-[#1B2D1F]"
        >
          {/* Subtle top warm radial daylight diffusion */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl sm:rounded-[34px]"
            style={{
              background:
                'radial-gradient(ellipse 85% 70% at 50% 0%, rgba(255, 255, 255, 0.72) 0%, rgba(250, 246, 237, 0.25) 60%, rgba(255, 255, 255, 0) 100%)',
            }}
          />

          {/* Main Footer Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-start">
            {/* COLUMN 1: Official GREENERGY Brand Identity */}
            <div className="sm:col-span-2 lg:col-span-5 flex flex-col items-start">
              <a
                href="/"
                onClick={handleHomeClick}
                aria-label="GREENERGY — Return to homepage"
                className="group inline-flex items-center justify-center rounded-2xl bg-white/75 hover:bg-white/92 border border-white/85 px-4 py-2.5 shadow-[0_4px_16px_rgba(27,45,31,0.05)] transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A3E]/50"
              >
                <img
                  src="/products/brand/greenergy-logo.png"
                  alt="GREENERGY"
                  decoding="async"
                  loading="lazy"
                  className="h-9 sm:h-10 md:h-11 w-auto object-contain select-none pointer-events-none"
                />
              </a>

              <p className="mt-4 text-sm sm:text-[15px] font-extrabold tracking-tight text-[#2D6A3E]">
                Snack Green. Live Clean.
              </p>

              <p className="mt-2 text-xs sm:text-sm text-[#1B2D1F]/78 leading-relaxed max-w-[40ch]">
                Plant-based snacks crafted with thoughtfully selected ingredients,
                modern nutritional balance, and bold, natural flavor.
              </p>
            </div>

            {/* COLUMN 2: Product Categories */}
            <div className="sm:col-span-1 lg:col-span-3 flex flex-col items-start">
              <h3 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.15em] text-[#2D6A3E] mb-3 sm:mb-4">
                Products
              </h3>
              <ul className="flex flex-col gap-1.5 sm:gap-2 w-full">
                {FOOTER_CATEGORIES.map((cat) => {
                  const isCurrentCategory =
                    activePage === 'home' && activeCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <a
                        href="/"
                        onClick={(e) => handleCategoryClick(e, cat.id)}
                        className={`min-h-[38px] sm:min-h-[36px] py-1 inline-flex items-center gap-2 text-sm sm:text-[15px] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:underline ${
                          isCurrentCategory
                            ? 'font-extrabold text-[#1B2D1F]'
                            : 'font-medium text-[#1B2D1F]/80 hover:text-[#1B2D1F]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`w-1.5 h-1.5 rounded-full transition-opacity duration-200 ${
                            isCurrentCategory
                              ? 'bg-[#2D6A3E] opacity-100'
                              : 'bg-[#2D6A3E]/50 opacity-0 group-hover:opacity-100'
                          }`}
                        />
                        <span className="whitespace-nowrap">{cat.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* COLUMN 3: Website Navigation */}
            <div className="sm:col-span-1 lg:col-span-2 flex flex-col items-start">
              <h3 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.15em] text-[#2D6A3E] mb-3 sm:mb-4">
                Navigation
              </h3>
              <ul className="flex flex-col gap-1.5 sm:gap-2 w-full">
                <li>
                  <a
                    href="/"
                    onClick={handleHomeClick}
                    aria-current={activePage === 'home' ? 'page' : undefined}
                    className={`min-h-[38px] sm:min-h-[36px] py-1 inline-flex items-center text-sm sm:text-[15px] transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:underline ${
                      activePage === 'home'
                        ? 'font-extrabold text-[#1B2D1F]'
                        : 'font-medium text-[#1B2D1F]/80 hover:text-[#1B2D1F]'
                    }`}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about-us"
                    onClick={handleAboutClick}
                    aria-current={activePage === 'about-us' ? 'page' : undefined}
                    className={`min-h-[38px] sm:min-h-[36px] py-1 inline-flex items-center text-sm sm:text-[15px] transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:underline ${
                      activePage === 'about-us'
                        ? 'font-extrabold text-[#1B2D1F]'
                        : 'font-medium text-[#1B2D1F]/80 hover:text-[#1B2D1F]'
                    }`}
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* COLUMN 4: Social Media & Back to Top */}
            <div className="sm:col-span-2 lg:col-span-2 flex flex-col items-start lg:items-end justify-between h-full">
              <div className="flex flex-col items-start lg:items-end w-full">
                <h3 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.15em] text-[#2D6A3E] mb-3 sm:mb-4">
                  Follow Us
                </h3>

                <div className="flex items-center gap-2.5">
                  {SOCIAL_LINKS.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/78 hover:bg-white/95 border border-white/85 shadow-[0_4px_14px_rgba(27,45,31,0.06)] inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A3E]/50"
                    >
                      <img
                        src={item.iconSrc}
                        alt=""
                        width={18}
                        height={18}
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== item.fallbackSrc) {
                            target.src = item.fallbackSrc;
                          }
                        }}
                        className="w-[18px] h-[18px] object-contain select-none pointer-events-none opacity-90"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fine Botanical Divider */}
          <div className="relative z-10 w-full h-px bg-[#1B2D1F]/12 my-6 sm:my-8" />

          {/* Bottom Copyright & Back to Top Bar */}
          <div className="relative z-10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4 text-xs text-[#1B2D1F]/70">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="font-semibold text-[#1B2D1F]/80">
                © {currentYear} GREENERGY. All rights reserved.
              </span>
              <span aria-hidden="true" className="hidden sm:inline opacity-50">
                ·
              </span>
              <span className="hidden sm:inline text-[#1B2D1F]/65">
                Let&apos;s Raw
              </span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-white/65 hover:bg-white/90 border border-white/80 shadow-[0_2px_10px_rgba(27,45,31,0.04)] inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1B2D1F]/85 hover:text-[#1B2D1F] transition-all duration-200 active:scale-95 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A3E]/50"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

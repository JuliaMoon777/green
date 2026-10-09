import React from 'react';

interface SocialLinksProps {
  /** Whether the current scene has a darker or high-contrast background */
  isDarkScene?: boolean;
  className?: string;
  /** Whether the current route is /about-us */
  isAboutUsActive?: boolean;
  /** Handler when ABOUT US is clicked */
  onAboutUsClick?: () => void;
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

const SOCIAL_ITEMS = [
  {
    id: 'instagram',
    label: 'Instagram @greenergy',
    href: INSTAGRAM_URL,
    iconSrc: '/social/instagram.svg',
    fallbackSrc: INSTAGRAM_SVG_FALLBACK,
  },
  {
    id: 'facebook',
    label: 'Facebook @greenergy',
    href: FACEBOOK_URL,
    iconSrc: '/social/facebook.svg',
    fallbackSrc: FACEBOOK_SVG_FALLBACK,
  },
] as const;

/**
 * Header social media links (Instagram & Facebook) styled with the exact same
 * subtle frosted-glass visibility treatment as the GREENERGY logo.
 * Guarantees a comfortable 44×44px minimum tap target while keeping the visual
 * circular glass badges compact, refined, and clearly readable across all scenes.
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({
  isDarkScene = false,
  className = '',
  isAboutUsActive = false,
  onAboutUsClick,
}) => {
  const glassBadgeClass = isDarkScene
    ? 'bg-[#FAF8F3]/82 sm:bg-[#FAF8F3]/76 group-hover:bg-[#FAF8F3]/92 border border-white/75 shadow-[0_4px_18px_rgba(0,0,0,0.12)]'
    : 'bg-white/76 sm:bg-white/62 group-hover:bg-white/88 border border-white/75 shadow-[0_4px_16px_rgba(0,0,0,0.05)]';

  const activePillGlassClass = isDarkScene
    ? 'bg-[#FAF8F3]/96 border border-white/95 shadow-[0_6px_20px_rgba(0,0,0,0.16)]'
    : 'bg-white/94 border border-white/95 shadow-[0_6px_20px_rgba(27,45,31,0.10)]';

  const haloBackground = isDarkScene
    ? 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0) 100%)'
    : 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0) 100%)';

  const pillHaloBackground = isDarkScene
    ? 'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0) 100%)'
    : 'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0) 100%)';

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    if (onAboutUsClick) {
      e.preventDefault();
      onAboutUsClick();
    }
  };

  return (
    <div
      lang="en"
      className={`flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0 ${className}`}
    >
      {/* Instagram & Facebook Circular Frosted-Glass Icons */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {SOCIAL_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full inline-flex items-center justify-center group cursor-pointer active:scale-95 transition-transform duration-200 focus-visible:outline-none"
          >
            <span
              className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full inline-flex items-center justify-center backdrop-blur-md transition-all duration-300 lg:group-hover:scale-105 ${glassBadgeClass}`}
            >
              {/* Subtle feathered contrast halo behind the vector icon (matches GreenergyLogo) */}
              <span
                aria-hidden="true"
                className="absolute inset-0.5 rounded-full pointer-events-none"
                style={{ background: haloBackground }}
              />

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
                className="relative z-10 w-[17px] h-[17px] sm:w-[18px] sm:h-[18px] object-contain select-none pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
            </span>
          </a>
        ))}
      </div>

      {/* ABOUT US Compact Frosted-Glass Pill Button */}
      <a
        href="/about-us"
        onClick={handleAboutClick}
        aria-label="About Us"
        aria-current={isAboutUsActive ? 'page' : undefined}
        className="min-h-[44px] py-1 rounded-full inline-flex items-center justify-center group cursor-pointer active:scale-95 transition-transform duration-200 focus-visible:outline-none"
      >
        <span
          className={`relative h-9 sm:h-10 px-3.5 sm:px-4 rounded-full inline-flex items-center justify-center backdrop-blur-md transition-all duration-300 lg:group-hover:scale-[1.03] ${
            isAboutUsActive ? activePillGlassClass : glassBadgeClass
          }`}
        >
          {/* Subtle feathered contrast halo behind the typography (matches GreenergyLogo & SocialLinks) */}
          <span
            aria-hidden="true"
            className="absolute inset-0.5 rounded-full pointer-events-none"
            style={{ background: pillHaloBackground }}
          />

          <span
            className={`relative z-10 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.13em] text-[#1B2D1F] whitespace-nowrap select-none transition-opacity duration-200 ${
              isAboutUsActive ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
            }`}
          >
            ABOUT US
          </span>
        </span>
      </a>
    </div>
  );
};

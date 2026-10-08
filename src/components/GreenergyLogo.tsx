import React from 'react';

interface GreenergyLogoProps {
  className?: string;
  containerClassName?: string;
  alt?: string;
  /** Whether the current scene has a darker or high-contrast background */
  isDarkScene?: boolean;
  /** Option to render bare image if ever needed; defaults to true (subtle glass protection) */
  withGlassBadge?: boolean;
  /** Optional click handler (e.g., to navigate back to the homepage) */
  onClick?: () => void;
  /** Optional href when rendered as a link */
  href?: string;
}

/**
 * Official GREENERGY logo (untouched proportions, shape, and original brand colors)
 * housed inside a subtle, lightweight frosted-glass container with a soft diffused
 * contrast halo behind the mark for clear readability across all backgrounds.
 * On mobile viewports, the translucent backing provides slightly stronger protection
 * against busy ingredient textures while remaining minimal and refined.
 */
export const GreenergyLogo: React.FC<GreenergyLogoProps> = ({
  className = 'h-7 xs:h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 w-auto',
  containerClassName = '',
  alt = 'GREENERGY',
  isDarkScene = false,
  withGlassBadge = true,
  onClick,
  href = '/',
}) => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onClick) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onClick();
  };

  if (!withGlassBadge) {
    return (
      <img
        src="/products/brand/greenergy-logo.png"
        alt={alt}
        className={`object-contain flex-shrink-0 select-none pointer-events-none ${className}`}
      />
    );
  }

  const badgeClasses = `relative inline-flex items-center justify-center flex-shrink-0 select-none rounded-2xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 backdrop-blur-md transition-all duration-300 ${
    isDarkScene
      ? 'bg-[#FAF8F3]/82 sm:bg-[#FAF8F3]/76 border border-white/75 shadow-[0_4px_18px_rgba(0,0,0,0.12)]'
      : 'bg-white/76 sm:bg-white/60 border border-white/75 shadow-[0_4px_16px_rgba(0,0,0,0.05)]'
  } ${onClick ? 'cursor-pointer hover:bg-white/88 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2D1F]/40' : ''} ${containerClassName}`;

  const innerContent = (
    <>
      {/* Subtle feathered contrast halo behind the logo (soft, diffused, low opacity, no neon glow) */}
      <div
        aria-hidden="true"
        className="absolute inset-0.5 rounded-xl pointer-events-none"
        style={{
          background: isDarkScene
            ? 'radial-gradient(ellipse 82% 76% at 50% 50%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0) 100%)'
            : 'radial-gradient(ellipse 80% 74% at 50% 50%, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />

      {/* Untouched Original GREENERGY Logo Image */}
      <img
        src="/products/brand/greenergy-logo.png"
        alt={alt}
        className={`relative z-10 object-contain flex-shrink-0 select-none pointer-events-none ${className}`}
      />
    </>
  );

  if (onClick) {
    return (
      <a
        href={href}
        onClick={handleAnchorClick}
        aria-label="GREENERGY — Return to homepage"
        className={badgeClasses}
      >
        {innerContent}
      </a>
    );
  }

  return <div className={badgeClasses}>{innerContent}</div>;
};

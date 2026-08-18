import React from 'react';

interface GreenergyLogoProps {
  className?: string;
  color?: string; // Optional override for dynamic theme
}

export const GreenergyLogo: React.FC<GreenergyLogoProps> = ({ 
  className = "h-9 sm:h-12 w-auto",
  color
}) => {
  const primaryGreen = color || "#2D6A32";
  const darkGray = color || "#2A2A2A";

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      {/* 1. Leaf Icon */}
      <svg 
        viewBox="0 0 76 96" 
        className="h-full w-auto max-h-12 overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Leaf Outline */}
        <path 
          d="M38 12C38 12 12 28 12 56C12 74 26 84 38 84C50 84 64 74 64 56C64 28 38 12 38 12Z" 
          stroke={primaryGreen} 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Main Stem Line through bottom */}
        <path 
          d="M38 28V88M38 88C38 91 39 94 40 95" 
          stroke={primaryGreen} 
          strokeWidth="5.5" 
          strokeLinecap="round" 
        />
        {/* Left Branch */}
        <path 
          d="M26 38L38 48" 
          stroke={primaryGreen} 
          strokeWidth="5" 
          strokeLinecap="round" 
        />
        {/* Right Branch */}
        <path 
          d="M38 60L50 50" 
          stroke={primaryGreen} 
          strokeWidth="5" 
          strokeLinecap="round" 
        />
      </svg>

      {/* 2. Text Portion: GREENERGY + TM & LET'S RAW */}
      <div className="flex flex-col justify-center leading-none">
        {/* Top: GREENERGY + TM */}
        <div className="flex items-start">
          <span 
            className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-sans"
            style={{ 
              color: darkGray,
              letterSpacing: '0.04em'
            }}
          >
            GREENERGY
          </span>
          <span 
            className="text-[8px] sm:text-[9px] font-bold ml-0.5 mt-0.5 tracking-tighter"
            style={{ color: darkGray }}
          >
            TM
          </span>
        </div>

        {/* Bottom: LET'S RAW */}
        <span 
          className="text-[9px] sm:text-[11px] md:text-[12px] font-black uppercase mt-0.5 sm:mt-1"
          style={{ 
            color: primaryGreen,
            letterSpacing: '0.38em' 
          }}
        >
          LET'S RAW
        </span>
      </div>
    </div>
  );
};

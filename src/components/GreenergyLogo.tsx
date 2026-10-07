import React from 'react';

interface GreenergyLogoProps {
  className?: string;
  alt?: string;
}

export const GreenergyLogo: React.FC<GreenergyLogoProps> = ({ 
  className = "h-10 xs:h-11 sm:h-12 md:h-14 lg:h-16 xl:h-[68px] w-auto",
  alt = "GREENERGY"
}) => {
  return (
    <img 
      src="/products/brand/greenergy-logo.png" 
      alt={alt} 
      className={`object-contain flex-shrink-0 select-none pointer-events-none ${className}`} 
    />
  );
};

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { GreenergyProduct } from '../data/flavors';
import { getProductDescriptionById, ProductDescriptionData } from '../data/product-descriptions';

interface ProductDetailsPanelProps {
  product: GreenergyProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ProductDetailsPanel: React.FC<ProductDetailsPanelProps> = React.memo(
  ({ product, isOpen, onClose }) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const touchStartYRef = useRef<number | null>(null);

    // Lock background scroll and manage keyboard focus & Escape key
    useEffect(() => {
      if (!isOpen) return;

      previousFocusRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const focusTimer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown, { capture: true });

      return () => {
        clearTimeout(focusTimer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown, { capture: true });
        if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
          previousFocusRef.current.focus();
        }
      };
    }, [isOpen, onClose]);

    const descriptionData: ProductDescriptionData | undefined = product
      ? getProductDescriptionById(product.id)
      : undefined;

    const displayCategory = descriptionData?.category?.trim() || product?.category || '';
    const displayName = descriptionData?.name?.trim() || product?.name || '';

    const shortDescription = descriptionData?.shortDescription?.trim() || '';
    const fullDescription = descriptionData?.description?.trim() || '';
    const tasteProfile = descriptionData?.tasteProfile?.trim() || '';
    const additionalInfo = descriptionData?.additionalInfo?.trim() || '';
    const ingredients = descriptionData?.ingredients?.trim() || '';
    const notes = descriptionData?.notes?.trim() || '';

    const hasAnyTextContent = Boolean(
      shortDescription ||
        fullDescription ||
        tasteProfile ||
        additionalInfo ||
        ingredients ||
        notes
    );

    // Mobile swipe-down gesture on header/sheet top
    const handleTouchStart = (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (touchStartYRef.current === null || e.changedTouches.length === 0) return;
      const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
      touchStartYRef.current = null;
      if (deltaY > 60) {
        onClose();
      }
    };

    return (
      <AnimatePresence>
        {isOpen && product && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 md:p-10 pl-safe pr-safe"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-details-title"
          >
            {/* Backdrop */}
            <motion.div
              key="product-details-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.34, ease: SMOOTH_EASE }}
              onClick={onClose}
              className="fixed inset-0 bg-black/45 cursor-pointer will-change-opacity"
              aria-hidden="true"
            />

            {/* Panel Container: Bottom sheet on mobile, centered card on desktop */}
            <motion.div
              key={`product-details-sheet-${product.id}`}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 36, scale: 0.98 }}
              transition={{ duration: 0.38, ease: SMOOTH_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full sm:max-w-2xl md:max-w-3xl max-h-[86dvh] sm:max-h-[82dvh] bg-[#FAF8F4] text-[#1C1917] rounded-t-[28px] sm:rounded-[32px] shadow-[0_20px_56px_rgba(0,0,0,0.22)] border border-black/5 flex flex-col overflow-hidden pb-safe transform-gpu will-change-transform will-change-opacity"
            >
              {/* Mobile Drag Pill & Top Bar */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative flex items-center justify-between px-5 pt-4 pb-2 sm:px-8 sm:pt-6 sm:pb-3 flex-shrink-0"
              >
                {/* Subtle mobile pull indicator */}
                <div className="w-10 h-1 rounded-full bg-black/15 mx-auto sm:hidden absolute left-1/2 -translate-x-1/2 top-3" />

                {/* Category Pill / Label */}
                <div className="pt-1 sm:pt-0">
                  {displayCategory && (
                    <span
                      className="inline-block px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.12em]"
                      style={{
                        backgroundColor: `${product.accentColor}18`,
                        color: product.accentColor,
                      }}
                    >
                      {displayCategory}
                    </span>
                  )}
                </div>

                {/* Close Button (44x44px touch target) */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Zamknij szczegóły produktu"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/5 hover:bg-black/10 active:scale-95 flex items-center justify-center text-[#1C1917]/75 hover:text-[#1C1917] transition-transform duration-150 cursor-pointer flex-shrink-0"
                >
                  <X className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="overflow-y-auto overscroll-contain px-5 pb-8 pt-2 sm:px-10 sm:pb-10 sm:pt-4">
                <div
                  className={`grid grid-cols-1 ${
                    hasAnyTextContent
                      ? 'md:grid-cols-12 gap-6 sm:gap-8 items-start'
                      : 'items-center justify-items-center text-center py-2 sm:py-4'
                  }`}
                >
                  {/* Product Packaging Image */}
                  <div
                    className={`${
                      hasAnyTextContent ? 'md:col-span-5' : 'w-full max-w-xs'
                    } flex flex-col items-center justify-center rounded-2xl p-4 sm:p-6`}
                    style={{
                      backgroundColor: `${product.accentColor}0D`,
                    }}
                  >
                    <div className="relative w-44 h-52 sm:w-56 sm:h-64 flex items-center justify-center">
                      <img
                        src={product.productBoxImage}
                        alt={displayName}
                        width={224}
                        height={256}
                        decoding="async"
                        className="max-w-full max-h-full w-auto h-auto object-contain select-none drop-shadow-[0_14px_24px_rgba(0,0,0,0.18)]"
                      />
                    </div>
                  </div>

                  {/* Product Information Column */}
                  <div
                    className={`${
                      hasAnyTextContent
                        ? 'md:col-span-7 text-left'
                        : 'w-full max-w-lg text-center mt-4'
                    } flex flex-col gap-5`}
                  >
                    {/* Product Name */}
                    <div>
                      <h2
                        id="product-details-title"
                        className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#1C1917] leading-tight"
                      >
                        {displayName}
                      </h2>

                      {shortDescription && (
                        <p className="mt-2.5 text-sm sm:text-base font-medium text-[#1C1917]/80 leading-relaxed">
                          {shortDescription}
                        </p>
                      )}
                    </div>

                    {fullDescription && (
                      <div className="text-sm sm:text-[15px] text-[#1C1917]/75 leading-relaxed whitespace-pre-line">
                        {fullDescription}
                      </div>
                    )}

                    {tasteProfile && (
                      <div className="pt-3 border-t border-black/10">
                        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1C1917]/50 mb-1.5">
                          Taste Profile
                        </h3>
                        <p className="text-sm sm:text-[15px] text-[#1C1917]/85 leading-relaxed whitespace-pre-line">
                          {tasteProfile}
                        </p>
                      </div>
                    )}

                    {ingredients && (
                      <div className="pt-3 border-t border-black/10">
                        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1C1917]/50 mb-1.5">
                          Ingredients
                        </h3>
                        <p className="text-sm sm:text-[15px] text-[#1C1917]/85 leading-relaxed whitespace-pre-line">
                          {ingredients}
                        </p>
                      </div>
                    )}

                    {additionalInfo && (
                      <div className="pt-3 border-t border-black/10">
                        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1C1917]/50 mb-1.5">
                          Additional Information
                        </h3>
                        <p className="text-sm sm:text-[15px] text-[#1C1917]/85 leading-relaxed whitespace-pre-line">
                          {additionalInfo}
                        </p>
                      </div>
                    )}

                    {notes && (
                      <div className="pt-3 border-t border-black/10">
                        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1C1917]/50 mb-1.5">
                          Product Notes
                        </h3>
                        <p className="text-sm sm:text-[15px] text-[#1C1917]/85 leading-relaxed whitespace-pre-line">
                          {notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);
ProductDetailsPanel.displayName = 'ProductDetailsPanel';

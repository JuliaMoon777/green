import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { GreenergyProduct } from '../data/flavors';
import { getProductDescriptionById, ProductDescriptionData } from '../data/product-descriptions';
import { NutritionalBenefitsSection } from './NutritionalBenefits';

interface ProductInlineInfoProps {
  product: GreenergyProduct;
  sectionRef?: React.RefObject<HTMLElement | null>;
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AccordionBlockProps {
  id: string;
  label: string;
  content: string;
  textColor: string;
  accentColor: string;
  isDarkScene: boolean;
}

const AccordionBlock: React.FC<AccordionBlockProps> = ({
  id,
  label,
  content,
  textColor,
  accentColor,
  isDarkScene,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Reset accordion state when product changes only if needed, or keep lightweight
  const borderColor = isDarkScene ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.10)';

  return (
    <div
      className="border-t transition-colors duration-300"
      style={{ borderColor }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        className="w-full min-h-[48px] py-3.5 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
        style={{ color: textColor }}
      >
        <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.12em] opacity-85 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200"
          style={{
            backgroundColor: `${accentColor}1A`,
            color: accentColor,
          }}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${id}`}
            key={`panel-${id}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24, ease: SMOOTH_EASE }}
            className="pb-5 pt-0.5 transform-gpu will-change-transform will-change-opacity"
          >
            <p
              className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-line opacity-85"
              style={{ color: textColor }}
            >
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductInlineInfo: React.FC<ProductInlineInfoProps> = React.memo(
  ({ product, sectionRef }) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mq.matches);
        const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
      }
    }, []);

    const descriptionData: ProductDescriptionData | undefined = getProductDescriptionById(
      product.id
    );

    if (product.id === 'protein-cookies-creamy-butter-graham') {
      return null;
    }

    const displayCategory = descriptionData?.category?.trim() || product.category || '';
    const displayName = descriptionData?.name?.trim() || product.name || '';

    const shortDescription = descriptionData?.shortDescription?.trim() || '';
    const fullDescription = descriptionData?.description?.trim() || '';
    const tasteProfile = descriptionData?.tasteProfile?.trim() || '';
    const ingredients = descriptionData?.ingredients?.trim() || '';
    const additionalInfo = descriptionData?.additionalInfo?.trim() || '';
    const notes = descriptionData?.notes?.trim() || '';
    const nutritionalBenefits = (descriptionData?.nutritionalBenefits || []).filter(
      (benefit) => benefit.productId === product.id && benefit.enabled !== false
    );
    const additionalHighlights = (descriptionData?.additionalHighlights || []).filter(
      (highlight) => highlight.productId === product.id && highlight.enabled !== false
    );

    const hasPrimaryBody = Boolean(fullDescription || tasteProfile);
    const hasSecondaryAccordions = Boolean(ingredients || additionalInfo || notes);
    const hasNutritionalBenefits =
      nutritionalBenefits.length > 0 || additionalHighlights.length > 0;
    const isDarkScene = false;
    const panelTextColor =
      product.id === 'peanuts-fava-red-thai'
        ? '#3A1A14'
        : product.id === 'peanuts-fava-sweet-mustard'
        ? '#3B2A14'
        : product.textColor;
    const panelAccentColor =
      product.id === 'peanuts-fava-red-thai'
        ? '#C62828'
        : product.id === 'peanuts-fava-sweet-mustard'
        ? '#B87D00'
        : product.accentColor;
    const dividerColor = 'rgba(27, 45, 31, 0.12)';

    return (
      <section
        ref={sectionRef}
        id="product-information-section"
        lang="en"
        aria-label={`Product information: ${displayName}`}
        className="relative z-20 w-full max-w-[920px] mx-auto px-4 sm:px-8 md:px-12 pt-2 pb-14 sm:pt-8 sm:pb-24 pl-safe pr-safe pb-safe select-text"
      >
        {/* Premium Frosted-Glass Editorial Panel for high-contrast readability over ingredient backgrounds */}
        <div
          className="relative overflow-hidden rounded-3xl sm:rounded-[32px] px-6 py-7 sm:px-10 sm:py-10 md:px-12 md:py-12 backdrop-blur-xl transition-colors duration-500 bg-white/80 sm:bg-white/74 border border-white/85 shadow-[0_16px_44px_rgba(27,45,31,0.08)]"
        >
          {/* Subtle internal radial light diffusion for clean typographic contrast */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 rounded-3xl sm:rounded-[32px]
            "
            style={{
              background:
                'radial-gradient(ellipse 85% 75% at 50% 0%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 75%)',
            }}
          />

          {/* Smooth transition when switching products:
              OLD INFORMATION: opacity 1 -> 0, translateY 0 -> 5px (180ms)
              NEW INFORMATION: opacity 0 -> 1, translateY 8px -> 0 (380ms) */}
          <AnimatePresence mode="wait">
            <motion.article
              key={`inline-info-${product.id}`}
              initial={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: prefersReducedMotion ? 0.18 : 0.38,
                  ease: SMOOTH_EASE,
                },
              }}
              exit={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : 5,
                transition: {
                  duration: prefersReducedMotion ? 0.12 : 0.18,
                  ease: SMOOTH_EASE,
                },
              }}
              className="relative z-10 flex flex-col transform-gpu will-change-transform will-change-opacity"
            >
              {/* 1. CATEGORY HEADING (H2) */}
              {displayCategory && (
                <div className="mb-2 sm:mb-2.5">
                  <h2
                    className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em] m-0"
                    style={{ color: panelAccentColor }}
                  >
                    {displayCategory}
                  </h2>
                </div>
              )}

              {/* 2. PRODUCT NAME HEADING (H3) */}
              <h3
                className="text-2xl xs:text-3xl sm:text-4xl md:text-[42px] font-black tracking-tight leading-[1.12]"
                style={{ color: panelTextColor }}
              >
                {displayName}
              </h3>

              {/* 3. SHORT DESCRIPTION (only if provided) */}
              {shortDescription && (
                <p
                  className="mt-3 sm:mt-4 text-base sm:text-lg font-medium leading-relaxed max-w-2xl opacity-95 whitespace-pre-line"
                  style={{ color: panelTextColor }}
                >
                  {shortDescription}
                </p>
              )}

              {/* 4. THIN DIVIDER (shown when primary body or accordions follow) */}
              {(hasPrimaryBody || hasSecondaryAccordions) && (
                <div
                  className="w-full h-px my-6 sm:my-8 transition-colors duration-500"
                  style={{ backgroundColor: dividerColor }}
                />
              )}

              {/* 5. FULL DESCRIPTION & TASTE PROFILE */}
              {hasPrimaryBody && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                  {fullDescription && (
                    <div
                      className={`${
                        tasteProfile ? 'md:col-span-7' : 'md:col-span-12 max-w-3xl'
                      } text-sm sm:text-base leading-relaxed whitespace-pre-line opacity-90`}
                      style={{ color: panelTextColor }}
                    >
                      {fullDescription}
                    </div>
                  )}

                  {tasteProfile && (
                    <div
                      className={`${
                        fullDescription ? 'md:col-span-5' : 'md:col-span-12 max-w-2xl'
                      } flex flex-col gap-1.5 md:pl-6 md:border-l`}
                      style={{ borderColor: dividerColor }}
                    >
                      <p
                        className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.12em] opacity-70"
                        style={{ color: panelTextColor }}
                      >
                        Taste profile
                      </p>
                      <p
                        className="text-sm sm:text-[15px] font-semibold leading-relaxed whitespace-pre-line opacity-95"
                        style={{ color: panelTextColor }}
                      >
                        {tasteProfile}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 5B. NUTRITIONAL BENEFIT HIGHLIGHTS (Custom SVG icons & benefit cards) */}
              {hasNutritionalBenefits && (
                <NutritionalBenefitsSection
                  productId={product.id}
                  benefits={nutritionalBenefits}
                  additionalHighlights={additionalHighlights}
                  textColor={panelTextColor}
                  accentColor={panelAccentColor}
                  isDarkScene={isDarkScene}
                  dividerColor={dividerColor}
                />
              )}

              {/* 6. OPTIONAL LIGHTWEIGHT ACCORDIONS FOR SECONDARY INFORMATION */}
              {hasSecondaryAccordions && (
                <div
                  className={`w-full max-w-3xl ${
                    hasPrimaryBody ? 'mt-8 sm:mt-10' : 'mt-2'
                  } border-b transition-colors duration-300`}
                  style={{ borderColor: dividerColor }}
                >
                  {ingredients && (
                    <AccordionBlock
                      id={`${product.id}-ingredients`}
                      label="Ingredients"
                      content={ingredients}
                      textColor={panelTextColor}
                      accentColor={panelAccentColor}
                      isDarkScene={isDarkScene}
                    />
                  )}

                  {additionalInfo && (
                    <AccordionBlock
                      id={`${product.id}-additional-info`}
                      label="Additional information"
                      content={additionalInfo}
                      textColor={panelTextColor}
                      accentColor={panelAccentColor}
                      isDarkScene={isDarkScene}
                    />
                  )}

                  {notes && (
                    <AccordionBlock
                      id={`${product.id}-notes`}
                      label="Product notes"
                      content={notes}
                      textColor={panelTextColor}
                      accentColor={panelAccentColor}
                      isDarkScene={isDarkScene}
                    />
                  )}
                </div>
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </section>
    );
  }
);
ProductInlineInfo.displayName = 'ProductInlineInfo';

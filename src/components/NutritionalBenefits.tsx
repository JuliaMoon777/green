import React from 'react';
import { motion } from 'motion/react';

export type NutritionalBenefitIconType =
  | 'chili-lemon-plant-nutrition'
  | 'chili-lemon-protein-fat'
  | 'chili-lemon-b-vitamins'
  | 'sweet-herbs-olives-vegan-leaf'
  | 'sweet-herbs-olives-botanical-herbs'
  | 'sweet-herbs-olives-fava-nutrients'
  | 'tomato-basil-protein-potassium'
  | 'tomato-basil-delicate-taste'
  | 'tomato-basil-sea-salt-minerals'
  | 'honey-mustard-plant-protein'
  | 'honey-mustard-low-glycemic-index'
  | 'honey-mustard-fava-vitamins'
  | 'protein-cookie-sugar-free'
  | 'protein-cookie-high-fibre'
  | 'protein-cookie-vegan'
  | 'protein-cookie-two-inside'
  | 'chickpea-salted-vitamins-bc'
  | 'chickpea-salted-cholesterol-free'
  | 'chickpea-salted-vitamin-k'
  | 'chickpea-salted-blood-sugar'
  | 'chickpea-salted-sea-salt'
  | 'chickpea-salted-three-ingredients'
  | 'chickpea-lemon-pepper-calcium-zinc'
  | 'chickpea-lemon-pepper-plant-protein'
  | 'chickpea-lemon-pepper-weight-control'
  | 'chickpea-lemon-pepper-low-sodium'
  | 'plant-protein-alternative'
  | 'low-glycemic-index'
  | 'vitamins-abk';

export interface NutritionalBenefitItem {
  id: string;
  productId: string;
  icon: NutritionalBenefitIconType;
  title: string;
  description: string;
  /**
   * Controls whether the claim is publicly visible.
   * Defaults to true. Set to false to keep unverified/unapproved claims hidden.
   */
  enabled?: boolean;
}

export interface ProductHighlightDetail {
  id: string;
  productId: string;
  icon: NutritionalBenefitIconType;
  label: string;
  badgeText?: string;
  description?: string;
  variant?: 'cookie-pack' | 'salted-blue-pill';
  enabled?: boolean;
}

interface BenefitIconProps {
  type: NutritionalBenefitIconType;
  className?: string;
}

/**
 * Product-specific botanical vector icons in deep GREENERGY green.
 * Each product uses its own unique icon types from its individual reference sheet.
 */
export const NutritionalBenefitIcon: React.FC<BenefitIconProps> = ({
  type,
  className = 'w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]',
}) => {
  switch (type) {
    case 'chili-lemon-plant-nutrition':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Subtle pyramid interior botanical wash */}
          <path
            d="M40 11L71 67H9L40 11Z"
            fill="currentColor"
            fillOpacity="0.06"
          />

          {/* Outer Nutritional Pyramid Triangle */}
          <path
            d="M40 11L71 67H9L40 11Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Horizontal Tier Dividers */}
          <line
            x1="28.5"
            y1="32"
            x2="51.5"
            y2="32"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <line
            x1="19"
            y1="49.5"
            x2="61"
            y2="49.5"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Vertical Chamber Dividers */}
          <line
            x1="40"
            y1="32"
            x2="40"
            y2="49.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <line
            x1="31"
            y1="49.5"
            x2="31"
            y2="67"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <line
            x1="49"
            y1="49.5"
            x2="49"
            y2="67"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* TOP TIER: Natural Botanical Leaf / Sprout at Apex */}
          <path
            d="M40 28.5V21.5M40 23.5C37 23.5 35.5 21 35.5 18.8C38 18.8 40 20.5 40 23.5ZM40 22.5C43 22.5 44.5 20 44.5 17.8C42 17.8 40 19.5 40 22.5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* MIDDLE TIER LEFT: Fava Bean / Legume Symbol */}
          <path
            d="M28.5 43.5C27.2 40.5 29.5 36.8 33.2 36.2C35.8 35.8 37.2 37.5 36.5 40.2C35.8 42.8 33.2 44.8 30.5 44.8C29.4 44.8 28.8 44.2 28.5 43.5Z"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32.5" cy="40.5" r="1.2" fill="currentColor" />

          {/* MIDDLE TIER RIGHT: Essential Micronutrients (Iron / Manganese / Protein Spark) */}
          <path
            d="M47.5 36.2L49.3 39.6L52.7 41.4L49.3 43.2L47.5 46.6L45.7 43.2L42.3 41.4L45.7 39.6L47.5 36.2Z"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* BOTTOM TIER LEFT: Dietary Fiber / Botanical Grain Stalk */}
          <path
            d="M20 63.5L25.5 53.5M22 59.5L20.5 56.5M24 56.5L26.8 57.5"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* BOTTOM TIER CENTER: Plant Protein Seeds / Legume Pods */}
          <ellipse
            cx="37.2"
            cy="58.2"
            rx="3.2"
            ry="4.5"
            transform="rotate(-18 37.2 58.2)"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="2.1"
          />
          <ellipse
            cx="43.2"
            cy="59.2"
            rx="3"
            ry="4.2"
            transform="rotate(16 43.2 59.2)"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="2.1"
          />

          {/* BOTTOM TIER RIGHT: Folate / Natural Leaf Motif */}
          <path
            d="M53.5 62.5C53.5 57.5 56.8 54 62 53.5C61.8 58.8 58.8 62.5 53.5 62.5Z"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'chili-lemon-protein-fat':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Shared ground comparison line */}
          <line
            x1="8"
            y1="68"
            x2="72"
            y2="68"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* LEFT CONTAINER: Plant Protein / Nutrient-Dense Canister */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Container lid */}
            <rect
              x="16"
              y="14"
              width="20"
              height="5"
              rx="2"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.6"
            />
            {/* Container body */}
            <rect
              x="13"
              y="19"
              width="26"
              height="49"
              rx="5"
              fill="currentColor"
              fillOpacity="0.07"
              strokeWidth="2.8"
            />
            {/* Upper nutritional level line inside left container */}
            <path
              d="M13.5 31C18 29.5 22 32.5 26 31C30 29.5 34.5 32 38.5 30.5"
              strokeWidth="2.2"
              strokeOpacity="0.75"
            />
            {/* Measurement ticks on left edge */}
            <line x1="17" y1="38" x2="20.5" y2="38" strokeWidth="2.2" />
            <line x1="17" y1="45" x2="22" y2="45" strokeWidth="2.2" />
            <line x1="17" y1="52" x2="20.5" y2="52" strokeWidth="2.2" />
            <line x1="17" y1="59" x2="22" y2="59" strokeWidth="2.2" />

            {/* Stylized fava bean / protein symbol inside left container */}
            <path
              d="M25 51.5C23.5 47.5 26.2 42.5 30.8 41.8C33.5 41.4 35 43.5 34.2 46.8C33.4 50 30.2 52.5 27 52.5C25.8 52.5 25.3 52 25 51.5Z"
              fill="currentColor"
              fillOpacity="0.18"
              strokeWidth="2.2"
            />
          </g>

          {/* RIGHT CONTAINER: Oil / Fat Comparison Bottle */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Bottle cap / stopper */}
            <line x1="51" y1="18" x2="61" y2="18" strokeWidth="2.8" />
            {/* Bottle neck */}
            <path
              d="M52.5 18V26.5L46 34.5V63C46 65.8 48.2 68 51 68H61C63.8 68 66 65.8 66 63V34.5L59.5 26.5V18"
              fill="currentColor"
              fillOpacity="0.06"
              strokeWidth="2.8"
            />
            {/* Lower comparison fill line inside right bottle */}
            <line
              x1="46.5"
              y1="52"
              x2="65.5"
              y2="52"
              strokeWidth="2.2"
              strokeDasharray="2.5 2.5"
            />
            {/* Oil droplet symbol inside right container */}
            <path
              d="M56 37.5C56 37.5 51.5 43 51.5 46.2C51.5 48.7 53.5 50.7 56 50.7C58.5 50.7 60.5 48.7 60.5 46.2C60.5 43 56 37.5 56 37.5Z"
              fill="currentColor"
              fillOpacity="0.16"
              strokeWidth="2.2"
            />
          </g>
        </svg>
      );

    case 'chili-lemon-b-vitamins':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Interconnected Hexagonal Molecular Structure for B Vitamins */}
          <g
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Hexagon 1: Top-Left Ring (center: 29, 31, R=13) */}
            <polygon
              points="29,18 40.3,24.5 40.3,37.5 29,44 17.7,37.5 17.7,24.5"
              fill="currentColor"
              fillOpacity="0.08"
            />
            {/* Inner double-bond lines in Hexagon 1 */}
            <line x1="29" y1="22.2" x2="36.5" y2="26.5" strokeWidth="2.1" />
            <line x1="21.5" y1="35.2" x2="29" y2="39.5" strokeWidth="2.1" />

            {/* Hexagon 2: Top-Right Ring (center: 51.6, 31, R=13) */}
            <polygon
              points="51.6,18 62.9,24.5 62.9,37.5 51.6,44 40.3,37.5 40.3,24.5"
              fill="currentColor"
              fillOpacity="0.08"
            />
            {/* Inner double-bond lines in Hexagon 2 */}
            <line x1="59.1" y1="26.8" x2="59.1" y2="35.2" strokeWidth="2.1" />

            {/* Hexagon 3: Bottom-Center Ring (center: 40.3, 50.5, R=13) */}
            <polygon
              points="40.3,37.5 51.6,44 51.6,57 40.3,63.5 29,57 29,44"
              fill="currentColor"
              fillOpacity="0.11"
            />
            {/* Inner double-bond lines in Hexagon 3 */}
            <line x1="33" y1="46.2" x2="33" y2="54.8" strokeWidth="2.1" />
            <line x1="40.3" y1="59.2" x2="47.8" y2="54.8" strokeWidth="2.1" />

            {/* Outer Molecular Covalent Bonds */}
            <line x1="29" y1="18" x2="29" y2="11.5" />
            <line x1="17.7" y1="24.5" x2="11.5" y2="21" />
            <line x1="17.7" y1="37.5" x2="11.5" y2="41" />
            <line x1="62.9" y1="24.5" x2="69" y2="21" />
            <line x1="62.9" y1="37.5" x2="69" y2="41" />
            <line x1="51.6" y1="57" x2="57.8" y2="60.5" />
            <line x1="29" y1="57" x2="22.8" y2="60.5" />
            <line x1="40.3" y1="63.5" x2="40.3" y2="70" />
          </g>

          {/* Terminal Molecular Nodes */}
          <circle cx="29" cy="9.5" r="2.6" fill="currentColor" />
          <circle cx="9.8" cy="19.8" r="2.6" fill="currentColor" />
          <circle cx="9.8" cy="42.2" r="2.6" fill="currentColor" />
          <circle cx="70.7" cy="19.8" r="2.6" fill="currentColor" />
          <circle cx="70.7" cy="42.2" r="2.6" fill="currentColor" />
          <circle cx="59.5" cy="61.8" r="2.6" fill="currentColor" />
          <circle cx="21" cy="61.8" r="2.6" fill="currentColor" />
          <circle cx="40.3" cy="72" r="2.6" fill="currentColor" />

          {/* Crisp Vitamin 'B' indicator in the Top-Right Hexagonal Ring */}
          <text
            x="51.6"
            y="35.2"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="11.5"
            textAnchor="middle"
          >
            B
          </text>
        </svg>
      );

    case 'sweet-herbs-olives-vegan-leaf':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Subtle botanical circle wash */}
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="currentColor"
            fillOpacity="0.06"
          />

          {/* Outer Circular Frame */}
          <circle
            cx="40"
            cy="40"
            r="32"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
          />

          {/* Stylized Vegan 'V' with Integrated Botanical Leaf */}
          <g
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* V stem & right arm transitioning into leaf */}
            <path d="M24.5 29.5L36.5 55.5L46.5 34.5" />

            {/* Minimal Botanical Leaf blossoming from the right upper stem */}
            <path
              d="M42.5 36.5C42.5 27.5 49.5 21.5 58.5 21.5C58.5 30.5 52.5 37.5 42.5 36.5Z"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.7"
            />

            {/* Delicate central leaf vein */}
            <path
              d="M44.5 35L53 26.5"
              strokeWidth="2.1"
            />
          </g>
        </svg>
      );

    case 'sweet-herbs-olives-botanical-herbs':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Soft ambient halo */}
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="currentColor"
            fillOpacity="0.05"
          />

          <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Central Olive Branch Stem */}
            <path
              d="M16 62C27 49 42 34 62 18"
              strokeWidth="2.8"
            />

            {/* Left Upper Olive Leaf */}
            <path
              d="M36 39C33.5 31 36 22.5 43.5 18C45.5 25.5 42.5 34 36 39Z"
              fill="currentColor"
              fillOpacity="0.12"
              strokeWidth="2.5"
            />

            {/* Top Tip Herb Leaf */}
            <path
              d="M52 26C52.5 19.5 57.5 14.5 65 13.5C64.5 21 59.5 25.5 52 26Z"
              fill="currentColor"
              fillOpacity="0.12"
              strokeWidth="2.5"
            />

            {/* Lower Left Aromatic Herb Sprig Leaf */}
            <path
              d="M25 51C20.5 44.5 21 36.5 26.5 31C30.5 37 29.5 45 25 51Z"
              fill="currentColor"
              fillOpacity="0.12"
              strokeWidth="2.5"
            />

            {/* Right Extended Olive Leaf */}
            <path
              d="M44 33C51.5 31.5 59.5 34.5 64 41C56.5 42.5 49 39.5 44 33Z"
              fill="currentColor"
              fillOpacity="0.12"
              strokeWidth="2.5"
            />

            {/* Plump Mediterranean Olive #1 (hanging from branch) */}
            <path d="M39 37L42.5 43.5" strokeWidth="2.3" />
            <ellipse
              cx="45.5"
              cy="49.5"
              rx="6.2"
              ry="8.2"
              transform="rotate(-24 45.5 49.5)"
              fill="currentColor"
              fillOpacity="0.16"
              strokeWidth="2.6"
            />
            {/* Olive #1 crown detail */}
            <path
              d="M47.2 54.5C48.2 54 49 53.2 49.3 52.2"
              strokeWidth="2"
            />

            {/* Plump Mediterranean Olive #2 */}
            <path d="M29.5 46.5L32.5 52" strokeWidth="2.3" />
            <ellipse
              cx="34.5"
              cy="57.5"
              rx="5.4"
              ry="7.2"
              transform="rotate(-18 34.5 57.5)"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.5"
            />

            {/* Fresh Herb / Botanical Accent Arc */}
            <path
              d="M14 44C13 30 22.5 17.5 36.5 14.5"
              strokeWidth="2.2"
              strokeDasharray="3 4"
            />
          </g>
        </svg>
      );

    case 'sweet-herbs-olives-fava-nutrients':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer Circular Botanical Ring */}
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <circle
            cx="40"
            cy="40"
            r="32"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
          />

          <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Central Fava Botanical Leaf */}
            <path
              d="M25 53C24 37.5 33.5 24.5 53.5 22C55 41.5 44.5 53.5 28.5 54C26.8 54 25.6 53.6 25 53Z"
              fill="currentColor"
              fillOpacity="0.13"
              strokeWidth="2.7"
            />
            {/* Leaf Stem & Central Vein */}
            <path
              d="M21.5 56.5C27.5 50.5 36.5 41.5 46.5 30.5"
              strokeWidth="2.4"
            />
            <path d="M33.5 43.5L32 36" strokeWidth="2.1" />
            <path d="M38 39L45.5 39.5" strokeWidth="2.1" />

            {/* Natural Mineral & Micronutrient Crystalline Nodes (Fe, Mg, Zn, B) */}
            <polygon
              points="26,22 30.5,24.5 30.5,29.5 26,32 21.5,29.5 21.5,24.5"
              fill="currentColor"
              fillOpacity="0.16"
              strokeWidth="2.2"
            />
            <polygon
              points="54,48 58,50.3 58,54.8 54,57 50,54.8 50,50.3"
              fill="currentColor"
              fillOpacity="0.16"
              strokeWidth="2.2"
            />
            <circle cx="46" cy="58" r="2.3" fill="currentColor" />
            <circle cx="21" cy="39" r="2.1" fill="currentColor" />
            <circle cx="58" cy="37" r="2.1" fill="currentColor" />
          </g>
        </svg>
      );

    case 'tomato-basil-protein-potassium':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Soft ambient botanical circle wash */}
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="currentColor"
            fillOpacity="0.05"
          />

          {/* Diagonal 3-Segment Connected Nutritional Chain Symbol */}
          <g
            transform="rotate(-45 40 40)"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer continuous 3-lobed chain silhouette */}
            <rect
              x="12"
              y="30"
              width="22"
              height="20"
              rx="10"
              fill="currentColor"
              fillOpacity="0.10"
              strokeWidth="2.8"
            />
            <rect
              x="29"
              y="30"
              width="22"
              height="20"
              rx="10"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.8"
            />
            <rect
              x="46"
              y="30"
              width="22"
              height="20"
              rx="10"
              fill="currentColor"
              fillOpacity="0.10"
              strokeWidth="2.8"
            />

            {/* Inner peptide / potassium bond nodes and connectors */}
            <circle cx="21.5" cy="40" r="2.3" fill="currentColor" />
            <circle cx="40" cy="40" r="2.5" fill="currentColor" />
            <circle cx="58.5" cy="40" r="2.3" fill="currentColor" />
            <line x1="24" y1="40" x2="37.5" y2="40" strokeWidth="2.2" />
            <line x1="42.5" y1="40" x2="56" y2="40" strokeWidth="2.2" />
          </g>
        </svg>
      );

    case 'tomato-basil-delicate-taste':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Serving Cloche Dome, Top Knob, Platter Base, and Integrated Thumbs-Up */}
          <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Top Cloche Knob / Finial */}
            <circle
              cx="40"
              cy="14.5"
              r="3.8"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.6"
            />

            {/* Cloche Dome Silhouette */}
            <path
              d="M14 50C14 33.2 25.6 19.5 40 19.5C54.4 19.5 66 33.2 66 50H14Z"
              fill="currentColor"
              fillOpacity="0.08"
              strokeWidth="2.8"
            />

            {/* Cloche Platter Rim & Base Tray */}
            <rect
              x="10"
              y="50"
              width="60"
              height="5.5"
              rx="2.75"
              fill="currentColor"
              fillOpacity="0.15"
              strokeWidth="2.7"
            />
            <line x1="16" y1="60.5" x2="64" y2="60.5" strokeWidth="2.6" />

            {/* Integrated Minimalist Thumbs-Up Symbol Inside Cloche */}
            {/* Cuff / Wrist */}
            <rect
              x="28"
              y="36.5"
              width="5.2"
              height="10"
              rx="1.4"
              fill="currentColor"
              fillOpacity="0.18"
              strokeWidth="2.2"
            />
            {/* Thumb & Folded Fingers */}
            <path
              d="M33.2 38L37 30.2C37.7 28.8 39.5 28.5 40.6 29.4C41.4 30.1 41.7 31.3 41.3 32.5L40.2 35.8H46.8C48.5 35.8 49.7 37.3 49.3 39L47.9 44.5C47.5 45.8 46.3 46.5 44.9 46.5H33.2"
              fill="currentColor"
              fillOpacity="0.12"
              strokeWidth="2.2"
            />
          </g>
        </svg>
      );

    case 'tomato-basil-sea-salt-minerals':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Two Overlapping Rounded-Square Mineral Tiles: K & Ca */}
          <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Upper-Left Mineral Tile: K (Potassium) */}
            <rect
              x="12"
              y="13"
              width="34"
              height="34"
              rx="6.5"
              fill="currentColor"
              fillOpacity="0.08"
              strokeWidth="2.8"
            />

            {/* Lower-Right Overlapping Mineral Tile: Ca (Calcium) */}
            <rect
              x="34"
              y="33"
              width="34"
              height="34"
              rx="6.5"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.8"
            />

            {/* Subtle periodic atomic number tick accents */}
            <line x1="17.5" y1="18.5" x2="21.5" y2="18.5" strokeWidth="2" />
            <line x1="39.5" y1="38.5" x2="43.5" y2="38.5" strokeWidth="2" />
          </g>

          {/* Mineral Symbol 'K' */}
          <text
            x="28"
            y="35.5"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="16"
            letterSpacing="0.01em"
            textAnchor="middle"
          >
            K
          </text>

          {/* Mineral Symbol 'Ca' */}
          <text
            x="51"
            y="56"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="15.5"
            letterSpacing="-0.01em"
            textAnchor="middle"
          >
            Ca
          </text>
        </svg>
      );

    case 'honey-mustard-plant-protein':
    case 'plant-protein-alternative':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer Circular Botanical Frame */}
          <circle cx="40" cy="40" r="32.5" fill="currentColor" fillOpacity="0.06" />
          <circle
            cx="40"
            cy="40"
            r="32.5"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
          />

          {/* Stylized Fava Legume / Plant Protein Pod Inside Circle */}
          <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M24.5 47.5C23 36.8 31.2 25.5 44.5 23.5C50.5 22.6 55 24.5 57 26.5C55.5 38.5 46.5 49.5 33.5 51.5C29 52.2 25.6 50.2 24.5 47.5Z"
              fill="currentColor"
              fillOpacity="0.12"
            />
            <circle cx="33.5" cy="43" r="4.1" fill="currentColor" fillOpacity="0.20" />
            <circle cx="41.5" cy="37.5" r="4.3" fill="currentColor" fillOpacity="0.20" />
            <circle cx="49" cy="31.5" r="3.7" fill="currentColor" fillOpacity="0.20" />
            <path d="M56.5 26.5C58.5 24.5 60.5 24 62 24.5" />
            <path d="M49 52.5C53.5 51.5 56.5 47.5 55.5 43.5C52 43 48.5 45.5 47.5 49.5" />
          </g>

          {/* Distinctive Diagonal Line Across Circle */}
          <line
            x1="17"
            y1="17"
            x2="63"
            y2="63"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'honey-mustard-low-glycemic-index':
    case 'low-glycemic-index':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Refined Circular Outline */}
          <circle cx="40" cy="40" r="32.5" fill="currentColor" fillOpacity="0.06" />
          <circle
            cx="40"
            cy="40"
            r="32.5"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
          />

          {/* Minimal Sugar Cube #1 (Upper Left) */}
          <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="34,21.5 44.5,26.8 34,32 23.5,26.8" fill="currentColor" fillOpacity="0.15" />
            <polygon points="23.5,26.8 34,32 34,43.2 23.5,38" fill="currentColor" fillOpacity="0.08" />
            <polygon points="34,32 44.5,26.8 44.5,38 34,43.2" fill="currentColor" fillOpacity="0.20" />
          </g>

          {/* Minimal Sugar Cube #2 (Lower Right) */}
          <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="46,35 56.5,40.2 46,45.5 35.5,40.2" fill="currentColor" fillOpacity="0.15" />
            <polygon points="35.5,40.2 46,45.5 46,56.5 35.5,51.2" fill="currentColor" fillOpacity="0.08" />
            <polygon points="46,45.5 56.5,40.2 56.5,51.2 46,56.5" fill="currentColor" fillOpacity="0.22" />
          </g>

          {/* Subtle crystalline sugar granule accents */}
          <circle cx="28" cy="49" r="1.5" fill="currentColor" />
          <circle cx="32.5" cy="53" r="1.3" fill="currentColor" />
          <circle cx="52" cy="29" r="1.4" fill="currentColor" />

          {/* Diagonal Line Across the Cubes */}
          <line
            x1="17"
            y1="17"
            x2="63"
            y2="63"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'honey-mustard-fava-vitamins':
    case 'vitamins-abk':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Soft ambient halo */}
          <circle cx="40" cy="41" r="32" fill="currentColor" fillOpacity="0.05" />

          {/* Organic Botanical Leaf Silhouette */}
          <path
            d="M16 61.5C14.5 37.5 27 16.5 62.5 13C64 45 48 63.5 21.5 63C19.2 63 17.4 62.4 16 61.5Z"
            fill="currentColor"
            fillOpacity="0.11"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Leaf Stem */}
          <path
            d="M20 60C16.8 63.2 14 65.5 11.5 67"
            stroke="currentColor"
            strokeWidth="2.9"
            strokeLinecap="round"
          />

          {/* Subtle organic leaf midrib */}
          <path
            d="M19.5 59.5C27.5 51.5 36.5 42.5 51.5 25.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeOpacity="0.28"
            strokeLinecap="round"
          />

          {/* Three Minimal Circular Vitamin Badges Inside the Leaf: A, B, K */}
          <g stroke="currentColor" strokeWidth="2">
            <circle
              cx="31.5"
              cy="34.5"
              r="7.2"
              fill="currentColor"
              fillOpacity="0.12"
            />
            <circle
              cx="47.5"
              cy="29.5"
              r="7.2"
              fill="currentColor"
              fillOpacity="0.12"
            />
            <circle
              cx="42.5"
              cy="46.5"
              r="7.5"
              fill="currentColor"
              fillOpacity="0.12"
            />
          </g>

          <text
            x="31.5"
            y="38.2"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="10.5"
            textAnchor="middle"
          >
            A
          </text>
          <text
            x="47.5"
            y="33.2"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="10.5"
            textAnchor="middle"
          >
            B
          </text>
          <text
            x="42.5"
            y="50.3"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="10.8"
            textAnchor="middle"
          >
            K
          </text>
        </svg>
      );

    case 'protein-cookie-sugar-free':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Pale botanical-green circular halo */}
          <circle cx="40" cy="40" r="33" fill="currentColor" fillOpacity="0.09" />
          <circle
            cx="40"
            cy="40"
            r="33"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Sugar Cube #1 (Upper-Left Isometric Cube) */}
          <g stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <polygon
              points="33.5,21 44,26.2 33.5,31.4 23,26.2"
              fill="currentColor"
              fillOpacity="0.16"
            />
            <polygon
              points="23,26.2 33.5,31.4 33.5,42.5 23,37.3"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <polygon
              points="33.5,31.4 44,26.2 44,37.3 33.5,42.5"
              fill="currentColor"
              fillOpacity="0.22"
            />
          </g>

          {/* Sugar Cube #2 (Lower-Right Isometric Cube) */}
          <g stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <polygon
              points="46.5,35.5 57,40.7 46.5,45.9 36,40.7"
              fill="currentColor"
              fillOpacity="0.16"
            />
            <polygon
              points="36,40.7 46.5,45.9 46.5,57 36,51.8"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <polygon
              points="46.5,45.9 57,40.7 57,51.8 46.5,57"
              fill="currentColor"
              fillOpacity="0.22"
            />
          </g>

          {/* Diagonal Strike-Through Line */}
          <line
            x1="16.5"
            y1="16.5"
            x2="63.5"
            y2="63.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'protein-cookie-high-fibre':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Pale botanical-green circular frame */}
          <circle cx="40" cy="40" r="33" fill="currentColor" fillOpacity="0.09" />
          <circle
            cx="40"
            cy="40"
            r="33"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Interwoven Wheat-Like Dietary Fibre Stalks */}
          <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {/* Central stem */}
            <path d="M40 61V20" strokeWidth="2.6" />

            {/* Top grain kernel */}
            <path
              d="M40 16.5C37.2 20 37.2 24.2 40 27C42.8 24.2 42.8 20 40 16.5Z"
              fill="currentColor"
              fillOpacity="0.18"
            />

            {/* Left interwoven fibre kernels */}
            <path
              d="M39.5 34C33.5 33.2 29.2 29 29.5 23.5C35 24.2 38.8 28.5 39.5 34Z"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <path
              d="M39.5 44.5C33.2 43.7 28.5 39.2 28.8 33.5C34.5 34.2 38.8 38.8 39.5 44.5Z"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <path
              d="M39.5 55C33.5 54.2 29.2 50 29.5 44.5C35 45.2 38.8 49.5 39.5 55Z"
              fill="currentColor"
              fillOpacity="0.15"
            />

            {/* Right interwoven fibre kernels */}
            <path
              d="M40.5 34C46.5 33.2 50.8 29 50.5 23.5C45 24.2 41.2 28.5 40.5 34Z"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <path
              d="M40.5 44.5C46.8 43.7 51.5 39.2 51.2 33.5C45.5 34.2 41.2 38.8 40.5 44.5Z"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <path
              d="M40.5 55C46.5 54.2 50.8 50 50.5 44.5C45 45.2 41.2 49.5 40.5 55Z"
              fill="currentColor"
              fillOpacity="0.15"
            />
          </g>
        </svg>
      );

    case 'protein-cookie-vegan':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Subtle circular botanical outline */}
          <circle cx="40" cy="40" r="33" fill="currentColor" fillOpacity="0.09" />
          <circle
            cx="40"
            cy="40"
            r="33"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Botanical Leaf Symbol Inside Circle */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M25.5 53.5C24 36.5 34.5 22.5 55.5 21C56.5 41.5 45 54.5 29 54.5C27.4 54.5 26.2 54.1 25.5 53.5Z"
              fill="currentColor"
              fillOpacity="0.16"
              strokeWidth="2.7"
            />
            {/* Stem & central vein */}
            <path d="M22 57C28.5 50.5 38 41 48.5 29.5" strokeWidth="2.5" />
            {/* Lateral leaf veins */}
            <path d="M34 44.5L32.5 36.5" strokeWidth="2.1" />
            <path d="M39 39.5L47 40" strokeWidth="2.1" />
            <path d="M43 35L41.5 28.5" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'protein-cookie-two-inside':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Back Cookie Silhouette (Echoing 2x Cookies Inside) */}
            <path
              d="M35 12.5C45.8 12.5 54.5 21.2 54.5 32C54.5 39.8 49.9 46.5 43.2 49.6"
              strokeWidth="2.3"
              strokeOpacity="0.65"
            />
            <circle cx="45.5" cy="23.5" r="2" fill="currentColor" fillOpacity="0.55" stroke="none" />
            <circle cx="48.5" cy="33" r="1.8" fill="currentColor" fillOpacity="0.55" stroke="none" />

            {/* Front Artisan Protein Cookie */}
            <circle
              cx="27.5"
              cy="34.5"
              r="19.5"
              fill="currentColor"
              fillOpacity="0.10"
              strokeWidth="2.6"
            />

            {/* Baked Cookie Crumbs / Chocolate & Fruit Inclusions */}
            <circle cx="21.5" cy="27.5" r="2.3" fill="currentColor" stroke="none" />
            <circle cx="32.5" cy="25.5" r="2" fill="currentColor" stroke="none" />
            <circle cx="27.5" cy="35.5" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="19.5" cy="39" r="1.9" fill="currentColor" stroke="none" />
            <circle cx="35.5" cy="38.5" r="2.2" fill="currentColor" stroke="none" />
            <circle cx="27" cy="45" r="1.8" fill="currentColor" stroke="none" />

            {/* Subtle artisan surface texture arcs */}
            <path d="M23 21.5C25.5 20.5 28.5 20.5 31 21.2" strokeWidth="1.8" strokeOpacity="0.6" />
            <path d="M14.5 33.5C14.2 36 14.8 38.5 16 40.5" strokeWidth="1.8" strokeOpacity="0.6" />
          </g>
        </svg>
      );

    case 'chickpea-salted-vitamins-bc':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer Botanical-Green Circular Frame */}
          <circle cx="40" cy="40" r="32.5" fill="currentColor" fillOpacity="0.07" />
          <circle
            cx="40"
            cy="40"
            r="32.5"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Top Botanical Crown Sprout Accent */}
          <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M40 22C36.5 21.5 33.5 18.5 33.5 14.5C37.5 14.5 40 17.5 40 22Z"
              fill="currentColor"
              fillOpacity="0.16"
            />
            <path
              d="M40 22C43.5 21.5 46.5 18.5 46.5 14.5C42.5 14.5 40 17.5 40 22Z"
              fill="currentColor"
              fillOpacity="0.16"
            />
          </g>

          {/* Left Vitamin Capsule Badge: B */}
          <circle
            cx="28.5"
            cy="43"
            r="11.5"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="2.4"
          />
          <text
            x="28.5"
            y="47.8"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="14"
            textAnchor="middle"
          >
            B
          </text>

          {/* Right Vitamin Capsule Badge: C */}
          <circle
            cx="51.5"
            cy="43"
            r="11.5"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="2.4"
          />
          <text
            x="51.5"
            y="47.8"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="14"
            textAnchor="middle"
          >
            C
          </text>

          {/* Subtle bottom botanical arc */}
          <path
            d="M29 61.5C36 64.5 44 64.5 51 61.5"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />
        </svg>
      );

    case 'chickpea-salted-cholesterol-free':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer Circular Outline */}
          <circle cx="40" cy="40" r="32.5" fill="currentColor" fillOpacity="0.07" />
          <circle
            cx="40"
            cy="40"
            r="32.5"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Minimal Lipid Droplet & Molecular Ring Symbol Inside */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M40 19.5C40 19.5 26.5 34.5 26.5 45C26.5 52.5 32.5 58.5 40 58.5C47.5 58.5 53.5 52.5 53.5 45C53.5 34.5 40 19.5 40 19.5Z"
              fill="currentColor"
              fillOpacity="0.12"
              strokeWidth="2.6"
            />
            {/* Inner lipid ring motif */}
            <polygon
              points="40,37 46,40.5 46,47.5 40,51 34,47.5 34,40.5"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2"
            />
          </g>

          {/* Diagonal Line Indicating Cholesterol Absence */}
          <line
            x1="17"
            y1="17"
            x2="63"
            y2="63"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'chickpea-salted-vitamin-k':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Soft ambient botanical glow */}
          <circle cx="40" cy="40" r="31" fill="currentColor" fillOpacity="0.05" />

          {/* Distinctive Vertical-Diagonal Botanical Leaf Silhouette (Visually distinct from B & C circle) */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M40 11C21 22 16.5 43.5 26.5 59.5C31 64 35.5 66 40 66C44.5 66 49 64 53.5 59.5C63.5 43.5 59 22 40 11Z"
              fill="currentColor"
              fillOpacity="0.11"
              strokeWidth="2.8"
            />
            {/* Bottom leaf stem */}
            <path d="M40 66V72.5" strokeWidth="2.8" />
            {/* Upper & lower subtle vein accents */}
            <path d="M40 16.5V25" strokeWidth="2" strokeOpacity="0.55" />
            <path d="M31 27L35.5 30.5" strokeWidth="1.9" strokeOpacity="0.45" />
            <path d="M49 27L44.5 30.5" strokeWidth="1.9" strokeOpacity="0.45" />
          </g>

          {/* Integrated Central Circular Medallion with Letter 'K' */}
          <circle
            cx="40"
            cy="43.5"
            r="12"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="2.3"
          />
          <text
            x="40"
            y="48.8"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="15.5"
            textAnchor="middle"
          >
            K
          </text>
        </svg>
      );

    case 'chickpea-salted-blood-sugar':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer Circular Frame */}
          <circle cx="40" cy="40" r="32.5" fill="currentColor" fillOpacity="0.07" />
          <circle
            cx="40"
            cy="40"
            r="32.5"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Gently Balanced Equilibrium Wave & Glucose Symbol Inside Circle */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Horizontal equilibrium baseline */}
            <line
              x1="18"
              y1="43"
              x2="62"
              y2="43"
              strokeWidth="1.9"
              strokeDasharray="2.5 3"
              strokeOpacity="0.65"
            />
            {/* Smooth balanced wave */}
            <path
              d="M18 43C23.5 35.5 29 35.5 34.5 43C40 50.5 45.5 50.5 51 43C54.5 38.2 58.2 38.2 62 43"
              strokeWidth="2.8"
            />
            {/* Upper glucose hex ring accent */}
            <polygon
              points="40,18.5 45.5,21.7 45.5,28 40,31.2 34.5,28 34.5,21.7"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.2"
            />
          </g>
        </svg>
      );

    case 'chickpea-salted-sea-salt':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Primary Sea Salt Crystal Diamond */}
            <polygon
              points="26,12 40,26 26,40 12,26"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.5"
            />
            {/* Internal crystal facet lines */}
            <line x1="26" y1="12" x2="26" y2="40" strokeWidth="1.8" strokeOpacity="0.55" />
            <line x1="12" y1="26" x2="40" y2="26" strokeWidth="1.8" strokeOpacity="0.55" />

            {/* Secondary Sea Salt Crystal Cube */}
            <polygon
              points="44,30 53,39 44,48 35,39"
              fill="currentColor"
              fillOpacity="0.18"
              strokeWidth="2.4"
            />

            {/* Third Delicate Salt Grain & Sea Wave Accent */}
            <circle cx="22" cy="49" r="3" fill="currentColor" fillOpacity="0.25" strokeWidth="2.1" />
            <path
              d="M32 53.5C36.5 51.5 41 55.5 45.5 53.5C49 52 52 54 54.5 53"
              strokeWidth="2.2"
            />
          </g>
        </svg>
      );

    case 'chickpea-salted-three-ingredients':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Ingredient 1 (Top-Left): Roasted Chickpea */}
            <path
              d="M22.5 14.5C17.2 14.5 13 18.8 13 24C13 28.8 16.8 32.8 21.8 33C26.8 33.2 31 29.2 31 24C31 21 29.5 18.2 27.2 16.5L25.5 13.5L22.5 14.5Z"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.4"
            />
            <path d="M19.5 22.5C21 21 23.5 21 25 22.5" strokeWidth="2" />

            {/* Ingredient 2 (Top-Right): Natural Sunflower Oil Droplet */}
            <path
              d="M45.5 13.5C45.5 13.5 37.5 22.8 37.5 28C37.5 32.4 41.1 36 45.5 36C49.9 36 53.5 32.4 53.5 28C53.5 22.8 45.5 13.5 45.5 13.5Z"
              fill="currentColor"
              fillOpacity="0.14"
              strokeWidth="2.4"
            />

            {/* Ingredient 3 (Bottom-Center): Sea Salt Crystal */}
            <polygon
              points="33,37 42.5,46.5 33,56 23.5,46.5"
              fill="currentColor"
              fillOpacity="0.18"
              strokeWidth="2.4"
            />
            <circle cx="33" cy="46.5" r="1.8" fill="currentColor" stroke="none" />
          </g>
        </svg>
      );

    case 'chickpea-lemon-pepper-calcium-zinc':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Subtle warm lemon-yellow ambient halo */}
          <circle cx="40" cy="40" r="32.5" fill="#EAB308" fillOpacity="0.10" />

          {/* Interconnected Mineral Elements: Ca (Upper-Left) & Zn (Lower-Right) */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/*Diagonal Interconnecting Mineral Bond */}
            <line x1="34" y1="34" x2="46" y2="46" strokeWidth="2.8" />

            {/* Upper-Left Hexagonal/Rounded Mineral Element: Ca */}
            <rect
              x="11"
              y="12"
              width="33"
              height="33"
              rx="8.5"
              fill="currentColor"
              fillOpacity="0.09"
              strokeWidth="2.8"
            />
            {/* Lemon-yellow inner corner mineral highlight on Ca */}
            <path
              d="M16.5 19.5V17.5C16.5 16.9 16.9 16.5 17.5 16.5H19.5"
              stroke="#C99700"
              strokeWidth="2.2"
            />

            {/* Lower-Right Interconnected Mineral Element: Zn */}
            <rect
              x="36"
              y="35"
              width="33"
              height="33"
              rx="8.5"
              fill="#EAB308"
              fillOpacity="0.18"
              strokeWidth="2.8"
            />
            {/* Botanical leaf sprout accent at top-right of mineral pair */}
            <path
              d="M52 24C52 17.8 56.8 13.5 63.5 13.5C63.5 20.2 58.5 24.5 52 24Z"
              fill="currentColor"
              fillOpacity="0.15"
              strokeWidth="2.3"
            />
          </g>

          {/* Ca Typography */}
          <text
            x="27.5"
            y="34"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="14.5"
            letterSpacing="-0.02em"
            textAnchor="middle"
          >
            Ca
          </text>

          {/* Zn Typography */}
          <text
            x="52.5"
            y="57"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="14.5"
            letterSpacing="-0.02em"
            textAnchor="middle"
          >
            Zn
          </text>
        </svg>
      );

    case 'chickpea-lemon-pepper-plant-protein':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer Circular Outline with Subtle Lemon-Yellow Halo */}
          <circle cx="40" cy="40" r="32.5" fill="#EAB308" fillOpacity="0.09" />
          <circle
            cx="40"
            cy="40"
            r="32.5"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Chickpea + Botanical Sprout Inside Circular Outline */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Rounded Chickpea Body with Characteristic Beak */}
            <path
              d="M40 31C30.8 31 24.5 37.5 24.5 45.8C24.5 54 31.2 60 40 60C48.8 60 55.5 54 55.5 45.8C55.5 40.5 52.5 35.8 47.8 33.2L44.2 28.5L40 31Z"
              fill="#EAB308"
              fillOpacity="0.18"
              strokeWidth="2.7"
            />
            {/* Chickpea natural contour crease */}
            <path
              d="M32.5 44.5C35.5 41.2 41 41.2 44.5 44.2"
              strokeWidth="2.2"
            />
            <circle cx="47.5" cy="48.5" r="1.6" fill="currentColor" stroke="none" />

            {/* Botanical Sprout Emerging Above Chickpea */}
            <path d="M41.5 29.5V19.5" strokeWidth="2.6" />
            {/* Left Sprout Leaf */}
            <path
              d="M41.5 24.5C35.2 24.5 30.8 20.5 31 15C36.8 15 41 19 41.5 24.5Z"
              fill="currentColor"
              fillOpacity="0.16"
              strokeWidth="2.4"
            />
            {/* Right Sprout Leaf */}
            <path
              d="M41.5 22.5C47.5 22.5 51.8 18.5 51.5 13.5C45.8 13.5 42 17.2 41.5 22.5Z"
              fill="currentColor"
              fillOpacity="0.16"
              strokeWidth="2.4"
            />
          </g>
        </svg>
      );

    case 'chickpea-lemon-pepper-weight-control':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer Circular Frame */}
          <circle cx="40" cy="40" r="32.5" fill="#EAB308" fillOpacity="0.08" />
          <circle
            cx="40"
            cy="40"
            r="32.5"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Elegant Balance-Scale Symbol Combined with a Small Botanical Leaf */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Scale Base & Pillar */}
            <line x1="29" y1="60" x2="51" y2="60" strokeWidth="2.8" />
            <line x1="40" y1="26" x2="40" y2="60" strokeWidth="2.6" />

            {/* Horizontal Balance Beam */}
            <line x1="21" y1="33" x2="59" y2="33" strokeWidth="2.6" />

            {/* Left Balance Pan */}
            <path d="M24 33L19.5 44.5H28.5L24 33Z" strokeWidth="2" />
            <path
              d="M18.5 44.5C18.5 47.5 21 49.5 24 49.5C27 49.5 29.5 47.5 29.5 44.5H18.5Z"
              fill="currentColor"
              fillOpacity="0.15"
              strokeWidth="2.2"
            />

            {/* Right Balance Pan */}
            <path d="M56 33L51.5 44.5H60.5L56 33Z" strokeWidth="2" />
            <path
              d="M50.5 44.5C50.5 47.5 53 49.5 56 49.5C59 49.5 61.5 47.5 61.5 44.5H50.5Z"
              fill="#EAB308"
              fillOpacity="0.22"
              strokeWidth="2.2"
            />

            {/* Small Botanical Leaf at the Crown of the Balance Scale */}
            <path
              d="M40 26C40 19.8 44.8 15.5 51 15.5C51 21.5 46.2 26 40 26Z"
              fill="currentColor"
              fillOpacity="0.16"
              strokeWidth="2.3"
            />
          </g>
        </svg>
      );

    case 'chickpea-lemon-pepper-low-sodium':
      return (
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer Circular Outline with Restrained Lemon-Yellow Accent */}
          <circle cx="40" cy="40" r="32.5" fill="#EAB308" fillOpacity="0.09" />
          <circle
            cx="40"
            cy="40"
            r="32.5"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Outlined Salt-Shaker Icon Inside */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {/* Perforated dome cap */}
            <path
              d="M31 27C31 22 35 18.5 40 18.5C45 18.5 49 22 49 27H31Z"
              fill="#EAB308"
              fillOpacity="0.24"
              strokeWidth="2.6"
            />
            {/* Shaker cap perforations */}
            <circle cx="37" cy="22.8" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="40" cy="21.8" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="43" cy="22.8" r="1.1" fill="currentColor" stroke="none" />

            {/* Collar ring */}
            <line x1="29.5" y1="27" x2="50.5" y2="27" strokeWidth="2.7" />

            {/* Glass shaker body */}
            <path
              d="M31.5 27L28 54.5C27.6 57.5 29.9 60 33 60H47C50.1 60 52.4 57.5 52 54.5L48.5 27H31.5Z"
              fill="currentColor"
              fillOpacity="0.09"
              strokeWidth="2.7"
            />

            {/* Low-level salt wave at bottom of shaker */}
            <path
              d="M29 51.5C33 49.8 36.5 53 40 51.5C43.5 50 47 52.8 51 51.2"
              stroke="#C99700"
              strokeWidth="2.2"
            />

            {/* Subtle Diagonal Reduction Line & Downward Reduction Arrow Accent */}
            <line
              x1="18.5"
              y1="18.5"
              x2="61.5"
              y2="61.5"
              stroke="currentColor"
              strokeWidth="2.8"
            />
          </g>
        </svg>
      );

    default:
      return null;
  }
};

interface NutritionalBenefitsSectionProps {
  productId: string;
  benefits: NutritionalBenefitItem[];
  additionalHighlights?: ProductHighlightDetail[];
  textColor: string;
  accentColor: string;
  isDarkScene: boolean;
  dividerColor: string;
  sectionHeading?: string;
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const NutritionalBenefitsSection: React.FC<NutritionalBenefitsSectionProps> = ({
  productId,
  benefits,
  additionalHighlights = [],
  textColor,
  isDarkScene,
  dividerColor,
  sectionHeading,
}) => {
  // Strictly filter so a product ONLY renders benefits explicitly approved and enabled for its own unique productId
  const productSpecificBenefits = (benefits || []).filter(
    (item) => item.productId === productId && item.enabled !== false
  );

  const verifiedHighlights = (additionalHighlights || []).filter(
    (item) => item.productId === productId && item.enabled !== false
  );

  if (productSpecificBenefits.length === 0 && verifiedHighlights.length === 0) {
    return null;
  }

  const isProteinCookie = productId.startsWith('protein-cookies-');
  const isChickpeaSalted = productId === 'chickpea-salted';
  const isChickpeaLemonPepper = productId === 'chickpea-lemon-pepper';

  // Deep botanical green for icons and headings
  const botanicalIconColor = isDarkScene ? '#74C686' : '#1F5C34';
  const botanicalHeadingColor = isDarkScene ? '#8ED69E' : '#1B4F2D';

  // Subtle packaging-blue accent specifically for Salted Chickpea Protein Snacks
  const saltedBlueAccent = '#1B6B99';
  const saltedBlueTintBg = 'rgba(27, 107, 153, 0.07)';
  const saltedBlueBorder = 'rgba(27, 107, 153, 0.22)';

  // Subtle lemon-yellow packaging accent specifically for Lemon Pepper Chickpea Protein Snacks
  const lemonYellowAccent = '#C49B05';
  const lemonYellowTintBg = 'rgba(234, 179, 8, 0.10)';
  const lemonYellowBorder = 'rgba(196, 155, 5, 0.26)';

  // Deep chocolate-brown accent for the Protein Cookies "TWO COOKIES INSIDE — 2×" detail
  const cookieChocolateAccent = '#4A2C1D';

  const resolvedHeading =
    sectionHeading !== undefined
      ? sectionHeading
      : isProteinCookie
      ? 'PRODUCT BENEFITS'
      : 'NATURAL GOODNESS';

  return (
    <div className="w-full">
      {/* Thin divider separating taste profile / description from nutritional highlights */}
      <div
        className="w-full h-px my-6 sm:my-8 transition-colors duration-500"
        style={{ backgroundColor: dividerColor }}
      />

      {/* Subtle section heading */}
      {resolvedHeading && (
        <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
          {(isChickpeaSalted || isChickpeaLemonPepper) && (
            <span
              className="inline-block w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: isChickpeaSalted
                  ? saltedBlueAccent
                  : lemonYellowAccent,
              }}
              aria-hidden="true"
            />
          )}
          <p
            className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em] opacity-80"
            style={{
              color: isChickpeaSalted
                ? saltedBlueAccent
                : botanicalHeadingColor,
            }}
          >
            {resolvedHeading}
          </p>
        </div>
      )}

      {/* PROTEIN COOKIES SHARED BENEFIT PRESENTATION (3 balanced columns with pale-green circular icons & clean white label capsules) */}
      {isProteinCookie ? (
        <div className="grid grid-cols-1 min-[370px]:grid-cols-3 gap-3 sm:gap-5 md:gap-7 pt-1">
          {productSpecificBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.34,
                  delay: index * 0.05,
                  ease: SMOOTH_EASE,
                },
              }}
              className="flex flex-col items-center text-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-2xl bg-white/55 border border-white/80 shadow-[0_6px_20px_rgba(31,92,52,0.04)]"
            >
              {/* Large Pale-Botanical-Green Circular SVG Icon (64–72px on desktop, 48–52px on compact mobile) */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full p-1.5 sm:p-2"
                style={{
                  color: botanicalIconColor,
                  backgroundColor: 'rgba(116, 198, 134, 0.16)',
                }}
              >
                <NutritionalBenefitIcon
                  type={benefit.icon}
                  className="w-[48px] h-[48px] sm:w-[62px] sm:h-[62px] md:w-[72px] md:h-[72px]"
                />
              </div>

              {/* Clean White/Warm-Neutral Label Capsule + Supporting Description */}
              <div className="flex flex-col items-center gap-1.5 min-w-0">
                <span
                  className="inline-block px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.10em] sm:tracking-[0.12em] bg-white/90 border shadow-2xs whitespace-nowrap"
                  style={{
                    color: botanicalHeadingColor,
                    borderColor: 'rgba(31, 92, 52, 0.16)',
                  }}
                >
                  {benefit.title}
                </span>
                <p
                  className="text-[11px] sm:text-[13.5px] font-medium leading-snug sm:leading-relaxed opacity-90"
                  style={{ color: textColor }}
                >
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* FAVA BEANS & CHICKPEA SNACKS NUTRITIONAL BENEFIT GRID */
        <div
          className={`grid grid-cols-1 ${
            productSpecificBenefits.length === 2
              ? 'md:grid-cols-2'
              : 'md:grid-cols-3'
          } gap-6 sm:gap-7 md:gap-8 pt-1`}
        >
          {productSpecificBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.34,
                  delay: index * 0.05,
                  ease: SMOOTH_EASE,
                },
              }}
              className={`flex flex-row md:flex-col items-start gap-4 sm:gap-5 md:gap-3.5 ${
                index > 0
                  ? 'pt-5 md:pt-0 border-t md:border-t-0 md:border-l md:pl-7'
                  : ''
              }`}
              style={{
                borderColor:
                  index > 0
                    ? isChickpeaSalted
                      ? saltedBlueBorder
                      : isChickpeaLemonPepper
                      ? lemonYellowBorder
                      : dividerColor
                    : undefined,
              }}
            >
              {/* Prominent Botanical-Green SVG Icon (Mobile: 52px, Tablet: 60px, Desktop: 70px) */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-2xl p-1.5 sm:p-2 relative"
                style={{
                  color: botanicalIconColor,
                  backgroundColor: isChickpeaSalted
                    ? saltedBlueTintBg
                    : isChickpeaLemonPepper
                    ? lemonYellowTintBg
                    : isDarkScene
                    ? 'rgba(116, 198, 134, 0.10)'
                    : 'rgba(31, 92, 52, 0.06)',
                  border: isChickpeaSalted
                    ? `1px solid ${saltedBlueBorder}`
                    : isChickpeaLemonPepper
                    ? `1px solid ${lemonYellowBorder}`
                    : undefined,
                  boxShadow: isChickpeaSalted
                    ? '0 6px 18px rgba(27, 107, 153, 0.08)'
                    : isChickpeaLemonPepper
                    ? '0 6px 18px rgba(196, 155, 5, 0.10)'
                    : undefined,
                }}
              >
                <NutritionalBenefitIcon
                  type={benefit.icon}
                  className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
                />
              </div>

              {/* Heading & Supporting Description */}
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className="text-xs sm:text-[13px] md:text-[13.5px] font-extrabold uppercase tracking-[0.1em] leading-snug"
                    style={{ color: botanicalHeadingColor }}
                  >
                    {benefit.title}
                  </p>
                  {(isChickpeaSalted || isChickpeaLemonPepper) && (
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full opacity-80 flex-shrink-0"
                      style={{
                        backgroundColor: isChickpeaSalted
                          ? saltedBlueAccent
                          : lemonYellowAccent,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p
                  className="text-xs sm:text-sm md:text-[14px] font-medium leading-relaxed opacity-90"
                  style={{ color: textColor }}
                >
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* SECONDARY PRODUCT HIGHLIGHTS (e.g. Protein Cookies "TWO COOKIES INSIDE — 2×" or Salted Chickpea "SEA SALT" & "JUST 3 INGREDIENTS") */}
      {verifiedHighlights.length > 0 && (
        <div
          className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t"
          style={{
            borderColor: isChickpeaSalted ? saltedBlueBorder : dividerColor,
          }}
        >
          {isProteinCookie ? (
            /* Centered Secondary Packaging Detail for Verified Two-Cookie Packs */
            <div className="flex flex-wrap items-center justify-center gap-4">
              {verifiedHighlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="inline-flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-white/75 border shadow-2xs"
                  style={{
                    color: cookieChocolateAccent,
                    borderColor: 'rgba(74, 44, 29, 0.18)',
                  }}
                >
                  <NutritionalBenefitIcon
                    type={highlight.icon}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0"
                  />
                  {highlight.badgeText && (
                    <span className="text-base sm:text-lg font-black tracking-tight leading-none">
                      {highlight.badgeText}
                    </span>
                  )}
                  <span className="h-3.5 w-px bg-[#4A2C1D]/20" aria-hidden="true" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em]">
                    {highlight.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Subtle Product-Specific Ingredient Row (e.g., Salted Chickpea SEA SALT & JUST 3 INGREDIENTS with Blue Accents) */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {verifiedHighlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="flex items-center gap-3.5 sm:gap-4 px-4 py-3.5 rounded-2xl bg-white/65 border transition-colors"
                  style={{
                    borderColor: isChickpeaSalted ? saltedBlueBorder : dividerColor,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                    style={{
                      color: botanicalIconColor,
                      backgroundColor: isChickpeaSalted
                        ? saltedBlueTintBg
                        : 'rgba(31, 92, 52, 0.06)',
                    }}
                  >
                    <NutritionalBenefitIcon
                      type={highlight.icon}
                      className="w-8 h-8 sm:w-9 sm:h-9"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span
                      className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.12em]"
                      style={{
                        color: isChickpeaSalted
                          ? saltedBlueAccent
                          : botanicalHeadingColor,
                      }}
                    >
                      {highlight.label}
                    </span>
                    {highlight.description && (
                      <p
                        className="text-xs sm:text-[13px] font-medium leading-snug opacity-85"
                        style={{ color: textColor }}
                      >
                        {highlight.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

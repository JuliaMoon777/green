import { ProductDescriptionData } from './fava-beans-chili-lemon';
import {
  NutritionalBenefitItem,
  ProductHighlightDetail,
} from '../../components/NutritionalBenefits';

export interface ProteinCookieBenefitOptions {
  sugarFree?: boolean;
  highFibre?: boolean;
  vegan?: boolean;
  twoCookiesInside?: boolean;
}

/**
 * Shared benefit definitions exclusively for the GREENERGY Protein Cookies category.
 * Individual benefits can be enabled or disabled per flavor based on verified product specifications.
 */
export const createProteinCookiesBenefits = (
  productId: string,
  options: ProteinCookieBenefitOptions = {
    sugarFree: true,
    highFibre: true,
    vegan: true,
  }
): NutritionalBenefitItem[] => [
  {
    id: `${productId}-sugar-free`,
    productId,
    icon: 'protein-cookie-sugar-free',
    title: 'SUGAR FREE',
    description:
      'Sugar-free cookies without compromising on delicious flavor.',
    enabled: options.sugarFree !== false,
  },
  {
    id: `${productId}-high-fibre`,
    productId,
    icon: 'protein-cookie-high-fibre',
    title: 'HIGH FIBRE',
    description:
      'A source of dietary fibre for a more satisfying snacking experience.',
    enabled: options.highFibre !== false,
  },
  {
    id: `${productId}-vegan`,
    productId,
    icon: 'protein-cookie-vegan',
    title: 'VEGAN',
    description:
      'Plant-based cookies made for those who appreciate vegan-friendly snacking.',
    enabled: options.vegan !== false,
  },
];

export const createProteinCookiesHighlights = (
  productId: string,
  options: ProteinCookieBenefitOptions = { twoCookiesInside: true }
): ProductHighlightDetail[] => [
  {
    id: `${productId}-two-cookies-inside`,
    productId,
    icon: 'protein-cookie-two-inside',
    badgeText: '2×',
    label: 'TWO COOKIES INSIDE',
    variant: 'cookie-pack',
    enabled: options.twoCookiesInside !== false,
  },
];

export const proteinCookiesAppleCinnamon: ProductDescriptionData = {
  id: 'protein-cookies-apple-cinnamon',
  category: 'Protein Cookies',
  name: 'Apple & Cinnamon',

  shortDescription:
    'A delightful combination of sweet apple and warm, aromatic cinnamon, creating a comforting and satisfying flavor experience.',
  description:
    'Experience the comforting harmony of Apple & Cinnamon Protein Cookies. The naturally sweet taste of apple blends beautifully with the warm, aromatic notes of cinnamon, creating a deliciously balanced flavor. A cozy and satisfying treat that brings together two timeless flavors in every bite.',
  tasteProfile: 'Sweet · Warm · Aromatic',
  ingredients: '',
  additionalInfo: '',
  notes: '',
  nutritionalBenefits: createProteinCookiesBenefits('protein-cookies-apple-cinnamon', {
    sugarFree: true,
    highFibre: true,
    vegan: true,
  }),
  additionalHighlights: createProteinCookiesHighlights('protein-cookies-apple-cinnamon', {
    twoCookiesInside: true,
  }),
};

export const productDescription = proteinCookiesAppleCinnamon;

import { ProductDescriptionData } from './fava-beans-chili-lemon';
import {
  createProteinCookiesBenefits,
  createProteinCookiesHighlights,
} from './protein-cookies-apple-cinnamon';

export const proteinCookiesCreamyButterGraham: ProductDescriptionData = {
  id: 'protein-cookies-creamy-butter-graham',
  category: 'Protein Cookies',
  name: 'Creamy Butter + Graham',

  shortDescription: '',
  description: '',
  tasteProfile: '',
  ingredients: '',
  additionalInfo: '',
  notes: '',
  // Prepared shared Protein Cookies benefits configuration; kept hidden while product is in COMING SOON state
  nutritionalBenefits: createProteinCookiesBenefits('protein-cookies-creamy-butter-graham', {
    sugarFree: false,
    highFibre: false,
    vegan: false,
  }),
  additionalHighlights: createProteinCookiesHighlights('protein-cookies-creamy-butter-graham', {
    twoCookiesInside: false,
  }),
};

export const productDescription = proteinCookiesCreamyButterGraham;

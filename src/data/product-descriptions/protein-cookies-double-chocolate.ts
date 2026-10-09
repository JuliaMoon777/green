import { ProductDescriptionData } from './fava-beans-chili-lemon';
import {
  createProteinCookiesBenefits,
  createProteinCookiesHighlights,
} from './protein-cookies-apple-cinnamon';

export const proteinCookiesDoubleChocolate: ProductDescriptionData = {
  id: 'protein-cookies-double-chocolate',
  category: 'Protein Cookies',
  name: 'Double Chocolate',

  shortDescription:
    'A rich and indulgent chocolate experience, crafted to satisfy your chocolate cravings without compromising on quality or flavor.',
  description:
    'Discover the delicious intensity of Double Chocolate Protein Cookies. With their rich, decadent chocolate flavor, these cookies offer a deeply satisfying taste experience for true chocolate lovers. A delightful combination of indulgence and great flavor, created for those who want to enjoy every bite.',
  tasteProfile: 'Rich · Chocolatey · Indulgent',
  ingredients: '',
  additionalInfo: '',
  notes: '',
  nutritionalBenefits: createProteinCookiesBenefits('protein-cookies-double-chocolate', {
    sugarFree: true,
    highFibre: true,
    vegan: true,
  }),
  additionalHighlights: createProteinCookiesHighlights('protein-cookies-double-chocolate', {
    twoCookiesInside: true,
  }),
};

export const productDescription = proteinCookiesDoubleChocolate;

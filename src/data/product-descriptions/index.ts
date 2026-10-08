import { favaBeansChiliLemon, ProductDescriptionData } from './fava-beans-chili-lemon';
import { favaBeansHoneyMustard } from './fava-beans-honey-mustard';
import { favaBeansSweetHerbsOlives } from './fava-beans-sweet-herbs-olives';
import { favaBeansTomatoBasil } from './fava-beans-tomato-basil';
import { favaBeansSummerSpices } from './fava-beans-summer-spices';
import { chickpeaLemonPepper } from './chickpea-lemon-pepper';
import { chickpeaSalted } from './chickpea-salted';
import { proteinCookiesAppleCinnamon } from './protein-cookies-apple-cinnamon';
import { proteinCookiesCreamyButterGraham } from './protein-cookies-creamy-butter-graham';
import { proteinCookiesDoubleChocolate } from './protein-cookies-double-chocolate';
import { peanutsFavaRedThai } from './peanuts-fava-red-thai';
import { peanutsFavaSweetMustard } from './peanuts-fava-sweet-mustard';

export type { ProductDescriptionData };

export {
  favaBeansChiliLemon,
  favaBeansHoneyMustard,
  favaBeansSweetHerbsOlives,
  favaBeansTomatoBasil,
  favaBeansSummerSpices,
  chickpeaLemonPepper,
  chickpeaSalted,
  proteinCookiesAppleCinnamon,
  proteinCookiesCreamyButterGraham,
  proteinCookiesDoubleChocolate,
  peanutsFavaRedThai,
  peanutsFavaSweetMustard,
};

export const ALL_PRODUCT_DESCRIPTIONS: ProductDescriptionData[] = [
  favaBeansChiliLemon,
  favaBeansHoneyMustard,
  favaBeansSweetHerbsOlives,
  favaBeansTomatoBasil,
  favaBeansSummerSpices,
  chickpeaLemonPepper,
  chickpeaSalted,
  proteinCookiesAppleCinnamon,
  proteinCookiesCreamyButterGraham,
  proteinCookiesDoubleChocolate,
  peanutsFavaRedThai,
  peanutsFavaSweetMustard,
];

export const PRODUCT_DESCRIPTIONS_BY_ID: Record<string, ProductDescriptionData> = {
  'fava-beans-chili-lemon': favaBeansChiliLemon,
  'chili-lemon': favaBeansChiliLemon,

  'fava-beans-honey-mustard': favaBeansHoneyMustard,
  'honey-mustard': favaBeansHoneyMustard,

  'fava-beans-sweet-herbs-olives': favaBeansSweetHerbsOlives,
  'sweet-herbs-olives': favaBeansSweetHerbsOlives,

  'fava-beans-tomato-basil': favaBeansTomatoBasil,
  'tomato-basil': favaBeansTomatoBasil,

  'fava-beans-summer-spices': favaBeansSummerSpices,
  'summer-spices': favaBeansSummerSpices,

  'chickpea-lemon-pepper': chickpeaLemonPepper,
  'chickpea-salted': chickpeaSalted,

  'protein-cookies-apple-cinnamon': proteinCookiesAppleCinnamon,
  'cookie-apple-cinnamon': proteinCookiesAppleCinnamon,

  'protein-cookies-creamy-butter-graham': proteinCookiesCreamyButterGraham,
  'cookie-creamy-butter-graham': proteinCookiesCreamyButterGraham,

  'protein-cookies-double-chocolate': proteinCookiesDoubleChocolate,
  'cookie-double-chocolate': proteinCookiesDoubleChocolate,

  'peanuts-fava-red-thai': peanutsFavaRedThai,
  'peanuts-fava-sweet-mustard': peanutsFavaSweetMustard,
};

export const getProductDescriptionById = (id: string): ProductDescriptionData | undefined => {
  return PRODUCT_DESCRIPTIONS_BY_ID[id];
};

import {
  NutritionalBenefitItem,
  ProductHighlightDetail,
} from '../../components/NutritionalBenefits';

export interface ProductDescriptionData {
  id: string;
  category: string;
  name: string;
  shortDescription: string;
  description: string;
  tasteProfile: string;
  ingredients: string;
  additionalInfo: string;
  notes: string;
  nutritionalBenefits?: NutritionalBenefitItem[];
  additionalHighlights?: ProductHighlightDetail[];
}

export const favaBeansChiliLemon: ProductDescriptionData = {
  id: 'fava-beans-chili-lemon',
  category: 'Fava Beans Chips',
  name: 'Chili & Lemon',

  shortDescription:
    'A vibrant combination of fiery chili heat and the bright, refreshing acidity of zesty lemon.',
  description:
    'Experience the bold contrast of Chili & Lemon Fava Beans Chips. The lively citrus freshness of lemon meets the warm, spicy kick of chili peppers, creating an energizing and expressive flavor experience.',
  tasteProfile: 'Spicy · Zesty · Bold',
  ingredients: '',
  additionalInfo: '',
  notes: '',
  nutritionalBenefits: [
    {
      id: 'chili-lemon-plant-based-nutrition',
      productId: 'fava-beans-chili-lemon',
      icon: 'chili-lemon-plant-nutrition',
      title: 'PLANT-BASED NUTRITION',
      description:
        'Fava beans naturally contain plant-based protein, fiber, iron, manganese, and folate.',
    },
    {
      id: 'chili-lemon-protein-and-fat',
      productId: 'fava-beans-chili-lemon',
      icon: 'chili-lemon-protein-fat',
      title: 'PROTEIN & FAT',
      description:
        'A plant-based snack alternative to traditional potato chips.',
    },
    {
      id: 'chili-lemon-b-vitamins',
      productId: 'fava-beans-chili-lemon',
      icon: 'chili-lemon-b-vitamins',
      title: 'B VITAMINS',
      description:
        'Fava beans naturally contain B vitamins, including B6, thiamin (B1), riboflavin (B2), and niacin (B3).',
    },
  ],
};

export const productDescription = favaBeansChiliLemon;

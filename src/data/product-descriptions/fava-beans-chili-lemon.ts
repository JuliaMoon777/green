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
  notes: ''
};

export const productDescription = favaBeansChiliLemon;

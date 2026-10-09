import { ProductDescriptionData } from './fava-beans-chili-lemon';

export const chickpeaLemonPepper: ProductDescriptionData = {
  id: 'chickpea-lemon-pepper',
  category: 'Chickpea Protein Snacks',
  name: 'Lemon Pepper',

  shortDescription:
    'A vibrant blend of zesty lemon and aromatic black pepper, combining refreshing citrus notes with a distinctive peppery kick.',
  description:
    'Experience the lively combination of Lemon Pepper Chickpea Protein Snacks. Bright citrus notes enhance the aromatic warmth and pungent character of black pepper, creating a refreshing yet bold flavor experience.',
  tasteProfile: 'Citrusy · Peppery · Earthy',
  ingredients: '',
  additionalInfo: '',
  notes: '',
  nutritionalBenefits: [
    {
      id: 'chickpea-lemon-pepper-calcium-zinc',
      productId: 'chickpea-lemon-pepper',
      icon: 'chickpea-lemon-pepper-calcium-zinc',
      title: 'CALCIUM & ZINC',
      description: 'A source of calcium and zinc.',
      enabled: true,
    },
    {
      id: 'chickpea-lemon-pepper-plant-protein',
      productId: 'chickpea-lemon-pepper',
      icon: 'chickpea-lemon-pepper-plant-protein',
      title: 'PLANT PROTEIN',
      description: 'Plant-based protein from chickpeas.',
      enabled: true,
    },
    {
      id: 'chickpea-lemon-pepper-weight-control',
      productId: 'chickpea-lemon-pepper',
      icon: 'chickpea-lemon-pepper-weight-control',
      title: 'WEIGHT CONTROL',
      description: 'Prepared for future activation pending substantiation and regulatory approval.',
      // Kept unpublished: health-related weight control claims must not appear publicly unless substantiated and approved
      enabled: false,
    },
    {
      id: 'chickpea-lemon-pepper-low-sodium',
      productId: 'chickpea-lemon-pepper',
      icon: 'chickpea-lemon-pepper-low-sodium',
      title: 'LOW SODIUM',
      description: 'Low in sodium.',
      enabled: true,
    },
  ],
};

export const productDescription = chickpeaLemonPepper;

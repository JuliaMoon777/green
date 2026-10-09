import { ProductDescriptionData } from './fava-beans-chili-lemon';

export const chickpeaSalted: ProductDescriptionData = {
  id: 'chickpea-salted',
  category: 'Chickpea Protein Snacks',
  name: 'Salted',

  shortDescription:
    'A perfectly balanced combination of savory saltiness and the naturally earthy flavor of chickpeas.',
  description:
    'Discover the simple pleasure of Salted Chickpea Protein Snacks. Delicate saltiness complements the naturally earthy taste of chickpeas, creating a balanced, savory flavor experience.',
  tasteProfile: 'Savory · Salty · Earthy',
  ingredients: '',
  additionalInfo: '',
  notes: '',
  nutritionalBenefits: [
    {
      id: 'chickpea-salted-vitamins-bc',
      productId: 'chickpea-salted',
      icon: 'chickpea-salted-vitamins-bc',
      title: 'VITAMINS B & C',
      description: 'An excellent source of B vitamins and vitamin C.',
      enabled: true,
    },
    {
      id: 'chickpea-salted-cholesterol-free',
      productId: 'chickpea-salted',
      icon: 'chickpea-salted-cholesterol-free',
      title: 'CHOLESTEROL FREE',
      description: 'Cholesterol-free plant-based snacking.',
      enabled: true,
    },
    {
      id: 'chickpea-salted-vitamin-k',
      productId: 'chickpea-salted',
      icon: 'chickpea-salted-vitamin-k',
      title: 'VITAMIN K',
      description: 'Contains vitamin K.',
      enabled: true,
    },
    {
      id: 'chickpea-salted-blood-sugar',
      productId: 'chickpea-salted',
      icon: 'chickpea-salted-blood-sugar',
      title: 'BLOOD SUGAR',
      description: 'Prepared for future activation subject to substantiation and regulatory approval.',
      // Kept unpublished: health-related glucose stabilization claims must not appear publicly without regulatory approval
      enabled: false,
    },
  ],
  additionalHighlights: [
    {
      id: 'chickpea-salted-sea-salt',
      productId: 'chickpea-salted',
      icon: 'chickpea-salted-sea-salt',
      label: 'SEA SALT',
      description: 'A simple, savory flavor inspired by sea salt.',
      variant: 'salted-blue-pill',
      enabled: true,
    },
    {
      id: 'chickpea-salted-three-ingredients',
      productId: 'chickpea-salted',
      icon: 'chickpea-salted-three-ingredients',
      label: 'JUST 3 INGREDIENTS',
      description: 'Crafted with a simple three-ingredient recipe.',
      variant: 'salted-blue-pill',
      enabled: true,
    },
  ],
};

export const productDescription = chickpeaSalted;

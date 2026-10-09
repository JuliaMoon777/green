import { ProductDescriptionData } from './fava-beans-chili-lemon';

export const favaBeansHoneyMustard: ProductDescriptionData = {
  id: 'fava-beans-honey-mustard',
  category: 'Fava Beans Chips',
  name: 'Honey & Mustard',

  shortDescription:
    'A tempting balance of smooth, golden honey sweetness and the tangy warmth of aromatic mustard.',
  description:
    'Savor the classic harmony of Honey & Mustard Fava Beans Chips. Gentle floral sweetness from golden honey blends effortlessly with the lively tang and subtle spice of mustard seeds, creating a rich and well-rounded flavor experience.',
  tasteProfile: 'Sweet · Tangy · Savory',
  ingredients: '',
  additionalInfo: '',
  notes: '',
  nutritionalBenefits: [
    {
      id: 'honey-mustard-plant-protein',
      productId: 'fava-beans-honey-mustard',
      icon: 'honey-mustard-plant-protein',
      title: 'PLANT PROTEIN',
      description:
        'Fava beans offer a naturally plant-based protein option as an alternative to pea and soy.',
    },
    {
      id: 'honey-mustard-low-glycemic-index',
      productId: 'fava-beans-honey-mustard',
      icon: 'honey-mustard-low-glycemic-index',
      title: 'LOW GLYCEMIC INDEX',
      description:
        'Fava beans are a legume associated with a relatively low glycemic index.',
    },
    {
      id: 'honey-mustard-fava-vitamins',
      productId: 'fava-beans-honey-mustard',
      icon: 'honey-mustard-fava-vitamins',
      title: 'VITAMINS IN FAVA BEANS',
      description:
        'Fava beans contain naturally occurring B vitamins and other micronutrients.',
    },
  ],
};

export const productDescription = favaBeansHoneyMustard;

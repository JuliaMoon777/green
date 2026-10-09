import { ProductDescriptionData } from './fava-beans-chili-lemon';

export const favaBeansTomatoBasil: ProductDescriptionData = {
  id: 'fava-beans-tomato-basil',
  category: 'Fava Beans Chips',
  name: 'Tomato & Basil',

  shortDescription:
    'A harmonious combination of bright tomato acidity and the fresh, aromatic character of basil.',
  description:
    'Discover the delicious balance of Tomato & Basil Fava Beans Chips. The lively acidity of tomatoes blends beautifully with the fresh, fragrant notes of basil, creating a harmonious and flavorful snacking experience.',
  tasteProfile: 'Tangy · Fresh · Aromatic',
  ingredients: '',
  additionalInfo: '',
  notes: '',
  nutritionalBenefits: [
    {
      id: 'tomato-basil-protein-potassium',
      productId: 'fava-beans-tomato-basil',
      icon: 'tomato-basil-protein-potassium',
      title: 'PROTEIN & POTASSIUM',
      description:
        'Fava beans naturally provide plant-based protein and contain potassium.',
    },
    {
      id: 'tomato-basil-delicate-taste',
      productId: 'fava-beans-tomato-basil',
      icon: 'tomato-basil-delicate-taste',
      title: 'DELICATE TASTE',
      description:
        'The naturally subtle character of fava beans pairs beautifully with the bright taste of tomato and aromatic basil.',
    },
    {
      id: 'tomato-basil-sea-salt-minerals',
      productId: 'fava-beans-tomato-basil',
      icon: 'tomato-basil-sea-salt-minerals',
      title: 'SEA SALT & MINERALS',
      description:
        'Lightly seasoned with sea salt for a balanced savory finish.',
    },
  ],
};

export const productDescription = favaBeansTomatoBasil;

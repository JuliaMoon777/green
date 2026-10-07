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

  shortDescription: '',
  description: '',
  tasteProfile: '',
  ingredients: '',
  additionalInfo: '',
  notes: ''
};

export const productDescription = favaBeansChiliLemon;

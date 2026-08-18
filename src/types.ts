export interface FloatingItem {
  id: string;
  name: string;
  image: string;
  x: number; // offset px from center
  y: number; // offset px from center
  size: number; // px size
  rotation: number; // deg
  blur?: number; // px blur for depth of field
  zIndex: number;
  floatDelay: number;
  floatSpeed: number;
}

export interface SnackFlavor {
  id: string;
  bigText: string;
  name: string;
  tagline: string;
  category: string;
  flavorTitle: string;
  flavorSubtitle: string;
  price: number;
  weight: string;
  bgColor: string;
  bgHex: string;
  textColor: string;
  accentColor: string;
  pillColor: string;
  packImage: string;
  packTexture: string;
  thumbImage: string;
  floatingItems: FloatingItem[];
  blurOrbColor: string;
  introText?: {
    line1: string;
    line2: string;
    description: string;
  };
  nutrition: {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
  };
  ingredients: string[];
}

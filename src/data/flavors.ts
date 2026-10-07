export interface GreenergyProduct {
  id: string;
  bigText: string;
  name: string;
  tagline: string;
  category: string;
  subtitle: string;
  price: string;
  priceValue: number;
  weight: string;
  bgColor: string;
  bgHex: string;
  textColor: string;
  accentColor: string;
  blurOrbColor: string;
  productBoxImage: string;
  thumbImage: string;
  backgroundImage: string;
  mobileBackgroundImage: string;
  badge: string;
  targetUrl: string;
  tasteNotes: string[];
  nutrition: {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
    fiber: string;
  };
  ingredients: string[];
  floatingItems: {
    id: string;
    name: string;
    image: string;
    x: number;
    y: number;
    size: number;
    rotation: number;
    zIndex: number;
    floatDelay: number;
    floatSpeed: number;
    blur?: number;
  }[];
}

// 1. FAVA BEANS CHIPS (4 Produkty)
export const FAVA_BEANS_PRODUCTS: GreenergyProduct[] = [
  {
    id: 'fava-beans-chili-lemon',
    bigText: 'CHILI',
    name: 'Chili & Lemon',
    tagline: 'CHRUPIĄCY BÓB FAVA Z OGNISTYM CHILI CAYENNE, SOCZYSTĄ CYTRYNĄ I MEKSYKAŃSKĄ NUTĄ.',
    category: 'Ognisty & Cytrusowy',
    subtitle: 'Chrupiący bób prażony z wyrazistym chili cayenne, skórką dojrzałej cytryny i różową solą morską.',
    price: '19,50 zł',
    priceValue: 19.5,
    weight: '60 g',
    bgColor: '#FAF6ED',
    bgHex: '#FAF6ED',
    textColor: '#7F130B',
    accentColor: '#DE392B',
    blurOrbColor: 'rgba(255, 179, 0, 0.35)',
    productBoxImage: '/products/fava-beans/fava-beans-chips-chili-lemon.webp',
    thumbImage: '/products/fava-beans/fava-beans-chips-chili-lemon.webp',
    backgroundImage: '/backgrounds/bg-chili-lemon.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_chili_lemon_1791370790421.jpg',
    badge: '🌶️ Meksykański Chrup',
    targetUrl: '/products/chili-lemon',
    tasteNotes: ['Ogniste chili cayenne', 'Świeża cytryna i limonka', 'Chrupiący bób fava', 'Sól morska'],
    nutrition: {
      calories: 275,
      protein: '14.2 g',
      fat: '7.8 g',
      carbs: '34.5 g',
      fiber: '8.4 g'
    },
    ingredients: [
      'Selekcjonowany bób fava (Vicia faba)',
      'Naturalna ostra papryka chili cayenne',
      'Suszona skórka z cytryny i sok z limonki',
      'Wysokooleinowy olej słonecznikowy',
      'Różowa sól morska',
      'Ekstrakt z papryki'
    ],
    floatingItems: []
  },
  {
    id: 'fava-beans-tomato-basil',
    bigText: 'TOMATO',
    name: 'Tomato & Basil',
    tagline: 'DOJRZEWAJĄCE W SŁOŃCU WŁOSKIE POMIDORY I SŁODKA BAZYLIA GENOVESE.',
    category: 'Włoski & Świeży',
    subtitle: 'Suszone w słońcu pomidory, świeża bazylia Genovese, kropla oliwy i chrupiąca tekstura.',
    price: '19,50 zł',
    priceValue: 19.5,
    weight: '60 g',
    bgColor: '#FAF4F1',
    bgHex: '#FAF4F1',
    textColor: '#6E0D0D',
    accentColor: '#C62828',
    blurOrbColor: 'rgba(76, 175, 80, 0.35)',
    productBoxImage: '/products/fava-beans/fava-beans-chips-tomato-basil.webp',
    thumbImage: '/products/fava-beans/fava-beans-chips-tomato-basil.webp',
    backgroundImage: '/backgrounds/bg-tomato-basil.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_tomato_basil_1791370801214.jpg',
    badge: '🌿 Suszone Pomidory & Bazylia Genovese',
    targetUrl: '/products/tomato-basil',
    tasteNotes: ['Pomidory San Marzano', 'Świeża bazylia Genovese', 'Oliwa z oliwek', 'Sól morska'],
    nutrition: {
      calories: 268,
      protein: '14.0 g',
      fat: '7.4 g',
      carbs: '34.0 g',
      fiber: '8.6 g'
    },
    ingredients: [
      'Łuskany bób fava',
      'Suszone pomidory mielone',
      'Suszona bazylia Genovese',
      'Suszony czosnek',
      'Oliwa z oliwek Extra Virgin',
      'Sól morska'
    ],
    floatingItems: []
  },
  {
    id: 'fava-beans-sweet-herbs-olives',
    bigText: 'OLIVES',
    name: 'Sweet Herbs & Olives',
    tagline: 'ŚRÓDZIEMNOMORSKIE ZIOŁA, CZARNE OLIWKI I ŚWIEŻY AROMAT W KAŻDYM CHRUPIĄCYM KĘSIE.',
    category: 'Śródziemnomorski & Ziołowy',
    subtitle: 'Chrupiący bób fava z bukietem aromatycznych ziół śródziemnomorskich, nutą oliwek i morską solą.',
    price: '19,50 zł',
    priceValue: 19.5,
    weight: '60 g',
    bgColor: '#F2F8F8',
    bgHex: '#F2F8F8',
    textColor: '#08434F',
    accentColor: '#2B8FA3',
    blurOrbColor: 'rgba(0, 229, 255, 0.30)',
    productBoxImage: '/products/fava-beans/fava-beans-chips-sweet-herbs-olives.webp',
    thumbImage: '/products/fava-beans/fava-beans-chips-sweet-herbs-olives.webp',
    backgroundImage: '/backgrounds/bg-sweet-herbs-olives.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_herbs_olives_1791370813938.jpg',
    badge: '🫒 Zioła & Czarne Oliwki',
    targetUrl: '/products/sweet-herbs-olives',
    tasteNotes: ['Wędzone zioła śródziemnomorskie', 'Czarne oliwki', 'Rozmaryn i tymianek', 'Sól morska'],
    nutrition: {
      calories: 270,
      protein: '14.5 g',
      fat: '7.5 g',
      carbs: '33.8 g',
      fiber: '8.8 g'
    },
    ingredients: [
      'Całe ziarna bobu fava',
      'Zioła śródziemnomorskie (rozmaryn, tymianek, oregano)',
      'Ekstrakt z czarnych oliwek',
      'Czosnek i cebula',
      'Olej słonecznikowy',
      'Sól morska'
    ],
    floatingItems: []
  },
  {
    id: 'fava-beans-honey-mustard',
    bigText: 'HONEY',
    name: 'Honey & Mustard',
    tagline: 'NATURALNY DZIKI MIÓD I MUSZTARDA DIJON W POŁĄCZENIU Z CHRUPIĄCYM BOBEM.',
    category: 'Słodko-Pikantny',
    subtitle: 'Aromatyczny miód wielokwiatowy, ziarna francuskiej musztardy Dijon i perfekcyjny chrup.',
    price: '19,50 zł',
    priceValue: 19.5,
    weight: '60 g',
    bgColor: '#FCFAF0',
    bgHex: '#FCFAF0',
    textColor: '#8D3B03',
    accentColor: '#E69500',
    blurOrbColor: 'rgba(255, 145, 0, 0.35)',
    productBoxImage: '/products/fava-beans/fava-beans-chips-honey-mustard.webp',
    thumbImage: '/products/fava-beans/fava-beans-chips-honey-mustard.webp',
    backgroundImage: '/backgrounds/bg-honey-mustard.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_honey_mustard_1791370829655.jpg',
    badge: '🍯 Dziki Miód & Musztarda Dijon',
    targetUrl: '/products/honey-mustard',
    tasteNotes: ['Naturalny dziki miód', 'Musztarda francuska Dijon', 'Złocisty bób', 'Delikatny karmel'],
    nutrition: {
      calories: 280,
      protein: '13.8 g',
      fat: '8.2 g',
      carbs: '36.0 g',
      fiber: '8.0 g'
    },
    ingredients: [
      'Selekcjonowany bób fava',
      'Naturalny miód pszczeli',
      'Ziarna gorczycy żółtej i czarnej',
      'Naturalny ocet jabłkowy',
      'Tłoczony olej słonecznikowy',
      'Sól morska'
    ],
    floatingItems: []
  }
];

// 2. CHICKPEA PROTEIN SNACKS (2 Produkty)
export const CHICKPEA_SNACKS_PRODUCTS: GreenergyProduct[] = [
  {
    id: 'chickpea-lemon-pepper',
    bigText: 'LEMON',
    name: 'Chickpea Lemon & Pepper',
    tagline: 'PIECZONA CIECIERZYCA Z CYTRYNOWĄ NUTĄ I GRUBO MIELONYM CZARNYM PIEPRZEM.',
    category: 'Cytrusowy & Pieprzny',
    subtitle: 'Chrupiąca ciecierzyca bogata w białko roślinne i błonnik, doprawiona świeżą cytryną i aromatycznym pieprzem.',
    price: '16,50 zł',
    priceValue: 16.5,
    weight: '50 g',
    bgColor: '#FAFBF5',
    bgHex: '#FAFBF5',
    textColor: '#5D4904',
    accentColor: '#C49B05',
    blurOrbColor: 'rgba(244, 208, 63, 0.35)',
    productBoxImage: '/products/chickpea-protein-snacks/chickpea-protein-snack-lemon-pepper.webp',
    thumbImage: '/products/chickpea-protein-snacks/chickpea-protein-snack-lemon-pepper.webp',
    backgroundImage: '/backgrounds/bg-chickpea-lemon-pepper.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_lemon_pepper_1791370841820.jpg',
    badge: '🍋 Cytryna & Czarny Pieprz',
    targetUrl: '/products/chickpea-lemon-pepper',
    tasteNotes: ['Pieczona ciecierzyca', 'Zesty lemon', 'Grubo mielony czarny pieprz', 'Sól morska'],
    nutrition: {
      calories: 245,
      protein: '12.5 g',
      fat: '6.2 g',
      carbs: '31.0 g',
      fiber: '9.0 g'
    },
    ingredients: [
      'Ciecierzyca (Cicer arietinum)',
      'Olej słonecznikowy wysokooleinowy',
      'Naturalny aromat cytrynowy',
      'Czarny pieprz grubo mielony',
      'Sól morska'
    ],
    floatingItems: []
  },
  {
    id: 'chickpea-salted',
    bigText: 'SALT',
    name: 'Chickpea Sea Salted',
    tagline: 'KLASYCZNA PIECZONA CIECIERZYCA Z DROBNĄ KRYSZTAŁOWĄ SOLĄ MORSKĄ.',
    category: 'Klasyczny & Słony',
    subtitle: 'Czysty skład, prażona na chrupko ciecierzyca ze szczyptą naturalnej soli morskiej.',
    price: '16,50 zł',
    priceValue: 16.5,
    weight: '50 g',
    bgColor: '#FAF7F0',
    bgHex: '#FAF7F0',
    textColor: '#4A3B2C',
    accentColor: '#A37C44',
    blurOrbColor: 'rgba(215, 185, 142, 0.35)',
    productBoxImage: '/products/chickpea-protein-snacks/chickpea-protein-snack-salted.webp',
    thumbImage: '/products/chickpea-protein-snacks/chickpea-protein-snack-salted.webp',
    backgroundImage: '/backgrounds/bg-chickpea-salted.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_chickpea_salted_1791370851685.jpg',
    badge: '🧂 Sól Morska & Czysta Ciecierzyca',
    targetUrl: '/products/chickpea-salted',
    tasteNotes: ['Chrupiąca ciecierzyca', 'Czysta sól morska', 'Olej słonecznikowy', 'Orzechowy finisz'],
    nutrition: {
      calories: 240,
      protein: '12.8 g',
      fat: '6.0 g',
      carbs: '30.5 g',
      fiber: '9.2 g'
    },
    ingredients: [
      'Prażona ciecierzyca bio',
      'Olej słonecznikowy tłoczony',
      'Sól morska drobnoziarnista'
    ],
    floatingItems: []
  }
];

// 3. PROTEIN COOKIES (3 Produkty w jednej kategorii)
export const PROTEIN_COOKIES_PRODUCTS: GreenergyProduct[] = [
  {
    id: 'protein-cookies-apple-cinnamon',
    bigText: 'APPLE',
    name: 'Apple & Cinnamon',
    tagline: 'MIĘKKIE CIASTKO BIAŁKOWE Z SOCZYSTYM JABŁKIEM, CYNAMONEM I 20G BIAŁKA.',
    category: '20g Białka Roślinnego',
    subtitle: 'Organiczne suszone jabłka, cynamon cejloński, bezglutenowy owies i czysty izolat białka roślinnego.',
    price: '14,90 zł',
    priceValue: 14.9,
    weight: '75 g',
    bgColor: '#FAF3EB',
    bgHex: '#FAF3EB',
    textColor: '#581608',
    accentColor: '#C55333',
    blurOrbColor: 'rgba(255, 167, 38, 0.35)',
    productBoxImage: '/products/protein-cookies/protein-cookies-apple-cinnamon.webp',
    thumbImage: '/products/protein-cookies/protein-cookies-apple-cinnamon.webp',
    backgroundImage: '/backgrounds/bg-cookie-apple-cinnamon.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_apple_cinnamon_1791370881947.jpg',
    badge: '🍎 20g Białka | Apple & Cinnamon',
    targetUrl: '/products/cookie-apple-cinnamon',
    tasteNotes: ['Dojrzałe jabłko bio', 'Cynamon cejloński', 'Aksamitne daktyle', 'Owies bezglutenowy'],
    nutrition: {
      calories: 275,
      protein: '20.0 g',
      fat: '9.8 g',
      carbs: '26.2 g',
      fiber: '7.5 g'
    },
    ingredients: [
      'Kompleks białek roślinnych (groch, ryż) 32%',
      'Suszone jabłka bio 24%',
      'Mąka owsiana bezglutenowa 18%',
      'Błonnik z korzenia cykorii',
      'Mielony cynamon cejloński 4%',
      'Sól morska'
    ],
    floatingItems: []
  },
  {
    id: 'protein-cookies-double-chocolate',
    bigText: 'CHOCOLATE',
    name: 'Double Chocolate',
    tagline: 'GŁĘBOKA CIEMNA CZEKOLADA Z KAWAŁKAMI SUROWEGO KAKAO I 20G BIAŁKA.',
    category: '20g Białka Roślinnego',
    subtitle: 'Prawdziwe belgijskie kakao, chrupiące dropsy z surowej czekolady, orzechy nerkowca i proteiny.',
    price: '14,90 zł',
    priceValue: 14.9,
    weight: '75 g',
    bgColor: '#F8F2EC',
    bgHex: '#F8F2EC',
    textColor: '#3A1E14',
    accentColor: '#8D5B4C',
    blurOrbColor: 'rgba(192, 133, 82, 0.35)',
    productBoxImage: '/products/protein-cookies/protein-cookies-double-chocolate.webp',
    thumbImage: '/products/protein-cookies/protein-cookies-double-chocolate.webp',
    backgroundImage: '/backgrounds/bg-cookie-double-chocolate.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_double_chocolate_1791370866975.jpg',
    badge: '🍫 20g Białka | Double Choc',
    targetUrl: '/products/cookie-double-chocolate',
    tasteNotes: ['Belgijskie kakao 70%', 'Surowe nibsy kakaowe', 'Różowa sól himalajska', 'Masło migdałowe'],
    nutrition: {
      calories: 285,
      protein: '20.0 g',
      fat: '11.2 g',
      carbs: '24.5 g',
      fiber: '7.8 g'
    },
    ingredients: [
      'Izolat białka grochu i ryżu 30%',
      'Ciemna czekolada bez cukru 22%',
      'Mąka migdałowa 18%',
      'Błonnik z korzenia cykorii',
      'Masło kakaowe virgin',
      'Sól morska'
    ],
    floatingItems: []
  },
  {
    id: 'protein-cookies-creamy-butter-graham',
    bigText: 'CREAMY',
    name: 'Creamy Butter + Graham',
    tagline: 'MAŚLANE CIASTKO Z GRAHAMEM, WANILIĄ BOURBON I 20G BIAŁKA ROŚLINNEGO.',
    category: '20g Białka Roślinnego',
    subtitle: 'Aksamitny maślany smak, prażone ziarna graham, naturalna wanilia Bourbon i czyste proteiny roślinne.',
    price: '14,90 zł',
    priceValue: 14.9,
    weight: '75 g',
    bgColor: '#FBF7EE',
    bgHex: '#FBF7EE',
    textColor: '#4E3629',
    accentColor: '#C49450',
    blurOrbColor: 'rgba(230, 185, 128, 0.35)',
    productBoxImage: '/products/protein-cookies/protein-cookies-creamy-butter-graham.webp',
    thumbImage: '/products/protein-cookies/protein-cookies-creamy-butter-graham.webp',
    backgroundImage: '/backgrounds/bg-cookie-creamy-butter-graham.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_butter_graham_1791370892915.jpg',
    badge: '🧈 20g Białka | Creamy Butter',
    targetUrl: '/products/cookie-creamy-butter-graham',
    tasteNotes: ['Naturalne masło roślinne', 'Złocisty graham', 'Wanilia Bourbon', 'Owies bezglutenowy'],
    nutrition: {
      calories: 280,
      protein: '20.0 g',
      fat: '10.5 g',
      carbs: '25.0 g',
      fiber: '7.6 g'
    },
    ingredients: [
      'Izolat białka grochu i ryżu 31%',
      'Mąka graham bezglutenowa 22%',
      'Naturalny aromat maślany roślinny',
      'Ekstrakt z wanilii Bourbon',
      'Błonnik z korzenia cykorii',
      'Sól morska'
    ],
    floatingItems: []
  },
  {
    id: 'protein-cookies-display-box',
    bigText: 'COOKIES',
    name: 'Protein Cookies Display Box',
    tagline: 'ZESTAW ZBIORCZY PROTEIN COOKIES — 20G BIAŁKA ROŚLINNEGO W KAŻDYM CIASTKU.',
    category: 'Display Box · Zestaw',
    subtitle: 'Opakowanie zbiorcze rzemieślniczych ciastek białkowych Greenergy.',
    price: '149,00 zł',
    priceValue: 149.0,
    weight: '12 × 75 g',
    bgColor: '#F9F3EC',
    bgHex: '#F9F3EC',
    textColor: '#3E2217',
    accentColor: '#9E5A3C',
    blurOrbColor: 'rgba(196, 148, 80, 0.32)',
    productBoxImage: '/products/protein-cookies/protein-cookies-display-box.webp',
    thumbImage: '/products/protein-cookies/protein-cookies-display-box.webp',
    backgroundImage: '/backgrounds/bg-cookie-display-box.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_double_chocolate_1791370866975.jpg',
    badge: '📦 Display Box | Protein Cookies',
    targetUrl: '/products/protein-cookies-display-box',
    tasteNotes: ['Apple & Cinnamon', 'Double Chocolate', 'Creamy Butter + Graham'],
    nutrition: {
      calories: 280,
      protein: '20.0 g',
      fat: '10.5 g',
      carbs: '25.2 g',
      fiber: '7.6 g'
    },
    ingredients: [
      'Izolat białka grochu i ryżu',
      'Bezglutenowy owies i mąka migdałowa',
      'Błonnik z korzenia cykorii',
      'Sól morska'
    ],
    floatingItems: []
  }
];

// 4. PEANUTS & FAVA BEANS MIX (2 Produkty)
export const PEANUTS_FAVA_PRODUCTS: GreenergyProduct[] = [
  {
    id: 'peanuts-fava-red-thai',
    bigText: 'THAI',
    name: 'Red Thai Peanuts & Fava',
    tagline: 'EGZOTYCZNE CZERWONE CURRY THAI, PRAŻONE ORZESZKI I CHRUPIĄCY BÓB.',
    category: 'Pikantny & Egzotyczny',
    subtitle: 'Mieszanka proteinowa chrupiących orzeszków ziemnych i chipsów z bobu z ognistą nutą Red Thai curry.',
    price: '17,50 zł',
    priceValue: 17.5,
    weight: '70 g',
    bgColor: '#1E1412',
    bgHex: '#1E1412',
    textColor: '#F5EBE6',
    accentColor: '#E53935',
    blurOrbColor: 'rgba(230, 81, 0, 0.35)',
    productBoxImage: '/products/peanuts-fava/peanuts-fava-beans-red-thai.webp',
    thumbImage: '/products/peanuts-fava/peanuts-fava-beans-red-thai.webp',
    backgroundImage: '/backgrounds/bg-peanuts-fava-red-thai.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_red_thai_1791370906899.jpg',
    badge: '🌶️ Ogniste Red Thai & Orzeszki',
    targetUrl: '/products/peanuts-fava-red-thai',
    tasteNotes: ['Prażone orzeszki ziemne', 'Chrupiący bób fava', 'Czerwone tajskie curry', 'Limonka i chili'],
    nutrition: {
      calories: 345,
      protein: '16.8 g',
      fat: '19.5 g',
      carbs: '22.0 g',
      fiber: '7.5 g'
    },
    ingredients: [
      'Orzeszki ziemne prażone (56%)',
      'Prażony bób fava (32%)',
      'Olej słonecznikowy',
      'Przyprawa Red Thai curry (papryka, chili, kolendra, imbir)',
      'Sól morska'
    ],
    floatingItems: []
  },
  {
    id: 'peanuts-fava-sweet-mustard',
    bigText: 'MUSTARD',
    name: 'Sweet Mustard Peanuts & Fava',
    tagline: 'SŁODKA MIODOWA MUSZTARDA, ZŁOCISTE ORZESZKI I CHRUPIĄCE CHIPSY Z BOBU.',
    category: 'Słodki & Gorczycowy',
    subtitle: 'Chrupiący miks orzechów i bobu w wyrazistej słodkiej musztardzie miodowej z nutą ziół.',
    price: '17,50 zł',
    priceValue: 17.5,
    weight: '70 g',
    bgColor: '#1F180E',
    bgHex: '#1F180E',
    textColor: '#F8F3E6',
    accentColor: '#E6A100',
    blurOrbColor: 'rgba(241, 196, 15, 0.30)',
    productBoxImage: '/products/peanuts-fava/peanuts-fava-beans-sweet-mustard.webp',
    thumbImage: '/products/peanuts-fava/peanuts-fava-beans-sweet-mustard.webp',
    backgroundImage: '/backgrounds/bg-peanuts-fava-sweet-mustard.webp',
    mobileBackgroundImage: '/src/assets/images/bg_mobile_sweet_mustard_1791370928490.jpg',
    badge: '🟡 Słodka Musztarda & Orzeszki',
    targetUrl: '/products/peanuts-fava-sweet-mustard',
    tasteNotes: ['Orzeszki arachidowe', 'Chipsy z bobu', 'Słodka musztarda', 'Miód i ziarna gorczycy'],
    nutrition: {
      calories: 340,
      protein: '16.5 g',
      fat: '19.0 g',
      carbs: '23.0 g',
      fiber: '7.4 g'
    },
    ingredients: [
      'Orzeszki ziemne (56%)',
      'Bób fava (32%)',
      'Olej słonecznikowy',
      'Aromatyczna słodka musztarda (gorczyca, ocet jabłkowy, naturalny aromat miodu)',
      'Sól morska'
    ],
    floatingItems: []
  }
];

// Backwards compatibility aliases
export const GREENERGY_PRODUCTS = FAVA_BEANS_PRODUCTS;
export const RAW_BALLS_PRODUCTS = CHICKPEA_SNACKS_PRODUCTS;
export const PRE_WORKOUT_PRODUCTS = PEANUTS_FAVA_PRODUCTS;
export const SNACK_FLAVORS = FAVA_BEANS_PRODUCTS as unknown as import('../types').SnackFlavor[];

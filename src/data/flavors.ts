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

export const GREENERGY_PRODUCTS: GreenergyProduct[] = [
  {
    id: 'chili-lemon',
    bigText: 'CHILI',
    name: 'Chili & Lemon',
    tagline: 'CHRUPIĄCY BÓB FAVA Z OGNISTYM CHILI CAYENNE, SOCZYSTĄ CYTRYNĄ I MEKSYKAŃSKĄ NUTĄ.',
    category: 'Ognisty & Cytrusowy',
    subtitle: 'Chrupiący bób prażony z wyrazistym chili cayenne, skórką dojrzałej cytryny i różową solą morską.',
    price: '19,50 zł',
    priceValue: 19.5,
    weight: '60 g',
    bgColor: '#DE392B', // Wyrazisty ognisty czerwony chili
    bgHex: '#DE392B',
    textColor: '#7F130B', // Głęboki burgund chili
    accentColor: '#96150C',
    blurOrbColor: '#FF9500',
    productBoxImage: 'https://i.postimg.cc/1tQtxXTD/chili-lemon-pouch.png',
    thumbImage: 'https://i.postimg.cc/1tQtxXTD/chili-lemon-pouch.png',
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
    floatingItems: [
      {
        id: 'chili-extra-1',
        name: 'Chili & Lemon Składnik 1',
        image: 'https://i.postimg.cc/prB5czLy/exec-e71d48db-63c8-46bb-a2cc-69cbf30d041e.png',
        x: -240,
        y: -110,
        size: 125,
        rotation: 0,
        zIndex: 30,
        floatDelay: 0.1,
        floatSpeed: 4.6
      },
      {
        id: 'chili-extra-2',
        name: 'Chili & Lemon Składnik 2',
        image: 'https://i.postimg.cc/L5VgQL8Z/exec-bdffb55b-ff20-4e1f-aa37-4664d97b635a.png',
        x: 250,
        y: -115,
        size: 120,
        rotation: 0,
        zIndex: 35,
        floatDelay: 0.3,
        floatSpeed: 5.4
      },
      {
        id: 'chili-extra-3',
        name: 'Chili & Lemon Składnik 3',
        image: 'https://i.postimg.cc/2yYBx2rm/exec-12a72897-0660-47a0-b188-e8c22fbedbc3.png',
        x: 200,
        y: 110,
        size: 110,
        rotation: 0,
        zIndex: 20,
        floatDelay: 0.5,
        floatSpeed: 4.8
      }
    ]
  },
  {
    id: 'honey-mustard',
    bigText: 'HONEY',
    name: 'Honey & Mustard',
    tagline: 'NATURALNY DZIKI MIÓD I MUSZTARDA DIJON W POŁĄCZENIU Z CHRUPIĄCYM BOBEM.',
    category: 'Słodko-Pikantny',
    subtitle: 'Aromatyczny miód wielokwiatowy, ziarna francuskiej musztardy Dijon i perfekcyjny chrup.',
    price: '19,50 zł',
    priceValue: 19.5,
    weight: '60 g',
    bgColor: '#F7CE46', // Miodowo-musztardowy złoty kolor
    bgHex: '#F7CE46',
    textColor: '#A04000', // Głęboki bursztyn miodowy
    accentColor: '#A04000',
    blurOrbColor: '#FF9100',
    productBoxImage: 'https://i.postimg.cc/SQL9KFfm/honey-mustard-pouch.png',
    thumbImage: 'https://i.postimg.cc/SQL9KFfm/honey-mustard-pouch.png',
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
    floatingItems: [
      {
        id: 'honey-extra-1',
        name: 'Honey & Mustard Składnik 1',
        image: 'https://i.postimg.cc/T1c5Ng36/exec-78eb4af2-b3ce-4554-8418-ba38c6a28600.png',
        x: -240,
        y: -110,
        size: 125,
        rotation: 0,
        zIndex: 30,
        floatDelay: 0.1,
        floatSpeed: 4.7
      },
      {
        id: 'honey-extra-2',
        name: 'Honey & Mustard Składnik 2',
        image: 'https://i.postimg.cc/2yYBx2md/exec-0b96d9a4-a977-48fd-a5de-1f9e1f283bd6.png',
        x: 250,
        y: -115,
        size: 120,
        rotation: 0,
        zIndex: 35,
        floatDelay: 0.3,
        floatSpeed: 5.6
      },
      {
        id: 'honey-extra-3',
        name: 'Honey & Mustard Składnik 3',
        image: 'https://i.postimg.cc/PJH8M2hy/exec-1db1d546-424c-40b8-bbc7-f55bd2db7e22.png',
        x: 200,
        y: 110,
        size: 110,
        rotation: 0,
        zIndex: 20,
        floatDelay: 0.5,
        floatSpeed: 4.5
      }
    ]
  },
  {
    id: 'summer-spices',
    bigText: 'SUMMER',
    name: 'Summer Spices',
    tagline: 'ZIOŁA BBQ, ŚRÓDZIEMNOMORSKI ROZMARYN I LETNI AROMAT W KAŻDYM KĘSIE.',
    category: 'Wędzony & Ziołowy',
    subtitle: 'Aromat letniego grilla BBQ, wędzona papryka, śródziemnomorski rozmaryn i tymianek.',
    price: '19,50 zł',
    priceValue: 19.5,
    weight: '60 g',
    bgColor: '#38B5CF', // Lazurowo-błękitny kolor Summer Spices
    bgHex: '#38B5CF',
    textColor: '#06495C', // Głęboki morski granat
    accentColor: '#06495C',
    blurOrbColor: '#00E5FF',
    productBoxImage: 'https://i.postimg.cc/SQL9KFfS/summer-spices-pouch-clean.png',
    thumbImage: 'https://i.postimg.cc/SQL9KFfS/summer-spices-pouch-clean.png',
    badge: '☀️ Letni Grill & Zioła Śródziemnomorskie',
    targetUrl: '/products/summer-spices',
    tasteNotes: ['Wędzona papryka pimentón', 'Świeży rozmaryn', 'Tymianek i oregano', 'Aromat grilla'],
    nutrition: {
      calories: 270,
      protein: '14.5 g',
      fat: '7.5 g',
      carbs: '33.8 g',
      fiber: '8.8 g'
    },
    ingredients: [
      'Całe ziarna bobu fava',
      'Hiszpańska wędzona papryka Pimentón',
      'Suszony rozmaryn i tymianek',
      'Czosnek i cebula',
      'Olej słonecznikowy rafinowany',
      'Sól morska'
    ],
    floatingItems: [
      {
        id: 'summer-extra-1',
        name: 'Summer Spices Składnik 1',
        image: 'https://i.postimg.cc/cCctkwLZ/exec-621e9c77-7446-4b6f-bfc2-0480446a6dc7.png',
        x: -240,
        y: -110,
        size: 125,
        rotation: 0,
        zIndex: 30,
        floatDelay: 0.1,
        floatSpeed: 4.5
      },
      {
        id: 'summer-extra-2',
        name: 'Summer Spices Składnik 2',
        image: 'https://i.postimg.cc/T1xWcCfM/exec-24a640a7-991f-4808-9825-8d02779b0cfe.png',
        x: 250,
        y: -115,
        size: 120,
        rotation: 0,
        zIndex: 35,
        floatDelay: 0.3,
        floatSpeed: 5.5
      },
      {
        id: 'summer-extra-3',
        name: 'Summer Spices Składnik 3',
        image: 'https://i.postimg.cc/63cGYC3R/exec-dfe62066-a844-4d1b-a09c-48540428c31b-(1).png',
        x: 200,
        y: 110,
        size: 110,
        rotation: 0,
        zIndex: 20,
        floatDelay: 0.5,
        floatSpeed: 4.7
      }
    ]
  },
  {
    id: 'tomato-basil',
    bigText: 'TOMATO',
    name: 'Tomato & Basil',
    tagline: 'DOJRZEWAJĄCE W SŁOŃCU WŁOSKIE POMIDORY I SŁODKA BAZYLIA GENOVESE.',
    category: 'Włoski & Świeży',
    subtitle: 'Suszone w słońcu pomidory, świeża bazylia Genovese, kropla oliwy i chrupiąca tekstura.',
    price: '19,50 zł',
    priceValue: 19.5,
    weight: '60 g',
    bgColor: '#CC2B2B', // Dojrzały włoski pomidorowy czerwony
    bgHex: '#CC2B2B',
    textColor: '#6E0D0D', // Głęboki karmin pomidorowy
    accentColor: '#1F6B2A', // Świeża zieleń bazylii Genovese jako elegancki akcent
    blurOrbColor: '#4CAF50',
    productBoxImage: 'https://i.postimg.cc/G3PDpwxm/tomato-basil-pouch.png',
    thumbImage: 'https://i.postimg.cc/G3PDpwxm/tomato-basil-pouch.png',
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
    floatingItems: [
      {
        id: 'tomato-extra-1',
        name: 'Tomato & Basil Składnik 1',
        image: 'https://i.postimg.cc/tJbVz2yD/exec-7d67ab8c-fba3-4d40-855b-84b8c6712e10.png',
        x: -240,
        y: -110,
        size: 125,
        rotation: 0,
        zIndex: 30,
        floatDelay: 0.1,
        floatSpeed: 4.4
      },
      {
        id: 'tomato-extra-2',
        name: 'Tomato & Basil Składnik 2',
        image: 'https://i.postimg.cc/595ztdSx/exec-eb35f592-fbcb-4de4-a1c4-c68a62f9426f.png',
        x: 250,
        y: -115,
        size: 120,
        rotation: 0,
        zIndex: 35,
        floatDelay: 0.3,
        floatSpeed: 5.6
      },
      {
        id: 'tomato-extra-3',
        name: 'Tomato & Basil Składnik 3',
        image: 'https://i.postimg.cc/sX7hStFH/exec-6d773f53-c41c-42a5-a7fd-cf2435829992.png',
        x: 200,
        y: 110,
        size: 110,
        rotation: 0,
        zIndex: 20,
        floatDelay: 0.5,
        floatSpeed: 4.6
      }
    ]
  }
];

export const RAW_BALLS_PRODUCTS: GreenergyProduct[] = [
  {
    id: 'raw-balls-apple-cinnamon',
    bigText: 'APPLE',
    name: 'Apple & Cinnamon',
    tagline: 'SOCZYSTE SUSZONE JABŁKA Z AROMATYCZNYM CYNAMONEM CEYLOŃSKIM I DAKTYLAMI.',
    category: 'Korzenny & Owocowy',
    subtitle: 'Organiczne suszone jabłka, prawdziwy cynamon cejloński, słodkie daktyle i chrupiące orzechy.',
    price: '18,90 zł',
    priceValue: 18.9,
    weight: '70 g (4 szt.)',
    bgColor: '#D8583B', // Ciepły, korzenny odcień pieczonego jabłka i cynamonu
    bgHex: '#D8583B',
    textColor: '#6B1E12', // Głęboki cynamonowo-jabłkowy
    accentColor: '#6B1E12',
    blurOrbColor: '#FFA726',
    productBoxImage: 'https://i.postimg.cc/jjFY7QGt/apple-cinnamon-display-pack.png',
    thumbImage: 'https://i.postimg.cc/jjFY7QGt/apple-cinnamon-display-pack.png',
    badge: '🍎 Suszone Jabłko & Cynamon Cejloński',
    targetUrl: '/products/raw-balls-apple-cinnamon',
    tasteNotes: ['Dojrzałe jabłko', 'Cynamon cejloński', 'Aksamitne daktyle', 'Nuta goździków'],
    nutrition: {
      calories: 265,
      protein: '6.8 g',
      fat: '11.5 g',
      carbs: '33.2 g',
      fiber: '6.9 g'
    },
    ingredients: [
      'Daktyle suszone 48%',
      'Suszone jabłka 24%',
      'Orzechy nerkowca 16%',
      'Mielony cynamon cejloński 8%',
      'Ekstrakt z wanilii Bourbon',
      'Sól himalajska'
    ],
    floatingItems: [
      {
        id: 'apple-cluster-1',
        name: 'Soczyste Jabłka',
        image: 'https://i.postimg.cc/vmNwVLpw/apple-ingredient-cluster.png',
        x: -245,
        y: -75,
        size: 140,
        rotation: 0,
        zIndex: 30,
        floatDelay: 0.1,
        floatSpeed: 4.8
      },
      {
        id: 'cinnamon-cluster-1',
        name: 'Aromatyczny Cynamon',
        image: 'https://i.postimg.cc/5y8hDcjW/cinnamon-ingredient-cluster.png',
        x: 245,
        y: -65,
        size: 138,
        rotation: 0,
        zIndex: 35,
        floatDelay: 0.25,
        floatSpeed: 5.2
      }
    ]
  },
  {
    id: 'raw-balls-apricot-tea',
    bigText: 'APRICOT',
    name: 'Apricot & White Tea',
    tagline: 'SŁODKIE MORELE POŁĄCZONE ZE SZLACHETNĄ BIAŁĄ HERBATĄ PAI MU TAN.',
    category: 'Delikatny & Szlachetny',
    subtitle: 'Suszone na słońcu morele, ekstrakt ze szlachetnej białej herbaty Pai Mu Tan i kremowe migdały.',
    price: '18,90 zł',
    priceValue: 18.9,
    weight: '70 g (4 szt.)',
    bgColor: '#E88938', // Słoneczny morelowo-bursztynowy
    bgHex: '#E88938',
    textColor: '#733504',
    accentColor: '#733504',
    blurOrbColor: '#FFB703',
    productBoxImage: 'https://i.postimg.cc/fbrQ9j6z/apricot-tea-display-pack.png',
    thumbImage: 'https://i.postimg.cc/fbrQ9j6z/apricot-tea-display-pack.png',
    badge: '🍑 Słoneczna Morela & Biała Herbata',
    targetUrl: '/products/raw-balls-apricot-tea',
    tasteNotes: ['Dojrzała morela', 'Biała herbata Pai Mu Tan', 'Migdały kalifornijskie', 'Kwiat pomarańczy'],
    nutrition: {
      calories: 258,
      protein: '7.2 g',
      fat: '10.8 g',
      carbs: '34.5 g',
      fiber: '7.2 g'
    },
    ingredients: [
      'Suszone morele niesiarkowane 42%',
      'Daktyle 30%',
      'Migdały blanszowane 18%',
      'Ekstrakt z białej herbaty Pai Mu Tan 7%',
      'Naturalny aromat morelowy',
      'Sól morska'
    ],
    floatingItems: [
      {
        id: 'apricot-cluster-1',
        name: 'Suszone Morele',
        image: 'https://i.postimg.cc/rpP2rCvm/apricot-ingredient-cluster.png',
        x: -245,
        y: -75,
        size: 140,
        rotation: 0,
        zIndex: 30,
        floatDelay: 0.1,
        floatSpeed: 4.8
      },
      {
        id: 'white-tea-branch-1',
        name: 'Liście Białej Herbaty',
        image: 'https://i.postimg.cc/xT2DMdFk/white-tea-leaf-branch.png',
        x: 245,
        y: -65,
        size: 140,
        rotation: 0,
        zIndex: 35,
        floatDelay: 0.25,
        floatSpeed: 5.2
      }
    ]
  },
  {
    id: 'raw-balls-beetroot-blueberry',
    bigText: 'BEETROOT',
    name: 'Beetroot & Blueberry',
    tagline: 'SUPERFOODS: BURAK RUBINOWY I DZIKA LEŚNA JAGODA Z ANTYOKSYDANTAMI.',
    category: 'Superfoods & Antyoksydanty',
    subtitle: 'Rubinowy burak liofilizowany połączony z dzikimi leśnymi jagodami i nasionami chia.',
    price: '18,90 zł',
    priceValue: 18.9,
    weight: '70 g (4 szt.)',
    bgColor: '#A42456', // Głęboki rubinowo-buraczkowy / fuksjowy
    bgHex: '#A42456',
    textColor: '#4A0620',
    accentColor: '#4A0620',
    blurOrbColor: '#E91E63',
    productBoxImage: 'https://i.postimg.cc/yxqqf61h/beetroot-blueberry-display-pack.png',
    thumbImage: 'https://i.postimg.cc/yxqqf61h/beetroot-blueberry-display-pack.png',
    badge: '🫐 Burak Rubinowy & Dzika Jagoda',
    targetUrl: '/products/raw-balls-beetroot-blueberry',
    tasteNotes: ['Dzika leśna jagoda', 'Słodki rubinowy burak', 'Kremowe nerkowce', 'Nasiona chia'],
    nutrition: {
      calories: 260,
      protein: '7.5 g',
      fat: '11.0 g',
      carbs: '32.8 g',
      fiber: '8.2 g'
    },
    ingredients: [
      'Daktyle 40%',
      'Liofilizowany burak rubinowy 22%',
      'Liofilizowane dzikie jagody 18%',
      'Orzechy nerkowca 12%',
      'Nasiona chia 6%',
      'Sól morska'
    ],
    floatingItems: [
      {
        id: 'beetroot-item-1',
        name: 'Rubinowy Burak',
        image: 'https://i.postimg.cc/vTRRP8Y2/beetroot-ingredient.png',
        x: -245,
        y: -75,
        size: 138,
        rotation: 0,
        zIndex: 30,
        floatDelay: 0.1,
        floatSpeed: 4.8
      },
      {
        id: 'blueberry-cluster-1',
        name: 'Dzikie Jagody Leśne',
        image: 'https://i.postimg.cc/ZnkkfYbM/blueberry-ingredient-cluster-(1).png',
        x: 245,
        y: -65,
        size: 140,
        rotation: 0,
        zIndex: 35,
        floatDelay: 0.25,
        floatSpeed: 5.2
      }
    ]
  },
  {
    id: 'raw-balls-blueberry-salt',
    bigText: 'BLUEBERRY',
    name: 'Blueberry & Salt',
    tagline: 'SŁODKA DZIKA JAGODA ZE SZCZYPTĄ NATURALNEJ SOLI MORSKIEJ I ORZECHAMI.',
    category: 'Słodko-Słony Akcent',
    subtitle: 'Leśna jagoda w harmonii z kryształkami soli morskiej i kremowymi orzechami nerkowca.',
    price: '18,90 zł',
    priceValue: 18.9,
    weight: '70 g (4 szt.)',
    bgColor: '#3E5086', // Elegancki głęboki szafirowo-jagodowy
    bgHex: '#3E5086',
    textColor: '#151F3D',
    accentColor: '#151F3D',
    blurOrbColor: '#5C7CFA',
    productBoxImage: 'https://i.postimg.cc/6qCkFsqS/blueberry-salt-display-pack.png',
    thumbImage: 'https://i.postimg.cc/6qCkFsqS/blueberry-salt-display-pack.png',
    badge: '🧂 Leśna Jagoda & Sól Morska',
    targetUrl: '/products/raw-balls-blueberry-salt',
    tasteNotes: ['Soczysta jagoda leśna', 'Kryształki soli morskiej', 'Orzechy nerkowca', 'Kremowe masło migdałowe'],
    nutrition: {
      calories: 268,
      protein: '8.0 g',
      fat: '12.2 g',
      carbs: '31.5 g',
      fiber: '7.0 g'
    },
    ingredients: [
      'Daktyle Medjool 42%',
      'Dzikie jagody 25%',
      'Orzechy nerkowca 20%',
      'Sól morska gruboziarnista 3%',
      'Ekstrakt z wanilii Bourbon 5%',
      'Olej kokosowy virgin'
    ],
    floatingItems: [
      {
        id: 'salt-scoop-1',
        name: 'Kryształki Soli Morskiej',
        image: 'https://i.postimg.cc/VL8QnNHs/salt-scoop-and-crystals.png',
        x: -245,
        y: -75,
        size: 140,
        rotation: 0,
        zIndex: 30,
        floatDelay: 0.1,
        floatSpeed: 4.8
      },
      {
        id: 'blueberry-cluster-2',
        name: 'Dzikie Jagody',
        image: 'https://i.postimg.cc/ZnkkfYbM/blueberry-ingredient-cluster-(1).png',
        x: 245,
        y: -65,
        size: 140,
        rotation: 0,
        zIndex: 35,
        floatDelay: 0.25,
        floatSpeed: 5.2
      }
    ]
  },
  {
    id: 'raw-balls-coconut-goji',
    bigText: 'COCONUT',
    name: 'Coconut & Goji',
    tagline: 'EGZOTYCZNY KOKOS Z TYBETAŃSKIMI JAGODAMI GOJI I BIAŁKIEM ROŚLINNYM.',
    category: 'Witalność & Superfoods',
    subtitle: 'Aromatyczne płatki kokosowe, tybetańskie superfoods jagody goji i surowe migdały.',
    price: '18,90 zł',
    priceValue: 18.9,
    weight: '70 g (4 szt.)',
    bgColor: '#1D7862', // Egzotyczny szmaragdowo-leśny
    bgHex: '#1D7862',
    textColor: '#083B2E',
    accentColor: '#083B2E',
    blurOrbColor: '#52B788',
    productBoxImage: 'https://i.postimg.cc/jqNYDfv0/coconut-goji-display-pack.png',
    thumbImage: 'https://i.postimg.cc/jqNYDfv0/coconut-goji-display-pack.png',
    badge: '🥥 Egzotyczny Kokos & Jagody Goji',
    targetUrl: '/products/raw-balls-coconut-goji',
    tasteNotes: ['Świeży kokos bio', 'Czerwone jagody goji', 'Chrupiące migdały', 'Kropla limonki'],
    nutrition: {
      calories: 262,
      protein: '8.4 g',
      fat: '14.6 g',
      carbs: '25.0 g',
      fiber: '7.8 g'
    },
    ingredients: [
      'Wiórki kokosowe bio 36%',
      'Suszone jagody goji 22%',
      'Daktyle 25%',
      'Migdały 12%',
      'Olej kokosowy virgin 4%',
      'Sól morska'
    ],
    floatingItems: [
      {
        id: 'coconut-cluster-1',
        name: 'Świeży Kokos',
        image: 'https://i.postimg.cc/Nfcqm0PB/coconut-ingredient-cluster.png',
        x: -245,
        y: -75,
        size: 140,
        rotation: 0,
        zIndex: 30,
        floatDelay: 0.1,
        floatSpeed: 4.8
      },
      {
        id: 'goji-branch-1',
        name: 'Gałązka Jagód Goji',
        image: 'https://i.postimg.cc/WprcdZS1/goji-berry-branch.png',
        x: 245,
        y: -65,
        size: 140,
        rotation: 0,
        zIndex: 35,
        floatDelay: 0.25,
        floatSpeed: 5.2
      }
    ]
  }
];

export const PROTEIN_COOKIES_PRODUCTS: GreenergyProduct[] = [
  {
    id: 'cookie-apple',
    bigText: 'APPLE',
    name: 'Apple & Cinnamon Cookie',
    tagline: 'MIĘKKIE CIASTKO BIAŁKOWE Z SOCZYSTYM JABŁKIEM, CYNAMONEM I 20G BIAŁKA.',
    category: '20g Białka Roślinnego',
    subtitle: 'Organiczne suszone jabłka, cynamon cejloński, bezglutenowy owies i czysty izolat białka roślinnego.',
    price: '14,90 zł',
    priceValue: 14.9,
    weight: '75 g',
    bgColor: '#C55333', // Ciepły, jabłkowo-korzenny odcień
    bgHex: '#C55333',
    textColor: '#581608',
    accentColor: '#581608',
    blurOrbColor: '#FFA726',
    productBoxImage: 'https://i.postimg.cc/d3Xz7qXm/Apple.png',
    thumbImage: 'https://i.postimg.cc/d3Xz7qXm/Apple.png',
    badge: '🍎 20g Białka | Apple Cookie',
    targetUrl: '/products/cookie-apple',
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
    id: 'cookie-chocolate',
    bigText: 'CHOC',
    name: 'Chocolate Protein Cookie',
    tagline: 'GŁĘBOKA CIEMNA CZEKOLADA Z KAWAŁKAMI SUROWEGO KAKAO I 20G BIAŁKA.',
    category: '20g Białka Roślinnego',
    subtitle: 'Prawdziwe belgijskie kakao, chrupiące dropsy z surowej czekolady, orzechy nerkowca i proteiny.',
    price: '14,90 zł',
    priceValue: 14.9,
    weight: '75 g',
    bgColor: '#3A1E14', // Głęboki aksamitny brąz ciemnej czekolady
    bgHex: '#3A1E14',
    textColor: '#170904',
    accentColor: '#170904',
    blurOrbColor: '#DDA15E',
    productBoxImage: 'https://i.postimg.cc/tT4f2ZGM/Choc.png',
    thumbImage: 'https://i.postimg.cc/tT4f2ZGM/Choc.png',
    badge: '🍫 20g Białka | Double Choc',
    targetUrl: '/products/cookie-chocolate',
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
  }
];

export const PRE_WORKOUT_PRODUCTS: GreenergyProduct[] = [
  {
    id: 'pre-dragonfruit-guava',
    bigText: 'SURGE',
    name: 'Dragonfruit & Guava Surge',
    tagline: 'NATURALNA ENERGIA Z GUARANY, ADAPTOGENY, CYTRULINA I RÓŻOWY SMOCZY OWOC.',
    category: 'Eksplozywna Czysta Moc',
    subtitle: 'Formuła przedtreningowa 100% roślinna z organiczną guaraną, azjatyckim żeń-szeniem i burakiem.',
    price: '24,90 zł',
    priceValue: 24.9,
    weight: '120 g (10 porcji)',
    bgColor: '#DE2F52', // Intensywny neonowy róż smoczego owocu
    bgHex: '#DE2F52',
    textColor: '#5E071A',
    accentColor: '#5E071A',
    blurOrbColor: '#FF007F',
    productBoxImage: 'https://images.unsplash.com/photo-1622484216961-d703e2e8e2c2?auto=format&fit=crop&w=600&q=80',
    thumbImage: 'https://images.unsplash.com/photo-1622484216961-d703e2e8e2c2?auto=format&fit=crop&w=300&q=80',
    badge: '⚡ 180mg Naturalnej Kofeiny',
    targetUrl: '/products/pre-dragonfruit-guava',
    tasteNotes: ['Egzotyczny smoczy owoc', 'Słodka różowa guawa', 'L-Cytrulina & Beta-Alanina', 'Organiczna guarana'],
    nutrition: {
      calories: 45,
      protein: '4.0 g',
      fat: '0.2 g',
      carbs: '6.5 g',
      fiber: '2.4 g'
    },
    ingredients: [
      'Organiczny ekstrakt z guarany (180mg kofeiny)',
      'L-Cytrulina jabłczan 6000mg',
      'Beta-Alanina CarnoSyn 3200mg',
      'Ekstrakt z różowego smoczego owocu',
      'Elektrolity z wody kokosowej'
    ],
    floatingItems: []
  },
  {
    id: 'pre-blue-raspberry',
    bigText: 'ENERGY',
    name: 'Electric Blue Raspberry',
    tagline: 'NIEBIESKA SPIRULINA, KORZEŃ MACA I ELEKTROLITY DLA MAKSYMALNEJ WYTRZYMAŁOŚCI.',
    category: 'Maksymalne Skupienie & Pompa',
    subtitle: 'Niebieska spirulina z elektrolitami himalajskimi i ekstraktem z zielonej herbaty Matcha.',
    price: '24,90 zł',
    priceValue: 24.9,
    weight: '120 g (10 porcji)',
    bgColor: '#2163B8', // Elektryczny błękitno-szafirowy
    bgHex: '#2163B8',
    textColor: '#08254F',
    accentColor: '#08254F',
    blurOrbColor: '#00D2FF',
    productBoxImage: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    thumbImage: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80',
    badge: '🌊 Niebieska Spirulina & Elektrolity',
    targetUrl: '/products/pre-blue-raspberry',
    tasteNotes: ['Dzika niebieska malina', 'Niebieska spirulina bio', 'Woda kokosowa w proszku', 'Magnez & Potas'],
    nutrition: {
      calories: 42,
      protein: '3.8 g',
      fat: '0.1 g',
      carbs: '5.8 g',
      fiber: '2.1 g'
    },
    ingredients: [
      'Niebieska spirulina Phycocyanin',
      'Ekstrakt z zielonej herbaty 200mg',
      'Kompleks elektrolitów morskich',
      'L-Tyrozyna i Ashwagandha KSM-66',
      'Naturalny sok z malin'
    ],
    floatingItems: []
  },
  {
    id: 'pre-yuzu-matcha',
    bigText: 'FOCUS',
    name: 'Citrus Yuzu & Matcha',
    tagline: 'JAPOŃSKI CYTRUS YUZU, CEREMONIALNA MATCHA I ADAPTOGEN L-THEANINA.',
    category: 'Laserowy Fokus & Bez Zjazdu',
    subtitle: 'Czysty, nieprzerwany poziom koncentracji bez efektu nerwowości dzięki synergii L-teaniny i kofeiny.',
    price: '24,90 zł',
    priceValue: 24.9,
    weight: '120 g (10 porcji)',
    bgColor: '#2E7A36', // Świeża zieleń cytrusowo-herbaciana
    bgHex: '#2E7A36',
    textColor: '#0B3310',
    accentColor: '#0B3310',
    blurOrbColor: '#A7F3D0',
    productBoxImage: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    thumbImage: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=300&q=80',
    badge: '🍵 Matcha Uji + L-Theanina',
    targetUrl: '/products/pre-yuzu-matcha',
    tasteNotes: ['Świeży japoński yuzu', 'Ceremonialna matcha', 'Limonka i trawa cytrynowa', 'Lion’s Mane soplówka'],
    nutrition: {
      calories: 38,
      protein: '3.5 g',
      fat: '0.1 g',
      carbs: '5.2 g',
      fiber: '2.5 g'
    },
    ingredients: [
      'Bio Matcha z rejonu Uji (Japonia)',
      'Ekstrakt z owoców Yuzu',
      'Ekstrakt z Lion’s Mane 1000mg',
      'L-Theanina 250mg',
      'Sól morska celtycka'
    ],
    floatingItems: []
  }
];

export const SNACK_FLAVORS = GREENERGY_PRODUCTS as unknown as import('../types').SnackFlavor[];




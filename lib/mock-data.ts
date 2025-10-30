import type { Product, Retailer, UGCContent, Promo, SiteSettings } from './types';

// Mock Products
export const mockProducts: Product[] = [
  {
    _id: '1',
    slug: 'spicy-chilli',
    name: {
      en: 'Spicy Chilli',
      ckb: 'چیلی تیژ',
      ar: 'فلفل حار'
    },
    flavour: 'Spicy Chilli',
    heatLevel: 3,
    puffType: 'big',
    sizes: [
      { size: '50g', price: '£1.99' },
      { size: '150g', price: '£3.99' }
    ],
    isHalal: true,
    isFeatured: true,
    images: ['/494525746_674675695200651_4437922332017011159_n.jpg'],
    description: {
      en: 'Our hottest flavour! Packed with fiery chilli and bold spices for those who dare.',
      ckb: 'تەمترین تامەکەمان! پڕ لە چیلی گەرم و بەهاراتێکی بەهێز بۆ ئەوانەی دەرەکەن.',
      ar: 'أحر نكهة لدينا! مليئة بالفلفل الحار والتوابل الجريئة للجرئين.'
    },
    ingredients: {
      en: 'Corn, Vegetable Oil, Chilli Seasoning (Salt, Sugar, Spices, Onion Powder, Garlic Powder)',
      ckb: 'گەنمەشامی، روێنی نباتات، بەهاراتی چیلی (خوێ، شەکر، بەهارات، پیاز وردکراو، سیر وردکراو)',
      ar: 'ذرة، زيت نباتي، توابل الفلفل الحار (ملح، سكر، بهارات، مسحوق البصل، مسحوق الثوم)'
    },
    nutritionPer100g: {
      energy: '2100kJ / 502kcal',
      fat: '28g',
      saturatedFat: '2.5g',
      carbohydrates: '58g',
      sugars: '2g',
      protein: '6g',
      salt: '1.8g'
    }
  },
  {
    _id: '2',
    slug: 'cheese-onion',
    name: {
      en: 'Cheese & Onion',
      ckb: 'پنیر و پیاز',
      ar: 'جبن وبصل'
    },
    flavour: 'Cheese & Onion',
    heatLevel: 0,
    puffType: 'light',
    sizes: [
      { size: '50g', price: '£1.99' },
      { size: '150g', price: '£3.99' }
    ],
    isHalal: true,
    isFeatured: true,
    images: ['/495030988_677841384884082_2288565817306550936_n.jpg'],
    description: {
      en: 'Classic cheese and onion flavour - a crowd favourite for all occasions.',
      ckb: 'تامی کلاسیکی پنیر و پیاز - بەناوبانگترین بۆ هەموو بۆنەکان.',
      ar: 'نكهة الجبن والبصل الكلاسيكية - مفضلة الجميع لجميع المناسبات.'
    },
    ingredients: {
      en: 'Corn, Vegetable Oil, Cheese & Onion Seasoning (Salt, Cheese Powder, Onion Powder, Natural Flavourings)',
      ckb: 'گەنمەشامی، روێنی نباتات، بەهاراتی پنیر و پیاز (خوێ، پودری پنیر، پیاز وردکراو، تامە سروشتییەکان)',
      ar: 'ذرة، زيت نباتي، توابل الجبن والبصل (ملح، مسحوق الجبن، مسحوق البصل، نكهات طبيعية)'
    }
  },
  {
    _id: '3',
    slug: 'bbq-blast',
    name: {
      en: 'BBQ Blast',
      ckb: 'تامی شلکان',
      ar: 'نكهة الشواء'
    },
    flavour: 'BBQ',
    heatLevel: 1,
    puffType: 'big',
    sizes: [
      { size: '50g', price: '£1.99' },
      { size: '150g', price: '£3.99' }
    ],
    isHalal: true,
    isFeatured: true,
    images: ['/493481470_677838411551046_8595512445647403553_n.jpg'],
    description: {
      en: 'Smoky barbecue flavour with a hint of sweetness. Perfect for any gathering.',
      ckb: 'تامی شلکان لەگەڵ پێکەوە شیرینی. تەواو بۆ هەر کۆبوونەوەیەک.',
      ar: 'نكهة الشواء المدخنة مع لمحة من الحلاوة. مثالية لأي تجمع.'
    },
    ingredients: {
      en: 'Corn, Vegetable Oil, BBQ Seasoning (Salt, Sugar, Paprika, Smoked Paprika, Spices)',
      ckb: 'گەنمەشامی، روێنی نباتات، بەهاراتی شلکان (خوێ، شەکر، پاپریکا، پاپریکای وەکوتوو، بەهارات)',
      ar: 'ذرة، زيت نباتي، توابل الشواء (ملح، سكر، فلفل أحمر، فلفل أحمر مدخن، بهارات)'
    }
  },
  {
    _id: '4',
    slug: 'salt-vinegar',
    name: {
      en: 'Salt & Vinegar',
      ckb: 'خوێ و سرکە',
      ar: 'ملح وخل'
    },
    flavour: 'Salt & Vinegar',
    heatLevel: 0,
    puffType: 'light',
    sizes: [
      { size: '50g', price: '£1.99' }
    ],
    isHalal: true,
    isFeatured: false,
    images: ['/499562068_680459471288940_4804510919466937818_n.jpg'],
    description: {
      en: 'Tangy vinegar with a perfect balance of salt. Traditional taste with a modern twist.',
      ckb: 'سرکەی ترش لەگەڵ هاوسەنگی تەواوی خوێ. تامی نەریتی بە گۆڕانکاری نوێ.',
      ar: 'خل حامض مع توازن مثالي للملح. طعم تقليدي بلمسة عصرية.'
    },
    ingredients: {
      en: 'Corn, Vegetable Oil, Salt & Vinegar Seasoning (Salt, Sodium Diacetate, Citric Acid)',
      ckb: 'گەنمەشامی، روێنی نباتات، بەهاراتی خوێ و سرکە (خوێ، سۆدیۆم دیئاستات، ترشاوی سیتریک)',
      ar: 'ذرة، زيت نباتي، توابل الملح والخل (ملح، أسيتات ثنائي الصوديوم، حمض الستريك)'
    }
  },
  {
    _id: '5',
    slug: 'sour-cream',
    name: {
      en: 'Sour Cream & Chive',
      ckb: 'قایماخ و پیازەکەم',
      ar: 'قشطة حامضة وثوم معمر'
    },
    flavour: 'Sour Cream & Chive',
    heatLevel: 0,
    puffType: 'extra-puffy',
    sizes: [
      { size: '50g', price: '£1.99' },
      { size: '150g', price: '£3.99' }
    ],
    isHalal: true,
    isFeatured: false,
    images: ['/499825860_689995420335345_3114302672824344621_n.jpg'],
    description: {
      en: 'Creamy and smooth with a fresh hint of chive. Light and delicious.',
      ckb: 'قایماکی لیسا لەگەڵ پێکەوە پیازەکەمی تازە. سووک و بەتام.',
      ar: 'قشطة ناعمة مع لمحة من الثوم المعمر. خفيفة ولذيذة.'
    },
    ingredients: {
      en: 'Corn, Vegetable Oil, Sour Cream & Chive Seasoning (Salt, Cream Powder, Onion Powder, Chive)',
      ckb: 'گەنمەشامی، روێنی نباتات، بەهاراتی قایماخ و پیازەکەم (خوێ، پودری قایماخ، پیاز وردکراو، پیازەکەم)',
      ar: 'ذرة، زيت نباتي، توابل القشطة الحامضة والثوم المعمر (ملح، مسحوق القشطة، مسحوق البصل، ثوم معمر)'
    }
  },
  {
    _id: '6',
    slug: 'paprika',
    name: {
      en: 'Sweet Paprika',
      ckb: 'پاپریکای شیرین',
      ar: 'فلفل حلو'
    },
    flavour: 'Sweet Paprika',
    heatLevel: 1,
    puffType: 'big',
    sizes: [
      { size: '50g', price: '£1.99' }
    ],
    isHalal: true,
    isFeatured: false,
    images: ['/503484345_18479970196069200_8996887427835175761_n.jpg'],
    description: {
      en: 'Mild and sweet paprika flavour with a gentle warmth.',
      ckb: 'تامی پاپریکای شیرین و نەرم لەگەڵ گەرمی نەرم.',
      ar: 'نكهة الفلفل الحلو الخفيفة مع دفء لطيف.'
    },
    ingredients: {
      en: 'Corn, Vegetable Oil, Paprika Seasoning (Salt, Sweet Paprika, Sugar, Spices)',
      ckb: 'گەنمەشامی، روێنی نباتات، بەهاراتی پاپریکا (خوێ، پاپریکای شیرین، شەکر، بەهارات)',
      ar: 'ذرة، زيت نباتي، توابل الفلفل (ملح، فلفل حلو، سكر، بهارات)'
    }
  }
];

// Mock Retailers
export const mockRetailers: Retailer[] = [
  {
    _id: 'r1',
    name: 'Tesco Superstore',
    address: '123 High Street',
    city: 'London',
    country: 'GB',
    geocode: { lat: 51.5074, lng: -0.1278 },
    phone: '+44 20 1234 5678',
    hours: 'Mon-Sun: 8am-10pm',
    onlineUrl: 'https://www.tesco.com'
  },
  {
    _id: 'r2',
    name: 'Sainsbury\'s Local',
    address: '45 King\'s Road',
    city: 'London',
    country: 'GB',
    geocode: { lat: 51.4875, lng: -0.1687 },
    phone: '+44 20 9876 5432',
    hours: 'Mon-Sun: 7am-11pm',
    onlineUrl: 'https://www.sainsburys.co.uk'
  },
  {
    _id: 'r3',
    name: 'Asda Supercentre',
    address: '89 Oxford Street',
    city: 'Manchester',
    country: 'GB',
    geocode: { lat: 53.4808, lng: -2.2426 },
    phone: '+44 161 234 5678',
    hours: 'Mon-Sat: 8am-10pm, Sun: 10am-4pm'
  },
  {
    _id: 'r4',
    name: 'Morrisons',
    address: '67 Market Street',
    city: 'Birmingham',
    country: 'GB',
    geocode: { lat: 52.4862, lng: -1.8904 },
    phone: '+44 121 567 8900',
    hours: 'Mon-Sun: 7am-10pm'
  },
  {
    _id: 'r5',
    name: 'Co-op Food',
    address: '23 Victoria Road',
    city: 'Leeds',
    country: 'GB',
    geocode: { lat: 53.8008, lng: -1.5491 },
    phone: '+44 113 234 5678',
    hours: 'Mon-Sun: 6am-11pm'
  },
  {
    _id: 'r6',
    name: 'Waitrose',
    address: '12 Green Lane',
    city: 'Bristol',
    country: 'GB',
    geocode: { lat: 51.4545, lng: -2.5879 },
    phone: '+44 117 123 4567',
    hours: 'Mon-Sat: 8am-9pm, Sun: 10am-4pm',
    onlineUrl: 'https://www.waitrose.com'
  },
  {
    _id: 'r7',
    name: 'Erbil City Centre Market',
    address: 'Downtown Erbil',
    city: 'Erbil',
    country: 'IQ',
    geocode: { lat: 36.1911, lng: 44.0089 },
    phone: '+964 750 123 4567',
    hours: 'Daily: 9am-9pm'
  },
  {
    _id: 'r8',
    name: 'Baghdad Central Store',
    address: 'Al-Karrada District',
    city: 'Baghdad',
    country: 'IQ',
    geocode: { lat: 33.3152, lng: 44.3661 },
    phone: '+964 770 987 6543',
    hours: 'Daily: 8am-10pm'
  }
];

// Mock UGC Content
export const mockUGC: UGCContent[] = [
  {
    _id: 'u1',
    platform: 'instagram',
    mediaUrl: '/503697132_18479970391069200_7243331760383154247_n.jpg',
    caption: '🔥 Can\'t get enough of these spicy puffs! Perfect movie snack! #DanaDana',
    author: '@snacklover_uk'
  },
  {
    _id: 'u2',
    platform: 'instagram',
    mediaUrl: '/505086714_695697093098511_2805790703272486057_n.jpg',
    caption: 'Best cheese & onion flavour ever! 😍 #DanaDanaChips',
    author: '@foodie_adventures'
  },
  {
    _id: 'u3',
    platform: 'tiktok',
    mediaUrl: '/514404378_712254364776117_1879296308114819041_n.jpg',
    caption: 'Try the BBQ flavour challenge! 🎯',
    author: '@snackreview'
  },
  {
    _id: 'u4',
    platform: 'instagram',
    mediaUrl: '/518051804_729328469735373_8586092874167205571_n.jpg',
    caption: 'My new favourite halal snack 🌟 #Halal #DanaDana',
    author: '@halal_foodie'
  },
  {
    _id: 'u5',
    platform: 'instagram',
    mediaUrl: '/518348408_717553570912863_6614485569469998600_n.jpg',
    caption: 'Perfect for parties! Everyone loved them 🎉',
    author: '@party_planner'
  },
  {
    _id: 'u6',
    platform: 'youtube',
    mediaUrl: '/494525746_674675695200651_4437922332017011159_n.jpg',
    caption: 'Full taste test video - all 6 flavours! 🎥',
    author: '@snackreviewtv'
  }
];

// Mock Promos
export const mockPromos: Promo[] = [
  {
    _id: 'p1',
    slug: 'summer-special',
    title: 'Summer Special - Buy 2 Get 1 Free!',
    description: 'Stock up on your favourite flavours this summer. Buy any 2 packs and get 1 free!',
    image: '/494525746_674675695200651_4437922332017011159_n.jpg',
    startDate: '2024-06-01',
    endDate: '2025-12-31',
    ctaText: 'Shop Now',
    ctaUrl: '/en/products',
    terms: 'Valid on selected products. Whilst stocks last.'
  }
];

// Mock Site Settings
export const mockSiteSettings: SiteSettings = {
  title: 'Dana Dana Chips',
  tagline: 'Puff. Crunch. Repeat.',
  socialMedia: {
    instagram: 'https://instagram.com/danadanachips',
    facebook: 'https://facebook.com/danadanachips',
    tiktok: 'https://tiktok.com/@danadanachips',
    youtube: 'https://youtube.com/@danadanachips'
  },
  contactEmail: 'info@danadanachips.com',
  wholesaleEmail: 'wholesale@danadanachips.com',
  halalCertification: {
    certificateNumber: 'HMC-2024-001',
    issuingBody: 'Halal Monitoring Committee'
  },
  defaultSeo: {
    metaTitle: 'Dana Dana Chips - Premium Halal Puff Snacks',
    metaDescription: 'Discover Dana Dana Chips - authentic Kurdish puff snacks with bold flavours. 100% Halal certified and available across the UK and Kurdistan.'
  }
};



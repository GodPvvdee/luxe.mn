import type { ProductLite } from "./types";

export const mockCategories = [
  {
    name: "Тавилга",
    slug: "furniture",
    description: "Дулаахан зочны өрөө, амралттай унтлагын өрөөг бүтээх материалаар хийсэн тавилгууд.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
  },
  {
    name: "Гэрэлтүүлэг",
    slug: "lighting",
    description: "Бүлээн уур амьсгал бий болгох люстер, шалны болон ширээний гэрэлтүүлэгүүд.",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80",
  },
  {
    name: "Даавуу",
    slug: "textiles",
    description: "Хивс, өргөмжлөл, дэрнүүд — гэрийн дулааныг нэмэгдүүлэх материалууд.",
    image:
      "https://images.unsplash.com/photo-1539922631499-09155cc609a4?w=1200&q=80",
  },
  {
    name: "Ширээний эд",
    slug: "tableware",
    description: "Үдшийн ширээг чимэглэх сав суулга, ваар, аяга, хутганы багц.",
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80",
  },
  {
    name: "Чимэглэл",
    slug: "decor",
    description: "Хана, тавиур, цонхыг чимэглэх ваар, толь, лаа, ботаникийн чимэглэлүүд.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
  },
];

type SeedProduct = Omit<ProductLite, "id" | "categoryName"> & {
  categorySlug: string;
};

export const mockProducts: SeedProduct[] = [
  // --- ТАВИЛГА ---
  {
    slug: "aluna-lounge-chair",
    name: "Aluna Lounge Chair",
    description:
      "Цайвар маалинган бүрээстэй, шинэхэн скандинав хэв маягт хүлээгчтэй сэнс. Цул царс модон араг яс, бат бөх хэлбэртэй эргономик дизайн.",
    price: 1290,
    compareAt: 1490,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=85",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=85",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85",
    ],
    sizes: [],
    colors: ["Маалинган цайвар", "Хөвдөн ногоон", "Шөнө"],
    rating: 4.8,
    reviewCount: 132,
    featured: true,
    bestseller: true,
    onSale: true,
    categorySlug: "furniture",
  },
  {
    slug: "oak-dining-table",
    name: "Frey Oak Dining Table",
    description:
      "Цул шар модон 6 хүний ширээ. Скандинав урлаачдын гар хийц, гадаргуу нь байгалийн тосоор боловсруулсан.",
    price: 1890,
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&q=85",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&q=85",
    ],
    sizes: ["6 хүний", "8 хүний"],
    colors: ["Натурал царс", "Гүн хүрэн"],
    rating: 4.9,
    reviewCount: 64,
    featured: true,
    bestseller: false,
    onSale: false,
    categorySlug: "furniture",
  },
  {
    slug: "marble-coffee-table",
    name: "Cala Marble Coffee Table",
    description:
      "Carrara гантигаар хийсэн дугуй кофейны ширээ, гулдмай гялалзсан гадаргуутай. Зэвэрдэггүй ган арматуртай.",
    price: 980,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=1200&q=85",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=85",
    ],
    sizes: ["Ø 80см", "Ø 100см"],
    colors: ["Цагаан гантиг", "Хар гантиг"],
    rating: 4.6,
    reviewCount: 41,
    featured: false,
    bestseller: true,
    onSale: false,
    categorySlug: "furniture",
  },

  // --- ГЭРЭЛТҮҮЛЭГ ---
  {
    slug: "helia-floor-lamp",
    name: "Helia Arc Floor Lamp",
    description:
      "Гууль металл, маалинган бүрхээстэй том модулиуд бүхий шалны лампадар. Алсын зайнаас удирдах боломжтой, дулаан өнгөтэй LED.",
    price: 560,
    compareAt: 680,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=85",
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=1200&q=85",
    ],
    sizes: ["Стандарт"],
    colors: ["Гууль", "Матт хар"],
    rating: 4.7,
    reviewCount: 98,
    featured: true,
    bestseller: true,
    onSale: true,
    categorySlug: "lighting",
  },
  {
    slug: "linen-pendant-lantern",
    name: "Maru Linen Pendant",
    description:
      "Цаасан фонар санаатай маалинган түдгэлзүүлсэн люстер. Зөөлөн сарнисан гэрэлтэй, гар ажлын хийц.",
    price: 240,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=1200&q=85",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1200&q=85",
    ],
    sizes: ["Жижиг", "Дунд", "Том"],
    colors: ["Натурал", "Хар"],
    rating: 4.4,
    reviewCount: 56,
    featured: false,
    bestseller: false,
    onSale: false,
    categorySlug: "lighting",
  },
  {
    slug: "alba-pillar-candles",
    name: "Alba Pillar Candle Set",
    description:
      "Соёол лаа гурвалсан багц. Хатуу соевол лав, мадагаскар ванилийн хөнгөн үнэртэй, 40 цаг шатах.",
    price: 68,
    compareAt: 85,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1602874801006-e26c4b1f0cb3?w=1200&q=85",
      "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?w=1200&q=85",
    ],
    sizes: ["3 ширхэг", "6 ширхэг"],
    colors: ["Цагаан", "Цайвар сарнай", "Шар бал"],
    rating: 4.6,
    reviewCount: 187,
    featured: true,
    bestseller: false,
    onSale: true,
    categorySlug: "lighting",
  },

  // --- ДААВУУ ---
  {
    slug: "atlas-berber-rug",
    name: "Atlas Berber Wool Rug",
    description:
      "Марокко Атлас уулсын ноосон гар нэхмэл хивс. Бат бөх, элгэмсэг, өвлийн хүйтнийг арилгана.",
    price: 1450,
    compareAt: 1690,
    stock: 6,
    images: [
      "https://images.unsplash.com/photo-1535448072546-ed7167c0a76b?w=1200&q=85",
      "https://images.unsplash.com/photo-1601925260367-2d6ddd1eb43e?w=1200&q=85",
    ],
    sizes: ["160×230", "200×290", "240×340"],
    colors: ["Цагаан-хар", "Шар-зэс"],
    rating: 4.9,
    reviewCount: 78,
    featured: true,
    bestseller: true,
    onSale: true,
    categorySlug: "textiles",
  },
  {
    slug: "stone-linen-throw",
    name: "Stone Washed Linen Throw",
    description:
      "Бельги маалинган чулууж тогтоомж хийсэн ширхэглэг бөрөнцөг. Зөөлөн уналт, амралтын өрөөнд бүлээн уур амьсгал.",
    price: 145,
    stock: 36,
    images: [
      "https://images.unsplash.com/photo-1620230874645-5d2c0f72a3a8?w=1200&q=85",
      "https://images.unsplash.com/photo-1556139930-c23fa4a4f934?w=1200&q=85",
    ],
    sizes: ["130×170см"],
    colors: ["Шавар", "Чулуун саарал", "Хязгаар"],
    rating: 4.7,
    reviewCount: 121,
    featured: false,
    bestseller: false,
    onSale: false,
    categorySlug: "textiles",
  },
  {
    slug: "velvet-cushion-set",
    name: "Cora Velvet Cushion Set",
    description:
      "4 ширхэг хилэн бүрхээстэй дэр. Зэс шар, чулуун саарал, өнгөний зохицол гэрийн зугаагаар чимнэ.",
    price: 178,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=1200&q=85",
      "https://images.unsplash.com/photo-1592786358614-c6e4b7c4ad8c?w=1200&q=85",
    ],
    sizes: ["45×45см"],
    colors: ["Зэс шар", "Чулуун саарал", "Цайвар сарнай", "Хөвдөн ногоон"],
    rating: 4.5,
    reviewCount: 89,
    featured: false,
    bestseller: true,
    onSale: false,
    categorySlug: "textiles",
  },

  // --- ШИРЭЭНИЙ ЭД ---
  {
    slug: "kura-stoneware-dinner-set",
    name: "Kura Stoneware Dinner Set",
    description:
      "Гар хийсэн чулуун шавар сав суулга — 12 ширхэг (4 ширээний таваг, 4 шөлний аяга, 4 десертын таваг). Микроволновын зууханд ашиглаж болно.",
    price: 320,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=85",
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1200&q=85",
    ],
    sizes: ["12 ширхэг", "16 ширхэг"],
    colors: ["Шавар", "Шохой цагаан", "Манан саарал"],
    rating: 4.8,
    reviewCount: 142,
    featured: true,
    bestseller: true,
    onSale: false,
    categorySlug: "tableware",
  },
  {
    slug: "crystal-wine-glasses",
    name: "Solis Crystal Wine Glasses",
    description:
      "Хүчилгүй чех болор шил. Улаан дарсны тосгүй чанарыг өргөн ам нь хадгална. 6 ширхэг багц.",
    price: 195,
    compareAt: 240,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1614245528148-fb2dca1d18b5?w=1200&q=85",
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=85",
    ],
    sizes: ["6 ширхэг"],
    colors: ["Цэвэр шил"],
    rating: 4.6,
    reviewCount: 67,
    featured: false,
    bestseller: false,
    onSale: true,
    categorySlug: "tableware",
  },
  {
    slug: "walnut-cutting-board",
    name: "Hilde Walnut Board",
    description:
      "Цул хушганы модон гар хийц зүсүүлэх самбар. Үндэс тосны шингэдэг, амьдралын турш эдэлж болно.",
    price: 88,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=85",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85",
    ],
    sizes: ["Дунд", "Том"],
    colors: ["Хушга", "Царс"],
    rating: 4.7,
    reviewCount: 203,
    featured: false,
    bestseller: true,
    onSale: false,
    categorySlug: "tableware",
  },

  // --- ЧИМЭГЛЭЛ ---
  {
    slug: "terra-ceramic-vase",
    name: "Terra Ceramic Vase Trio",
    description:
      "3 ширхэг гар хийц шавар ваар. Хатсан цэцэг эсвэл ганц мөчир тавихад хамгийн тохиромжтой.",
    price: 124,
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1602178141046-cb1d29bb01e9?w=1200&q=85",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=85",
    ],
    sizes: ["Жижиг", "Дунд", "Том"],
    colors: ["Шохой цагаан", "Зэс шар", "Шавар"],
    rating: 4.5,
    reviewCount: 91,
    featured: true,
    bestseller: false,
    onSale: false,
    categorySlug: "decor",
  },
  {
    slug: "luna-round-mirror",
    name: "Luna Brass Round Mirror",
    description:
      "Гууль металл хүрээтэй 80см дугуй толь. Хана дээр өлгөх анкер хамт. Хонгил, орцыг сэргээлгэдэг.",
    price: 285,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85",
      "https://images.unsplash.com/photo-1603792907191-39d2c0b0c8e3?w=1200&q=85",
    ],
    sizes: ["Ø 60см", "Ø 80см", "Ø 100см"],
    colors: ["Гууль", "Матт хар", "Антик алт"],
    rating: 4.8,
    reviewCount: 104,
    featured: true,
    bestseller: true,
    onSale: false,
    categorySlug: "decor",
  },
];

// Client-side fallback. DB-руу шилжсэн тул зөвхөн testimonials, navigation
// copy-д жиш­ээ хэрэглэгдэнэ.
export const products: ProductLite[] = mockProducts.map((p, i) => ({
  id: `p_${i + 1}`,
  ...p,
  categoryName:
    mockCategories.find((c) => c.slug === p.categorySlug)?.name ?? "Бусад",
}));

export const categories = mockCategories;

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(p: ProductLite, count = 4) {
  return products
    .filter((x) => x.categorySlug === p.categorySlug && x.id !== p.id)
    .slice(0, count);
}

export const testimonials = [
  {
    name: "Сарангэрэл Б.",
    role: "Дотоод дизайнер, Улаанбаатар",
    quote:
      "Гэрийн орчныг бүрэн солих санаа байсан. Luxe-н тавилга, гэрэлтүүлэг хоёрын зохицол хүлээж байснаас илүү гоё гарсан.",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Бат-Эрдэнэ Ц.",
    role: "Архитектор",
    quote:
      "Atlas хивс бараг хоёр жил болсон ч анхных шигээ — өнгө нь арилаагүй, ноос нь зөөлрөөгүй. Үнэхээр их үнэ цэнтэй.",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Номин Х.",
    role: "Гэрийн эзэгтэй",
    quote:
      "Kura ширээний эд нь өдөр тутмын ширээг үдэшлэг адил болгож байна. Хүргэлт нэг хоногтоо ирлээ.",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
];

import type { ProductLite } from "./types";

export const mockCategories = [
  {
    name: "Гэрэлтүүлэг",
    slug: "lighting",
    description:
      "Дулаан уур амьсгал бий болгох люстер, шалны, ширээний болон ханын гэрэлтүүлэгүүд.",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80",
  },
  {
    name: "Цэцэг",
    slug: "flowers",
    description:
      "Шинэхэн баглаа, хатсан цэцэг, удаан хадгалагдах бэлэгний цэцгүүд. Хийсэн өдөртөө хүргэнэ.",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1200&q=80",
  },
];

type SeedProduct = Omit<ProductLite, "id" | "categoryName"> & {
  categorySlug: string;
};

export const mockProducts: SeedProduct[] = [
  // ──────── ГЭРЭЛТҮҮЛЭГ ────────
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
      "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?w=1200&q=85",
      "https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=1200&q=85",
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
  {
    slug: "weaver-rattan-pendant",
    name: "Weaver Rattan Pendant",
    description:
      "Гар нэхмэл бамбусан түдгэлзүүлсэн люстер. Уртаан гэрэлтэй гэрийн зочны өрөөнд тааруулах хур үе мөчир.",
    price: 195,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=85",
      "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=1200&q=85",
    ],
    sizes: ["Дунд", "Том"],
    colors: ["Натурал бамбус"],
    rating: 4.7,
    reviewCount: 73,
    featured: true,
    bestseller: false,
    onSale: false,
    categorySlug: "lighting",
  },
  {
    slug: "nori-desk-lamp",
    name: "Nori Adjustable Desk Lamp",
    description:
      "Матт хар металл, гууль үе мөчтэй ширээний гэрэл. Уншиж ажиллахад зориулсан 360° эргэдэг толгойтой.",
    price: 145,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=1200&q=85",
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=1200&q=85",
    ],
    sizes: ["Стандарт"],
    colors: ["Матт хар", "Гууль"],
    rating: 4.5,
    reviewCount: 112,
    featured: false,
    bestseller: true,
    onSale: false,
    categorySlug: "lighting",
  },
  {
    slug: "moonbeam-table-lamp",
    name: "Moonbeam Linen Table Lamp",
    description:
      "Шавар суурьт, тойрог маалинган бүрхээстэй ширээний гэрэл. Унтлагын өрөөнд тайван өнгөтэй гэрэлтэй.",
    price: 178,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=85",
      "https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=1200&q=85",
    ],
    sizes: ["Стандарт"],
    colors: ["Цагаан маалинган", "Шавар"],
    rating: 4.6,
    reviewCount: 64,
    featured: false,
    bestseller: false,
    onSale: false,
    categorySlug: "lighting",
  },

  // ──────── ЦЭЦЭГ ────────
  {
    slug: "blush-peony-bouquet",
    name: "Blush Peony Bouquet",
    description:
      "Цайвар сарнай өнгийн пион цэцэг 9 мөчрөөр баглаж эвкалиптээр чимэглэсэн зөөлөн баглаа. 7-10 хоног эдэлгээтэй.",
    price: 65,
    compareAt: 78,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1456574808786-d2ba7a6aa654?w=1200&q=85",
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1200&q=85",
    ],
    sizes: ["Жижиг", "Дунд", "Том"],
    colors: ["Цайвар сарнай"],
    rating: 4.9,
    reviewCount: 143,
    featured: true,
    bestseller: true,
    onSale: true,
    categorySlug: "flowers",
  },
  {
    slug: "garden-rose-bouquet",
    name: "Garden Rose Bouquet",
    description:
      "12 мөчир ангийн сарнай, эвкалипт, маалинган тууз. Хайртай хүндээ эсвэл өөртөө сэтгэлийн хатан ширлийн бэлэг.",
    price: 85,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1200&q=85",
      "https://images.unsplash.com/photo-1456574808786-d2ba7a6aa654?w=1200&q=85",
    ],
    sizes: ["12 мөчир", "24 мөчир"],
    colors: ["Гүн улаан", "Цайвар сарнай", "Цагаан"],
    rating: 4.8,
    reviewCount: 201,
    featured: true,
    bestseller: true,
    onSale: false,
    categorySlug: "flowers",
  },
  {
    slug: "provence-lavender-bunch",
    name: "Provence Lavender Bunch",
    description:
      "Францын Прованс мужаас ирсэн хатсан лаванда. Унтлагын өрөөнд тайван үнэр тарьдаг, олон сар хадгалагдана.",
    price: 32,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&q=85",
      "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=1200&q=85",
    ],
    sizes: ["1 баглаа", "3 баглаа"],
    colors: ["Хатсан нил"],
    rating: 4.7,
    reviewCount: 96,
    featured: false,
    bestseller: false,
    onSale: false,
    categorySlug: "flowers",
  },
  {
    slug: "silver-eucalyptus-stems",
    name: "Silver Eucalyptus Stems",
    description:
      "Шинэхэн эвкалиптийн навч 5 мөчрөөр баглаасан. Алаг ванныгаа сэтгэл ханамжтай уур амьсгалтай болгоно.",
    price: 28,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1502740479091-635887520276?w=1200&q=85",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&q=85",
    ],
    sizes: ["5 мөчир", "10 мөчир"],
    colors: ["Мөнгөлөг ногоон"],
    rating: 4.5,
    reviewCount: 154,
    featured: false,
    bestseller: true,
    onSale: false,
    categorySlug: "flowers",
  },
  {
    slug: "dune-pampas-arrangement",
    name: "Dune Pampas Arrangement",
    description:
      "Зэс шар пампасан өвсний 3 мөчир, шавар ваартай. Ширээний ваар буюу шалны том хүлэр болгон хэрэглэх боломжтой.",
    price: 95,
    compareAt: 115,
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?w=1200&q=85",
      "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=1200&q=85",
    ],
    sizes: ["Дунд", "Том"],
    colors: ["Зэс шар", "Шохой цагаан"],
    rating: 4.8,
    reviewCount: 89,
    featured: true,
    bestseller: false,
    onSale: true,
    categorySlug: "flowers",
  },
  {
    slug: "wildflower-meadow-bouquet",
    name: "Meadow Wildflower Bouquet",
    description:
      "Хээр талын зэрлэг цэцгүүдийн зүрх дайруулсан холимог баглаа. Долоо хоног бүр сонголт өөр өөр байж болно.",
    price: 55,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&q=85",
      "https://images.unsplash.com/photo-1495231916356-a86217efff12?w=1200&q=85",
    ],
    sizes: ["Стандарт"],
    colors: ["Цэгцэлсэн холимог"],
    rating: 4.6,
    reviewCount: 67,
    featured: false,
    bestseller: false,
    onSale: false,
    categorySlug: "flowers",
  },
];

// Client-side fallback. DB-руу шилжсэн тул testimonials, navigation
// copy-д жишээ хэрэглэгдэнэ.
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
      "Helia шалны лампадар нь манай студийн хамгийн чухал тоног. Дулаан гэрэл нь үдэшний ажилд тав тухтай уур амьсгал бүтээдэг.",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Бат-Эрдэнэ Ц.",
    role: "Архитектор",
    quote:
      "Дуне пампасны баглаа долоон сар болж байна, өнгө нь нэг ч сулраагүй. Үнэхээр чанартай хүлэр.",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Номин Х.",
    role: "Гэрийн эзэгтэй",
    quote:
      "Сарнайн баглаа хийсэн өдөртөө л хүрсэн. Үнэр нь үнэхээр шинэхэн, миний эх 'дэлгүүрээс авсан мэт биш' гэж гайхаж байсан.",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
];

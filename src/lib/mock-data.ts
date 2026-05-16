import type { ProductLite } from "./types";

export const mockCategories = [
  {
    name: "Footwear",
    slug: "footwear",
    description: "Athletic, casual, and statement sneakers crafted for every step.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
  },
  {
    name: "Apparel",
    slug: "apparel",
    description: "Premium everyday essentials with timeless silhouettes.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "The finishing touches — bags, hats, watches and more.",
    image:
      "https://images.unsplash.com/photo-1611923134239-b9be5816e23d?w=1200&q=80",
  },
  {
    name: "Audio",
    slug: "audio",
    description: "Studio-grade headphones, earbuds and speakers.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
  },
];

type SeedProduct = Omit<ProductLite, "id" | "categoryName"> & {
  categorySlug: string;
};

export const mockProducts: SeedProduct[] = [
  {
    slug: "phantom-runner-x1",
    name: "Phantom Runner X1",
    description:
      "An aerospace-grade running shoe with carbon-plate propulsion, micro-cushioned midsole, and a breathable knit upper. Engineered for marathon-day records and Tuesday-morning intervals alike.",
    price: 189,
    compareAt: 229,
    stock: 42,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80",
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: ["Onyx", "Cloud", "Ember"],
    rating: 4.8,
    reviewCount: 213,
    featured: true,
    bestseller: true,
    onSale: true,
    categorySlug: "footwear",
  },
  {
    slug: "atlas-low-top",
    name: "Atlas Low Top",
    description:
      "A minimalist court silhouette wrapped in supple full-grain leather. Hand-finished edges, vulcanized rubber outsole and a memory-foam footbed.",
    price: 145,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Ivory", "Black"],
    rating: 4.6,
    reviewCount: 98,
    featured: true,
    bestseller: false,
    onSale: false,
    categorySlug: "footwear",
  },
  {
    slug: "ridge-trail-pro",
    name: "Ridge Trail Pro",
    description:
      "Built for unpredictable terrain. Vibram® outsole, Gore-Tex® lining and a torsion bar that keeps you grounded on uneven ground.",
    price: 219,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=1200&q=80",
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Forest", "Slate"],
    rating: 4.7,
    reviewCount: 64,
    featured: false,
    bestseller: true,
    onSale: false,
    categorySlug: "footwear",
  },
  {
    slug: "essential-merino-tee",
    name: "Essential Merino Tee",
    description:
      "17.5-micron Australian merino wool, garment-washed for an instantly broken-in feel. Naturally temperature-regulating and odor-resistant.",
    price: 78,
    compareAt: 95,
    stock: 120,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Stone", "Sky"],
    rating: 4.5,
    reviewCount: 312,
    featured: true,
    bestseller: true,
    onSale: true,
    categorySlug: "apparel",
  },
  {
    slug: "north-shore-overshirt",
    name: "North Shore Overshirt",
    description:
      "Heavyweight Japanese twill, double-needle stitching, and copper button closures. A workwear-inspired layer with the proportions of a modern jacket.",
    price: 198,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80",
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Olive", "Charcoal"],
    rating: 4.7,
    reviewCount: 41,
    featured: true,
    bestseller: false,
    onSale: false,
    categorySlug: "apparel",
  },
  {
    slug: "loom-cashmere-crew",
    name: "Loom Cashmere Crew",
    description:
      "A whisper-soft Grade-A Mongolian cashmere crewneck. Two-ply construction with reinforced shoulder seams for lifelong drape.",
    price: 245,
    compareAt: 295,
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Onyx", "Bone"],
    rating: 4.9,
    reviewCount: 87,
    featured: false,
    bestseller: true,
    onSale: true,
    categorySlug: "apparel",
  },
  {
    slug: "carry-everywhere-tote",
    name: "Carry Everywhere Tote",
    description:
      "Vegetable-tanned Italian leather with riveted seams, a magnetic top closure and an internal padded laptop sleeve.",
    price: 320,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&q=80",
    ],
    sizes: [],
    colors: ["Tan", "Black"],
    rating: 4.8,
    reviewCount: 56,
    featured: true,
    bestseller: false,
    onSale: false,
    categorySlug: "accessories",
  },
  {
    slug: "horizon-aviator",
    name: "Horizon Aviator",
    description:
      "Hand-polished titanium frames with polarized mineral glass lenses. Lightweight, anti-reflective and built to outlast trends.",
    price: 215,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=1200&q=80",
    ],
    sizes: [],
    colors: ["Gold", "Silver", "Gunmetal"],
    rating: 4.6,
    reviewCount: 142,
    featured: false,
    bestseller: true,
    onSale: false,
    categorySlug: "accessories",
  },
  {
    slug: "field-cap-vintage",
    name: "Field Cap Vintage",
    description:
      "Sun-faded heavyweight canvas with an antique brass adjuster. Garment-washed for an instantly lived-in finish.",
    price: 52,
    compareAt: 68,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1200&q=80",
    ],
    sizes: ["One Size"],
    colors: ["Khaki", "Black", "Rust"],
    rating: 4.4,
    reviewCount: 73,
    featured: false,
    bestseller: false,
    onSale: true,
    categorySlug: "accessories",
  },
  {
    slug: "echo-studio-headphones",
    name: "Echo Studio Headphones",
    description:
      "Reference-grade over-ear headphones with 40-hour battery life, hybrid active noise cancellation and spatial audio.",
    price: 449,
    compareAt: 549,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80",
    ],
    sizes: [],
    colors: ["Midnight", "Ivory"],
    rating: 4.9,
    reviewCount: 268,
    featured: true,
    bestseller: true,
    onSale: true,
    categorySlug: "audio",
  },
  {
    slug: "pulse-wireless-earbuds",
    name: "Pulse Wireless Earbuds",
    description:
      "Tuned by Grammy-winning engineers. Adaptive transparency, multi-point pairing and a 32-hour case.",
    price: 219,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?w=1200&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1200&q=80",
    ],
    sizes: [],
    colors: ["Black", "Silver"],
    rating: 4.5,
    reviewCount: 184,
    featured: false,
    bestseller: true,
    onSale: false,
    categorySlug: "audio",
  },
  {
    slug: "orbit-portable-speaker",
    name: "Orbit Portable Speaker",
    description:
      "360° directional audio in a pocketable aluminum shell. IP67 dustproof and waterproof. Pair two for stereo.",
    price: 169,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&q=80",
    ],
    sizes: [],
    colors: ["Graphite", "Sand"],
    rating: 4.3,
    reviewCount: 92,
    featured: false,
    bestseller: false,
    onSale: false,
    categorySlug: "audio",
  },
];

// Hydrated for client-side fallback (no DB required for the demo)
export const products: ProductLite[] = mockProducts.map((p, i) => ({
  id: `p_${i + 1}`,
  ...p,
  categoryName:
    mockCategories.find((c) => c.slug === p.categorySlug)?.name ?? "Other",
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
    name: "Olivia Reyes",
    role: "Architect, Brooklyn",
    quote:
      "I've replaced half my wardrobe with Luxe pieces. The fabric is honestly unreal — like nothing wears out.",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Marcus Chen",
    role: "Marathon runner",
    quote:
      "The Phantom Runner X1 took 8 minutes off my half-marathon time. Customer service replaced my pair when the upper frayed — no questions asked.",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Aiko Tanaka",
    role: "Photographer, Tokyo",
    quote:
      "I bought the Carry Everywhere Tote two years ago. It has aged into the most beautiful patina I've ever owned.",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
];

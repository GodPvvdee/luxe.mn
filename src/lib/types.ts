export type Currency = "MNT" | "USD" | "EUR" | "GBP" | "JPY";

export type ProductLite = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAt?: number | null;
  stock: number;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  onSale: boolean;
  categorySlug: string;
  categoryName: string;
};

export type CartItem = {
  id: string; // unique cart line id
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  maxStock: number;
};

export type WishItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
};

export type RecentItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  viewedAt: number;
};

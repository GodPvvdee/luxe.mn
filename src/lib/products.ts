// Server-only Prisma helpers for products + categories.
// Use these from Server Components (async page.tsx) and route handlers.
// Client components should receive the results as props.

import "server-only";
import { prisma } from "./prisma";
import type { ProductLite } from "./types";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: { toString(): string };
  compareAt: { toString(): string } | null;
  stock: number;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  onSale: boolean;
  category: { slug: string; name: string };
};

function toLite(p: ProductRow): ProductLite {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: Number(p.price),
    compareAt: p.compareAt != null ? Number(p.compareAt) : null,
    stock: p.stock,
    images: p.images,
    sizes: p.sizes,
    colors: p.colors,
    rating: p.rating,
    reviewCount: p.reviewCount,
    featured: p.featured,
    bestseller: p.bestseller,
    onSale: p.onSale,
    categorySlug: p.category.slug,
    categoryName: p.category.name,
  };
}

export async function getAllProducts(): Promise<ProductLite[]> {
  const rows = await prisma.product.findMany({
    include: { category: { select: { slug: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toLite);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductLite | null> {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: { category: { select: { slug: true, name: true } } },
  });
  return row ? toLite(row) : null;
}

export async function getProductsByIds(ids: string[]): Promise<ProductLite[]> {
  if (ids.length === 0) return [];
  const rows = await prisma.product.findMany({
    where: { id: { in: ids } },
    include: { category: { select: { slug: true, name: true } } },
  });
  return rows.map(toLite);
}

export async function getRelatedProducts(
  p: ProductLite,
  count = 4,
): Promise<ProductLite[]> {
  const rows = await prisma.product.findMany({
    where: {
      category: { slug: p.categorySlug },
      NOT: { id: p.id },
    },
    include: { category: { select: { slug: true, name: true } } },
    take: count,
  });
  return rows.map(toLite);
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

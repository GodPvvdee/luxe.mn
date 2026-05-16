import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  const staticRoutes = ["", "/products", "/cart", "/login", "/register", "/wishlist"].map(
    (p) => ({ url: `${url}${p}`, lastModified: new Date() }),
  );
  const productRoutes = products.map((p) => ({
    url: `${url}/products/${p.slug}`,
    lastModified: new Date(),
  }));
  const categoryRoutes = categories.map((c) => ({
    url: `${url}/products?cat=${c.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}

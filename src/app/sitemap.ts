import type { MetadataRoute } from "next";
import { products, categories } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
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

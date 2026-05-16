import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductSort } from "@/components/product/product-sort";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductCardSkeleton } from "@/components/product/product-card-skeleton";
import { getAllProducts, getCategories } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Бүх бүтээгдэхүүн",
  description:
    "Luxe-н бүх цуглуулгыг үзэх — дээд зэрэглэлийн гутал, хувцас, аксессуар, аудио.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);
  const cats = categories.map((c) => ({ name: c.name, slug: c.slug }));

  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Нүүр", href: "/" }, { label: "Дэлгүүр" }]} />
      <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight">
            Бүх бүтээгдэхүүн
          </h1>
          <p className="text-muted-foreground mt-2">
            Сайтар сонгосон хэрэгцээт зүйлс. Тренд-ээс илүү удаан эдэлгээтэй.
          </p>
        </div>
        <Suspense fallback={null}>
          <div className="flex items-center gap-3">
            <ProductSort />
          </div>
        </Suspense>
      </div>

      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <Suspense fallback={null}>
          <ProductFilters categories={cats} />
        </Suspense>
        <div className="flex-1 min-w-0">
          <Suspense
            fallback={
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

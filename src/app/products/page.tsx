import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductSort } from "@/components/product/product-sort";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductCardSkeleton } from "@/components/product/product-card-skeleton";

export const metadata: Metadata = {
  title: "Shop all products",
  description:
    "Browse the full Luxe collection — premium footwear, apparel, accessories, and audio.",
};

export default function ProductsPage() {
  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight">
            All products
          </h1>
          <p className="text-muted-foreground mt-2">
            Considered essentials. Built to outlast trends.
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
          <ProductFilters />
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
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

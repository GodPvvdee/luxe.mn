import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/mock-data";

export function FeaturedProducts() {
  const items = products.filter((p) => p.featured).slice(0, 8);
  return (
    <section className="container py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Шинэ улирал
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mt-2">
            Онцлох бүтээгдэхүүн
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden md:inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
        >
          Бүгдийг харах <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}

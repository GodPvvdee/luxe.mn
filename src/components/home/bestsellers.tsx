import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { ProductLite } from "@/lib/types";

export function Bestsellers({ products }: { products: ProductLite[] }) {
  const items = products.filter((p) => p.bestseller).slice(0, 4);
  return (
    <section className="container py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Хэрэглэгчдийн дуртай
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mt-2">
            Шилдэг борлуулагч
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
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

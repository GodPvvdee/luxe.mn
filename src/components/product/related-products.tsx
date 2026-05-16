import { ProductCard } from "./product-card";
import type { ProductLite } from "@/lib/types";

export function RelatedProducts({ products }: { products: ProductLite[] }) {
  if (products.length === 0) return null;
  return (
    <section className="container py-20 border-t">
      <h2 className="font-display text-4xl tracking-tight mb-10">
        Танд таалагдаж магадгүй
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

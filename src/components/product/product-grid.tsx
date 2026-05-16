"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProductCard } from "./product-card";
import { products } from "@/lib/mock-data";

export function ProductGrid() {
  const params = useSearchParams();
  const cat = params.get("cat");
  const sale = params.get("sale");
  const q = params.get("q")?.toLowerCase();
  const color = params.get("color");
  const size = params.get("size");
  const min = Number(params.get("min") ?? 0);
  const max = Number(params.get("max") ?? 100_000);
  const sort = params.get("sort") ?? "featured";

  const filtered = useMemo(() => {
    let list = products.slice();
    if (cat) list = list.filter((p) => p.categorySlug === cat);
    if (sale) list = list.filter((p) => p.onSale);
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    if (color) list = list.filter((p) => p.colors.includes(color));
    if (size) list = list.filter((p) => p.sizes.includes(size));
    list = list.filter((p) => p.price >= min && p.price <= max);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.reverse();
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [cat, sale, q, color, size, min, max, sort]);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="font-display text-2xl">Бүтээгдэхүүн олдсонгүй</h3>
        <p className="text-muted-foreground mt-2">
          Шүүлтүүрээ өөрчилж эсвэл бүх бүтээгдэхүүнийг үзнэ үү.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-muted-foreground mb-6">
        {filtered.length} бүтээгдэхүүн харагдаж байна
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}

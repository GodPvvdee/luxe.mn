"use client";
import { useEffect } from "react";
import type { ProductLite } from "@/lib/types";
import { useRecent } from "@/store/recent";

export function TrackRecent({ product }: { product: ProductLite }) {
  const push = useRecent((s) => s.push);
  useEffect(() => {
    push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
    });
  }, [product, push]);
  return null;
}

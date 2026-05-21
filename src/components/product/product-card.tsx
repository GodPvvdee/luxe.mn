"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";

import type { ProductLite } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { usePreferences } from "@/store/preferences";
import { convert } from "@/lib/currency";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  className,
  priority = false,
}: {
  product: ProductLite;
  className?: string;
  priority?: boolean;
}) {
  const add = useCart((s) => s.add);
  const setCartOpen = useCart((s) => s.setOpen);
  const wish = useWishlist();
  const inWish = wish.has(product.id);
  const { currency } = usePreferences();

  const price = convert(product.price, currency);
  const compareAt = product.compareAt
    ? convert(Number(product.compareAt), currency)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className={cn("group relative", className)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.onSale && compareAt && (
              <Badge variant="sale">-{Math.round((1 - product.price / Number(product.compareAt)) * 100)}%</Badge>
            )}
            {product.bestseller && <Badge variant="glass">Шилдэг</Badge>}
          </div>

          <button
            aria-label={inWish ? "Хүслийн жагсаалтаас хасах" : "Хүслийн жагсаалтад нэмэх"}
            onClick={(e) => {
              e.preventDefault();
              wish.toggle({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0],
                price: product.price,
              });
              toast.success(
                inWish ? "Хүслээс хасагдлаа" : "Хүсэлд нэмэгдлээ",
              );
            }}
            className="absolute right-3 top-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur-md grid place-items-center shadow-sm transition-all hover:scale-110"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWish && "fill-red-500 text-red-500",
              )}
            />
          </button>

          <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              variant="glass"
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                add(
                  {
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    image: product.images[0],
                    price: product.price,
                    size: product.sizes[0],
                    color: product.colors[0],
                    maxStock: product.stock,
                  },
                  1,
                );
                setCartOpen(true);
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              Сагсанд нэмэх
            </Button>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link
            href={`/products/${product.slug}`}
            className="font-medium hover:underline line-clamp-1"
          >
            {product.name}
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">
            {product.categoryName}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="font-medium tabular-nums">
            {formatPrice(price, currency)}
          </div>
          {compareAt && (
            <div className="text-xs text-muted-foreground line-through tabular-nums">
              {formatPrice(compareAt, currency)}
            </div>
          )}
        </div>
      </div>
      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
        <span className="tabular-nums">{product.rating.toFixed(1)}</span>
        <span>·</span>
        <span>{product.reviewCount} сэтгэгдэл</span>
      </div>
    </motion.div>
  );
}

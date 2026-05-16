"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import type { ProductLite } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { usePreferences } from "@/store/preferences";
import { convert } from "@/lib/currency";
import { formatPrice, cn } from "@/lib/utils";

export function ProductInfo({ product }: { product: ProductLite }) {
  const [size, setSize] = useState<string | undefined>(product.sizes[0]);
  const [color, setColor] = useState<string | undefined>(product.colors[0]);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const setCartOpen = useCart((s) => s.setOpen);
  const wish = useWishlist();
  const inWish = wish.has(product.id);
  const { currency } = usePreferences();

  const price = convert(product.price, currency);
  const compareAt = product.compareAt
    ? convert(Number(product.compareAt), currency)
    : null;

  const onAdd = () => {
    if (product.sizes.length > 0 && !size) {
      toast.error("Хэмжээгээ сонгоно уу");
      return;
    }
    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price: product.price,
        size,
        color,
        maxStock: product.stock,
      },
      qty,
    );
    setCartOpen(true);
  };

  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{product.categoryName}</Badge>
          {product.bestseller && <Badge variant="new">Шилдэг борлуулагч</Badge>}
          {product.onSale && <Badge variant="sale">Хямдралтай</Badge>}
        </div>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30",
                )}
              />
            ))}
          </div>
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">
            · {product.reviewCount} сэтгэгдэл
          </span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl tabular-nums">
            {formatPrice(price, currency)}
          </span>
          {compareAt && (
            <span className="text-lg text-muted-foreground line-through tabular-nums">
              {formatPrice(compareAt, currency)}
            </span>
          )}
        </div>
      </div>

      <Separator />

      {product.colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Өнгө</span>
            <span className="text-sm text-muted-foreground">{color}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "px-4 h-10 rounded-full border text-sm font-medium transition-all",
                  color === c
                    ? "bg-foreground text-background border-foreground"
                    : "hover:bg-muted",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Хэмжээ</span>
            <button className="text-xs text-muted-foreground underline-offset-2 hover:underline">
              Хэмжээний заавар
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "h-12 rounded-xl border text-sm font-medium transition-all",
                  size === s
                    ? "bg-foreground text-background border-foreground"
                    : "hover:bg-muted",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center rounded-full border h-12 px-1">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="h-10 w-10 grid place-items-center hover:bg-muted rounded-full"
          >
            −
          </button>
          <span className="w-10 text-center tabular-nums">{qty}</span>
          <button
            onClick={() => setQty(Math.min(product.stock, qty + 1))}
            className="h-10 w-10 grid place-items-center hover:bg-muted rounded-full"
          >
            +
          </button>
        </div>
        <Button size="xl" className="flex-1" onClick={onAdd}>
          <ShoppingBag className="h-4 w-4" />
          Сагсанд нэмэх — {formatPrice(price * qty, currency)}
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-14 w-14"
          onClick={() => {
            wish.toggle({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: product.images[0],
              price: product.price,
            });
            toast.success(inWish ? "Хүслээс хасагдлаа" : "Хүсэлд нэмэгдлээ");
          }}
        >
          <Heart className={cn("h-5 w-5", inWish && "fill-red-500 text-red-500")} />
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-3 gap-3 pt-2"
      >
        {[
          { icon: Truck, label: "Үнэгүй хүргэлт" },
          { icon: ShieldCheck, label: "Бүх насны засвар" },
          { icon: RefreshCw, label: "30 хоногийн буцаалт" },
        ].map((it) => (
          <div
            key={it.label}
            className="rounded-xl bg-muted/50 p-3 flex items-center gap-2 text-xs font-medium"
          >
            <it.icon className="h-4 w-4" />
            {it.label}
          </div>
        ))}
      </motion.div>

      <Tabs defaultValue="description" className="pt-4">
        <TabsList>
          <TabsTrigger value="description">Тайлбар</TabsTrigger>
          <TabsTrigger value="materials">Материал</TabsTrigger>
          <TabsTrigger value="shipping">Хүргэлт</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="text-sm text-muted-foreground leading-relaxed pt-4">
          {product.description}
        </TabsContent>
        <TabsContent value="materials" className="text-sm text-muted-foreground leading-relaxed pt-4">
          Luxe-н бүх бүтээгдэхүүн нь баталгаатай эх үүсвэр, хариуцлагатай
          үйлдвэрлэгдсэн материалаас бүтсэн. Дэлгэрэнгүй мэдээллийг хүсэлтээр
          өгнө. Энэ бүтээгдэхүүний нүүрстөрөгчийн ул мөр: 4.2 кг CO₂e.
        </TabsContent>
        <TabsContent value="shipping" className="text-sm text-muted-foreground leading-relaxed pt-4">
          1-2 ажлын өдрийн дотор илгээгдэнэ. 500,000 ₮-аас дээш захиалгад
          стандарт хүргэлт үнэгүй. Шуурхай хүргэлтийг төлбөрийн үед сонгох
          боломжтой. Бүх захиалгад 30 хоногийн үнэгүй буцаалт.
        </TabsContent>
      </Tabs>
    </div>
  );
}

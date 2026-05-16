"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AccountNav } from "@/components/account/account-nav";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import { usePreferences } from "@/store/preferences";
import { useMounted } from "@/hooks/use-mounted";
import { convert } from "@/lib/currency";
import { formatPrice } from "@/lib/utils";
import { products } from "@/lib/mock-data";

export default function WishlistPage() {
  const mounted = useMounted();
  const { items, remove } = useWishlist();
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);
  const { currency } = usePreferences();

  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Нүүр", href: "/" }, { label: "Хүслийн жагсаалт" }]} />
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-6">
        Хүслийн жагсаалт
      </h1>
      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <AccountNav />
        <div className="flex-1">
          {!mounted ? null : items.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border bg-card">
              <div className="h-16 w-16 rounded-full bg-muted grid place-items-center mx-auto">
                <Heart className="h-6 w-6 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl mt-5">
                Хүслийн жагсаалт хоосон байна
              </h2>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                Дуртай зүйлээ хадгалаарай — хямдрах үед мэдэгдэх болно.
              </p>
              <Button asChild className="mt-6">
                <Link href="/products">Бүтээгдэхүүн үзэх</Link>
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="rounded-2xl border bg-card p-4 flex gap-4"
                  >
                    <Link href={`/products/${item.slug}`} className="shrink-0">
                      <div className="relative h-28 w-28 rounded-xl overflow-hidden bg-muted">
                        <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-medium line-clamp-1 hover:underline"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm tabular-nums mt-0.5">
                        {formatPrice(convert(item.price, currency), currency)}
                      </div>
                      <div className="mt-auto flex items-center gap-2 pt-3">
                        <Button
                          size="sm"
                          onClick={() => {
                            const full = products.find((p) => p.id === item.productId);
                            if (!full) return;
                            add(
                              {
                                productId: full.id,
                                slug: full.slug,
                                name: full.name,
                                image: full.images[0],
                                price: full.price,
                                size: full.sizes[0],
                                color: full.colors[0],
                                maxStock: full.stock,
                              },
                              1,
                            );
                            setOpen(true);
                            toast.success("Сагсанд нэмэгдлээ");
                          }}
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Сагсанд нэмэх
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(item.productId)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartSummary } from "@/components/cart/cart-summary";
import { useCart } from "@/store/cart";
import { usePreferences } from "@/store/preferences";
import { convert } from "@/lib/currency";
import { formatPrice } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

export default function CartPage() {
  const mounted = useMounted();
  const { items, remove, setQty } = useCart();
  const { currency } = usePreferences();

  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Нүүр", href: "/" }, { label: "Сагс" }]} />
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-6">
        Худалдан авах сагс
      </h1>

      {!mounted ? null : items.length === 0 ? (
        <div className="mt-12 max-w-md mx-auto text-center space-y-5">
          <div className="h-20 w-20 rounded-full bg-muted grid place-items-center mx-auto">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl">Сагс хоосон байна</h2>
          <p className="text-muted-foreground">
            Бүх насны эдэлгээтэй хэрэгцээт зүйлсээс сонгоорой.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Худалдан авалт хийх</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4 p-4 rounded-2xl border bg-card"
                >
                  <Link href={`/products/${item.slug}`} className="shrink-0">
                    <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-medium hover:underline"
                        >
                          {item.name}
                        </Link>
                        <div className="text-xs text-muted-foreground mt-0.5 flex gap-2">
                          {item.size && <span>Хэмжээ {item.size}</span>}
                          {item.color && <span>· {item.color}</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium tabular-nums">
                          {formatPrice(
                            convert(item.price * item.quantity, currency),
                            currency,
                          )}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-muted-foreground tabular-nums">
                            {formatPrice(convert(item.price, currency), currency)} / ш
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border">
                        <button
                          onClick={() => setQty(item.id, item.quantity - 1)}
                          className="h-8 w-8 grid place-items-center hover:bg-muted rounded-l-full"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQty(item.id, item.quantity + 1)}
                          className="h-8 w-8 grid place-items-center hover:bg-muted rounded-r-full"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Хасах
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <Separator className="mt-6" />
            <div className="flex justify-between items-center pt-2">
              <Link
                href="/products"
                className="text-sm font-medium hover:underline"
              >
                ← Үргэлжлүүлэн худалдан авах
              </Link>
            </div>
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}

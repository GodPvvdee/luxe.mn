"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { usePreferences } from "@/store/preferences";
import { convert } from "@/lib/currency";

export function CartDrawer() {
  const { open, setOpen, items, remove, setQty, subtotal } = useCart();
  const { currency } = usePreferences();
  const total = subtotal();
  const converted = convert(total, currency);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Таны сагс
            <span className="text-muted-foreground font-normal">
              ({items.reduce((s, x) => s + x.quantity, 0)})
            </span>
          </SheetTitle>
          <SheetDescription>
            Бараа 15 минутын турш баталгаажсан.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="h-20 w-20 rounded-full bg-muted grid place-items-center">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Сагс хоосон байна</h3>
              <p className="text-sm text-muted-foreground">
                Бүх насны эдэлгээтэй бараануудаас сонгоорой.
              </p>
            </div>
            <Button onClick={() => setOpen(false)} asChild>
              <Link href="/products">Үргэлжлүүлэх</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-4"
                  >
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="shrink-0"
                    >
                      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className="font-medium hover:underline line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <div className="text-xs text-muted-foreground mt-0.5 flex gap-2">
                        {item.size && <span>Хэмжээ {item.size}</span>}
                        {item.color && <span>{item.color}</span>}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border">
                          <button
                            aria-label="Багасгах"
                            onClick={() => setQty(item.id, item.quantity - 1)}
                            className="h-8 w-8 grid place-items-center hover:bg-muted rounded-l-full"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            aria-label="Нэмэх"
                            onClick={() => setQty(item.id, item.quantity + 1)}
                            className="h-8 w-8 grid place-items-center hover:bg-muted rounded-r-full"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium tabular-nums">
                            {formatPrice(
                              convert(item.price * item.quantity, currency),
                              currency,
                            )}
                          </span>
                          <button
                            aria-label="Хасах"
                            onClick={() => remove(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Дэд дүн</span>
                <span className="font-medium tabular-nums">
                  {formatPrice(converted, currency)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Хүргэлт ба татвар</span>
                <span>Төлбөрийн үед тооцоологдоно</span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setOpen(false)} asChild>
                  <Link href="/cart">Сагс харах</Link>
                </Button>
                <Button onClick={() => setOpen(false)} asChild>
                  <Link href="/checkout">Төлбөр төлөх</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

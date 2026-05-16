"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { ProductLite } from "@/lib/types";

function useCountdown(target: number) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

export function FlashSale({ products }: { products: ProductLite[] }) {
  const items = products.filter((p) => p.onSale).slice(0, 4);
  const target = React.useMemo(
    () => Date.now() + 1000 * 60 * 60 * 18,
    [],
  );
  const { h, m, s } = useCountdown(target);

  return (
    <section className="py-20 bg-gradient-to-br from-red-50/50 via-orange-50/30 to-amber-50/50 dark:from-red-950/20 dark:via-orange-950/10 dark:to-amber-950/20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium mb-3">
              <Flame className="h-3 w-3" />
              Флаш хямдрал · 40% хүртэлх хөнгөлөлт
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              Дуусахад
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {[
              ["Цаг", h],
              ["Минут", m],
              ["Секунд", s],
            ].map(([label, value]) => (
              <motion.div
                key={label as string}
                className="text-center bg-background border rounded-2xl px-4 md:px-6 py-3 shadow-sm min-w-[78px]"
              >
                <div className="font-display text-3xl tabular-nums">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                  {label as string}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

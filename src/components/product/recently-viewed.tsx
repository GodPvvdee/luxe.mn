"use client";
import Link from "next/link";
import Image from "next/image";
import { useRecent } from "@/store/recent";
import { usePreferences } from "@/store/preferences";
import { convert } from "@/lib/currency";
import { formatPrice } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const mounted = useMounted();
  const items = useRecent((s) => s.items);
  const { currency } = usePreferences();
  if (!mounted) return null;
  const list = items.filter((x) => x.productId !== excludeId).slice(0, 6);
  if (list.length === 0) return null;
  return (
    <section className="container py-12 border-t">
      <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-6">
        Сүүлд үзсэн
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 mask-fade-r -mx-6 px-6">
        {list.map((p) => (
          <Link
            key={p.productId}
            href={`/products/${p.slug}`}
            className="shrink-0 w-40 group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="160px"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-2 text-sm font-medium line-clamp-1">{p.name}</div>
            <div className="text-xs text-muted-foreground tabular-nums">
              {formatPrice(convert(p.price, currency), currency)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

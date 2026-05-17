import Link from "next/link";
import Image from "next/image";
import { Check, Package } from "lucide-react";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getOrderById } from "@/lib/orders";
import { formatPrice, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Search = Promise<{ order?: string }>;

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { order: orderId } = await searchParams;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const order = orderId && userId ? await getOrderById(orderId, userId) : null;

  return (
    <div className="container max-w-2xl py-20 space-y-8">
      <div className="text-center space-y-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950 grid place-items-center">
          <Check className="h-9 w-9 text-emerald-600" />
        </div>
        <h1 className="font-display text-4xl tracking-tight">Захиалга баталгаажлаа</h1>
        <p className="text-muted-foreground">
          Захиалга өгсөнд баярлалаа. Танай и-мэйл рүү баталгаажуулалт явуулсан
          бөгөөд хувийн самбараас захиалгын явцыг хянах боломжтой.
        </p>
        {orderId && (
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-mono">
            <Package className="h-4 w-4" />
            {orderId}
          </div>
        )}
      </div>

      {order && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Огноо</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <Separator />
            <div className="space-y-3">
              {order.items.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  {it.image && (
                    <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image src={it.image} alt={it.name} fill sizes="56px" className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm line-clamp-1">{it.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {[it.size, it.color].filter(Boolean).join(" · ")}
                      {it.quantity > 1 && ` · ${it.quantity} ширхэг`}
                    </div>
                  </div>
                  <div className="text-sm tabular-nums font-medium">
                    {formatPrice(Number(it.price) * it.quantity)}
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Дэд дүн</span>
                <span className="tabular-nums">{formatPrice(Number(order.subtotal))}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Хүргэлт</span>
                <span className="tabular-nums">
                  {Number(order.shipping) === 0 ? "Үнэгүй" : formatPrice(Number(order.shipping))}
                </span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Хөнгөлөлт</span>
                  <span className="tabular-nums">−{formatPrice(Number(order.discount))}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Татвар</span>
                <span className="tabular-nums">{formatPrice(Number(order.tax))}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-medium pt-2">
                <span>Нийт</span>
                <span className="tabular-nums">{formatPrice(Number(order.total))}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/orders">Захиалгууд үзэх</Link>
        </Button>
        <Button asChild>
          <Link href="/products">Үргэлжлүүлэн худалдан авах</Link>
        </Button>
      </div>
    </div>
  );
}

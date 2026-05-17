import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Package } from "lucide-react";
import { getServerSession } from "next-auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AccountNav } from "@/components/account/account-nav";
import { authOptions } from "@/lib/auth";
import { getOrderById } from "@/lib/orders";
import { formatPrice, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; variant: "new" | "default" | "destructive" | "outline" }> = {
  PENDING: { label: "Хүлээгдэж буй", variant: "outline" },
  PAID: { label: "Төлөгдсөн", variant: "default" },
  SHIPPED: { label: "Илгээгдсэн", variant: "default" },
  DELIVERED: { label: "Хүргэгдсэн", variant: "new" },
  CANCELLED: { label: "Цуцлагдсан", variant: "destructive" },
  REFUNDED: { label: "Буцаагдсан", variant: "destructive" },
};

type Params = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Params) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/login?callbackUrl=/orders/${id}`);
  const userId = (session.user as { id: string }).id;
  const order = await getOrderById(id, userId);
  if (!order) notFound();

  const status = STATUS_LABELS[order.status] ?? {
    label: order.status,
    variant: "default" as const,
  };

  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs
        items={[
          { label: "Нүүр", href: "/" },
          { label: "Захиалга", href: "/orders" },
          { label: order.id.slice(0, 12) },
        ]}
      />
      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <AccountNav />
        <div className="flex-1 space-y-6">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <h1 className="font-display text-3xl tracking-tight">
                  Захиалга
                </h1>
              </div>
              <div className="font-mono text-sm text-muted-foreground mt-1">
                {order.id}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {formatDate(order.createdAt)}
              </div>
            </div>
            <Badge variant={status.variant}>{status.label}</Badge>
          </header>

          <Card>
            <CardContent className="p-6 space-y-4">
              {order.items.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  {it.image && (
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted shrink-0">
                      <Image src={it.image} alt={it.name} fill sizes="64px" className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium line-clamp-1">{it.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {[it.size, it.color].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm tabular-nums font-medium">
                      {formatPrice(Number(it.price) * it.quantity)}
                    </div>
                    <div className="text-xs text-muted-foreground tabular-nums">
                      {it.quantity} × {formatPrice(Number(it.price))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-2 text-sm">
              <Row label="Дэд дүн" value={formatPrice(Number(order.subtotal))} />
              <Row
                label="Хүргэлт"
                value={Number(order.shipping) === 0 ? "Үнэгүй" : formatPrice(Number(order.shipping))}
              />
              {Number(order.discount) > 0 && (
                <Row
                  label={`Хөнгөлөлт${order.promoCode ? ` (${order.promoCode})` : ""}`}
                  value={`−${formatPrice(Number(order.discount))}`}
                  highlight
                />
              )}
              <Row label="Татвар" value={formatPrice(Number(order.tax))} />
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-medium">
                <span>Нийт</span>
                <span className="tabular-nums">{formatPrice(Number(order.total))}</span>
              </div>
            </CardContent>
          </Card>

          {order.address && (
            <Card>
              <CardContent className="p-6 space-y-1 text-sm">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Хүргэх хаяг
                </div>
                <div className="font-medium">{order.address.name}</div>
                <div>{order.address.line1}</div>
                {order.address.line2 && <div>{order.address.line2}</div>}
                <div>
                  {order.address.city}
                  {order.address.state ? `, ${order.address.state}` : ""} {order.address.zip}
                </div>
                <div>{order.address.country}</div>
                {order.address.phone && (
                  <div className="text-muted-foreground">{order.address.phone}</div>
                )}
              </CardContent>
            </Card>
          )}

          <Link
            href="/orders"
            className="inline-block text-sm font-medium hover:underline"
          >
            ← Бүх захиалга
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "tabular-nums font-medium text-emerald-600" : "tabular-nums"}>
        {value}
      </span>
    </div>
  );
}

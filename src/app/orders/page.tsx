import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Package, ArrowRight, ShoppingBag } from "lucide-react";
import { getServerSession } from "next-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AccountNav } from "@/components/account/account-nav";
import { authOptions } from "@/lib/auth";
import { getOrdersForUser } from "@/lib/orders";
import { formatPrice, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const STATUS_LABELS: Record<string, { label: string; variant: "new" | "default" | "destructive" | "outline" }> = {
  PENDING: { label: "Хүлээгдэж буй", variant: "outline" },
  PAID: { label: "Төлөгдсөн", variant: "default" },
  SHIPPED: { label: "Илгээгдсэн", variant: "default" },
  DELIVERED: { label: "Хүргэгдсэн", variant: "new" },
  CANCELLED: { label: "Цуцлагдсан", variant: "destructive" },
  REFUNDED: { label: "Буцаагдсан", variant: "destructive" },
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?callbackUrl=/orders");
  const userId = (session.user as { id: string }).id;
  const orders = await getOrdersForUser(userId);

  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Нүүр", href: "/" }, { label: "Захиалга" }]} />
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-6">
        Захиалга
      </h1>
      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <AccountNav />
        <div className="flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border bg-card">
              <div className="h-16 w-16 rounded-full bg-muted grid place-items-center mx-auto">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl mt-5">Захиалга байхгүй</h2>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                Эхний захиалгаа хийгээд эндээс түүхээ хянана уу.
              </p>
              <Button asChild className="mt-6">
                <Link href="/products">Худалдан авалт хийх</Link>
              </Button>
            </div>
          ) : (
            orders.map((order) => {
              const status = STATUS_LABELS[order.status] ?? {
                label: order.status,
                variant: "default" as const,
              };
              return (
                <article
                  key={order.id}
                  className="rounded-2xl border bg-card overflow-hidden"
                >
                  <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-mono text-sm font-medium">{order.id.slice(0, 12)}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(order.createdAt)}-нд захиалсан
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <span className="font-medium tabular-nums">
                        {formatPrice(Number(order.total))}
                      </span>
                    </div>
                  </header>
                  <div className="p-5 flex flex-wrap items-center gap-4">
                    {order.items.slice(0, 3).map((it) => (
                      <div key={it.id} className="flex items-center gap-3">
                        {it.image && (
                          <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-muted">
                            <Image
                              src={it.image}
                              alt={it.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="text-sm">
                          <div className="font-medium line-clamp-1">{it.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {[it.size, it.color].filter(Boolean).join(" · ")}
                          </div>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{order.items.length - 3} бусад
                      </span>
                    )}
                    <Button variant="outline" size="sm" className="ml-auto" asChild>
                      <Link href={`/orders/${order.id}`}>
                        Дэлгэрэнгүй
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

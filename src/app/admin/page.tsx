import Image from "next/image";
import Link from "next/link";
import { DollarSign, ShoppingCart, Users, Package, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/stat-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { CategoryChart } from "@/components/admin/category-chart";
import { getAllProducts } from "@/lib/products";
import { prisma } from "@/lib/prisma";
import { getAdminStats, getMonthlyRevenue, getCategoryRevenue } from "@/lib/admin-stats";
import { formatPrice } from "@/lib/utils";

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

function fmtPct(p: number) {
  const sign = p >= 0 ? "+" : "";
  return `${sign}${p.toFixed(1)}%`;
}

export default async function AdminPage() {
  const [stats, monthlyRevenue, categoryRevenue, products, recentOrders] = await Promise.all([
    getAdminStats(),
    getMonthlyRevenue(),
    getCategoryRevenue(),
    getAllProducts(),
    prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const top = products.filter((p) => p.bestseller).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Тавтай морил, Админ</h1>
        <p className="text-muted-foreground mt-1">
          Танай дэлгүүрт өнөөдөр юу болж байгааг харна уу.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Орлого (30 хоног)"
          value={formatPrice(stats.revenue)}
          delta={fmtPct(stats.revenueDelta)}
          positive={stats.revenueDelta >= 0}
          icon={DollarSign}
        />
        <StatCard
          label="Захиалга (30 хоног)"
          value={stats.orderCount.toLocaleString("en-US")}
          delta={fmtPct(stats.orderDelta)}
          positive={stats.orderDelta >= 0}
          icon={ShoppingCart}
        />
        <StatCard
          label="Хэрэглэгч"
          value={stats.customerCount.toLocaleString("en-US")}
          delta={fmtPct(stats.customerDelta)}
          positive={stats.customerDelta >= 0}
          icon={Users}
        />
        <StatCard
          label="Дундаж захиалга"
          value={formatPrice(stats.avgOrder)}
          delta={fmtPct(stats.avgDelta)}
          positive={stats.avgDelta >= 0}
          icon={Package}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <CardTitle>Орлого</CardTitle>
            <Badge variant="outline">Сүүлийн 12 сар</Badge>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart data={monthlyRevenue} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ангиллаар борлуулалт</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <CategoryChart data={categoryRevenue} />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Шилдэг бүтээгдэхүүн</CardTitle>
            <span className="text-xs text-muted-foreground">Үнэлгээ × сэтгэгдэл</span>
          </CardHeader>
          <CardContent className="space-y-3">
            {top.length === 0 ? (
              <p className="text-sm text-muted-foreground">Шилдэг бараа байхгүй</p>
            ) : (
              top.map((p) => (
                <div key={p.id} className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-muted">
                    {p.images[0] && (
                      <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm line-clamp-1">{p.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {p.rating} · {p.reviewCount} сэтгэгдэл
                    </div>
                  </div>
                  <div className="text-sm font-medium tabular-nums">
                    {formatPrice(p.price * p.reviewCount)}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Сүүлийн захиалгууд</CardTitle>
          </CardHeader>
          <CardContent className="-mx-6">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b">
                  <th className="text-left font-medium px-6 py-2">Захиалга</th>
                  <th className="text-left font-medium py-2">Хэрэглэгч</th>
                  <th className="text-left font-medium py-2">Төлөв</th>
                  <th className="text-right font-medium px-6 py-2">Нийт</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-muted-foreground">
                      Захиалга байхгүй
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((o) => {
                    const status = STATUS_LABELS[o.status] ?? {
                      label: o.status,
                      variant: "default" as const,
                    };
                    return (
                      <tr key={o.id} className="border-b last:border-0">
                        <td className="px-6 py-3">
                          <Link href={`/orders/${o.id}`} className="font-mono text-xs hover:underline">
                            {o.id.slice(0, 8)}
                          </Link>
                        </td>
                        <td className="py-3">{o.user.name ?? o.user.email}</td>
                        <td className="py-3">
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </td>
                        <td className="px-6 py-3 text-right tabular-nums font-medium">
                          {formatPrice(Number(o.total))}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

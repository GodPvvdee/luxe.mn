import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const STATUS_LABELS: Record<string, { label: string; variant: "new" | "default" | "destructive" | "outline" | "secondary" }> = {
  PENDING: { label: "Хүлээгдэж буй", variant: "outline" },
  PAID: { label: "Төлөгдсөн", variant: "default" },
  SHIPPED: { label: "Илгээгдсэн", variant: "default" },
  DELIVERED: { label: "Хүргэгдсэн", variant: "new" },
  CANCELLED: { label: "Цуцлагдсан", variant: "destructive" },
  REFUNDED: { label: "Буцаагдсан", variant: "destructive" },
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { items: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Захиалга</h1>
          <p className="text-muted-foreground mt-1">
            {orders.length === 100 ? "Сүүлийн 100" : `Нийт ${orders.length}`} захиалга
          </p>
        </div>
        <Input placeholder="Захиалга, хэрэглэгчээр хайх…" className="max-w-xs" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left font-medium px-6 py-3">Захиалга</th>
                <th className="text-left font-medium py-3">Хэрэглэгч</th>
                <th className="text-left font-medium py-3">Огноо</th>
                <th className="text-left font-medium py-3">Бараа</th>
                <th className="text-left font-medium py-3">Төлөв</th>
                <th className="text-right font-medium px-6 py-3">Нийт</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground">
                    Захиалга байхгүй
                  </td>
                </tr>
              ) : (
                orders.map((o) => {
                  const status = STATUS_LABELS[o.status] ?? {
                    label: o.status,
                    variant: "default" as const,
                  };
                  return (
                    <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-6 py-3">
                        <Link
                          href={`/orders/${o.id}`}
                          className="font-mono text-xs hover:underline"
                        >
                          {o.id.slice(0, 12)}
                        </Link>
                      </td>
                      <td className="py-3">
                        <div>{o.user.name ?? "(нэргүй)"}</div>
                        <div className="text-xs text-muted-foreground">{o.user.email}</div>
                      </td>
                      <td className="py-3">{formatDate(o.createdAt)}</td>
                      <td className="py-3 tabular-nums">{o._count.items}</td>
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
        </div>
        {orders.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t text-sm text-muted-foreground">
            <span>{orders.length} мөр харагдаж байна</span>
            <Button variant="outline" size="sm" disabled>
              Дараагийн
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

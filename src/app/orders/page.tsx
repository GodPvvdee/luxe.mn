import Image from "next/image";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AccountNav } from "@/components/account/account-nav";
import { formatPrice, formatDate } from "@/lib/utils";

const orders = [
  {
    id: "LUX-2451092",
    status: "Хүргэгдсэн",
    statusVariant: "new" as const,
    date: new Date("2026-05-04"),
    total: 524,
    items: [
      {
        name: "Phantom Runner X1",
        size: "42",
        color: "Хар",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
      },
      {
        name: "Essential Merino Tee",
        size: "M",
        color: "Саарал",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
      },
    ],
  },
  {
    id: "LUX-2438904",
    status: "Илгээгдсэн",
    statusVariant: "default" as const,
    date: new Date("2026-04-22"),
    total: 219,
    items: [
      {
        name: "Pulse Wireless Earbuds",
        color: "Хар",
        image:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?w=300&q=80",
      },
    ],
  },
  {
    id: "LUX-2419201",
    status: "Цуцлагдсан",
    statusVariant: "destructive" as const,
    date: new Date("2026-03-11"),
    total: 145,
    items: [
      {
        name: "Atlas Low Top",
        size: "41",
        color: "Цайвар",
        image:
          "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=300&q=80",
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Нүүр", href: "/" }, { label: "Захиалга" }]} />
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-6">
        Захиалга
      </h1>
      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <AccountNav />
        <div className="flex-1 space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border bg-card overflow-hidden"
            >
              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b bg-muted/30">
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-mono text-sm font-medium">{order.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(order.date)}-нд захиалсан
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={order.statusVariant}>{order.status}</Badge>
                  <span className="font-medium tabular-nums">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </header>
              <div className="p-5 flex flex-wrap items-center gap-4">
                {order.items.map((it) => (
                  <div key={it.name} className="flex items-center gap-3">
                    <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-muted">
                      <Image
                        src={it.image}
                        alt={it.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium line-clamp-1">{it.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {[it.size, it.color].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="ml-auto" asChild>
                  <Link href="#">
                    Дэлгэрэнгүй
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

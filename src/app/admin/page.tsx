import Image from "next/image";
import { DollarSign, ShoppingCart, Users, Package, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/stat-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { CategoryChart } from "@/components/admin/category-chart";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function AdminPage() {
  const top = products.filter((p) => p.bestseller).slice(0, 5);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Welcome back, Admin</h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Revenue" value="$72,485" delta="+12.4%" icon={DollarSign} />
        <StatCard label="Orders" value="932" delta="+8.1%" icon={ShoppingCart} />
        <StatCard label="Customers" value="2,481" delta="+5.2%" icon={Users} />
        <StatCard label="Avg. order" value="$77.78" delta="-2.1%" positive={false} icon={Package} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <CardTitle>Revenue</CardTitle>
            <Badge variant="outline">Last 12 months</Badge>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by category</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <CategoryChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Top products</CardTitle>
            <span className="text-xs text-muted-foreground">By revenue</span>
          </CardHeader>
          <CardContent className="space-y-3">
            {top.map((p) => (
              <div key={p.id} className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-muted">
                  <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm line-clamp-1">{p.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {p.rating} · {p.reviewCount} reviews
                  </div>
                </div>
                <div className="text-sm font-medium tabular-nums">
                  {formatPrice(p.price * p.reviewCount)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
          </CardHeader>
          <CardContent className="-mx-6">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b">
                  <th className="text-left font-medium px-6 py-2">Order</th>
                  <th className="text-left font-medium py-2">Customer</th>
                  <th className="text-left font-medium py-2">Status</th>
                  <th className="text-right font-medium px-6 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["LUX-2451", "Emma S.", "Paid", 289],
                  ["LUX-2450", "James K.", "Shipped", 519],
                  ["LUX-2449", "Aiko T.", "Delivered", 145],
                  ["LUX-2448", "Marcus C.", "Pending", 78],
                  ["LUX-2447", "Olivia R.", "Paid", 412],
                ].map(([id, customer, status, total]) => (
                  <tr key={id as string} className="border-b last:border-0">
                    <td className="px-6 py-3 font-mono text-xs">{id}</td>
                    <td className="py-3">{customer}</td>
                    <td className="py-3">
                      <Badge
                        variant={
                          status === "Delivered"
                            ? "new"
                            : status === "Pending"
                              ? "outline"
                              : "default"
                        }
                      >
                        {status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-right tabular-nums font-medium">
                      {formatPrice(total as number)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

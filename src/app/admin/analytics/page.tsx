import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { CategoryChart } from "@/components/admin/category-chart";
import { Eye, ShoppingCart, MousePointerClick, Percent } from "lucide-react";
import { getMonthlyRevenue, getCategoryRevenue } from "@/lib/admin-stats";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function AdminAnalyticsPage() {
  const [monthlyRevenue, categoryRevenue] = await Promise.all([
    getMonthlyRevenue(),
    getCategoryRevenue(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Аналитик</h1>
        <p className="text-muted-foreground mt-1">
          Конверс, трафик, бүтээгдэхүүний гүйцэтгэл.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Үзэлт" value="184,512" delta="+18%" icon={Eye} />
        <StatCard label="Сагсанд нэмсэн" value="12,318" delta="+9%" icon={ShoppingCart} />
        <StatCard label="Дарагдсан" value="3.2%" delta="+0.4pp" icon={MousePointerClick} />
        <StatCard label="Конверс" value="2.84%" delta="-0.2pp" positive={false} icon={Percent} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Орлогын тренд</CardTitle>
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
    </div>
  );
}

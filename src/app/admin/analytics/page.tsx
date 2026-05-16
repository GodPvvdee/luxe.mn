import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { CategoryChart } from "@/components/admin/category-chart";
import { Eye, ShoppingCart, MousePointerClick, Percent } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Conversion, traffic, and product performance.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Sessions" value="184,512" delta="+18%" icon={Eye} />
        <StatCard label="Add to cart" value="12,318" delta="+9%" icon={ShoppingCart} />
        <StatCard label="Click-through" value="3.2%" delta="+0.4pp" icon={MousePointerClick} />
        <StatCard label="Conversion" value="2.84%" delta="-0.2pp" positive={false} icon={Percent} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue trend</CardTitle>
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
    </div>
  );
}

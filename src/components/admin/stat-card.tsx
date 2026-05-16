import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  positive = true,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  icon: LucideIcon;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="h-9 w-9 rounded-xl bg-muted grid place-items-center">
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="font-display text-3xl tracking-tight">{value}</div>
          <div className="mt-1 flex items-center gap-1 text-xs">
            <span
              className={cn(
                "inline-flex items-center font-medium",
                positive ? "text-emerald-600" : "text-red-600",
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {delta}
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

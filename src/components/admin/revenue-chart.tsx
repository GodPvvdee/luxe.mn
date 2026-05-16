"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 24500, orders: 320 },
  { month: "Feb", revenue: 28900, orders: 380 },
  { month: "Mar", revenue: 31200, orders: 415 },
  { month: "Apr", revenue: 38400, orders: 502 },
  { month: "May", revenue: 42800, orders: 558 },
  { month: "Jun", revenue: 39600, orders: 521 },
  { month: "Jul", revenue: 47100, orders: 614 },
  { month: "Aug", revenue: 51200, orders: 668 },
  { month: "Sep", revenue: 49800, orders: 645 },
  { month: "Oct", revenue: 58400, orders: 758 },
  { month: "Nov", revenue: 64900, orders: 842 },
  { month: "Dec", revenue: 72500, orders: 932 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.25} />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="month"
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 12 }}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            fontSize: 12,
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--foreground))"
          strokeWidth={2}
          fill="url(#rev)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

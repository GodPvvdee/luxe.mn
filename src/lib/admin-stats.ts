import "server-only";
import { prisma } from "./prisma";

const PAID_STATUSES = ["PAID", "SHIPPED", "DELIVERED"] as const;

export type AdminStats = {
  revenue: number;
  orderCount: number;
  customerCount: number;
  avgOrder: number;
  revenueDelta: number; // ӨМНӨХ 30 хоногтой харьцуулсан хувь
  orderDelta: number;
  customerDelta: number;
  avgDelta: number;
};

function pctChange(now: number, prev: number) {
  if (prev === 0) return now > 0 ? 100 : 0;
  return ((now - prev) / prev) * 100;
}

export async function getAdminStats(): Promise<AdminStats> {
  const now = new Date();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const [allOrders, customerCount, prevCustomerCount] = await Promise.all([
    prisma.order.findMany({
      select: { total: true, status: true, createdAt: true },
    }),
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { lt: monthAgo } } }),
  ]);

  const paid = allOrders.filter((o) =>
    PAID_STATUSES.includes(o.status as (typeof PAID_STATUSES)[number]),
  );

  const recent = paid.filter((o) => o.createdAt >= monthAgo);
  const previous = paid.filter(
    (o) => o.createdAt >= twoMonthsAgo && o.createdAt < monthAgo,
  );

  const revenue = recent.reduce((s, o) => s + Number(o.total), 0);
  const prevRevenue = previous.reduce((s, o) => s + Number(o.total), 0);

  const orderCount = allOrders.filter((o) => o.createdAt >= monthAgo).length;
  const prevOrderCount = allOrders.filter(
    (o) => o.createdAt >= twoMonthsAgo && o.createdAt < monthAgo,
  ).length;

  const avgOrder = recent.length ? revenue / recent.length : 0;
  const prevAvg = previous.length ? prevRevenue / previous.length : 0;

  return {
    revenue,
    orderCount,
    customerCount,
    avgOrder,
    revenueDelta: pctChange(revenue, prevRevenue),
    orderDelta: pctChange(orderCount, prevOrderCount),
    customerDelta: pctChange(customerCount, prevCustomerCount),
    avgDelta: pctChange(avgOrder, prevAvg),
  };
}

export type MonthRevenue = { month: string; revenue: number; orders: number };

const MN_MONTHS_SHORT = ["1-р", "2-р", "3-р", "4-р", "5-р", "6-р", "7-р", "8-р", "9-р", "10-р", "11-р", "12-р"];

export async function getMonthlyRevenue(): Promise<MonthRevenue[]> {
  // Сүүлийн 12 сар
  const orders = await prisma.order.findMany({
    where: {
      status: { in: ["PAID", "SHIPPED", "DELIVERED"] },
      createdAt: {
        gte: new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000),
      },
    },
    select: { total: true, createdAt: true },
  });

  const buckets = new Map<string, { revenue: number; orders: number }>();
  // Сүүлийн 12 сарын buckets-ийг үндсэн утга 0-р үүсгэе
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    buckets.set(key, { revenue: 0, orders: 0 });
  }

  for (const o of orders) {
    const key = `${o.createdAt.getFullYear()}-${String(o.createdAt.getMonth() + 1).padStart(2, "0")}`;
    const b = buckets.get(key);
    if (b) {
      b.revenue += Number(o.total);
      b.orders += 1;
    }
  }

  return Array.from(buckets.entries()).map(([key, b]) => {
    const [, m] = key.split("-");
    return {
      month: MN_MONTHS_SHORT[parseInt(m, 10) - 1],
      revenue: Math.round(b.revenue),
      orders: b.orders,
    };
  });
}

export type CategorySlice = { name: string; value: number };

export async function getCategoryRevenue(): Promise<CategorySlice[]> {
  // OrderItem-уудаас ангиллаар нийлбэр
  const items = await prisma.orderItem.findMany({
    select: {
      price: true,
      quantity: true,
      product: { select: { category: { select: { name: true } } } },
    },
  });

  if (items.length === 0) return [];

  const totals = new Map<string, number>();
  for (const it of items) {
    const cat = it.product?.category?.name ?? "Бусад";
    totals.set(cat, (totals.get(cat) ?? 0) + Number(it.price) * it.quantity);
  }

  const grand = Array.from(totals.values()).reduce((s, n) => s + n, 0);
  return Array.from(totals.entries())
    .map(([name, sum]) => ({ name, value: Math.round((sum / grand) * 100) }))
    .sort((a, b) => b.value - a.value);
}

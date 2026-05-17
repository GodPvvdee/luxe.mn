import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function AdminCustomersPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      orders: {
        select: { total: true, status: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const enriched = users.map((u) => {
    const paid = u.orders.filter((o) => o.status !== "CANCELLED" && o.status !== "REFUNDED");
    const spend = paid.reduce((s, o) => s + Number(o.total), 0);
    const tier = spend >= 1000 ? "VIP" : "Гишүүн";
    return {
      id: u.id,
      name: u.name ?? "(нэргүй)",
      email: u.email,
      image: u.image,
      role: u.role,
      joined: u.createdAt,
      orders: u.orders.length,
      spend,
      tier,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Хэрэглэгчид</h1>
          <p className="text-muted-foreground mt-1">
            {users.length} хэрэглэгч системд бүртгэгдсэн.
          </p>
        </div>
        <Input placeholder="Хайх…" className="max-w-xs" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left font-medium px-6 py-3">Хэрэглэгч</th>
                <th className="text-left font-medium py-3">Эрх</th>
                <th className="text-left font-medium py-3">Бүртгүүлсэн</th>
                <th className="text-left font-medium py-3">Түвшин</th>
                <th className="text-right font-medium py-3">Захиалга</th>
                <th className="text-right font-medium px-6 py-3">Нийт зарцуулсан</th>
              </tr>
            </thead>
            <tbody>
              {enriched.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground">
                    Хэрэглэгч байхгүй
                  </td>
                </tr>
              ) : (
                enriched.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          {c.image && <AvatarImage src={c.image} />}
                          <AvatarFallback>{c.name[0]?.toUpperCase() ?? "?"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant={c.role === "ADMIN" ? "default" : "outline"}>
                        {c.role}
                      </Badge>
                    </td>
                    <td className="py-3">{formatDate(c.joined)}</td>
                    <td className="py-3">
                      <Badge variant={c.tier === "VIP" ? "new" : "outline"}>{c.tier}</Badge>
                    </td>
                    <td className="py-3 text-right tabular-nums">{c.orders}</td>
                    <td className="px-6 py-3 text-right tabular-nums font-medium">
                      {formatPrice(c.spend)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

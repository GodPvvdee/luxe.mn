import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";

const customers = [
  { id: "u1", name: "Emma Stone", email: "emma@example.com", joined: new Date("2024-08-12"), spend: 2840, orders: 14, tier: "VIP", avatar: 47 },
  { id: "u2", name: "James Kim", email: "james@example.com", joined: new Date("2024-11-02"), spend: 1284, orders: 9, tier: "Member", avatar: 12 },
  { id: "u3", name: "Aiko Tanaka", email: "aiko@example.com", joined: new Date("2023-04-22"), spend: 4520, orders: 22, tier: "VIP", avatar: 32 },
  { id: "u4", name: "Marcus Chen", email: "marcus@example.com", joined: new Date("2025-01-15"), spend: 612, orders: 4, tier: "Member", avatar: 65 },
  { id: "u5", name: "Olivia Reyes", email: "olivia@example.com", joined: new Date("2024-03-28"), spend: 1890, orders: 11, tier: "Member", avatar: 49 },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">2,481 customers in 28 countries.</p>
        </div>
        <Input placeholder="Search…" className="max-w-xs" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left font-medium px-6 py-3">Customer</th>
                <th className="text-left font-medium py-3">Joined</th>
                <th className="text-left font-medium py-3">Tier</th>
                <th className="text-right font-medium py-3">Orders</th>
                <th className="text-right font-medium px-6 py-3">Lifetime spend</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://i.pravatar.cc/64?img=${c.avatar}`} />
                        <AvatarFallback>{c.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.email}</div>
                      </div>
                    </div>
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
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

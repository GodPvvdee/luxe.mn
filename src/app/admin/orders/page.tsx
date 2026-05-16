import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/lib/utils";

const rows = [
  { id: "LUX-2451092", customer: "Emma Stone", date: new Date("2026-05-12"), total: 524, status: "Paid" },
  { id: "LUX-2451091", customer: "James Kim", date: new Date("2026-05-12"), total: 219, status: "Shipped" },
  { id: "LUX-2451090", customer: "Aiko Tanaka", date: new Date("2026-05-11"), total: 145, status: "Delivered" },
  { id: "LUX-2451089", customer: "Marcus Chen", date: new Date("2026-05-11"), total: 78, status: "Pending" },
  { id: "LUX-2451088", customer: "Olivia Reyes", date: new Date("2026-05-10"), total: 412, status: "Refunded" },
  { id: "LUX-2451087", customer: "Daniel Park", date: new Date("2026-05-10"), total: 198, status: "Delivered" },
  { id: "LUX-2451086", customer: "Sofia Lopez", date: new Date("2026-05-09"), total: 449, status: "Cancelled" },
];

function badgeFor(status: string) {
  switch (status) {
    case "Paid":
      return "default";
    case "Shipped":
      return "default";
    case "Delivered":
      return "new";
    case "Pending":
      return "outline";
    case "Cancelled":
    case "Refunded":
      return "destructive";
    default:
      return "secondary";
  }
}

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Fulfillment, refunds, and customer service.
          </p>
        </div>
        <Input placeholder="Search by order, customer…" className="max-w-xs" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left font-medium px-6 py-3">Order</th>
                <th className="text-left font-medium py-3">Customer</th>
                <th className="text-left font-medium py-3">Date</th>
                <th className="text-left font-medium py-3">Status</th>
                <th className="text-right font-medium px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-3 font-mono text-xs">{r.id}</td>
                  <td className="py-3">{r.customer}</td>
                  <td className="py-3">{formatDate(r.date)}</td>
                  <td className="py-3">
                    <Badge variant={badgeFor(r.status) as never}>{r.status}</Badge>
                  </td>
                  <td className="px-6 py-3 text-right tabular-nums font-medium">
                    {formatPrice(r.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t text-sm text-muted-foreground">
          <span>Showing 1–{rows.length} of 1,238</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

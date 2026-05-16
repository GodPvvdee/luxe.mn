import { Truck, ShieldCheck, RefreshCw, Leaf } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Үнэгүй хүргэлт",
    desc: "500,000 ₮-аас дээш захиалгад дэлхий даяар",
  },
  {
    icon: ShieldCheck,
    title: "Бүх насны засвар",
    desc: "Бид бүтээгдэхүүн бүрийнхээ ард зогсдог",
  },
  {
    icon: RefreshCw,
    title: "30 хоногийн буцаалт",
    desc: "Үнэгүй буцаалт, асуух зүйлгүй",
  },
  {
    icon: Leaf,
    title: "Нүүрстөрөгчийн саармаг",
    desc: "Илгээлт болгон, бүтээгдэхүүн болгон",
  },
];

export function ValueProps() {
  return (
    <section className="container py-16 border-y">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-2xl bg-muted grid place-items-center">
              <it.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

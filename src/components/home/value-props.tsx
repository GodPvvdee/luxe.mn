import { Truck, ShieldCheck, RefreshCw, Sparkles } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Хүргэлт + угсралт",
    desc: "Улаанбаатарт үнэгүй хүргэж тавилгаа угсарна",
  },
  {
    icon: ShieldCheck,
    title: "Чанарын баталгаа",
    desc: "Тавилгад 5 жил, бусдад 1 жил",
  },
  {
    icon: RefreshCw,
    title: "30 хоногийн буцаалт",
    desc: "Гэртээ туршаад тохирохгүй бол үнэгүй буцаана",
  },
  {
    icon: Sparkles,
    title: "Хувийн зөвлөгөө",
    desc: "Дотоод дизайнерээс үнэгүй санал авах",
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

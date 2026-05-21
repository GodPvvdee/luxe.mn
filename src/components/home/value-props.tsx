import { Truck, Flower2, RefreshCw, Sparkles } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Тэр өдрийн хүргэлт",
    desc: "Улаанбаатарт өглөө захиалга, орой хүргэлт",
  },
  {
    icon: Flower2,
    title: "Цэцгийн сэргэг баталгаа",
    desc: "5 хоног дотор гажуудвал үнэгүй сольно",
  },
  {
    icon: RefreshCw,
    title: "Гэрэлтүүлгийн засвар",
    desc: "Лампад 5 жилийн чанарын баталгаа",
  },
  {
    icon: Sparkles,
    title: "Стайлингын зөвлөгөө",
    desc: "Флорист, дотоод дизайнерээс үнэгүй санал",
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

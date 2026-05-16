"use client";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Эмма С.",
    avatar: "https://i.pravatar.cc/64?img=47",
    rating: 5,
    date: "2 долоо хоногийн өмнө",
    title: "Үнэхээр миний эзэмшсэн хамгийн шилдэг",
    body: "Жилийн турш гурван хос гутал өмссөн ч энэ нь хамгийн тав тухтай. Чанарын байдал нь гайхалтай — дор хаяж 5 жил эдлэгдэх болов уу.",
  },
  {
    name: "Жэймс К.",
    avatar: "https://i.pravatar.cc/64?img=12",
    rating: 4,
    date: "1 сарын өмнө",
    title: "Гоё, гэхдээ хэмжээний тэмдэглэл",
    body: "Зурагнаас илүү гоё байсан. Хэмжээ нь жаахан том — хоёр хэмжээний хооронд бол нэг хэмжээ багасгахыг зөвлөж байна.",
  },
  {
    name: "Юки Т.",
    avatar: "https://i.pravatar.cc/64?img=32",
    rating: 5,
    date: "1 сарын өмнө",
    title: "Үнэ цэнтэй",
    body: "Хэрэглэгчийн үйлчилгээ нь онцгой. Жижиг асуудал гарахад тэр өдөрт нь л шинээр сольж өгсөн.",
  },
];

export function ProductReviews({ rating, count }: { rating: number; count: number }) {
  return (
    <section className="container py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-display text-4xl tracking-tight">Сэтгэгдэл</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.round(rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30",
                  )}
                />
              ))}
            </div>
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">
              · {count} сэтгэгдэлд үндэслэв
            </span>
          </div>
        </div>
        <Button variant="outline">Сэтгэгдэл бичих</Button>
      </div>

      <Separator />

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {reviews.map((r) => (
          <article key={r.name} className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={r.avatar} alt="" />
                <AvatarFallback>{r.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < r.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30",
                  )}
                />
              ))}
            </div>
            <h4 className="font-medium">{r.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {r.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

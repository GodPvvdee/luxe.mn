import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/mock-data";
import { ArrowUpRight } from "lucide-react";

export function CategoriesGrid() {
  return (
    <section className="container py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Ангиллаар үзэх
        </p>
        <h2 className="font-display text-4xl md:text-5xl tracking-tight mt-2">
          Өөрийн ангиллыг олоорой
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={`/products?cat=${c.slug}`}
            className={`group relative overflow-hidden rounded-3xl ${
              i === 0 ? "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto" : "aspect-[4/5]"
            }`}
          >
            <Image
              src={c.image ?? ""}
              alt={c.name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                  {c.name}
                </h3>
                <div className="h-9 w-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 grid place-items-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <p className="text-sm text-white/80 max-w-xs mt-1 hidden md:block">
                {c.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

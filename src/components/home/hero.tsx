"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-fade-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] -z-10" />
      <div className="container relative grid lg:grid-cols-12 gap-10 lg:gap-12 py-16 md:py-24 lg:py-28 items-center">
        <div className="lg:col-span-6 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background/60 backdrop-blur text-xs font-medium"
          >
            <Sparkles className="h-3 w-3" />
            Шинэ улирал · 2026 оны цуглуулга ирлээ
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
          >
            Гэрэл бол зөөлөн зүй,{" "}
            <span className="italic text-muted-foreground">
              цэцэг бол анхны баяр.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl"
          >
            Дулаан гэрэлтүүлэг, шинэхэн цэцгийн баглаа — гэр гэртээ амьдрал
            бэлэглэх хоёр энгийн мөртлөө хүчтэй зүйл.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Button size="xl" asChild>
              <Link href="/products">
                Цуглуулгыг үзэх
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/products?sale=1">Хямдралыг харах</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-6 pt-2 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {[47, 12, 32, 65].map((i) => (
                <Image
                  key={i}
                  src={`https://i.pravatar.cc/64?img=${i}`}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-background"
                />
              ))}
            </div>
            <span>
              <strong className="text-foreground">12,000+</strong> айлд гэрэл,
              цэцэг хүргэсэн
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1456574808786-d2ba7a6aa654?w=1400&q=85"
              alt="Blush Peony Bouquet"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="text-white">
                <div className="text-xs uppercase tracking-widest opacity-80">
                  Онцлох · Цэцэг
                </div>
                <div className="font-display text-2xl mt-1">
                  Blush Peony Bouquet
                </div>
                <Link
                  href="/products/blush-peony-bouquet"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
                >
                  Үзэх <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex absolute -left-6 -bottom-6 h-32 w-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
            <Image
              src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=85"
              alt=""
              width={200}
              height={200}
              className="object-cover"
            />
          </div>
          <div className="hidden md:flex absolute -right-4 top-12 px-4 py-3 rounded-2xl bg-background/80 backdrop-blur-xl border shadow-xl flex-col">
            <span className="text-xs text-muted-foreground">Өнөөдөр хүргэсэн</span>
            <span className="font-display text-2xl mt-0.5">320+ баглаа</span>
            <span className="text-xs text-emerald-500 font-medium mt-0.5">
              ↑ 24% өмнөх 7 хоногтой
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-[80px_1fr] md:grid-cols-[96px_1fr] gap-4">
      <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl bg-muted border-2 transition-all",
              i === active ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <Image
              src={img}
              alt={`${name} view ${i + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[active]}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

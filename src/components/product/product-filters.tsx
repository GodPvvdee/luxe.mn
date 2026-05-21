"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Category = { name: string; slug: string };

const COLORS = [
  { name: "Хар", hex: "#1a1a1a" },
  { name: "Цайвар", hex: "#f5f5f5" },
  { name: "Улаан", hex: "#dc4d28" },
  { name: "Ой", hex: "#2d4a3e" },
  { name: "Саарал", hex: "#475569" },
  { name: "Хүрэн", hex: "#c7a17a" },
  { name: "Алтан", hex: "#d4af37" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "38", "40", "42", "44"];

function FilterBody({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const currentCat = params.get("cat") ?? "all";
  const currentColor = params.get("color");
  const currentSize = params.get("size");
  const min = Number(params.get("min") ?? 0);
  const max = Number(params.get("max") ?? 500);

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value == null) next.delete(key);
    else next.set(key, value);
    router.push(`/products?${next.toString()}`);
  };

  return (
    <div className="space-y-7">
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground">
          Ангилал
        </Label>
        <div className="mt-3 space-y-1">
          {[{ name: "Бүгд", slug: "all" }, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => update("cat", c.slug === "all" ? null : c.slug)}
              className={cn(
                "block w-full text-left text-sm py-1.5 rounded-lg px-2 hover:bg-muted transition-colors",
                (currentCat === c.slug || (!params.get("cat") && c.slug === "all"))
                  ? "font-medium"
                  : "text-muted-foreground",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground">
          Үнэ ($)
        </Label>
        <Slider
          value={[min, max]}
          min={0}
          max={500}
          step={10}
          onValueChange={([a, b]) => {
            const next = new URLSearchParams(params.toString());
            next.set("min", String(a));
            next.set("max", String(b));
            router.push(`/products?${next.toString()}`);
          }}
          className="mt-4"
        />
        <div className="mt-3 flex justify-between text-xs tabular-nums">
          <span>${min}</span>
          <span>${max}</span>
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground">
          Өнгө
        </Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c.name}
              title={c.name}
              onClick={() =>
                update("color", currentColor === c.name ? null : c.name)
              }
              className={cn(
                "h-7 w-7 rounded-full border-2 transition-transform",
                currentColor === c.name
                  ? "border-foreground scale-110"
                  : "border-transparent hover:scale-105",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <Separator />

      <div>
        {/* <Label className="text-xs uppercase tracking-widest text-muted-foreground">
          Хэмжээ
        </Label> */}
        {/* <div className="mt-3 flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => update("size", currentSize === s ? null : s)}
              className={cn(
                "h-9 min-w-9 px-3 rounded-full border text-xs font-medium",
                currentSize === s
                  ? "bg-foreground text-background border-foreground"
                  : "hover:bg-muted",
              )}
            >
              {s}
            </button>
          ))}
        </div> */}
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.push("/products")}
      >
        <X className="h-4 w-4" />
        Шүүлтүүр цэвэрлэх
      </Button>
    </div>
  );
}

export function ProductFilters({ categories }: { categories: Category[] }) {
  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <FilterBody categories={categories} />
        </div>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4" />
            Шүүлтүүр
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Бүтээгдэхүүн шүүх</SheetTitle>
          </SheetHeader>
          <div className="p-6 pt-0">
            <FilterBody categories={categories} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

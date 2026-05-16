"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  { value: "featured", label: "Онцлох" },
  { value: "newest", label: "Шинэ" },
  { value: "price-asc", label: "Үнэ: бага → их" },
  { value: "price-desc", label: "Үнэ: их → бага" },
  { value: "rating", label: "Хамгийн өндөр үнэлгээтэй" },
];

export function ProductSort() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("sort") ?? "featured";

  return (
    <Select
      value={current}
      onValueChange={(v) => {
        const next = new URLSearchParams(params.toString());
        next.set("sort", v);
        router.push(`/products?${next.toString()}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Эрэмбэлэх" />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

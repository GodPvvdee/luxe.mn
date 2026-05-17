"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { slugifyForDb } from "@/lib/slugify";

type Category = { id: string; name: string };

type FormState = {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAt: number | null;
  stock: number;
  categoryId: string;
  imagesText: string; // мөр бүрд нэг URL
  sizesText: string; // таслалаар тусгаарласан
  colorsText: string;
  featured: boolean;
  bestseller: boolean;
  onSale: boolean;
};

export function NewProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0,
      compareAt: null,
      stock: 0,
      categoryId: categories[0]?.id ?? "",
      imagesText: "",
      sizesText: "",
      colorsText: "",
      featured: false,
      bestseller: false,
      onSale: false,
    },
  });

  const name = watch("name");
  const slug = watch("slug");
  const categoryId = watch("categoryId");

  // Нэр өөрчлөгдөхөд slug-г автоматаар санал болгох
  const autoSlugIfEmpty = () => {
    if (!slug && name) setValue("slug", slugifyForDb(name));
  };

  const onSubmit = async (data: FormState) => {
    setLoading(true);
    try {
      const images = data.imagesText.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
      const sizes = data.sizesText.split(",").map((x) => x.trim()).filter(Boolean);
      const colors = data.colorsText.split(",").map((x) => x.trim()).filter(Boolean);

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          slug: data.slug || slugifyForDb(data.name),
          description: data.description,
          price: Number(data.price),
          compareAt: data.compareAt ? Number(data.compareAt) : null,
          stock: Number(data.stock),
          categoryId: data.categoryId,
          images,
          sizes,
          colors,
          featured: data.featured,
          bestseller: data.bestseller,
          onSale: data.onSale,
        }),
      });

      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message ?? "Хадгалж чадсангүй");
      }
      toast.success("Бүтээгдэхүүн нэмэгдлээ");
      router.push("/admin/products");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Үндсэн мэдээлэл</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Нэр"
            error={errors.name?.message}
            {...register("name", { required: "Нэр шаардлагатай" })}
            onBlur={autoSlugIfEmpty}
            placeholder="Phantom Runner X1"
          />
          <Field
            label="URL slug"
            error={errors.slug?.message}
            {...register("slug", {
              required: "Slug шаардлагатай",
              pattern: { value: /^[a-z0-9-]+$/, message: "a-z, 0-9, - л зөвшөөрнө" },
            })}
            placeholder="phantom-runner-x1"
          />
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Тайлбар</Label>
            <Textarea
              {...register("description", {
                required: "Тайлбар шаардлагатай",
                minLength: { value: 10, message: "Дор хаяж 10 тэмдэгт" },
              })}
              placeholder="Бүтээгдэхүүний дэлгэрэнгүй тайлбар…"
              rows={5}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Ангилал</Label>
            <Select
              value={categoryId}
              onValueChange={(v) => setValue("categoryId", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ангилал сонгох" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Үнэ ба нөөц</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-4">
          <Field
            label="Үнэ (USD)"
            type="number"
            step="0.01"
            error={errors.price?.message}
            {...register("price", {
              required: "Үнэ шаардлагатай",
              valueAsNumber: true,
              min: { value: 0.01, message: "> 0 байх" },
            })}
            placeholder="189"
          />
          <Field
            label="Жинхэнэ үнэ (хямдрахын өмнө)"
            type="number"
            step="0.01"
            {...register("compareAt", { valueAsNumber: true })}
            placeholder="229"
          />
          <Field
            label="Нөөц"
            type="number"
            error={errors.stock?.message}
            {...register("stock", { required: true, valueAsNumber: true, min: 0 })}
            placeholder="50"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Зураг, хувилбар</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Зургийн URL-ууд (мөр бүрд нэг)</Label>
            <Textarea
              {...register("imagesText", { required: "Дор хаяж 1 зураг" })}
              placeholder={"https://images.unsplash.com/photo-1.jpg\nhttps://images.unsplash.com/photo-2.jpg"}
              rows={4}
              className="font-mono text-xs"
            />
            {errors.imagesText && (
              <p className="text-xs text-destructive">{errors.imagesText.message}</p>
            )}
          </div>
          <Separator />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Хэмжээнүүд (таслалаар тусгаарла)"
              {...register("sizesText")}
              placeholder="S, M, L, XL"
            />
            <Field
              label="Өнгөнүүд (таслалаар тусгаарла)"
              {...register("colorsText")}
              placeholder="Хар, Цайвар, Улаан"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Тэмдэгтүүд</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Checkbox label="Онцлох" {...register("featured")} />
          <Checkbox label="Шилдэг борлуулагч" {...register("bestseller")} />
          <Checkbox label="Хямдралтай" {...register("onSale")} />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          Цуцлах
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Хадгалж байна…" : "Хадгалах"}
        </Button>
      </div>
    </form>
  );
}

const Field = ({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) => (
  <div className="space-y-1.5">
    <Label>{label}</Label>
    <Input {...props} />
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

const Checkbox = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
    <input type="checkbox" {...props} className="h-4 w-4 accent-foreground" />
    {label}
  </label>
);

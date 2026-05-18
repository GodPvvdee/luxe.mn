"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  initialName: string;
  initialEmail: string;
  initialImage: string | null;
};

type FormState = { name: string; image: string };

export function ProfileForm({ initialName, initialEmail, initialImage }: Props) {
  const router = useRouter();
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormState>({
    defaultValues: { name: initialName, image: initialImage ?? "" },
  });

  const onSubmit = async (data: FormState) => {
    setLoading(true);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          image: data.image || null,
        }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message ?? "Хадгалж чадсангүй");
      }
      toast.success("Профайл шинэчлэгдлээ");
      await update();
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-1.5 sm:col-span-2">
        <Label>Нэр</Label>
        <Input
          {...register("name", {
            required: "Нэр шаардлагатай",
            minLength: { value: 2, message: "Дор хаяж 2 тэмдэгт" },
          })}
          placeholder="Бат-Эрдэнэ Дорж"
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>И-мэйл</Label>
        <Input value={initialEmail} type="email" disabled />
        <p className="text-xs text-muted-foreground">И-мэйл нь нэвтрэлтэд холбоотой тул өөрчилж болохгүй.</p>
      </div>
      <div className="space-y-1.5">
        <Label>Аватар URL (заавал биш)</Label>
        <Input
          {...register("image", {
            validate: (v) =>
              !v ||
              /^https?:\/\//.test(v) ||
              "URL нь http(s):// эхэлсэн байх",
          })}
          placeholder="https://..."
          className="font-mono text-xs"
        />
        {errors.image && <p className="text-xs text-destructive">{errors.image.message}</p>}
      </div>
      <div className="sm:col-span-2 flex justify-end">
        <Button type="submit" disabled={loading || !isDirty}>
          {loading ? "Хадгалж байна…" : "Хадгалах"}
        </Button>
      </div>
    </form>
  );
}

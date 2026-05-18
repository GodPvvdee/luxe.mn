"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormState = { current: string; next: string; confirm: string };

export function PasswordForm({ hasPassword }: { hasPassword: boolean }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: { current: "", next: "", confirm: "" },
  });
  const next = watch("next");

  const onSubmit = async (data: FormState) => {
    setLoading(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current: data.current, next: data.next }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message ?? "Шинэчлэх боломжгүй");
      }
      toast.success("Нууц үг шинэчлэгдлээ");
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!hasPassword && (
        <p className="text-xs rounded-xl bg-muted/60 p-3">
          Та одоогоор зөвхөн нийгмийн нэвтрэлтээр (Google/GitHub) нэвтэрч байсан.
          Нууц үг тогтоосноор и-мэйл/нууц үгээр ч мөн нэвтэрч чадна.
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Одоогийн нууц үг {!hasPassword && <span className="text-muted-foreground">(хоосон)</span>}</Label>
          <Input
            type="password"
            {...register("current", {
              required: hasPassword,
            })}
            placeholder={hasPassword ? "" : "(хоосон үлдээ)"}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Шинэ нууц үг</Label>
          <Input
            type="password"
            {...register("next", {
              required: "Шинэ нууц үг шаардлагатай",
              minLength: { value: 8, message: "Дор хаяж 8 тэмдэгт" },
            })}
          />
          {errors.next && <p className="text-xs text-destructive">{errors.next.message}</p>}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Шинэ нууц үгийг баталгаажуулах</Label>
          <Input
            type="password"
            {...register("confirm", {
              validate: (v) => v === next || "Нууц үг таарахгүй байна",
            })}
          />
          {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message}</p>}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant="outline" disabled={loading}>
          {loading ? "Шинэчилж байна…" : "Нууц үг шинэчлэх"}
        </Button>
      </div>
    </form>
  );
}

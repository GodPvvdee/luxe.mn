"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { AuthCard } from "@/components/auth/auth-card";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { registerSchema, type RegisterInput } from "@/lib/validators";

export default function RegisterPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message ?? "Хаяг үүсгэж чадсангүй");
      }
      toast.success("Хаяг үүсгэгдлээ — нэвтэрнэ үү");
      router.push("/login");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Хаяг үүсгэх"
      subtitle="Luxe-д бүртгүүлж эхний захиалгадаа 10%-н хөнгөлөлт авна уу."
      footer={
        <span className="text-muted-foreground">
          Аль хэдийн хаягтай юу?{" "}
          <Link href="/login" className="text-foreground font-medium hover:underline">
            Нэвтрэх
          </Link>
        </span>
      }
    >
      <SocialButtons />
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">ЭСВЭЛ</span>
        <Separator className="flex-1" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Бүтэн нэр</Label>
          <Input id="name" {...register("name")} placeholder="Бат-Эрдэнэ Дорж" />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">И-мэйл</Label>
          <Input id="email" type="email" {...register("email")} placeholder="та@example.com" />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Нууц үг</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={show ? "Нууц үг нуух" : "Нууц үг харуулах"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Нууц үг баталгаажуулах</Label>
          <Input id="confirm" type={show ? "text" : "password"} {...register("confirm")} />
          {errors.confirm && (
            <p className="text-xs text-destructive">{errors.confirm.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Хаяг үүсгэж байна…" : "Хаяг үүсгэх"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Хаяг үүсгэснээр манай{" "}
          <Link href="#" className="underline">Үйлчилгээний нөхцөл</Link> ба{" "}
          <Link href="#" className="underline">Нууцлалын бодлого</Link>-тэй
          санал нийлж байгаа болно.
        </p>
      </form>
    </AuthCard>
  );
}

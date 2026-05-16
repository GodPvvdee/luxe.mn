"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CartSummary } from "@/components/cart/cart-summary";
import { useCart } from "@/store/cart";
import { checkoutSchema, type CheckoutInput } from "@/lib/validators";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCart();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutInput) => {
    setLoading(true);
    try {
      // Production-д /api/checkout рүү POST хийж Stripe session үүсгэнэ.
      // Demo: амжилттай захиалгыг симуляц.
      await new Promise((r) => setTimeout(r, 800));
      const orderId = `LUX-${Date.now().toString().slice(-8)}`;
      clear();
      router.push(`/checkout/success?order=${orderId}`);
      toast.success("Захиалга баталгаажлаа", { description: data.email });
    } catch {
      toast.error("Төлбөр гүйцэтгэгдсэнгүй");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-3xl">Сагс хоосон байна</h1>
        <p className="text-muted-foreground mt-2">
          Төлбөр төлөхөөс өмнө барааг нэмнэ үү.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Худалдан авалт хийх</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs
        items={[
          { label: "Нүүр", href: "/" },
          { label: "Сагс", href: "/cart" },
          { label: "Төлбөр" },
        ]}
      />
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-6">
        Төлбөр төлөх
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Step n={1} />
              <h2 className="font-medium text-lg">Холбоо барих</h2>
            </div>
            <Field
              label="И-мэйл"
              error={errors.email?.message}
              {...register("email")}
              type="email"
              placeholder="та@example.com"
            />
          </section>

          <Separator />

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Step n={2} />
              <h2 className="font-medium text-lg">Хүргэлтийн хаяг</h2>
            </div>
            <Field
              label="Бүтэн нэр"
              error={errors.name?.message}
              {...register("name")}
              placeholder="Чагнаадорж пүрэв-эрдэнэ"
            />
            <Field
              label="Хаягийн мөр 1"
              error={errors.line1?.message}
              {...register("line1")}
              placeholder="СБД, 1-р хороо, Энхтайвны өргөн чөлөө 17"
            />
            <Field
              label="Хаягийн мөр 2 (заавал биш)"
              error={errors.line2?.message}
              {...register("line2")}
              placeholder="4а байр, 12 тоот"
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Хот / Аймаг"
                error={errors.city?.message}
                {...register("city")}
                placeholder="Улаанбаатар"
              />
              <Field
                label="Дүүрэг / Сум"
                error={errors.state?.message}
                {...register("state")}
                placeholder="Сүхбаатар"
              />
              <Field
                label="Шуудангийн код"
                error={errors.zip?.message}
                {...register("zip")}
                placeholder="14200"
              />
              <Field
                label="Улс"
                error={errors.country?.message}
                {...register("country")}
                placeholder="Монгол"
              />
            </div>
            <Field
              label="Утас (заавал биш)"
              error={errors.phone?.message}
              {...register("phone")}
              placeholder="+976 ..."
            />
          </section>

          <Separator />

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Step n={3} />
              <h2 className="font-medium text-lg">Хүргэлтийн арга</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: "standard", label: "Стандарт", time: "5-7 хоног", price: "Үнэгүй" },
                { id: "express", label: "Шуурхай", time: "2-3 хоног", price: "52,500 ₮" },
              ].map((opt, i) => (
                <label
                  key={opt.id}
                  className="flex items-center justify-between p-4 rounded-xl border cursor-pointer hover:border-foreground/40 transition-colors has-[:checked]:border-foreground has-[:checked]:bg-muted/40"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      defaultChecked={i === 0}
                      className="accent-foreground"
                    />
                    <div>
                      <div className="font-medium text-sm">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.time}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{opt.price}</div>
                </label>
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Step n={4} />
              <h2 className="font-medium text-lg">Төлбөр</h2>
            </div>
            <Tabs defaultValue="card">
              <TabsList>
                <TabsTrigger value="card">Карт</TabsTrigger>
                <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="space-y-3 pt-4">
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Картын дугаар" className="pl-11 h-12 font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="ММ / ЖЖ" className="h-12 font-mono" />
                  <Input placeholder="CVC" className="h-12 font-mono" />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  Төлбөрийг Stripe-аар шифрлэн боловсруулна.
                </p>
              </TabsContent>
              <TabsContent value="apple" className="pt-4">
                <Button type="button" variant="outline" className="w-full h-12">
                  Apple Pay-ээр төлөх
                </Button>
              </TabsContent>
              <TabsContent value="paypal" className="pt-4">
                <Button type="button" variant="outline" className="w-full h-12">
                  PayPal-аар үргэлжлүүлэх
                </Button>
              </TabsContent>
            </Tabs>
          </section>

          <Button
            type="submit"
            size="xl"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Боловсруулж байна…" : "Захиалга өгөх"}
          </Button>
        </div>

        <div>
          <CartSummary checkoutHref="#" />
        </div>
      </form>
    </div>
  );
}

function Step({ n }: { n: number }) {
  return (
    <div className="h-7 w-7 rounded-full bg-foreground text-background grid place-items-center text-xs font-medium">
      {n}
    </div>
  );
}

function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input {...props} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

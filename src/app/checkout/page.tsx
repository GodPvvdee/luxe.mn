"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock, Smartphone } from "lucide-react";
import { toast } from "sonner";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CartSummary } from "@/components/cart/cart-summary";
import { QpayDialog } from "@/components/cart/qpay-dialog";
import { useCart } from "@/store/cart";
import { checkoutSchema, type CheckoutInput } from "@/lib/validators";

type PaymentMethod = "card" | "qpay";

type QpayPayload = {
  orderId: string;
  amountMNT: number;
  mode: "qpay" | "qpay-demo";
  invoice: {
    invoiceId: string;
    qrText: string;
    qrImage?: string;
    urls: { name: string; description: string; logo: string; link: string }[];
  };
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear, promo } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qpay");
  const [qpay, setQpay] = useState<QpayPayload | null>(null);

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
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            image: i.image,
            price: i.price,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
          })),
          promoCode: promo?.code ?? null,
          shippingMethod: "standard",
          paymentMethod,
        }),
      });
      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Эхлээд нэвтэрнэ үү");
          router.push("/login?callbackUrl=/checkout");
          return;
        }
        const e = await res.json().catch(() => ({}));
        throw new Error(e.message ?? "Захиалга бүтээж чадсангүй");
      }
      const data2 = (await res.json()) as
        | { orderId: string; mode: "stripe"; redirectUrl: string }
        | { orderId: string; mode: "demo"; redirectUrl: string }
        | {
            orderId: string;
            mode: "qpay" | "qpay-demo";
            amountMNT: number;
            invoice: QpayPayload["invoice"];
          };

      if (data2.mode === "stripe") {
        // Карт — Stripe-руу шилжүүлнэ. Сагсыг success-н дараа цэвэрлэнэ.
        window.location.href = data2.redirectUrl;
        return;
      }
      if (data2.mode === "demo") {
        clear();
        toast.success("Захиалга баталгаажлаа", { description: data.email });
        router.push(data2.redirectUrl);
        return;
      }
      // QPay flow — QR код dialog
      setQpay({
        orderId: data2.orderId,
        amountMNT: data2.amountMNT,
        mode: data2.mode,
        invoice: data2.invoice,
      });
      toast.success("QR код үүсгэгдлээ", {
        description: "Банкны апп-аар сканнердана уу",
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Төлбөр гүйцэтгэгдсэнгүй");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !qpay) {
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
              placeholder="Бат-Эрдэнэ Дорж"
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
            <Tabs
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
            >
              <TabsList>
                <TabsTrigger value="qpay">
                  <Smartphone className="h-4 w-4 mr-1" />
                  QPay
                </TabsTrigger>
                <TabsTrigger value="card">
                  <CreditCard className="h-4 w-4 mr-1" />
                  Карт
                </TabsTrigger>
              </TabsList>
              <TabsContent value="qpay" className="pt-4 space-y-2">
                <div className="rounded-xl border bg-muted/30 p-4 text-sm space-y-1">
                  <p className="font-medium">Банкны апп-аар QR төлөх</p>
                  <p className="text-xs text-muted-foreground">
                    &quot;Захиалга өгөх&quot; даргмагц QR код гарч ирнэ. Khan, Голомт, ХХБ,
                    Хас банк бүгд ажиллана.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="card" className="pt-4 space-y-2">
                <div className="rounded-xl border bg-muted/30 p-4 text-sm space-y-1">
                  <p className="font-medium">Visa / Mastercard</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Lock className="h-3 w-3" />
                    Stripe-н найдвартай хуудас руу шилжүүлнэ.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          <Button
            type="submit"
            size="xl"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Боловсруулж байна…"
              : paymentMethod === "qpay"
                ? "QR код үүсгэх"
                : "Картаар төлөх"}
          </Button>
        </div>

        <div>
          <CartSummary checkoutHref="#" />
        </div>
      </form>

      {qpay && (
        <QpayDialog
          open={!!qpay}
          orderId={qpay.orderId}
          amountMNT={qpay.amountMNT}
          mode={qpay.mode}
          invoice={qpay.invoice}
          onClose={() => {
            // Хэрэглэгч QR-г хаасан үед сагсыг үлдээнэ — захиалга PENDING
            // хэвээр /orders дотроос дахин нээх боломжтой.
            setQpay(null);
          }}
        />
      )}
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

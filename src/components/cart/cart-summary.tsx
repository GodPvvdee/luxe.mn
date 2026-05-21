"use client";
import { useState } from "react";
import Link from "next/link";
import { Tag, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/cart";
import { usePreferences } from "@/store/preferences";
import { convert } from "@/lib/currency";
import { formatPrice } from "@/lib/utils";

export function CartSummary({ checkoutHref = "/checkout" }: { checkoutHref?: string }) {
  const { items, promo, applyPromo, removePromo, subtotal } = useCart();
  const { currency } = usePreferences();
  const [code, setCode] = useState("");

  const sub = subtotal();
  const discount = promo ? (sub * promo.percent) / 100 : 0;
  const total = sub - discount;

  const apply = () => {
    const ok = applyPromo(code.trim());
    if (ok) {
      toast.success(`Промо код идэвхжлээ — ${code.trim().toUpperCase()}`);
      setCode("");
    } else {
      toast.error("Промо код буруу байна");
    }
  };

  return (
    <div className="rounded-2xl border bg-card p-6 space-y-5 sticky top-24">
      <h3 className="font-medium text-lg">Захиалгын тойм</h3>

      <div className="space-y-2 text-sm">
        <Row label="Дэд дүн" value={formatPrice(convert(sub, currency), currency)} />
        {promo && (
          <Row
            label={`Хөнгөлөлт (${promo.code})`}
            value={`-${formatPrice(convert(discount, currency), currency)}`}
            highlight
          />
        )}
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-medium">
        <span>Нийт</span>
        <span className="tabular-nums">
          {formatPrice(convert(total, currency), currency)}
        </span>
      </div>

      {!promo ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Промо код"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" onClick={apply}>
            Идэвхжүүлэх
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-3 py-2 text-sm">
          <span className="font-medium">{promo.code} · −{promo.percent}%</span>
          <button onClick={removePromo} className="text-xs underline">
            Хасах
          </button>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Туршаад үзнэ үү: <span className="font-mono">LUXE10</span>, <span className="font-mono">WELCOME15</span> эсвэл <span className="font-mono">SUMMER25</span>
      </p>

      <Button size="lg" className="w-full" disabled={items.length === 0} asChild>
        <Link href={checkoutHref}>
          <Lock className="h-4 w-4" />
          Төлөх
        </Link>
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Үнэгүй буцаалт · Бүх насны засвар
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={
          highlight ? "font-medium text-emerald-600 tabular-nums" : "tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}

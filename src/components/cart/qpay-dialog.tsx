"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ShieldCheck, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

export type QpayDialogPayload = {
  open: boolean;
  orderId: string;
  amountMNT: number;
  mode: "qpay" | "qpay-demo";
  invoice: {
    invoiceId: string;
    qrText: string;
    qrImage?: string; // base64 PNG
    urls: { name: string; description: string; logo: string; link: string }[];
  };
  onClose: () => void;
};

export function QpayDialog(props: QpayDialogPayload) {
  const router = useRouter();
  const [status, setStatus] = useState<"PENDING" | "PAID" | "FAILED">("PENDING");

  // 3 секунд тутамд статус шалгана
  useEffect(() => {
    if (!props.open) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch(
          `/api/orders/${props.orderId}/status?check=1`,
          { cache: "no-store" },
        );
        if (!res.ok) return;
        const data = (await res.json()) as { status: string };
        if (cancelled) return;
        if (data.status === "PAID") {
          setStatus("PAID");
          setTimeout(() => {
            router.push(`/checkout/success?order=${props.orderId}`);
          }, 800);
        }
      } catch {
        // ignore
      }
    };
    const id = setInterval(tick, 3000);
    tick();
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [props.open, props.orderId, router]);

  // base64 QR-ийг data URL болгоно
  const qrSrc = props.invoice.qrImage
    ? props.invoice.qrImage.startsWith("data:")
      ? props.invoice.qrImage
      : `data:image/png;base64,${props.invoice.qrImage}`
    : null;

  return (
    <Dialog open={props.open} onOpenChange={(o) => !o && props.onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            QPay-ээр төлөх
          </DialogTitle>
          <DialogDescription>
            Банкны апп-аа нээж QR кодыг сканнердана уу.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2">
          {status === "PAID" ? (
            <div className="h-56 w-56 rounded-2xl bg-emerald-50 dark:bg-emerald-950 grid place-items-center">
              <div className="text-center space-y-2">
                <div className="h-16 w-16 rounded-full bg-emerald-600 text-white grid place-items-center mx-auto">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <p className="font-medium text-emerald-700 dark:text-emerald-400">
                  Төлбөр амжилттай
                </p>
              </div>
            </div>
          ) : qrSrc ? (
            <div className="relative h-56 w-56 rounded-2xl overflow-hidden bg-white p-2 border">
              <Image src={qrSrc} alt="QPay QR" fill className="object-contain" unoptimized />
            </div>
          ) : (
            <div className="h-56 w-56 rounded-2xl bg-muted grid place-items-center text-center p-6">
              <div>
                <div className="font-mono text-xs break-all">
                  {props.invoice.qrText}
                </div>
                {props.mode === "qpay-demo" && (
                  <p className="text-[10px] text-muted-foreground mt-2">
                    (Demo — бодит QR кодыг харахын тулд QPay credentials тохируулна уу)
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-2xl font-display tabular-nums">
              {formatPrice(props.amountMNT)}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {props.orderId.slice(0, 12)}
            </p>
          </div>

          {status === "PENDING" && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Төлбөрийг хүлээж байна…
            </div>
          )}
        </div>

        {props.invoice.urls.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Эсвэл шууд банкны апп нээх:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {props.invoice.urls.slice(0, 6).map((u) => (
                  <a
                    key={u.name}
                    href={u.link}
                    className="flex items-center gap-2 p-2 rounded-xl border hover:bg-muted text-xs"
                  >
                    {u.logo && (
                      <Image
                        src={u.logo}
                        alt={u.name}
                        width={20}
                        height={20}
                        className="rounded"
                        unoptimized
                      />
                    )}
                    <span className="line-clamp-1">{u.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {props.mode === "qpay-demo" && (
          <p className="text-[11px] text-muted-foreground text-center">
            QPay-н реал тохиргоо хийгдээгүй тул polling нь үргэлж PENDING байна.
            Захиалга шууд харахын тулд /orders руу очно уу.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

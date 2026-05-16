import Link from "next/link";
import { Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

type Search = Promise<{ order?: string }>;

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { order } = await searchParams;
  return (
    <div className="container max-w-xl py-20 text-center space-y-6">
      <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950 grid place-items-center">
        <Check className="h-9 w-9 text-emerald-600" />
      </div>
      <h1 className="font-display text-4xl tracking-tight">Захиалга баталгаажлаа</h1>
      <p className="text-muted-foreground">
        Захиалга өгсөнд баярлалаа. Танай и-мэйл рүү баталгаажуулалт явуулсан
        бөгөөд хувийн самбараас захиалгын явцыг хянах боломжтой.
      </p>
      {order && (
        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-mono">
          <Package className="h-4 w-4" />
          {order}
        </div>
      )}
      <div className="flex justify-center gap-3 pt-4">
        <Button variant="outline" asChild>
          <Link href="/orders">Захиалгууд үзэх</Link>
        </Button>
        <Button asChild>
          <Link href="/products">Үргэлжлүүлэн худалдан авах</Link>
        </Button>
      </div>
    </div>
  );
}

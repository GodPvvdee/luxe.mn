import Image from "next/image";
import Link from "next/link";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

// Always read fresh data — DB edits in Neon Console appear immediately.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function AdminProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Бүтээгдэхүүн</h1>
          <p className="text-muted-foreground mt-1">
            {products.length} бүтээгдэхүүн · нөөц, үнээ удирдана.
          </p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Бүтээгдэхүүн хайх…" className="max-w-xs" />
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" />
              Шинэ бүтээгдэхүүн
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left font-medium px-6 py-3">Бүтээгдэхүүн</th>
                <th className="text-left font-medium py-3">Ангилал</th>
                <th className="text-left font-medium py-3">Төлөв</th>
                <th className="text-right font-medium py-3">Үнэ</th>
                <th className="text-right font-medium py-3">Нөөц</th>
                <th className="text-right font-medium px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted shrink-0">
                        {p.images[0] && (
                          <Image src={p.images[0]} alt={p.name} fill sizes="40px" className="object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium line-clamp-1">{p.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{p.categoryName}</td>
                  <td className="py-3">
                    {p.stock > 0 ? (
                      <Badge variant="new">Нөөцтэй</Badge>
                    ) : (
                      <Badge variant="destructive">Дууссан</Badge>
                    )}
                  </td>
                  <td className="py-3 text-right tabular-nums font-medium">
                    {formatPrice(p.price)}
                  </td>
                  <td className="py-3 text-right tabular-nums">{p.stock}</td>
                  <td className="px-6 py-3 text-right">
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

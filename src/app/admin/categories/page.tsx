import Image from "next/image";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Ангилал</h1>
          <p className="text-muted-foreground mt-1">
            {categories.length} ангилал нь бүх барааг зохион байгуулдаг.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Шинэ ангилал
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Card key={c.slug} className="overflow-hidden">
            <div className="relative aspect-[4/3]">
              {c.image && (
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width:1024px) 50vw, 25vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {c._count.products} бүтээгдэхүүн
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

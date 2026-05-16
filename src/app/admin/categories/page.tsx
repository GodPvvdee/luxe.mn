import Image from "next/image";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/mock-data";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">
            {categories.length} categories organize the entire catalog.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New category
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => {
          const count = products.filter((p) => p.categorySlug === c.slug).length;
          return (
            <Card key={c.slug} className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={c.image ?? ""} alt={c.name} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="p-4">
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {count} products
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NewProductForm } from "@/components/admin/new-product-form";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") redirect("/login?callbackUrl=/admin/products/new");

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Шинэ бүтээгдэхүүн</h1>
        <p className="text-muted-foreground mt-1">
          Каталогт шинэ бараа нэмж DB-д хадгална.
        </p>
      </div>
      <NewProductForm categories={categories} />
    </div>
  );
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { error: "Нэвтрэх шаардлагатай", status: 401 } as const;
  const role = (session.user as { role?: string }).role;
  if (role !== "ADMIN") return { error: "Зөвхөн админд зөвшөөрөгдсөн", status: 403 } as const;
  return null;
}

const productInput = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Зөвхөн жижиг үсэг, тоо, зураас"),
  description: z.string().min(10),
  price: z.number().positive(),
  compareAt: z.number().positive().nullable().optional(),
  stock: z.number().int().min(0),
  categoryId: z.string().min(1),
  images: z.array(z.string().url()).min(1, "Дор хаяж 1 зургийн URL шаардлагатай"),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  bestseller: z.boolean().default(false),
  onSale: z.boolean().default(false),
});

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth) return NextResponse.json({ message: auth.error }, { status: auth.status });

  let data: z.infer<typeof productInput>;
  try {
    data = productInput.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Хүчингүй өгөгдөл", issues: err.issues },
        { status: 422 },
      );
    }
    throw err;
  }

  // slug давхцлыг шалгах
  const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return NextResponse.json(
      { message: "Энэ slug-аар бүтээгдэхүүн аль хэдийн байна" },
      { status: 409 },
    );
  }

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      compareAt: data.compareAt ?? null,
      stock: data.stock,
      categoryId: data.categoryId,
      images: data.images,
      sizes: data.sizes,
      colors: data.colors,
      featured: data.featured,
      bestseller: data.bestseller,
      onSale: data.onSale,
    },
  });

  return NextResponse.json({ product }, { status: 201 });
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const updateSchema = z.object({
  name: z.string().min(2, "Дор хаяж 2 тэмдэгт").max(80).nullable().optional(),
  image: z.string().url().nullable().optional(),
});

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ message: "Нэвтрэх шаардлагатай" }, { status: 401 });
  }

  let data: z.infer<typeof updateSchema>;
  try {
    data = updateSchema.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Хүчингүй өгөгдөл", issues: err.issues },
        { status: 422 },
      );
    }
    throw err;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name ?? undefined,
      image: data.image ?? undefined,
    },
    select: { id: true, name: true, email: true, image: true, role: true },
  });

  return NextResponse.json({ user });
}

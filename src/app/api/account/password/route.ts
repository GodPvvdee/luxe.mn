import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const schema = z.object({
  current: z.string().min(1),
  next: z.string().min(8, "Дор хаяж 8 тэмдэгт"),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ message: "Нэвтрэх шаардлагатай" }, { status: 401 });
  }

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.issues[0]?.message ?? "Хүчингүй өгөгдөл" },
        { status: 422 },
      );
    }
    throw err;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  // OAuth-р үүсгэсэн хэрэглэгчид password байхгүй — анх удаа тогтоох оруулна.
  if (user?.password) {
    const ok = await bcrypt.compare(body.current, user.password);
    if (!ok) {
      return NextResponse.json(
        { message: "Одоогийн нууц үг буруу байна" },
        { status: 403 },
      );
    }
  }

  const hash = await bcrypt.hash(body.next, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hash },
  });

  return NextResponse.json({ ok: true });
}

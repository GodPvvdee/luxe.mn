// Захиалгын статусыг poll хийх client-д зориулсан endpoint.
// QPay-н QR код дүүргэх дискохдоо UI 3 секунд тутамд энэ endpoint-руу
// хүсэлт явуулна. Хэрэв `?check=1` бол QPay API-руу шууд checkPayment
// дуудаж дараа DB-г шинэчилнэ.

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkPayment } from "@/lib/qpay";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ message: "Auth" }, { status: 401 });

  let order = await prisma.order.findFirst({
    where: { id, userId },
    select: { id: true, status: true, paymentRef: true, paymentMethod: true },
  });
  if (!order) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const checkNow = searchParams.get("check") === "1";

  if (checkNow && order.status === "PENDING" && order.paymentMethod === "qpay" && order.paymentRef) {
    const result = await checkPayment(order.paymentRef);
    if (result.paid) {
      await prisma.order.update({ where: { id }, data: { status: "PAID" } });
      order = { ...order, status: "PAID" };
    }
  }

  return NextResponse.json({ status: order.status });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkPayment } from "@/lib/qpay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// QPay уламжлалт callback нь:
//   GET  /api/webhooks/qpay?order=<orderId>&payment_id=<id>
//   POST бас зөвшөөрнө
// Аль аль нь invoice-н статусыг шалгаад захиалгыг PAID болгоно.

async function handle(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order");
  if (!orderId) {
    return NextResponse.json({ message: "order алга" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true, paymentRef: true, status: true },
  });
  if (!order) {
    return NextResponse.json({ message: "Захиалга олдсонгүй" }, { status: 404 });
  }
  if (order.status === "PAID") {
    return NextResponse.json({ ok: true, already: true });
  }
  if (!order.paymentRef) {
    return NextResponse.json({ message: "Invoice алга" }, { status: 400 });
  }

  // Эх сурвалжийг QPay-аас баталгаажуулна — bot/spam-аар хий PAID
  // болгох эрсдэлээс хамгаална.
  const status = await checkPayment(order.paymentRef);
  if (!status.paid) {
    return NextResponse.json({ ok: false, status }, { status: 200 });
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "PAID" },
  });
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

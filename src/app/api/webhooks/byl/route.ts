import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/byl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WebhookEvent = {
  id: number | string;
  project_id?: number;
  type: string; // "invoice.paid" | "checkout.completed"
  object: string;
  data: {
    id: number;
    client_reference_id?: string | null;
    status?: string;
    amount?: number;
    [k: string]: unknown;
  };
};

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = (await headers()).get("byl-signature");

  if (!verifyWebhookSignature(rawBody, sig)) {
    return NextResponse.json(
      { message: "Signature буруу эсвэл BYL_WEBHOOK_SECRET тохируулаагүй" },
      { status: 400 },
    );
  }

  let event: WebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "JSON буруу" }, { status: 400 });
  }

  const orderId = event.data.client_reference_id;

  switch (event.type) {
    case "checkout.completed":
    case "invoice.paid": {
      if (orderId) {
        await prisma.order.updateMany({
          where: { id: orderId, status: "PENDING" },
          data: { status: "PAID" },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

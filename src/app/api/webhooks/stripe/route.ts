import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ message: "Stripe not configured" }, { status: 500 });
  }
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Missing webhook secret" }, { status: 500 });
  }

  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ message: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Bad signature" },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      // TODO: mark the corresponding order as PAID and notify the customer.
      break;
    case "charge.refunded":
      // TODO: mark the corresponding order as REFUNDED.
      break;
  }

  return NextResponse.json({ received: true });
}

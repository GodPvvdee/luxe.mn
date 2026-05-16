import { NextResponse } from "next/server";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/stripe";

const body = z.object({
  items: z
    .array(
      z.object({
        name: z.string(),
        image: z.string().optional(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  currency: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const data = body.parse(await req.json());
    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL!;
    const session = await createCheckoutSession(data.items, {
      successUrl: `${origin}/checkout/success?session={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/cart`,
      currency: data.currency,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", issues: err.issues }, { status: 422 });
    }
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Stripe not configured" },
      { status: 500 },
    );
  }
}

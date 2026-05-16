import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" })
  : null;

export type CheckoutLineItem = {
  name: string;
  image?: string;
  price: number; // in major units (e.g. dollars)
  quantity: number;
};

export async function createCheckoutSession(
  items: CheckoutLineItem[],
  opts: { successUrl: string; cancelUrl: string; currency?: string },
) {
  if (!stripe) throw new Error("Stripe not configured");
  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((i) => ({
      price_data: {
        currency: opts.currency ?? "usd",
        product_data: { name: i.name, images: i.image ? [i.image] : [] },
        unit_amount: Math.round(i.price * 100),
      },
      quantity: i.quantity,
    })),
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
  });
}

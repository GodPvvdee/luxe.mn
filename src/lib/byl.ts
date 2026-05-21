// Byl.mn payments API wrapper.
// Docs: https://byl.mn/docs/api/
//
// Шаардлагатай env:
//   BYL_PROJECT_ID
//   BYL_TOKEN
//   BYL_WEBHOOK_SECRET  (webhook signature шалгахад)

import "server-only";
import crypto from "node:crypto";

const BASE_URL = "https://byl.mn/api/v1";

export function isBylConfigured() {
  return Boolean(process.env.BYL_PROJECT_ID && process.env.BYL_TOKEN);
}

type CreateCheckoutItem = {
  name: string;
  description?: string;
  unitAmount: number; // ₮ дугнэлгээгүйгээр (тооцоолж бэлдсэн)
  quantity: number;
};

export type CreateCheckoutInput = {
  items: CreateCheckoutItem[];
  orderId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
};

export type BylCheckout = {
  id: number;
  url: string;
};

export async function createCheckout(p: CreateCheckoutInput): Promise<BylCheckout> {
  if (!isBylConfigured()) {
    throw new Error("Byl тохируулагдаагүй");
  }

  const res = await fetch(
    `${BASE_URL}/projects/${process.env.BYL_PROJECT_ID}/checkouts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BYL_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        success_url: p.successUrl,
        cancel_url: p.cancelUrl,
        client_reference_id: p.orderId,
        customer_email: p.customerEmail,
        allow_promotion_codes: false,
        items: p.items.map((i) => ({
          quantity: i.quantity,
          price_data: {
            unit_amount: i.unitAmount,
            product_data: {
              name: i.name,
              ...(i.description ? { description: i.description } : {}),
            },
          },
        })),
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Byl checkout failed: ${res.status} ${text.slice(0, 300)}`);
  }
  const json = (await res.json()) as { data: BylCheckout };
  return json.data;
}

// Webhook signature verify. Docs:
//   hmac = hash_hmac('sha256', payload, secret)
//   payload бол raw request body (string).
//   signature header нь "Byl-Signature".
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null,
): boolean {
  const secret = process.env.BYL_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  // timing-safe compare
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

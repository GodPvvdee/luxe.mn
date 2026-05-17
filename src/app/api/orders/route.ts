import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";

export const dynamic = "force-dynamic";

const lineItem = z.object({
  productId: z.string(),
  name: z.string(),
  image: z.string().optional().nullable(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  size: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
});

const body = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  line1: z.string().min(2),
  line2: z.string().optional().nullable(),
  city: z.string().min(2),
  state: z.string().optional().nullable(),
  zip: z.string().min(3),
  country: z.string().min(2),
  phone: z.string().optional().nullable(),
  items: z.array(lineItem).min(1),
  promoCode: z.string().optional().nullable(),
  shippingMethod: z.enum(["standard", "express"]).default("standard"),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { message: "Захиалга өгөхөөс өмнө нэвтэрнэ үү" },
      { status: 401 },
    );
  }
  const userId = (session.user as { id: string }).id;

  let data: z.infer<typeof body>;
  try {
    data = body.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Хүчингүй өгөгдөл", issues: err.issues },
        { status: 422 },
      );
    }
    throw err;
  }

  // Server side recalculation — never trust client totals.
  const subtotal = data.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping =
    data.shippingMethod === "express" ? 15 : subtotal > 150 ? 0 : 12;

  let discount = 0;
  if (data.promoCode) {
    const promo = await prisma.promo.findFirst({
      where: { code: data.promoCode.toUpperCase(), active: true },
    });
    if (promo?.percent) discount = (subtotal * promo.percent) / 100;
    else if (promo?.amount) discount = Number(promo.amount);
  }
  const taxable = subtotal - discount;
  const tax = taxable * 0.08;
  const total = taxable + shipping + tax;

  const address = await prisma.address.create({
    data: {
      userId,
      name: data.name,
      line1: data.line1,
      line2: data.line2 ?? null,
      city: data.city,
      state: data.state ?? null,
      country: data.country,
      zip: data.zip,
      phone: data.phone ?? null,
    },
  });

  const order = await prisma.order.create({
    data: {
      userId,
      addressId: address.id,
      status: "PAID", // Stripe-н оронд demo simulation
      subtotal,
      shipping,
      tax,
      discount,
      total,
      currency: "USD",
      promoCode: data.promoCode ?? null,
      items: {
        create: data.items.map((i) => ({
          productId: i.productId,
          name: i.name,
          image: i.image ?? null,
          price: i.price,
          quantity: i.quantity,
          size: i.size ?? null,
          color: i.color ?? null,
        })),
      },
    },
  });

  // Send confirmation email (don't block on errors)
  sendOrderConfirmation({
    to: data.email,
    orderId: order.id,
    total,
    currency: "USD",
    customerName: data.name,
    items: data.items.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      price: i.price,
      size: i.size,
      color: i.color,
    })),
  }).catch((e) => console.error("[orders] email failed:", e));

  return NextResponse.json({ orderId: order.id, total });
}

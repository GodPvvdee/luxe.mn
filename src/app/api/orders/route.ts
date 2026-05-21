import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";
import { stripe } from "@/lib/stripe";
import { convert } from "@/lib/currency";
import { createCheckout as createBylCheckout, isBylConfigured } from "@/lib/byl";

export const dynamic = "force-dynamic";

const lineItem = z.object({
  productId: z.string(),
  name: z.string(),
  image: z.string().optional().nullable(),
  price: z.number().positive(), // USD
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
  paymentMethod: z.enum(["card", "byl", "demo"]).default("demo"),
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

  // Server-side recalculation — client-ийн дүнг хэзээ ч битгий бат.
  const subtotal = data.items.reduce((s, i) => s + i.price * i.quantity, 0);
  // Хүргэлт ба татварыг checkout-аас хассан (одоохондоо 0).
  const shipping = 0;
  const tax = 0;

  let discount = 0;
  if (data.promoCode) {
    const promo = await prisma.promo.findFirst({
      where: { code: data.promoCode.toUpperCase(), active: true },
    });
    if (promo?.percent) discount = (subtotal * promo.percent) / 100;
    else if (promo?.amount) discount = Number(promo.amount);
  }
  const total = subtotal - discount;

  // Сагсан дахь барааны ID хэвээр DB-д байгаа эсэхийг шалгана.
  // Брэнд rebrand-н дараа хэрэглэгчийн сагсанд устсан барааны ID үлдсэн
  // байж болзошгүй — энэ үед FK зөрчилийг тойрч `productId = null` болгоно
  // (бараа OrderItem-д snapshot хийгдсэн нэр/үнэ/зургийг хадгална).
  const existing = await prisma.product.findMany({
    where: { id: { in: data.items.map((i) => i.productId) } },
    select: { id: true },
  });
  const validIds = new Set(existing.map((x) => x.id));

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

  const isDemoOnly = data.paymentMethod === "demo";
  const order = await prisma.order.create({
    data: {
      userId,
      addressId: address.id,
      status: isDemoOnly ? "PAID" : "PENDING",
      subtotal,
      shipping,
      tax,
      discount,
      total,
      currency: "USD",
      promoCode: data.promoCode ?? null,
      paymentMethod: data.paymentMethod,
      items: {
        create: data.items.map((i) => ({
          productId: validIds.has(i.productId) ? i.productId : null,
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

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  // -------- Card (Stripe) --------
  if (data.paymentMethod === "card") {
    if (!stripe) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      });
      fireConfirmation(data, order.id, total);
      return NextResponse.json({
        orderId: order.id,
        mode: "demo",
        redirectUrl: `/checkout/success?order=${order.id}`,
      });
    }
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: data.items.map((i) => ({
        quantity: i.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(i.price * 100),
          product_data: {
            name: i.name,
            images: i.image ? [i.image] : [],
          },
        },
      })),
      metadata: { orderId: order.id, userId },
      customer_email: data.email,
      success_url: `${origin}/checkout/success?order=${order.id}`,
      cancel_url: `${origin}/cart`,
    });
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentRef: stripeSession.id },
    });
    return NextResponse.json({
      orderId: order.id,
      mode: "stripe",
      redirectUrl: stripeSession.url,
    });
  }

  // -------- Byl (Mongolian payment hub) --------
  if (data.paymentMethod === "byl") {
    if (!isBylConfigured()) {
      // Тохиргоо байхгүй бол шууд амжилттай гэж тооцно (demo)
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      });
      fireConfirmation(data, order.id, total);
      return NextResponse.json({
        orderId: order.id,
        mode: "demo",
        redirectUrl: `/checkout/success?order=${order.id}`,
      });
    }

    try {
      // USD → MNT хөрвүүлж бүхэл тоо болгоно
      const items = data.items.map((i) => ({
        name: i.name,
        description: [i.size, i.color].filter(Boolean).join(" · ") || undefined,
        quantity: i.quantity,
        unitAmount: Math.round(convert(i.price, "MNT")),
      }));

      const checkout = await createBylCheckout({
        items,
        orderId: order.id,
        successUrl: `${origin}/checkout/success?order=${order.id}`,
        cancelUrl: `${origin}/cart`,
        customerEmail: data.email,
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { paymentRef: String(checkout.id) },
      });

      return NextResponse.json({
        orderId: order.id,
        mode: "byl",
        redirectUrl: checkout.url,
      });
    } catch (err) {
      console.error("[orders] byl error:", err);
      return NextResponse.json(
        { message: err instanceof Error ? err.message : "Byl алдаа" },
        { status: 500 },
      );
    }
  }

  // -------- Demo simulation (fallback) --------
  fireConfirmation(data, order.id, total);
  return NextResponse.json({
    orderId: order.id,
    mode: "demo",
    redirectUrl: `/checkout/success?order=${order.id}`,
  });
}

function fireConfirmation(
  data: z.infer<typeof body>,
  orderId: string,
  total: number,
) {
  sendOrderConfirmation({
    to: data.email,
    orderId,
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
}

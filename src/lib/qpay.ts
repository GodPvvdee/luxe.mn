// QPay v2 API client.
// https://developer.qpay.mn/
//
// Шаардлагатай env:
//   QPAY_USERNAME
//   QPAY_PASSWORD
//   QPAY_INVOICE_CODE
//   QPAY_BASE_URL   (default: https://merchant.qpay.mn/v2)
//
// Тэдгээрийг тавиагүй үед library нь "demo mode"-р ажиллаж, нийтийн
// placeholder QR код буцаана. Тэгэхээр UI-г credentials-гүйгээр ч
// бүрэн туршиж болно.

import "server-only";

const BASE_URL = process.env.QPAY_BASE_URL ?? "https://merchant.qpay.mn/v2";

export function isQpayConfigured() {
  return Boolean(
    process.env.QPAY_USERNAME &&
      process.env.QPAY_PASSWORD &&
      process.env.QPAY_INVOICE_CODE,
  );
}

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const basic = Buffer.from(
    `${process.env.QPAY_USERNAME}:${process.env.QPAY_PASSWORD}`,
  ).toString("base64");
  const res = await fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`QPay auth failed: ${res.status}`);
  }
  const data = (await res.json()) as TokenResponse;
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return data.access_token;
}

export type QpayInvoice = {
  invoiceId: string;
  qrText: string;
  qrImage?: string; // base64 PNG
  urls: { name: string; description: string; logo: string; link: string }[];
};

export type CreateInvoiceInput = {
  orderId: string;
  amount: number; // ₮
  description: string;
  callbackUrl: string; // QPay → /api/webhooks/qpay?...
  customerEmail?: string;
};

export async function createInvoice(p: CreateInvoiceInput): Promise<QpayInvoice> {
  if (!isQpayConfigured()) {
    // Demo invoice — UI-г бүхэлд нь туршиж байх боломжтой
    return {
      invoiceId: `DEMO-${p.orderId}`,
      qrText: `qpay-demo://${p.orderId}?amount=${p.amount}`,
      qrImage: undefined,
      urls: [
        { name: "Demo Bank", description: "Demo", logo: "", link: "#demo" },
      ],
    };
  }

  const token = await getToken();
  const res = await fetch(`${BASE_URL}/invoice`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      invoice_code: process.env.QPAY_INVOICE_CODE,
      sender_invoice_no: p.orderId,
      invoice_receiver_code: p.customerEmail ?? "anonymous",
      invoice_description: p.description,
      amount: p.amount,
      callback_url: p.callbackUrl,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`QPay createInvoice failed: ${res.status} ${text}`);
  }
  const data = (await res.json()) as {
    invoice_id: string;
    qr_text: string;
    qr_image: string;
    urls: { name: string; description: string; logo: string; link: string }[];
  };
  return {
    invoiceId: data.invoice_id,
    qrText: data.qr_text,
    qrImage: data.qr_image,
    urls: data.urls ?? [],
  };
}

export type QpayPaymentStatus = {
  paid: boolean;
  amount: number;
};

export async function checkPayment(invoiceId: string): Promise<QpayPaymentStatus> {
  if (!isQpayConfigured() || invoiceId.startsWith("DEMO-")) {
    // Demo mode: hard-code unpaid so the UI keeps polling — реал demo-д
    // amount-ийг гүйцээнэ.
    return { paid: false, amount: 0 };
  }
  const token = await getToken();
  const res = await fetch(`${BASE_URL}/payment/check`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      object_type: "INVOICE",
      object_id: invoiceId,
      offset: { page_number: 1, page_limit: 10 },
    }),
  });
  if (!res.ok) {
    return { paid: false, amount: 0 };
  }
  const data = (await res.json()) as {
    count: number;
    paid_amount: number;
    rows: { payment_status: string; payment_amount: number }[];
  };
  const totalPaid = data.rows
    .filter((r) => r.payment_status === "PAID")
    .reduce((s, r) => s + Number(r.payment_amount), 0);
  return { paid: totalPaid > 0, amount: totalPaid };
}

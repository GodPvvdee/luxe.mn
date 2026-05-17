// Resend-ийн оронд RESEND_API_KEY тохирууулаагүй бол console-руу бичнэ.
// EMAIL_FROM-г түр хугацаагаар "Luxe <onboarding@resend.dev>" (Resend-н
// sandbox sender) болгож болно — production-д өөрийн domain-аа баталгаажуул.
import "server-only";

export type OrderEmailItem = {
  name: string;
  quantity: number;
  price: number;
  size?: string | null;
  color?: string | null;
};

export type OrderEmailPayload = {
  to: string;
  orderId: string;
  total: number;
  currency: string;
  items: OrderEmailItem[];
  customerName?: string;
};

function formatMNT(n: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Math.round(n),
  );
}

function html(p: OrderEmailPayload) {
  const rows = p.items
    .map(
      (i) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee">
          <strong>${i.name}</strong>
          ${i.size || i.color ? `<div style="color:#888;font-size:13px">${[i.size, i.color].filter(Boolean).join(" · ")}</div>` : ""}
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right">
          ${i.quantity} × ${formatMNT(i.price)} ₮
        </td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,sans-serif;background:#fafafa;margin:0;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid #eee">
      <h1 style="font-family:Georgia,serif;font-size:28px;margin:0 0 8px">Luxe</h1>
      <p style="color:#666;margin:0 0 24px">Захиалгад баярлалаа${p.customerName ? ", " + p.customerName : ""}!</p>
      <div style="background:#f4f4f5;border-radius:12px;padding:16px 20px;margin-bottom:24px;font-family:monospace">
        <strong>Захиалгын дугаар:</strong> ${p.orderId}
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}
        <tr>
          <td style="padding:16px 0;font-weight:600">Нийт</td>
          <td style="padding:16px 0;text-align:right;font-weight:600">${formatMNT(p.total)} ${p.currency}</td>
        </tr>
      </table>
      <p style="color:#666;margin:24px 0 0;font-size:13px">
        Захиалгын явцыг та өөрийн профайлаас хянах боломжтой.
      </p>
    </div>
  </body></html>`;
}

export async function sendOrderConfirmation(p: OrderEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Luxe <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("[email] stub — RESEND_API_KEY not set");
    console.log(`  to:       ${p.to}`);
    console.log(`  subject:  Захиалга ${p.orderId} баталгаажлаа`);
    console.log(`  total:    ${p.total} ${p.currency}`);
    return { ok: true, mode: "stub" as const };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: p.to,
      subject: `Захиалга ${p.orderId} баталгаажлаа`,
      html: html(p),
    });
    if (error) {
      console.error("[email] resend error:", error);
      return { ok: false, mode: "resend" as const, error };
    }
    return { ok: true, mode: "resend" as const };
  } catch (err) {
    console.error("[email] resend exception:", err);
    return { ok: false, mode: "resend" as const, error: err };
  }
}

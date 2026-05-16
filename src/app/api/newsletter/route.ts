import { NextResponse } from "next/server";
import { z } from "zod";

const body = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const data = body.parse(await req.json());
    // TODO: forward to Mailchimp / Resend / Klaviyo
    return NextResponse.json({ ok: true, email: data.email });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid email" }, { status: 422 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

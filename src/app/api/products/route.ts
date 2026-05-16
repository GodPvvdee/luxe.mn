import { NextResponse } from "next/server";
import { products } from "@/lib/mock-data";

// In production, this would query Prisma. The mock data keeps the demo
// runnable without spinning up a database.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  const sale = searchParams.get("sale");
  const q = searchParams.get("q")?.toLowerCase();
  const limit = Number(searchParams.get("limit") ?? "0");

  let result = products.slice();
  if (cat) result = result.filter((p) => p.categorySlug === cat);
  if (sale) result = result.filter((p) => p.onSale);
  if (q)
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  if (limit > 0) result = result.slice(0, limit);

  return NextResponse.json({ products: result, total: result.length });
}

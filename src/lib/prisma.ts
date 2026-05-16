import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Neon's pgbouncer-style pooler needs Prisma to know it's pooled, otherwise
// it tries to keep prepared statements alive across transactions and the
// connection pool times out. We auto-append the safe params when the URL
// points at a Neon pooler endpoint and the user hasn't set them already.
function decorateUrl(raw: string | undefined): string | undefined {
  if (!raw) return raw;
  if (!raw.includes("-pooler.")) return raw;
  const url = new URL(raw);
  if (!url.searchParams.has("pgbouncer")) url.searchParams.set("pgbouncer", "true");
  if (!url.searchParams.has("connection_limit"))
    url.searchParams.set("connection_limit", "10");
  if (!url.searchParams.has("pool_timeout"))
    url.searchParams.set("pool_timeout", "30");
  return url.toString();
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: decorateUrl(process.env.DATABASE_URL),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

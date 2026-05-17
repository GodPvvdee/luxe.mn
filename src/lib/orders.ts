import "server-only";
import { prisma } from "./prisma";

export async function getOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true, address: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: string, userId: string) {
  return prisma.order.findFirst({
    where: { id, userId },
    include: { items: true, address: true },
  });
}

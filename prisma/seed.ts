import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { mockCategories, mockProducts } from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Admin user
  const passwordHash = await bcrypt.hash("admin1234", 10);
  await prisma.user.upsert({
    where: { email: "admin@luxe.dev" },
    update: {},
    create: {
      email: "admin@luxe.dev",
      name: "Admin",
      role: "ADMIN",
      password: passwordHash,
    },
  });

  // Categories
  for (const c of mockCategories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        image: c.image,
      },
    });
  }

  const categoryMap = new Map(
    (await prisma.category.findMany()).map((c) => [c.slug, c.id]),
  );

  // Products
  for (const p of mockProducts) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        compareAt: p.compareAt ?? null,
        stock: p.stock,
        featured: p.featured,
        bestseller: p.bestseller,
        onSale: p.onSale,
        rating: p.rating,
        reviewCount: p.reviewCount,
        images: p.images,
        sizes: p.sizes,
        colors: p.colors,
        categoryId,
      },
    });
  }

  // Promo
  await prisma.promo.upsert({
    where: { code: "LUXE10" },
    update: {},
    create: { code: "LUXE10", percent: 10 },
  });

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

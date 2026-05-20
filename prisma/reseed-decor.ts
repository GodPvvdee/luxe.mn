// Бизнесийн брэндингийг fashion → home decor болгож солих үед ашиглах
// дахин үрсэх скрипт.
//
//   npx tsx prisma/reseed-decor.ts
//
// Бүх Order, OrderItem, Review, WishlistItem, Product, Category-г устгана,
// дараа нь mock-data.ts-ийн шинэ home decor каталогийг суулгана.
// User, Promo, Address-ийг хадгална.

import { PrismaClient } from "@prisma/client";
import { mockCategories, mockProducts } from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("→ Бараа, ангилал, захиалга, сэтгэгдэл, хүсэлтийн жагсаалтыг арилгаж байна...");

  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.wishlistItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("✓ Цэвэрлэгдлээ");
  console.log("→ Home decor ангилал суулгаж байна...");

  for (const c of mockCategories) {
    await prisma.category.create({
      data: {
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

  console.log(`✓ ${mockCategories.length} ангилал`);
  console.log("→ Бүтээгдэхүүн суулгаж байна...");

  for (const p of mockProducts) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;
    await prisma.product.create({
      data: {
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

  console.log(`✓ ${mockProducts.length} бараа`);
  console.log("→ Дууссан.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

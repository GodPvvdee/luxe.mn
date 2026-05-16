import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { FlashSale } from "@/components/home/flash-sale";
import { Bestsellers } from "@/components/home/bestsellers";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import { getAllProducts, getCategories } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function HomePage() {
  const [products, categoryRows] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);
  const categories = categoryRows.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    image: c.image,
  }));

  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedProducts products={products} />
      <CategoriesGrid categories={categories} />
      <FlashSale products={products} />
      <Bestsellers products={products} />
      <Testimonials />
      <Newsletter />
    </>
  );
}

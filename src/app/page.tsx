import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { FlashSale } from "@/components/home/flash-sale";
import { Bestsellers } from "@/components/home/bestsellers";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedProducts />
      <CategoriesGrid />
      <FlashSale />
      <Bestsellers />
      <Testimonials />
      <Newsletter />
    </>
  );
}

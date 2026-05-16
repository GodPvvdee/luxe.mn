import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductReviews } from "@/components/product/product-reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { TrackRecent } from "@/components/product/track-recent";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Бүтээгдэхүүн олдсонгүй" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.images,
    },
  };
}

export default async function ProductDetailPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product);

  return (
    <>
      <TrackRecent product={product} />
      <div className="container py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { label: "Нүүр", href: "/" },
            { label: "Дэлгүүр", href: "/products" },
            { label: product.categoryName, href: `/products?cat=${product.categorySlug}` },
            { label: product.name },
          ]}
        />
        <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>
      <ProductReviews rating={product.rating} count={product.reviewCount} />
      <RelatedProducts products={related} />
      <RecentlyViewed excludeId={product.id} />
    </>
  );
}

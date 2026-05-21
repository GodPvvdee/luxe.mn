"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Twitter, Youtube, Facebook, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const cols: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
    {
      title: "Дэлгүүр",
      links: [
        { label: "Бүх бүтээгдэхүүн", href: "/products" },
        { label: "Тавилга", href: "/products?cat=furniture" },
        { label: "Гэрэлтүүлэг", href: "/products?cat=lighting" },
        { label: "Даавуу", href: "/products?cat=textiles" },
        { label: "Ширээний эд", href: "/products?cat=tableware" },
        { label: "Чимэглэл", href: "/products?cat=decor" },
        { label: "Хямдрал", href: "/products?sale=1" },
      ],
    },
    {
      title: "Тусламж",
      links: [
        { label: "Хүргэлт + угсралт", href: "#" },
        { label: "Буцаалт", href: "#" },
        { label: "Хэмжээ + материал", href: "#" },
        { label: "Арчилгааны заавар", href: "#" },
        { label: "Холбоо барих", href: "#" },
      ],
    },
    {
      title: "Компани",
      links: [
        { label: "Бидний түүх", href: "#" },
        { label: "Тогтвортой байдал", href: "#" },
        { label: "Хэвлэл", href: "#" },
        { label: "Ажлын байр", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t bg-muted/30 mt-24">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="font-display text-3xl tracking-tight">Luxe</div>
            <p className="text-muted-foreground max-w-md">
              Гэрээ хайрлагч хүмүүст зориулсан тавилга, гэрэлтүүлэг,
              даавуу, чимэглэл. Зөв материал, зөв мастер, зөв ёс зүй.
            </p>
            <div>
              <p className="text-sm font-medium mb-3">
                Бүртгүүлээрэй — шинэ цуглуулгын талаар хамгийн түрүүнд мэдээрэй.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2 max-w-md"
              >
                <Input type="email" placeholder="та@example.com" required />
                <Button type="submit">Нэгдэх</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                Танд 10%-ийн хөнгөлөлтийн код илгээх болно. Хүссэн үедээ цуцалж болно.
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[Instagram, Twitter, Youtube, Facebook, Github].map((Icon, i) => (
                <Button
                  key={i}
                  size="icon"
                  variant="ghost"
                  aria-label="Сошиал"
                  className="rounded-full"
                  asChild
                >
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-sm font-semibold mb-4">{c.title}</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Luxe. Бүх эрх хуулиар хамгаалагдсан.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#">Нууцлал</Link>
            <Link href="#">Үйлчилгээний нөхцөл</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

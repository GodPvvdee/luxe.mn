"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { usePreferences } from "@/store/preferences";
import { currencies } from "@/lib/currency";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/products", label: "Дэлгүүр" },
  { href: "/products?cat=lighting", label: "Гэрэлтүүлэг" },
  { href: "/products?cat=flowers", label: "Цэцэг" },
  { href: "/products?sale=1", label: "Хямдрал" },
];

export function Navbar() {
  const pathname = usePathname();
  const { setOpen: setCartOpen, count } = useCart();
  const wishCount = useWishlist((s) => s.items.length);
  const mounted = useMounted();
  const cartCount = mounted ? count() : 0;
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <Marquee />
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "glass border-b border-border/60 shadow-sm"
            : "bg-background border-b border-transparent",
        )}
      >
        <div className="container flex h-16 items-center gap-4">
          <MobileMenu />
          <Link href="/" className="flex items-center gap-2 mr-2 md:mr-6">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          <SearchBar />

          <CurrencySwitcher />

          <Button
            variant="ghost"
            size="icon"
            aria-label="Загвар солих"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="hidden md:inline-flex"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <Link href="/wishlist" aria-label="Хүслийн жагсаалт">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-4 w-4" />
              {mounted && wishCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 justify-center p-0 text-[10px]"
                >
                  {wishCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Сагс"
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-4 w-4" />
            <AnimatePresence>
              {mounted && cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-[10px] font-semibold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <UserMenu />
        </div>
      </header>
    </>
  );
}

function Marquee() {
  const items = [
    "Улаанбаатар хотод тэр өдөртөө цэцгийн хүргэлт",
    "Гэрэлтүүлэгт 5 жилийн чанарын баталгаа",
    "Шинэхэн цэцгийг 7 хоног эдэлгээтэй гэж амлая",
    "Шинэ: Blush Peony Bouquet",
  ];
  return (
    <div className="bg-foreground text-background text-xs overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-background/60" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-7 w-7 rounded-lg bg-foreground text-background grid place-items-center font-display text-base font-bold">
        L
        <div className="absolute -inset-1 rounded-xl bg-foreground/10 -z-10 blur-sm" />
      </div>
      <span className="font-display text-xl tracking-tight">Luxe</span>
    </div>
  );
}

function SearchBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Хайх"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="top" className="h-auto pb-8">
          <div className="container max-w-2xl mx-auto pt-12">
            <SheetTitle className="sr-only">Хайлт</SheetTitle>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Бүтээгдэхүүн, ангилал хайх…"
                className="pl-12 h-14 text-base"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Шалны лампадар",
                "Сарнай",
                "Пион",
                "Эвкалипт",
                "Хямдрал",
              ].map((s) => (
                <Link
                  key={s}
                  href={`/products?q=${encodeURIComponent(s)}`}
                  onClick={() => setOpen(false)}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-accent transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function CurrencySwitcher() {
  const { currency, setCurrency } = usePreferences();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="hidden md:inline-flex font-mono text-xs">
          {currency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {currencies.map((c) => (
          <DropdownMenuItem
            key={c.code}
            onSelect={() => setCurrency(c.code)}
            className="justify-between"
          >
            <span>{c.label}</span>
            <span className="text-muted-foreground">{c.symbol}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  const { data: session } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const isAdmin = role === "ADMIN";
  const isAuthed = !!session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Хэрэглэгч">
          <User className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isAuthed ? (
          <>
            <DropdownMenuLabel className="px-3 pt-2 pb-1 text-xs text-muted-foreground">
              {session?.user?.email}
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/profile">Профайл</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders">Захиалга</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/wishlist">Хүслийн жагсаалт</Link>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin">Админ панель</Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "/" });
              }}
            >
              Гарах
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">Нэвтрэх</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">Бүртгүүлэх</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Цэс">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetTitle className="sr-only">Цэс</SheetTitle>
        <div className="p-6 space-y-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block py-3 text-lg font-medium border-b last:border-0 hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

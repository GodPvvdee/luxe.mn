"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { User, Package, Heart, MapPin, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/profile", label: "Профайл", icon: User },
  { href: "/orders", label: "Захиалга", icon: Package },
  { href: "/wishlist", label: "Хүслийн жагсаалт", icon: Heart },
  { href: "/addresses", label: "Хаягууд", icon: MapPin },
  { href: "/settings", label: "Тохиргоо", icon: Settings },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:w-64 shrink-0">
      <div className="lg:sticky lg:top-24 space-y-1">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                active
                  ? "bg-foreground text-background"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
        <button
          onClick={async () => {
            toast.success("Гарлаа");
            await signOut({ callbackUrl: "/" });
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Гарах
        </button>
      </div>
    </nav>
  );
}

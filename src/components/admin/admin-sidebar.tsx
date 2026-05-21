"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Хяналт", icon: LayoutDashboard },
  { href: "/admin/products", label: "Бүтээгдэхүүн", icon: Package },
  { href: "/admin/orders", label: "Захиалга", icon: ShoppingCart },
  { href: "/admin/customers", label: "Хэрэглэгчид", icon: Users },
  { href: "/admin/categories", label: "Ангилал", icon: Tag },
  { href: "/admin/analytics", label: "Аналитик", icon: BarChart3 },
  { href: "/admin/settings", label: "Тохиргоо", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r bg-card h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="font-display text-xl">
          Luxe<span className="text-muted-foreground">/admin</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t">
        <button
          onClick={async () => {
            toast.success("Гарлаа");
            await signOut({ callbackUrl: "/" });
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          Гарах
        </button>
      </div>
    </aside>
  );
}

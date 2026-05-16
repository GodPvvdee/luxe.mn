"use client";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMounted } from "@/hooks/use-mounted";

export function AdminTopbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/80 backdrop-blur-xl flex items-center gap-4 px-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products, orders, customers…" className="pl-9 h-9" />
      </div>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      <Button size="icon" variant="ghost">
        <Bell className="h-4 w-4" />
      </Button>
      <Avatar className="h-9 w-9">
        <AvatarImage src="https://i.pravatar.cc/64?img=4" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </header>
  );
}

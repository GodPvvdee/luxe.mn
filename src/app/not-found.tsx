import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 py-20">
      <div className="font-display text-7xl md:text-9xl tracking-tight">404</div>
      <h1 className="font-display text-3xl">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you&apos;re looking for has moved, expired, or never existed.
        Let&apos;s get you back on track.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setEmail("");
    toast.success("Luxe-д тавтай морил — 10% хөнгөлөлтийн код тань явж байна.", {
      icon: <Sparkles className="h-4 w-4" />,
    });
  }

  return (
    <section className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-foreground text-background p-10 md:p-16"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -right-20 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl" />
          <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-violet-400/30 blur-3xl" />
        </div>

        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Mail className="h-8 w-8 mb-5 opacity-80" />
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              Хамгийн түрүүнд мэдээрэй.
            </h2>
            <p className="mt-3 text-background/70 max-w-md">
              Шинэ цуглуулга, дахин нөөц, зөвхөн гишүүдэд зориулсан хямдралын
              талаар хамгийн түрүүнд мэдээрэй. Бүртгүүлбэл 10% хөнгөлөлт.
            </p>
          </div>
          <form
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="та@example.com"
              className="bg-white/10 border-white/20 text-background placeholder:text-background/50 h-12 flex-1"
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              variant="secondary"
              className="text-foreground"
            >
              {loading ? "Илгээж байна…" : "Бүртгүүлэх"}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

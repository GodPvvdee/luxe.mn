"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
    toast.success("Сэргээх линк илгээгдлээ — и-мэйлээ шалгана уу.");
  }

  return (
    <AuthCard
      title="Нууц үг сэргээх"
      subtitle="И-мэйл хаягаа оруулбал шинэ нууц үг тохируулах линк илгээх болно."
      footer={
        <span className="text-muted-foreground">
          Санасан уу?{" "}
          <Link href="/login" className="text-foreground font-medium hover:underline">
            Нэвтрэх
          </Link>
        </span>
      }
    >
      {sent ? (
        <div className="rounded-2xl border bg-muted/40 p-6 space-y-3 text-center">
          <h3 className="font-medium">И-мэйлээ шалгана уу</h3>
          <p className="text-sm text-muted-foreground">
            Сэргээх линкийг <strong>{email}</strong> рүү илгээлээ. Линк 30 минутын дотор дуусна.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">И-мэйл</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="та@example.com"
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Илгээж байна…" : "Сэргээх линк илгээх"}
          </Button>
        </form>
      )}
    </AuthCard>
  );
}

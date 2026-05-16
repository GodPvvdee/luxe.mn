"use client";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AccountNav } from "@/components/account/account-nav";

export default function ProfilePage() {
  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Нүүр", href: "/" }, { label: "Профайл" }]} />
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-6">
        Хувийн самбар
      </h1>
      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <AccountNav />
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 p-6 rounded-2xl border bg-card"
          >
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://i.pravatar.cc/120?img=47" />
              <AvatarFallback>БЭ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-display text-2xl">Чагнаадорж Пүрэв-Эрдэнэ</h2>
              <p className="text-sm text-muted-foreground">
                bat@example.com · 2024 оны 3-р сараас гишүүн
              </p>
            </div>
            <Button variant="outline">Зураг солих</Button>
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle>Хувийн мэдээлэл</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Нэр</Label>
                <Input defaultValue="Чагнаадорж" />
              </div>
              <div className="space-y-1.5">
                <Label>Овог</Label>
                <Input defaultValue="Дорж" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>И-мэйл</Label>
                <Input defaultValue="bat@example.com" type="email" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Утас</Label>
                <Input defaultValue="+976 9911 2233" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <Button>Хадгалах</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Нууц үг</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Одоогийн нууц үг</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-1.5">
                  <Label>Шинэ нууц үг</Label>
                  <Input type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline">Нууц үг шинэчлэх</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

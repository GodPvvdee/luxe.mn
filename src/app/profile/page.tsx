import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AccountNav } from "@/components/account/account-nav";
import { ProfileForm } from "@/components/account/profile-form";
import { PasswordForm } from "@/components/account/password-form";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login?callbackUrl=/profile");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
      password: true,
      createdAt: true,
      _count: { select: { orders: true } },
    },
  });
  if (!user) redirect("/login");

  const initials =
    (user.name ?? user.email ?? "?")
      .split(/\s+/)
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="container py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Нүүр", href: "/" }, { label: "Профайл" }]} />
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-6">
        Хувийн самбар
      </h1>
      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        <AccountNav />
        <div className="flex-1 space-y-6">
          <ProfileHero
            name={user.name ?? "(нэргүй)"}
            email={user.email}
            image={user.image}
            initials={initials}
            role={user.role}
            joined={user.createdAt}
            orderCount={user._count.orders}
          />

          <Card>
            <CardHeader>
              <CardTitle>Хувийн мэдээлэл</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm
                initialName={user.name ?? ""}
                initialEmail={user.email}
                initialImage={user.image}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Нууц үг</CardTitle>
            </CardHeader>
            <CardContent>
              <PasswordForm hasPassword={!!user.password} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Hero нь Framer Motion ашигладаг боловч server component-аас render
// хийгдэх боломжтой — animation client-руу шилжүүлснээр SSR-руу нөлөөлдөггүй.
function ProfileHero({
  name,
  email,
  image,
  initials,
  role,
  joined,
  orderCount,
}: {
  name: string;
  email: string;
  image: string | null;
  initials: string;
  role: string;
  joined: Date;
  orderCount: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-6 rounded-2xl border bg-card">
      <Avatar className="h-20 w-20">
        {image && <AvatarImage src={image} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-2xl">{name}</h2>
          {role === "ADMIN" && <Badge>Админ</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">
          {email} · {formatDate(joined)}-нээс гишүүн · {orderCount} захиалга
        </p>
      </div>
    </div>
  );
}


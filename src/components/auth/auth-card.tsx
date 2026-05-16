import Image from "next/image";
import Link from "next/link";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="flex flex-col px-6 sm:px-10 py-10 lg:py-20">
        <Link href="/" className="font-display text-2xl tracking-tight">
          Luxe
        </Link>
        <div className="flex-1 grid place-items-center">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2">
              <h1 className="font-display text-3xl tracking-tight">{title}</h1>
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            </div>
            {children}
            {footer && <div className="text-sm text-center">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <blockquote className="font-display text-3xl leading-tight">
            &ldquo;Үнэхээр тэгш сайн хийсэн тул улирал бүр хайрлах шинэ
            шалтгаан олж байдаг.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm opacity-80">
            — Маркус Чен, 2022 оноос хойшхи хэрэглэгч
          </p>
        </div>
      </div>
    </div>
  );
}

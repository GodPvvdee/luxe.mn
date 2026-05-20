import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Luxe";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: `${appName} Home — Гэртээ амралт төгөлдөр.`,
    template: `%s · ${appName} Home`,
  },
  description:
    "Тавилга, гэрэлтүүлэг, даавуу, ширээний эд, чимэглэл — гэр гэртээ амралт авчрах дээд зэрэглэлийн материалууд.",
  keywords: [
    "тавилга",
    "гэрэлтүүлэг",
    "home decor",
    "interior",
    "хивс",
    "ваар",
    "монгол онлайн дэлгүүр",
  ],
  authors: [{ name: appName }],
  openGraph: {
    title: appName,
    description: "Гэрээ хайрлагч хүмүүст зориулсан тавилга, гэрэлтүүлэг, даавуу, чимэглэл.",
    type: "website",
    siteName: appName,
    locale: "mn_MN",
  },
  twitter: { card: "summary_large_image", title: appName },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <ToastProvider />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

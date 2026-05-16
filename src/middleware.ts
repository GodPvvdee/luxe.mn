import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Demo үед админ хуудсыг нээлттэй болгох (DB байхгүй учир).
// Production-д энэ хувьсагчийг "false" болгоод бодит auth-аар хамгаална.
const DEMO_MODE = true;

export default withAuth(
  function middleware(req) {
    if (DEMO_MODE) return NextResponse.next();

    const token = req.nextauth.token;
    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (DEMO_MODE) return true;
        if (req.nextUrl.pathname.startsWith("/admin")) return !!token;
        if (
          req.nextUrl.pathname.startsWith("/profile") ||
          req.nextUrl.pathname.startsWith("/orders")
        )
          return !!token;
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/orders/:path*"],
};

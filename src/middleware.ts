import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // public routes pass through; auth guard runs in middleware above
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

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Role-based access control
    if (path.startsWith("/ecosystem") && (!token || token.role === "GUEST")) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (path.startsWith("/innovator") && (!token || (token.role !== "STUDENT" && token.role !== "ADMIN"))) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (path.startsWith("/manager") && (!token || (token.role !== "MENTOR" && token.role !== "ADMIN"))) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (path.startsWith("/oracle") && (!token || token.role !== "ADMIN")) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Assessment Protection
    if (path.startsWith("/assessment")) {
      if (!token) return NextResponse.redirect(new URL("/onboarding", req.url));
      
      // Validation and Notes are Mentor/Admin only
      if ((path.includes("/validation") || path.includes("/notes")) && 
          (token.role !== "MENTOR" && token.role !== "ADMIN")) {
        return NextResponse.redirect(new URL("/assessment", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/onboarding",
    }
  }
);

export const config = {
  matcher: [
    "/ecosystem/:path*", 
    "/dashboard/:path*",
    "/innovator/:path*",
    "/manager/:path*",
    "/oracle/:path*",
    "/assessment/:path*"
  ],
};

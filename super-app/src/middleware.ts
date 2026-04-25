import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Role-based access control
    if (path.startsWith("/stakeholders") && (!token || token.role === "GUEST")) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (path.startsWith("/student") && (!token || (token.role !== "STUDENT" && token.role !== "ADMIN"))) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (path.startsWith("/mentor") && (!token || (token.role !== "MENTOR" && token.role !== "ADMIN"))) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    if (path.startsWith("/admin") && (!token || token.role !== "ADMIN")) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
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
    "/stakeholders/:path*", 
    "/dashboard/:path*",
    "/student/:path*",
    "/mentor/:path*",
    "/admin/:path*"
  ],
};

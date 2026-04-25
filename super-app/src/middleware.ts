import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirect guest or unauthenticated users away from stakeholders
    if (path.startsWith("/stakeholders") && (!token || token.role === "GUEST")) {
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
    "/dashboard/:path*"
  ],
};

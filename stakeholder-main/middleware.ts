import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // 1. NEVER intercept API routes in middleware to prevent session fetch errors
    if (path.startsWith("/api")) {
      return NextResponse.next()
    }

    // 2. Define access rules
    const rules = [
      { prefix: "/dashboard/admin", allowed: ["ADMIN"] },
      { prefix: "/manager", allowed: ["MANAGER", "ADMIN"] },
      { prefix: "/student", allowed: ["STUDENT", "ADMIN"] },
    ]

    const rule = rules.find(r => path.startsWith(r.prefix))

    if (rule) {
      // If no token, next-auth/middleware's default behavior will redirect to sign-in
      // (controlled by `authorized` callback below)
      
      const userRole = token?.role as string | undefined
      if (userRole && !rule.allowed.includes(userRole)) {
        // Redirect to unauthorized page instead of root to avoid potential loops
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      // authorized returns true if the user should be allowed to see the page.
      // If it returns false, the user is redirected to the sign-in page.
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        
        // Public pages don't need token (though they aren't in matcher usually)
        if (path === "/" || path.startsWith("/stakeholders") || path.startsWith("/problems") || path.startsWith("/solutions") || path.startsWith("/research") || path.startsWith("/auth")) {
          return true
        }
        
        // Internal pages require token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    "/student/:path*",
    "/manager/:path*",
    "/dashboard/admin/:path*",
    "/api/:path*", // Match API to handle exclusion logic internally
  ],
}

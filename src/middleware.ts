import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  // Redirect logged-in users away from login/register
  if ((pathname === "/login" || pathname === "/register") && token && role) {
    let redirectUrl: URL;

    if (role === "admin") {
      redirectUrl = new URL("/admin-dashboard", request.url);
    } else if (role === "traveller") {
      redirectUrl = new URL("/traveller-dashboard", request.url);
    } else if (role === "guide") {
      redirectUrl = new URL("/guide-dashboard", request.url);
    } else {
      redirectUrl = new URL("/", request.url);
    }
    return NextResponse.redirect(redirectUrl);
  }

  /**
   * =====================
   * Admin route protection
   * =====================
   */
  if (pathname.startsWith("/admin-dashboard")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorised", request.url));
    }
  }

  /**
   * =====================
   * Traveller route protection
   * =====================
   */
  if (
    pathname.startsWith("/traveller-dashboard") ||
    pathname.startsWith("/booking") ||
    pathname.startsWith("/my-booking") ||
    pathname.startsWith("/review")
  ) {
    if (!token || role !== "traveller") {
      return NextResponse.redirect(new URL("/unauthorised", request.url));
    }
  }

  // Public traveller routes (accessible without login also)
  if (
    pathname.startsWith("/tour") ||
    pathname.startsWith("/destination") ||
    pathname.startsWith("/details")
  ) {
    return NextResponse.next(); // Public access
  }

  /**
   * =====================
   * Guide route protection
   * =====================
   */
  if (
    pathname.startsWith("/guide-dashboard") ||
    pathname.startsWith("/guide") ||
    pathname.startsWith("/guide-booking") ||
    pathname.startsWith("/edit-status")
  ) {
    if (!token || role !== "guide") {
      return NextResponse.redirect(new URL("/unauthorised", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin-dashboard/:path*",
    "/traveller-dashboard/:path*",
    "/guide-dashboard/:path*",
    "/booking/:path*",
    "/my-booking/:path*",
    "/guide-booking/:path*",
    "/edit-status/:path*",
    "/review/:path*",
    "/tour/:path*",
    "/destination/:path*",
    "/details/:path*",
  ],
};

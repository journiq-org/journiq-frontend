import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  // Redirect logged-in users away from login/register
  if ((pathname === "/login" || pathname === "/register") && token && role) {
    let redirectUrl: URL;

    if (role === "admin") redirectUrl = new URL("/admin-dashboard", request.url);
    else if (role === "traveller") redirectUrl = new URL("/traveller-dashboard", request.url);
    else if (role === "guide") redirectUrl = new URL("/guide-dashboard", request.url);
    else redirectUrl = new URL("/", request.url);

    return NextResponse.redirect(redirectUrl);
  }

  // Admin routes
  if (pathname.startsWith("/admin-dashboard") && (!token || role !== "admin")) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Traveller routes
  if (
    (pathname.startsWith("/traveller-dashboard") ||
      // pathname.startsWith("/booking") ||
      // pathname.startsWith("/my-booking") ||
      pathname.startsWith("/review")) &&
    (!token || role !== "traveller")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Public routes
  if (
    pathname.startsWith("/tour") ||
    pathname.startsWith("/destination") ||
    pathname.startsWith("/details")
  ) {
    return NextResponse.next();
  }

  // Guide routes
  if (
    (pathname.startsWith("/guide-dashboard") ||
      pathname.startsWith("/guide") ||
      pathname.startsWith("/guide-booking") ||
      pathname.startsWith("/edit-status")) &&
    (!token || role !== "guide")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  //  Catch-all: redirect unknown URLs to not-found
  const knownRoutes = [
    "/login",
    "/register",
    "/admin-dashboard",
    "/traveller-dashboard",
    "/guide-dashboard",
    "/booking",
    "/my-booking",
    "/guide-booking",
    "/edit-status",
    "/review",
    "/tour",
    "/destination",
    "/details",
  ];

  const isKnownRoute = knownRoutes.some((route) => pathname.startsWith(route));
  if (!isKnownRoute) {
    return NextResponse.redirect(new URL("/not-found", request.url));
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

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Maintenance mode: only the maintenance landing and the legally required
// pages are reachable. Everything else redirects back to the landing.
const ALLOWED = new Set(["/", "/privacy-policy", "/terms-of-service"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Normalize a possible trailing slash (e.g. "/privacy-policy/").
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (ALLOWED.has(normalized)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    // Run on every path except Next internals, the API, and static assets.
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|.*\\..*).*)",
  ],
};

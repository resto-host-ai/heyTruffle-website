import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 renamed the middleware.ts convention to proxy.ts — same
// behavior, new file/export name. See node_modules/next/dist/docs/01-app/
// 03-api-reference/03-file-conventions/proxy.md.

const COOKIE_NAME = "tf_cta_variant";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const existing = request.cookies.get(COOKIE_NAME)?.value;

  // Si ya tiene variante asignada, no la tocamos.
  if (existing === "A" || existing === "B") {
    return response;
  }

  // Asignación aleatoria 50/50.
  const variant = Math.random() < 0.5 ? "A" : "B";
  response.cookies.set(COOKIE_NAME, variant, {
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Aapki Exact Secret Key
  const SECRET_PATH = "/lBgQOhFisFW-CTU1iLpPtMi8D22gmwjCWf8rikaeY-6UTCqicnHqUfQfCadz5pSPpdX4yF2321mG1l2riC8YcQ/login";

  // 1. SUCCESS: Agar exact match hai, toh login page dikhao
  if (pathname === SECRET_PATH) {
    // Agar user pehle se logged in hai (cookie check)
    const token = request.cookies.get("token")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Rewrite login content
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  // 2. RESTRICTION LOGIC:
  // Agar path "/login" hai OR path itna lamba hai lekin exact match nahi kar raha
  // (Matlab secret code mein thoda sa bhi change hua hai)
  const isSuspiciousPath = pathname.length > 50 && pathname.endsWith("/login");
  
  if (pathname === "/login" || isSuspiciousPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("auth_error", "1");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Isme humein matcher ko broad rakhna padega taaki galat secret keys catch ho sakein
  matcher: [
    "/login",
    // Wildcard matcher taaki koi bhi lamba path detect ho sake
    "/:path*/login",
  ],
};
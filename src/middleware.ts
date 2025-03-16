import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { PUBLIC_ROUTES } from "@/config";
export interface DecodedToken {
  exp?: number;
  [key: string]: unknown;
}

export function checkExpiry(token: string): boolean {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode<DecodedToken | null>(token);
    if (
      decodedToken &&
      decodedToken.exp &&
      Date.now() < decodedToken.exp * 1000
    ) {
      return false;
    }
    return true;
  } catch {
    return true;
  }
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);
  if (isPublicRoute) return NextResponse.next();

  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken || checkExpiry(accessToken))
    return NextResponse.redirect(new URL("/signin", req.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

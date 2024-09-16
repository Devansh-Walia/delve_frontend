import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getMe } from "@/utils/api";

export async function middleware(request: NextRequest) {
  const me = await getMe();

  console.log(me, "me ");

  if (!me) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/create/:path*"],
};

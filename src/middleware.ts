import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getMe } from "@/utils/api";
import { AppRoutes } from "./utils/enums";

export async function middleware(request: NextRequest) {
  const me = await getMe();

  console.log(me, "me ");

  if (!me) {
    return NextResponse.redirect(new URL(AppRoutes.LOGIN, request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

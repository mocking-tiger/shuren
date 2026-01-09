import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // dashboard 및 하위 디렉토리 접근 권한 체크
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

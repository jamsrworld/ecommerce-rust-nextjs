import { type NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "./config/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/user")) {
    const cookies = request.cookies.get("x-session");
    if (!cookies) {
      return NextResponse.redirect(
        new URL(APP_ROUTES.loginWithRedirect(pathname), request.url),
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

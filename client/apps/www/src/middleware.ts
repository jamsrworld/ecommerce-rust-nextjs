import { type NextRequest, NextResponse } from "next/server";
import { APP_ROUTES, protectedRoutes } from "./config/routes";
import { env } from "./env";
import { verifyJwtToken } from "./utils/jwt";

const redirectToLogin = (request: NextRequest) => {
  return NextResponse.redirect(
    new URL(
      APP_ROUTES.loginWithRedirect(request.nextUrl.pathname),
      request.url,
    ),
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (!isProtectedRoute) return NextResponse.next();

  const sessionKey = request.cookies.get("x-session")?.value;
  if (!sessionKey) return redirectToLogin(request);
  try {
    const validToken = await verifyJwtToken({
      secret: env.JWT_SECRET,
      token: sessionKey,
    });
    if (!validToken) return redirectToLogin(request);
  } catch (err) {
    return redirectToLogin(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

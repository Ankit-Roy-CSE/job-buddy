import { updateSession } from "@insforge/sdk/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next({ request });
  const { accessToken, error } = await updateSession({
    requestCookies: {
      get: (name: string) => request.cookies.get(name),
    },
    responseCookies: response.cookies,
  });

  if (error) {
    console.error("[proxy/updateSession]", error);
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "auth_required");
    loginUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    const redirectResponse = NextResponse.redirect(loginUrl);

    for (const cookie of response.cookies.getAll()) {
      redirectResponse.cookies.set(cookie);
    }

    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/find-jobs/:path*",
    "/interview-prep/:path*",
  ],
};

import { createServerClient, setAuthCookies } from "@insforge/sdk/ssr";
import { NextResponse } from "next/server";

type OAuthExchangeBody = {
  code?: unknown;
  codeVerifier?: unknown;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: OAuthExchangeBody = await request.json();

    if (
      typeof body.code !== "string" ||
      typeof body.codeVerifier !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "The sign-in response was incomplete." },
        { status: 400 },
      );
    }

    const insforge = createServerClient();
    const { data, error } = await insforge.auth.exchangeOAuthCode(
      body.code,
      body.codeVerifier,
    );

    if (error || !data?.accessToken || !data.user) {
      console.error("[api/auth/oauth]", error);
      return NextResponse.json(
        { success: false, error: "We could not complete sign in." },
        { status: error?.statusCode ?? 400 },
      );
    }

    const response = NextResponse.json({
      success: true,
      data: { user: data.user },
    });

    setAuthCookies(response.cookies, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    return response;
  } catch (error) {
    console.error("[api/auth/oauth]", error);
    return NextResponse.json(
      { success: false, error: "We could not complete sign in." },
      { status: 500 },
    );
  }
}

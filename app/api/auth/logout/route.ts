import { clearAuthCookies, createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const insforge = createServerClient({ cookies: cookieStore });
    const { error } = await insforge.auth.signOut();

    if (error) {
      console.error("[api/auth/logout]", error);
    }

    const response = NextResponse.json({ success: true });
    clearAuthCookies(response.cookies);

    return response;
  } catch (error) {
    console.error("[api/auth/logout]", error);

    const response = NextResponse.json({ success: true });
    clearAuthCookies(response.cookies);

    return response;
  }
}

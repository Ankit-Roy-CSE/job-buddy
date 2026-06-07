import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";
import type { InsForgeClient } from "@insforge/sdk";

export async function createInsforgeServer(): Promise<InsForgeClient> {
  return createServerClient({
    cookies: await cookies(),
  });
}

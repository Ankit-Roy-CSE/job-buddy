"use client";

import { createBrowserClient } from "@insforge/sdk/ssr";
import type { InsForgeClient } from "@insforge/sdk";

let browserClient: InsForgeClient | null = null;

export function getInsforgeClient(): InsForgeClient {
  if (!browserClient) {
    browserClient = createBrowserClient();
  }

  return browserClient;
}

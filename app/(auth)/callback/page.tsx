import { Suspense } from "react";

import { OAuthCallback } from "@/components/auth/OAuthCallback";

export default function CallbackPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <Suspense>
        <OAuthCallback />
      </Suspense>
    </main>
  );
}

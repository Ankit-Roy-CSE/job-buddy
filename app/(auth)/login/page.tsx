import { Suspense } from "react";

import { LoginCard } from "@/components/auth/LoginCard";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <Suspense fallback={<LoginCardFallback />}>
        <LoginCard />
      </Suspense>
    </main>
  );
}

function LoginCardFallback() {
  return (
    <div className="h-[420px] w-full max-w-md animate-pulse rounded-2xl border border-border bg-surface shadow-sm" />
  );
}

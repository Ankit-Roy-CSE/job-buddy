"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PKCE_VERIFIER_KEY = "jobbuddy_oauth_code_verifier";

type OAuthExchangeResponse = {
  success: boolean;
  error?: string;
};

export function OAuthCallback() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function completeSignIn(): Promise<void> {
      const code = searchParams.get("insforge_code");
      const providerError = searchParams.get("error");
      const codeVerifier = window.sessionStorage.getItem(PKCE_VERIFIER_KEY);

      if (providerError || !code || !codeVerifier) {
        setErrorMessage(
          providerError
            ? "The provider did not complete sign in."
            : "This sign-in link is incomplete or has expired.",
        );
        return;
      }

      try {
        const response = await fetch("/api/auth/oauth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, codeVerifier }),
        });
        const result: OAuthExchangeResponse = await response.json();

        if (!response.ok || !result.success) {
          setErrorMessage(result.error ?? "We could not complete sign in.");
          return;
        }

        window.sessionStorage.removeItem(PKCE_VERIFIER_KEY);
        window.location.replace("/dashboard");
      } catch (error) {
        console.error("[OAuthCallback/completeSignIn]", error);
        setErrorMessage("We could not complete sign in. Please try again.");
      }
    }

    void completeSignIn();
  }, [searchParams]);

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-sm sm:p-10">
      <Image
        src="/logo.png"
        alt="JobBuddy logo"
        width={48}
        height={48}
        className="mx-auto rounded-xl"
        priority
      />

      {errorMessage ? (
        <>
          <h1 className="mt-6 text-2xl font-bold text-text-darkest">
            Sign in was not completed
          </h1>
          <p role="alert" className="mt-3 text-sm leading-6 text-text-secondary">
            {errorMessage}
          </p>
          <Link
            href="/login"
            className="mt-7 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Back to sign in
          </Link>
        </>
      ) : (
        <>
          <div
            className="mx-auto mt-7 h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent"
            aria-hidden="true"
          />
          <h1 className="mt-5 text-2xl font-bold text-text-darkest">
            Finishing sign in
          </h1>
          <p className="mt-3 text-sm text-text-secondary">
            You will be redirected to your dashboard.
          </p>
        </>
      )}
    </div>
  );
}

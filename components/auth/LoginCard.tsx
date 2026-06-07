"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { getInsforgeClient } from "@/lib/insforge-client";
import { useAuth } from "@/components/auth/AuthProvider";
import { GitHubIcon } from "@/components/auth/GitHubIcon";
import { GoogleIcon } from "@/components/auth/GoogleIcon";

type OAuthProvider = "google" | "github";

const PKCE_VERIFIER_KEY = "jobbuddy_oauth_code_verifier";

export function LoginCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading: isSessionLoading, user } = useAuth();
  const [activeProvider, setActiveProvider] =
    useState<OAuthProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    searchParams.get("error") === "auth_required"
      ? "Sign in to continue to that page."
      : null,
  );

  useEffect(() => {
    if (!isSessionLoading && user) {
      router.replace("/dashboard");
    }
  }, [isSessionLoading, router, user]);

  async function handleOAuth(provider: OAuthProvider): Promise<void> {
    setActiveProvider(provider);
    setErrorMessage(null);

    try {
      const insforge = getInsforgeClient();
      const { data, error } = await insforge.auth.signInWithOAuth(provider, {
        redirectTo: `${window.location.origin}/callback`,
        additionalParams:
          provider === "google" ? { prompt: "select_account" } : undefined,
        skipBrowserRedirect: true,
      });

      if (error || !data.url || !data.codeVerifier) {
        console.error("[LoginCard/handleOAuth]", error);
        setErrorMessage("We could not start sign in. Please try again.");
        return;
      }

      window.sessionStorage.setItem(PKCE_VERIFIER_KEY, data.codeVerifier);
      window.location.assign(data.url);
    } catch (error) {
      console.error("[LoginCard/handleOAuth]", error);
      setErrorMessage("We could not start sign in. Please try again.");
    } finally {
      setActiveProvider(null);
    }
  }

  const isBusy = isSessionLoading || activeProvider !== null;

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm sm:p-10">
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="JobBuddy logo"
            width={40}
            height={40}
            className="rounded-[10px]"
            priority
          />
          <span className="text-xl font-bold text-text-darkest">JobBuddy</span>
        </Link>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-text-darkest">
          Welcome to JobBuddy
        </h1>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Sign in to find better job matches, research companies, and prepare
          for interviews.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={() => void handleOAuth("google")}
          disabled={isBusy}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GoogleIcon />
          {activeProvider === "google"
            ? "Connecting to Google..."
            : "Continue with Google"}
        </button>

        <button
          type="button"
          onClick={() => void handleOAuth("github")}
          disabled={isBusy}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GitHubIcon />
          {activeProvider === "github"
            ? "Connecting to GitHub..."
            : "Continue with GitHub"}
        </button>
      </div>

      {errorMessage ? (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-error/20 bg-error/5 px-4 py-3 text-sm text-error"
        >
          {errorMessage}
        </p>
      ) : null}

      <p className="mt-8 text-center text-xs leading-5 text-text-muted">
        By continuing, you agree to the Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

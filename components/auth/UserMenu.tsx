"use client";

import Link from "next/link";

import { useAuth } from "@/components/auth/AuthProvider";

export function UserMenu() {
  const { isLoading, signOut, user } = useAuth();

  if (isLoading) {
    return (
      <div
        className="h-9 w-24 animate-pulse rounded-lg bg-surface-tertiary"
        aria-label="Loading account"
      />
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        id="nav-start-free"
      >
        Start for free
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void signOut()}
      className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
    >
      Sign out
    </button>
  );
}

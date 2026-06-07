"use client";

import type { UserSchema } from "@insforge/sdk";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";

type AuthContextValue = {
  isLoading: boolean;
  user: UserSchema | null;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

type RefreshSessionResponse = {
  accessToken?: string;
  user?: UserSchema;
};

async function loadCurrentUser(): Promise<UserSchema | null> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Session refresh failed");
  }

  const data: RefreshSessionResponse = await response.json();
  return data.user ?? null;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const posthog = usePostHog();

  useEffect(() => {
    if (user && posthog) {
      posthog.identify(user.id, {
        email: user.email,
      });
    }
  }, [user, posthog]);

  const refreshUser = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      setUser(await loadCurrentUser());
    } catch (error) {
      console.error("[AuthProvider/refreshUser]", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    void loadCurrentUser()
      .then((currentUser) => {
        if (!isCancelled) {
          setUser(currentUser);
        }
      })
      .catch((error: unknown) => {
        console.error("[AuthProvider/initialLoad]", error);

        if (!isCancelled) {
          setUser(null);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }
    } catch (error) {
      console.error("[AuthProvider/signOut]", error);
    } finally {
      setUser(null);
      if (posthog) {
        posthog.reset();
      }
      router.replace("/login");
      router.refresh();
    }
  }, [router, posthog]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading,
      user,
      refreshUser,
      signOut,
    }),
    [isLoading, refreshUser, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

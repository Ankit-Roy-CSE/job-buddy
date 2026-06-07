import { redirect } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { createInsforgeServer } from "@/lib/insforge-server";

export default async function DashboardPage() {
  const insforge = await createInsforgeServer();
  const { data } = await insforge.auth.getCurrentUser();

  if (!data.user) {
    redirect("/login?error=auth_required");
  }

  const displayName =
    data.user.profile?.name ?? data.user.email?.split("@")[0] ?? "there";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 py-12 sm:px-8 lg:px-12">
        <section className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <p className="text-sm font-medium text-accent">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-darkest">
            Welcome, {displayName}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
            Your account is connected. The full dashboard arrives in step 18;
            next, JobBuddy will initialize analytics and create the application
            data model.
          </p>
        </section>
      </main>
    </div>
  );
}

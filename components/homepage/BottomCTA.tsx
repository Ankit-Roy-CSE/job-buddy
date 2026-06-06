import Link from "next/link";

export function BottomCTA() {
  return (
    <section className="w-full bg-overlay py-20 border-t border-border" id="bottom-cta">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Supercharge Your Job Search?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-accent-light opacity-90">
          Join developers using JobBuddy to discover matches, automate company research, and walk into interviews fully prepared.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            id="bottom-start-free"
          >
            Start for free
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-border-muted bg-transparent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            id="bottom-find-match"
          >
            Find Your First Match
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full bg-surface-secondary" id="hero">
      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-20 text-center">
        <h1 className="mx-auto max-w-2xl text-[44px] font-bold leading-[1.15] tracking-tight text-text-darkest sm:text-[52px]">
          Job hunting is hard.
          <br />
          Your tools shouldn&apos;t be.
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-text-secondary">
          Stop applying blind. JobBuddy finds the jobs, researches the
          companies, and gives you everything you need to stand out.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            id="hero-get-started"
          >
            Get Started
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="ml-0.5"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
            id="hero-find-match"
          >
            Find Your First Match
          </Link>
        </div>
      </div>
    </section>
  );
}

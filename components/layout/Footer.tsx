import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="JobBuddy logo"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-base font-bold text-text-darkest">
            JobBuddy
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Terms & Condition
          </Link>
        </div>
      </div>
    </footer>
  );
}

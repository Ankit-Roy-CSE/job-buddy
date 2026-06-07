import Link from "next/link";
import Image from "next/image";

import { UserMenu } from "@/components/auth/UserMenu";

export function Navbar() {
  return (
    <header className="w-full bg-surface border-b border-border">
      <nav
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6"
        id="main-nav"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="JobBuddy logo"
            width={36}
            height={36}
            className="rounded-[10px]"
          />
          <span className="text-[19px] font-bold leading-7 text-text-darkest">
            JobBuddy
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="/dashboard"
              className="text-sm font-medium leading-5 text-text-dark transition-colors hover:text-accent"
            >
              Dashboard
            </Link>
            <Link
              href="/find-jobs"
              className="text-sm font-medium leading-5 text-text-dark transition-colors hover:text-accent"
            >
              Find Jobs
            </Link>
            <Link
              href="/interview-prep"
              className="text-sm font-medium leading-5 text-text-dark transition-colors hover:text-accent"
            >
              Interview Prep
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium leading-5 text-text-dark transition-colors hover:text-accent"
            >
              Profile
            </Link>
          </div>

          <UserMenu />
        </div>
      </nav>
    </header>
  );
}

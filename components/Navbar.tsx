"use client";

import { useDomain } from "@/hooks/useDomain";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { domain, mounted } = useDomain();

  return (
    <nav className="flex items-center justify-between pt-6">
      <span className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
        {mounted ? domain : "\u00A0"}
      </span>
      <ThemeToggle />
    </nav>
  );
}

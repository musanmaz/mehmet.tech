"use client";

import { siteConfig } from "@/lib/site";
import { useDomain } from "@/hooks/useDomain";

export function Footer() {
  const { domain, mounted } = useDomain();

  return (
    <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
          {mounted ? domain : "\u00A0"}
        </span>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { useDomain } from "@/hooks/useDomain";

export function Footer() {
  const { mounted } = useDomain();

  return (
    <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <p className="font-mono text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <Link
            href="/terminal"
            className="font-mono text-xs text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
          >
            $ terminal
          </Link>
        </div>
        {mounted && (
          <div className="flex gap-3 font-mono text-xs text-neutral-400 dark:text-neutral-600">
            {Object.keys(siteConfig.domains).map((d) => (
              <a
                key={d}
                href={`https://${d}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400"
              >
                {d}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}

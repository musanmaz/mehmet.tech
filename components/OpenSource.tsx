"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function OpenSource() {
  const [showAllForks, setShowAllForks] = useState(false);
  const visibleForks = showAllForks
    ? siteConfig.forks
    : siteConfig.forks.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Organization Contributions */}
      <div>
        <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Organization Contributions
        </h3>
        <div className="space-y-2">
          {siteConfig.orgContributions.map((contrib) => (
            <a
              key={contrib.repo}
              href={contrib.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {contrib.name}
                </span>
                <span className="hidden text-sm text-neutral-500 sm:inline dark:text-neutral-400">
                  — {contrib.description}
                </span>
              </div>
              <span className="rounded-md bg-neutral-200/60 px-2 py-0.5 font-mono text-xs text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
                {contrib.language}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Forks */}
      <div>
        <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Forks
        </h3>
        <div className="space-y-1">
          {visibleForks.map((fork) => (
            <a
              key={fork.repo}
              href={fork.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg px-4 py-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
            >
              <span className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
                {fork.name}
              </span>
              <span className="hidden text-xs text-neutral-500 sm:inline dark:text-neutral-400">
                {fork.description}
              </span>
            </a>
          ))}
        </div>
        {siteConfig.forks.length > 6 && (
          <button
            onClick={() => setShowAllForks(!showAllForks)}
            className="mt-3 font-mono text-xs text-neutral-500 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            {showAllForks
              ? "Show less"
              : `Show all ${siteConfig.forks.length} forks`}
          </button>
        )}
      </div>
    </div>
  );
}

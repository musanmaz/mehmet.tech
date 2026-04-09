"use client";

import { useState } from "react";

interface ProjectCardProps {
  name: string;
  url?: string;
  repo?: string;
  description: string;
  problem: string;
  techStack: readonly string[];
  useCase: string;
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function GithubSmallIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function ProjectCard({
  name,
  url,
  repo,
  description,
  problem,
  techStack,
  useCase,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  const primaryLink = url || repo;

  return (
    <div className="group rounded-xl border border-neutral-200/60 bg-neutral-50 p-6 transition-colors dark:border-neutral-800/60 dark:bg-neutral-900/50">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {primaryLink ? (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {name}
            </a>
          ) : (
            name
          )}
        </h3>
        <div className="flex items-center gap-2">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              aria-label={`Visit ${name}`}
            >
              <ExternalLinkIcon />
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              aria-label={`${name} GitHub repo`}
            >
              <GithubSmallIcon />
            </a>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-neutral-200/60 px-2 py-0.5 font-mono text-xs text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400"
          >
            {tech}
          </span>
        ))}
      </div>

      {(problem || useCase) && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-500 transition-colors hover:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${expanded ? "rotate-90" : ""}`}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
            {expanded ? "Less" : "Details"}
          </button>

          {expanded && (
            <div className="mt-3 space-y-3 border-t border-neutral-200/60 pt-3 dark:border-neutral-800/60">
              {problem && (
                <div>
                  <h4 className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Problem
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {problem}
                  </p>
                </div>
              )}
              {useCase && (
                <div>
                  <h4 className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Use Case
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {useCase}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

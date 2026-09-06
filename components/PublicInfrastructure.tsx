import { siteConfig } from "@/lib/site";

function ServerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 text-neutral-400 dark:text-neutral-500"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
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
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function PublicInfrastructure() {
  const node = siteConfig.publicInfrastructure.speedtest;

  const specs: { label: string; value: string; mono?: boolean }[] = [
    { label: "Location", value: node.location },
    { label: "Network", value: node.network },
    { label: "Compute", value: node.compute },
    { label: "Storage", value: node.storage },
    { label: "Host", value: node.hostname, mono: true },
    { label: "Operator", value: node.operator },
  ];

  return (
    <article className="rounded-xl border border-neutral-200/60 bg-neutral-50 p-6 dark:border-neutral-800/60 dark:bg-neutral-900/50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <ServerIcon />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {node.name}
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {node.summary}
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-700 dark:text-emerald-400">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            {node.status}
          </span>
          <span className="rounded-md bg-neutral-200/60 px-2 py-0.5 font-mono text-xs text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400">
            {node.badge}
          </span>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
        {specs.map((spec) => (
          <div key={spec.label} className="min-w-0">
            <dt className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {spec.label}
            </dt>
            <dd
              className={`text-sm text-neutral-800 dark:text-neutral-200 ${
                spec.mono ? "break-all font-mono text-xs sm:text-sm" : ""
              }`}
            >
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {node.description}
      </p>

      <a
        href={node.speedtestUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Speedtest on speedtest.net"
        className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-neutral-500 transition-colors hover:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-400"
      >
        {node.speedtestLabel}
        <ExternalLinkIcon />
      </a>
    </article>
  );
}

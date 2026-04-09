import { siteConfig } from "@/lib/site";

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
      <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function Writing() {
  return (
    <div className="space-y-1">
      <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
        <a
          href="https://medium.com/@musanmaz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          Medium — @musanmaz
        </a>
      </p>
      {siteConfig.writing.map((article) => (
        <a
          key={article.url}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
        >
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {article.title}
          </span>
          <ExternalLinkIcon />
        </a>
      ))}
    </div>
  );
}

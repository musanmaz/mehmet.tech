import { siteConfig } from "@/lib/site";

export function TechStack() {
  const categories = Object.entries(siteConfig.techFocus);

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {categories.map(([category, items]) => (
        <div key={category}>
          <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-neutral-200/60 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700 transition-colors dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

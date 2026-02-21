import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="pb-10 pt-20 md:pt-28">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="mb-6 font-mono text-lg text-emerald-600 dark:text-emerald-400 md:text-xl">
        {siteConfig.hero.tagline}
      </p>
      <p className="mb-10 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
        {siteConfig.hero.intro}
      </p>
      <div className="flex gap-4">
        <a
          href="#work"
          className="inline-flex items-center rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="inline-flex items-center rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Contact
        </a>
      </div>
    </section>
  );
}

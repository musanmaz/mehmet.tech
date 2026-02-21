import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Navigation */}
      <nav className="flex items-center justify-between pt-6">
        <span className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
          {siteConfig.domain}
        </span>
        <ThemeToggle />
      </nav>

      <Hero />

      {/* What I Do */}
      <Section id="work" title="What I Do">
        <div className="grid gap-4 sm:grid-cols-2">
          {siteConfig.whatIDo.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      {/* Current Focus */}
      <Section title="Current Focus">
        <ul className="space-y-3">
          {siteConfig.currentFocus.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
            >
              <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span className="text-base">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Philosophy */}
      <Section title="Philosophy">
        <blockquote className="mb-6 border-l-2 border-emerald-500 pl-4 font-mono text-lg text-neutral-800 dark:text-neutral-200">
          &ldquo;{siteConfig.philosophy.quote}&rdquo;
        </blockquote>
        <p className="max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          {siteConfig.philosophy.body}
        </p>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="flex flex-col gap-4 font-mono text-sm">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-3 text-neutral-700 transition-colors hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            {siteConfig.contact.email}
          </a>
          <a
            href={siteConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-neutral-700 transition-colors hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href={siteConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-neutral-700 transition-colors hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

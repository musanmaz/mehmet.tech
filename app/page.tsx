import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { TechStack } from "@/components/TechStack";
import { Writing } from "@/components/Writing";
import { OpenSource } from "@/components/OpenSource";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <Navbar />

      <Hero />

      {/* Featured Projects */}
      <Section id="projects" title="Featured Projects">
        <div className="grid gap-4 sm:grid-cols-2">
          {siteConfig.featuredProjects.map((project) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              url={"url" in project ? project.url : undefined}
              repo={"repo" in project ? project.repo : undefined}
              description={project.description}
              problem={project.problem}
              techStack={project.techStack}
              useCase={project.useCase}
            />
          ))}
        </div>
      </Section>

      {/* Other Projects */}
      <Section title="Other Projects">
        <div className="space-y-6">
          {Object.entries(siteConfig.otherProjects).map(
            ([category, projects]) => (
              <div key={category}>
                <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {category}
                </h3>
                <div className="space-y-1">
                  {projects.map((project) => (
                    <a
                      key={project.name}
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg px-4 py-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-neutral-800 dark:text-neutral-200">
                          {project.name}
                        </span>
                        <span className="hidden text-sm text-neutral-500 sm:inline dark:text-neutral-400">
                          — {project.description}
                        </span>
                      </div>
                      <span className="rounded-md bg-neutral-200/60 px-2 py-0.5 font-mono text-xs text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
                        {project.language}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </Section>

      {/* Technology Focus */}
      <Section id="tech" title="Technology Focus">
        <TechStack />
      </Section>

      {/* Writing */}
      <Section id="writing" title="Writing">
        <Writing />
      </Section>

      {/* Open Source & Contributions */}
      <Section id="opensource" title="Open Source & Contributions">
        <OpenSource />
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <Contact />
      </Section>

      <Footer />
    </div>
  );
}

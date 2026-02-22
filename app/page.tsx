import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <Navbar />

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
        <Contact />
      </Section>

      <Footer />
    </div>
  );
}
